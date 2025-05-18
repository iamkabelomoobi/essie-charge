import * as Battery from "expo-battery";
import { useEffect, useRef, useState } from "react";

type BatteryHealth =
  | "good"
  | "overheat"
  | "dead"
  | "overvoltage"
  | "cold"
  | "unknown";

export function useBatteryStatus() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [charging, setCharging] = useState<boolean | null>(null);
  const [batteryHealth] = useState<BatteryHealth>("good"); // mock value

  // For estimating time left to full charge
  const prevLevel = useRef<number | null>(null);
  const prevTimestamp = useRef<number | null>(null);
  const [estimatedTimeLeft, setEstimatedTimeLeft] = useState<string | null>(
    null
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchBattery() {
      const level = await Battery.getBatteryLevelAsync();
      const state = await Battery.getBatteryStateAsync();

      if (isMounted) {
        setBatteryLevel(level);
        setCharging(
          state === Battery.BatteryState.CHARGING ||
            state === Battery.BatteryState.FULL
        );
      }
    }

    fetchBattery();

    const stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
      setCharging(
        batteryState === Battery.BatteryState.CHARGING ||
          batteryState === Battery.BatteryState.FULL
      );
    });

    const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });

    return () => {
      isMounted = false;
      stateSub.remove();
      levelSub.remove();
    };
  }, []);

  // Calculate estimated time left to full charge
  useEffect(() => {
    const now = Date.now();

    if (
      charging &&
      batteryLevel !== null &&
      batteryLevel < 1 &&
      prevLevel.current !== null &&
      prevTimestamp.current !== null &&
      batteryLevel > prevLevel.current
    ) {
      const deltaLevel = batteryLevel - prevLevel.current;
      const deltaTime = (now - prevTimestamp.current) / 1000; // seconds

      if (deltaLevel > 0 && deltaTime > 0) {
        const percentLeft = 1 - batteryLevel;
        const secondsPerPercent = deltaTime / (deltaLevel * 100);
        const secondsLeft = percentLeft * 100 * secondsPerPercent;

        // Format as HH:MM:SS
        const hours = Math.floor(secondsLeft / 3600);
        const minutes = Math.floor((secondsLeft % 3600) / 60);
        const seconds = Math.floor(secondsLeft % 60);
        setEstimatedTimeLeft(
          `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`
        );
      }
    }

    // Only update prevLevel/prevTimestamp if charging and batteryLevel changed
    if (charging && batteryLevel !== null) {
      if (prevLevel.current !== batteryLevel) {
        prevLevel.current = batteryLevel;
        prevTimestamp.current = now;
      }
    }
  }, [batteryLevel, charging]);

  return {
    batteryLevel,
    estimatedTimeLeft,
    charging,
    batteryHealth,
  };
}

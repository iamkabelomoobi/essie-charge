import { useEffect, useState } from "react";

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const useStationDistance = (
  userLocation: { latitude: number; longitude: number } | null,
  station: { latitude: number; longitude: number }
) => {
  const [distance, setDistance] = useState<string>("");

  useEffect(() => {
    if (userLocation && station) {
      const d = getDistanceFromLatLonInKm(
        userLocation.latitude,
        userLocation.longitude,
        station.latitude,
        station.longitude
      );
      setDistance(`${d.toFixed(2)} Kilometer`);
    }
  }, [userLocation, station]);

  return distance;
};
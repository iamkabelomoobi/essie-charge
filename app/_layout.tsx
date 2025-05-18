import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import "react-native-reanimated";

import Navbar from "@/components/navbar/Navbar";
import { AlertsProvider } from "@/context/AlertsContext";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => setShowSplash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (!loaded) {
    return null;
  }

  return (
    <AlertsProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            {showSplash ? (
              <Stack.Screen name="SplashScreen" />
            ) : (
              <>
                <Stack.Screen name="(dashboard)" />
              </>
            )}
          </Stack>
          {!showSplash && (
            <View
              style={{ position: "absolute", left: 0, right: 0, bottom: 10 }}
            >
              <Navbar />
            </View>
          )}
        </View>
      </ThemeProvider>
    </AlertsProvider>
  );
}

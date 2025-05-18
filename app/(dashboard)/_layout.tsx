import { Stack } from "expo-router";

const DashboardLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DashboardScreen" />
      <Stack.Screen name="MapScreen" />
      <Stack.Screen name="ScanScreen" />
      <Stack.Screen name="AlertsScreen" />
      <Stack.Screen name="SettingsScreen" />
    </Stack>
  );
};

export default DashboardLayout;


import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="language" options={{ headerShown: false }} />
    </Stack>
  );
}

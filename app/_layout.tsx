
import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';
import { LocalizationProvider } from '@/contexts/LocalizationContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { WidgetProvider } from '@/contexts/WidgetContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <LocalizationProvider>
        <FavoritesProvider>
          <WidgetProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
              <Stack.Screen name="formsheet" options={{ presentation: 'formSheet' }} />
              <Stack.Screen name="transparent-modal" options={{ presentation: 'transparentModal' }} />
            </Stack>
          </WidgetProvider>
        </FavoritesProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack screenOptions={{ headerTintColor: '#000000', headerStyle: { backgroundColor: '#F9F9F9' } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* ホーム */}
        <Stack.Screen name="home/index" options={{ headerTitle: 'ホーム' }} />

        {/* ラベル */}
        <Stack.Screen name="labels" options={{ headerShown: false, presentation: 'fullScreenModal' }} />

        {/* メモ */}
        <Stack.Screen name="memos/index" options={{ headerTitle: 'メモ' }} />
        <Stack.Screen name="memos/create" options={{ headerTitle: '' }} />
        <Stack.Screen name="memos/[id]" options={{ headerTitle: '' }} />
      </Stack>
    </GluestackUIProvider>
  );
}

import { Stack } from 'expo-router';
// Importiere den Provider
import { VociProvider } from '../context/vociContext';

export default function RootLayout() {
  return (
    <VociProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#b201a6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Meine Vokabeln",
          }}
        />
        <Stack.Screen
          name="learn"
          options={{
            title: "Vokabeln lernen",
          }}
        />
        <Stack.Screen
          name="add"
          options={{
          title: "Neue Vokabel",
          }}
        />
      </Stack>
      
    </VociProvider>
  );
}
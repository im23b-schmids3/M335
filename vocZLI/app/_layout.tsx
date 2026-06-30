import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VociProvider } from '../context/vociContext';

export default function RootLayout() {
  const router = useRouter();

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
        {/* Hauptscreen mit Header-Button rechts */}
        <Stack.Screen
          name="index"
          options={{
            title: "Meine Vokabeln",
            headerRight: () => (
              <Pressable 
                onPress={() => router.push('/addVoci')}
                style={({ pressed }) => [
                  styles.headerButton,
                  pressed && styles.headerButtonPressed
                ]}
              >
                <Ionicons name="add" size={26} color="#fff" />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen
          name="learn"
          options={{
            title: "Vokabeln lernen",
          }}
        />

        {/* Neuer AddVoci Screen registriert als Modal (schiebt sich von unten hoch) */}
        <Stack.Screen
          name="addVoci"
          options={{
            title: "Neue Vokabel",
            presentation: 'modal', 
          }}
        />
        <Stack.Screen
          name="editVoci"
          options={{
            title: "Vokabel bearbeiten",
            presentation: 'modal', // Schiebt sich flüssig von unten rein
  }}
/>
      </Stack>
    </VociProvider>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    padding: 8,
    marginRight: -4, // Richtet das Icon optisch sauber am rechten Rand aus
  },
  headerButtonPressed: {
    opacity: 0.7,
  },
});
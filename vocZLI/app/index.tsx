import { Text, View, StyleSheet, FlatList, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import VociItem from "../components/vociItem";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useVoci } from '../context/vociContext';

export default function Index() {
  const router = useRouter();
  
  // 1. Hole vociList UND isLoading aus dem globalen Context
  const { vociList, isLoading } = useVoci();
  
  const renderEmptyContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="school" size={64} color="#ccc" />
        <Text style={styles.emptyTitle}>Keine Vokabeln vorhanden</Text>
        <Text style={styles.emptySubtitle}>
          Füge bald neue Vokabeln hinzu, um mit dem Lernen zu starten!
        </Text>
      </View>
    );
  };

  // 2. Aufgabe 4: Wenn die App lädt, zeige den ActivityIndicator zentriert an
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b201a6" />
        <Text style={styles.loadingText}>Vokabeln werden geladen...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VocZLI</Text>
      <Text style={styles.subtitle}>Meine Vokabel-Lern-App</Text>
      
      <FlatList
        data={vociList}
        renderItem={({ item }) => <VociItem voci={item} />}
        keyExtractor={(item) => item.term}
        style={styles.list}
        ListEmptyComponent={renderEmptyContainer}
        contentContainerStyle={vociList.length === 0 && { flexGrow: 1, justifyContent: 'center' }}
      />

      {/* FAB 1: Vokabel hinzufügen (Unten Links, grün) */}
      <Pressable 
        style={({ pressed }) => [
          styles.fab,
          styles.fabAdd,
          pressed && styles.fabPressed
        ]} 
        onPress={() => router.push("/addVoci")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>

      {/* FAB 2: Lernen starten (Unten Rechts, lila) */}
      <Pressable 
        style={({ pressed }) => [
          styles.fab,
          styles.fabPlay,
          pressed && styles.fabPressed
        ]} 
        onPress={() => router.push("/learn")}
      >
        <Ionicons name="play" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  // Styles für den neuen Ladebildschirm
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    width: "100%",
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabPlay: {
    right: 20,
    backgroundColor: '#b201a6',
  },
  fabAdd: {
    left: 20,
    backgroundColor: '#2e7d32',
  },
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
    elevation: 3,
  },
});
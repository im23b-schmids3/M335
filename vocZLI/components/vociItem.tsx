import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Voci from '../models/voci';
import { Ionicons } from '@expo/vector-icons';
// Context importieren, um die Löschfunktion zu nutzen
import { useVoci } from '../context/vociContext';

interface VociItemProps {
  voci: Voci;
}

export default function VociItem({ voci }: VociItemProps) {
  // Löschfunktion aus dem globalen Context ziehen
  const { removeVoci } = useVoci();

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.termText}>{voci.term}</Text>
        <Text style={styles.translationText}>{voci.translation}</Text>
      </View>
      
      {/* Lösch-Button */}
      <Pressable 
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
        onPress={() => removeVoci(voci.term)}
      >
        <Ionicons name="trash-outline" size={22} color="#c62828" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    flexDirection: 'row', // Text und Mülleimer nebeneinander anordnen
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1, // Nimmt den restlichen Platz ein
  },
  termText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  translationText: {
    fontSize: 15,
    color: '#666666',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonPressed: {
    backgroundColor: '#ffebee', // Leichter roter Hintergrund beim Klicken
    transform: [{ scale: 0.95 }],
  },
});
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useVoci } from '../context/vociContext';
import VociDetail from '../components/vociDetail';
import Voci from '../models/voci';

export default function EditVociScreen() {
  const router = useRouter();
  const { term } = useLocalSearchParams<{ term: string }>(); // Parameter aus der URL holen
  const { vociList, updateVoci, removeVoci } = useVoci();

  // Die passende Vokabel aus dem globalen Context heraussuchen
  const currentVoci = vociList.find(item => item.term === term);

  // Falls die Vokabel nicht gefunden wird (Sicherheitsanker)
  if (!currentVoci) {
    return (
      <View style={styles.container}>
        <Text>Vokabel wurde nicht gefunden.</Text>
      </View>
    );
  }

  const handleUpdate = (updatedVoci: Voci) => {
    updateVoci(currentVoci.term, updatedVoci);
    router.back();
  };

  const handleDelete = () => {
    removeVoci(currentVoci.term);
    router.back();
  };

  return (
    <View style={styles.container}>
      <VociDetail 
        initialVoci={currentVoci}
        onSave={handleUpdate}
        onCancel={() => router.back()}
        onDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
});
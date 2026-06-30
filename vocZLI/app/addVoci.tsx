import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useVoci } from '../context/vociContext';
import VociDetail from '../components/vociDetail';
import Voci from '../models/voci';

export default function AddVociScreen() {
  const router = useRouter();
  const { addVoci, vociList } = useVoci();

  const handleAdd = (newVoci: Voci) => {
    // Kurzer Check, ob das Wort bereits existiert
    const exists = vociList.some(
      (item) => item.term.toLowerCase() === newVoci.term.toLowerCase()
    );

    if (exists) {
      Alert.alert('Fehler', 'Diese Vokabel existiert bereits in deiner Liste.');
      return;
    }

    // Im Context speichern und zurücknavigieren
    addVoci(newVoci);
    router.back();
  };

  return (
    <View style={styles.container}>
      <VociDetail onSave={handleAdd} />
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
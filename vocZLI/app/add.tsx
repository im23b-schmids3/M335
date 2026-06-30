import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useVoci } from '../context/vociContext';

export default function AddScreen() {
  const router = useRouter();
  const { addVoci, vociList } = useVoci();

  // Lokaler State für die Eingabefelder
  const [term, setTerm] = useState('');
  const [translation, setTranslation] = useState('');

  const handleSave = () => {
    // Validierung: Sind die Felder leer?
    if (term.trim() === '' || translation.trim() === '') {
      Alert.alert('Fehler', 'Bitte fülle beide Felder aus.');
      return;
    }

    // Validierung: Existiert das Wort schon? (Da "term" unser Key in der FlatList ist)
    const exists = vociList.some(item => item.term.toLowerCase() === term.trim().toLowerCase());
    if (exists) {
      Alert.alert('Fehler', 'Diese Vokabel existiert bereits.');
      return;
    }

    // Neue Vokabel in den globalen Context speichern
    addVoci({
      term: term.trim(),
      translation: translation.trim(),
    });

    // Zurück zum Hauptbildschirm springen
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Begriff / Fremdwort</Text>
      <TextInput
        style={styles.input}
        placeholder="z.B. apple"
        value={term}
        onChangeText={setTerm}
      />

      <Text style={styles.label}>Übersetzung</Text>
      <TextInput
        style={styles.input}
        placeholder="z.B. Apfel"
        value={translation}
        onChangeText={setTranslation}
      />

      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Vokabel hinzufügen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#b201a6',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
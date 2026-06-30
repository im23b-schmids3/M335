import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import Voci from '../models/voci';

// 1. Props-Interface erweitern (Optionale Props für den Edit-Modus)
interface VociDetailProps {
  onSave: (voci: Voci) => void;
  initialVoci?: Voci;      // Wenn vorhanden -> Edit-Modus
  onCancel?: () => void;    // Nur im Edit-Modus benötigt
  onDelete?: () => void;    // Nur im Edit-Modus benötigt
}

export default function VociDetail({ onSave, initialVoci, onCancel, onDelete }: VociDetailProps) {
  // Erkennen, ob wir im Edit-Modus sind
  const isEditMode = !!initialVoci;

  // 2. States initialisieren (falls initialVoci da ist, direkt vorausfüllen)
  const [term, setTerm] = useState(initialVoci ? initialVoci.term : '');
  const [translation, setTranslation] = useState(initialVoci ? initialVoci.translation : '');

  // Falls sich initialVoci von außen ändert (wichtig für React-Lifecycle)
  useEffect(() => {
    if (initialVoci) {
      setTerm(initialVoci.term);
      setTranslation(initialVoci.translation);
    }
  }, [initialVoci]);

  const handleSave = () => {
    if (term.trim() === '' || translation.trim() === '') {
      Alert.alert('Fehler', 'Bitte fülle sowohl den Begriff als auch die Übersetzung aus.');
      return;
    }

    onSave({
      term: term.trim(),
      translation: translation.trim(),
    });

    if (!isEditMode) {
      setTerm('');
      setTranslation('');
    }
  };

  // Aufgabe 4: Löschen mit Bestätigungs-Dialog
  const handleDeletePress = () => {
    if (onDelete) {
      Alert.alert(
        'Vokabel löschen',
        `Möchtest du "${term}" wirklich unwiderruflich löschen?`,
        [
          { text: 'Abbrechen', style: 'cancel' },
          { text: 'Löschen', style: 'destructive', onPress: onDelete },
        ]
      );
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Begriff / Fremdwort</Text>
      <TextInput
        style={[styles.input, isEditMode && styles.disabledInput]}
        placeholder="z.B. apple"
        value={term}
        onChangeText={setTerm}
        editable={!isEditMode} // Im Edit-Modus darf der Schlüssel (term) oft nicht geändert werden
      />

      <Text style={styles.label}>Übersetzung</Text>
      <TextInput
        style={styles.input}
        placeholder="z.B. Apfel"
        value={translation}
        onChangeText={setTranslation}
      />

      {/* Dynamische Button-Anzeige */}
      <View style={styles.buttonArea}>
        <Pressable 
          style={({ pressed }) => [styles.button, styles.btnSave, pressed && styles.btnPressed]}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Speichern</Text>
        </Pressable>

        {isEditMode && (
          <View style={styles.editButtonsRow}>
            <Pressable 
              style={({ pressed }) => [styles.button, styles.btnCancel, pressed && styles.btnPressed]}
              onPress={onCancel}
            >
              <Text style={[styles.buttonText, { color: '#333' }]}>Abbrechen</Text>
            </Pressable>

            <Pressable 
              style={({ pressed }) => [styles.button, styles.btnDelete, pressed && styles.btnPressed]}
              onPress={handleDeletePress}
            >
              <Text style={styles.buttonText}>Löschen</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
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
  disabledInput: {
    backgroundColor: '#eaeaea',
    color: '#777',
  },
  buttonArea: {
    marginTop: 32,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnSave: {
    backgroundColor: '#b201a6',
    marginBottom: 12,
  },
  editButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnCancel: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    marginRight: 6,
  },
  btnDelete: {
    backgroundColor: '#c62828',
    flex: 1,
    marginLeft: 6,
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
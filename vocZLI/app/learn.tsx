import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
// Globalen Context importieren
import { useVoci } from '../context/vociContext';

export default function LearnScreen() {
  const router = useRouter();

  // Vokabeln global aus dem Context ziehen
  const { vociList } = useVoci();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);

  const isFinished = currentIndex >= vociList.length;

  if (isFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Geschafft! 🎉</Text>
          <Text style={styles.statsText}>Deine Statistik:</Text>
          <Text style={[styles.statsDetail, { color: '#2e7d32' }]}>Richtig: {correctCount}</Text>
          <Text style={[styles.statsDetail, { color: '#c62828' }]}>Falsch: {wrongCount}</Text>
          
          <Pressable 
            style={({ pressed }) => [styles.button, styles.btnNext, pressed && styles.btnPressed]}
            onPress={() => router.dismissAll()}
          >
            <Text style={styles.buttonText}>Zur Übersicht</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const currentVoci = vociList[currentIndex];

  const handleNext = (wasKnown: boolean) => {
    if (wasKnown) {
      setCorrectCount(prev => prev + 1);
    } else {
      setWrongCount(prev => prev + 1);
    }
    setCurrentIndex(prev => prev + 1);
    setShowTranslation(false);
  };

  return (
    <View style={styles.container}>
      {/* Fortschrittsanzeige */}
      <Text style={styles.progress}>
        {currentIndex + 1} / {vociList.length}
      </Text>

      {/* Vokabel-Card */}
      <View style={styles.card}>
        <Text style={styles.term}>{currentVoci?.term}</Text>

        {/* Bedingtes Rendern der Übersetzung */}
        {showTranslation && (
          <View style={styles.translationContainer}>
            <Text style={styles.translation}>{currentVoci?.translation}</Text>
          </View>
        )}
      </View>

      {/* Interaktions-Buttons */}
      <View style={styles.actionArea}>
        {!showTranslation && (
          <Pressable 
            style={({ pressed }) => [styles.button, styles.btnShow, pressed && styles.btnPressed]}
            onPress={() => setShowTranslation(true)}
          >
            <Text style={styles.buttonText}>Übersetzung zeigen</Text>
          </Pressable>
        )}

        {showTranslation && (
          <View style={styles.statsButtonRow}>
            <Pressable 
              style={({ pressed }) => [styles.button, styles.btnWrong, pressed && styles.btnPressed]}
              onPress={() => handleNext(false)}
            >
              <Text style={styles.buttonText}>Nicht gewusst ❌</Text>
            </Pressable>

            <Pressable 
              style={({ pressed }) => [styles.button, styles.btnCorrect, pressed && styles.btnPressed]}
              onPress={() => handleNext(true)}
            >
              <Text style={styles.buttonText}>Gewusst  </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
    alignItems: 'center',
  },
  progress: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    minHeight: 250,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  term: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  translationContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: '100%',
    alignItems: 'center',
  },
  translation: {
    fontSize: 24,
    color: '#b201a6',
    fontWeight: '600',
    textAlign: 'center',
  },
  actionArea: {
    width: '100%',
    marginTop: 40,
  },
  button: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnShow: {
    backgroundColor: '#b201a6',
  },
  statsButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnCorrect: {
    backgroundColor: '#2e7d32',
    flex: 1,
    marginLeft: 8,
  },
  btnWrong: {
    backgroundColor: '#c62828',
    flex: 1,
    marginRight: 8,
  },
  btnNext: {
    backgroundColor: '#333',
    marginTop: 24,
    width: '100%',
  },
  btnPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  statsDetail: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});
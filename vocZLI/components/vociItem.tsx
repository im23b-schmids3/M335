import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Voci from '../models/voci';

interface VociItemProps {
  voci: Voci;
}

export default function VociItem({ voci }: VociItemProps) {
  const router = useRouter();

  const handlePress = () => {
    // Navigiert zum Edit-Screen und übergibt den Begriff sicher codiert als URL-Parameter
    router.push(`/editVoci?term=${encodeURIComponent(voci.term)}`);
  };

  return (
    <Pressable 
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.termText}>{voci.term}</Text>
        <Text style={styles.translationText}>{voci.translation}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardPressed: {
    backgroundColor: '#f5f5f5',
    transform: [{ scale: 0.99 }],
  },
  textContainer: {
    width: '100%',
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
});
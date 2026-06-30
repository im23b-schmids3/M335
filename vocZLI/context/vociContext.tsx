import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voci from '../models/voci';

interface VociContextType {
  vociList: Voci[];
  isLoading: boolean; // Für Aufgabe 4 hinzugefügt
  addVoci: (voci: Voci) => void;
  updateVoci: (term: string, updatedVoci: Voci) => void;
  removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

// Konstante für unseren Speicher-Schlüssel
const STORAGE_KEY = 'vocis';

export function VociProvider({ children }: { children: ReactNode }) {
  const [vociList, setVociList] = useState<Voci[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Aufgabe 4: Startet im Lade-Modus

  // ==========================================
  // Aufgabe 3: Vokabeln beim Start (Mount) laden
  // ==========================================
  useEffect(() => {
    const loadVocis = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        
        if (jsonValue !== null) {
          // Daten existieren -> In ein Array umwandeln und in den State setzen
          const parsedVocis = JSON.parse(jsonValue);
          setVociList(parsedVocis);
          console.log('🎉 Vokabeln erfolgreich geladen:', parsedVocis.length, 'Stück');
        } else {
          // Erste Installation: Speicher ist leer -> Wir setzen deine 8 Standardvokabeln
          const defaultVocis: Voci[] = [
            { term: "View", translation: "Ansicht / Container" },
            { term: "State", translation: "Zustand" },
            { term: "Props", translation: "Eigenschaften (Übergabeparameter)" },
            { term: "Compiler", translation: "Übersetzer" },
            { term: "Framework", translation: "Programmiergerüst" },
            { term: "Array", translation: "Datenfeld / Liste" },
            { term: "Function", translation: "Funktion" },
            { term: "Component", translation: "Baustein / Komponente" },
          ];
          setVociList(defaultVocis);
          console.log('🌱 Keine Daten gefunden. Standardvokabeln geladen.');
        }
      } catch (error) {
        console.error('❌ Fehler beim Laden der Vokabeln:', error);
      } finally {
        // Das Laden ist beendet (egal ob Erfolg oder Fehler)
        setIsLoading(false);
      }
    };

    loadVocis();
  }, []); // Leeres Array = Läuft exakt einmal beim App-Start

  // ==========================================
  // Aufgabe 2: Automatisch speichern bei State-Änderung
  // ==========================================
  useEffect(() => {
    // Wichtig: Wir speichern nur, wenn die App nicht mehr im initialen Ladezustand ist!
    // Sonst würden wir beim Starten ein leeres Array [] über die geladenen Daten dröseln.
    if (isLoading) return;

    const saveVocis = async () => {
      try {
        const jsonValue = JSON.stringify(vociList);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        console.log('💾 Vocis erfolgreich im AsyncStorage gespeichert!');
      } catch (error) {
        console.error('❌ Fehler beim Speichern im AsyncStorage:', error);
      }
    };

    saveVocis();
  }, [vociList, isLoading]); // Läuft jedes Mal, wenn sich vociList ändert

  // CRUD-Funktionen
  const addVoci = (newVoci: Voci) => {
    setVociList((prevList) => [...prevList, newVoci]);
  };

  const updateVoci = (term: string, updatedVoci: Voci) => {
    setVociList((prevList) =>
      prevList.map((item) => (item.term === term ? updatedVoci : item))
    );
  };

  const removeVoci = (term: string) => {
    setVociList((prevList) => prevList.filter((item) => item.term !== term));
  };

  return (
    <VociContext.Provider value={{ vociList, isLoading, addVoci, updateVoci, removeVoci }}>
      {children}
    </VociContext.Provider>
  );
}

export function useVoci() {
  const context = useContext(VociContext);
  if (!context) {
    throw new Error('useVoci muss innerhalb von VociProvider verwendet werden');
  }
  return context;
}
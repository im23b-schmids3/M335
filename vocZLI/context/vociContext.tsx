import { createContext, useContext, useState, ReactNode } from 'react';
import Voci from '../models/voci'; // angepasst auf dein vorhandenes Interface

// 1. Interface um die CRUD-Funktionen erweitern
interface VociContextType {
  vociList: Voci[];
  addVoci: (voci: Voci) => void;
  updateVoci: (term: string, updatedVoci: Voci) => void;
  removeVoci: (term: string) => void;
}

const VociContext = createContext<VociContextType | undefined>(undefined);

export function VociProvider({ children }: { children: ReactNode }) {
  // Hier sind deine 8 echten Vokabeln als zentraler Start-State
  const [vociList, setVociList] = useState<Voci[]>([
    { term: "View", translation: "Ansicht / Container" },
    { term: "State", translation: "Zustand" },
    { term: "Props", translation: "Eigenschaften (Übergabeparameter)" },
    { term: "Compiler", translation: "Übersetzer" },
    { term: "Framework", translation: "Programmiergerüst" },
    { term: "Array", translation: "Datenfeld / Liste" },
    { term: "Function", translation: "Funktion" },
    { term: "Component", translation: "Baustein / Komponente" },
  ]);

  // 2. CRUD-Funktionen implementieren
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

  // 3. Werte und Funktionen im Provider bereitstellen
  return (
    <VociContext.Provider value={{ vociList, addVoci, updateVoci, removeVoci }}>
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
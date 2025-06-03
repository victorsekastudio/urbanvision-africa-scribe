
import { create } from 'zustand';

interface LanguageState {
  currentLanguage: 'EN' | 'FR';
  setLanguage: (language: 'EN' | 'FR') => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  currentLanguage: 'EN',
  setLanguage: (language) => set({ currentLanguage: language }),
}));

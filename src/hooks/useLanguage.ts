
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  currentLanguage: 'EN' | 'FR';
  setLanguage: (language: 'EN' | 'FR') => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      currentLanguage: 'EN',
      setLanguage: (language) => {
        console.log('Language changed to:', language);
        set({ currentLanguage: language });
      },
    }),
    {
      name: 'urbanvision-language',
    }
  )
);

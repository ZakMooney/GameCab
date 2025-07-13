import { create } from "zustand";

export const useStoredTheme = create((set) => {
  return {
    storedTheme: 'dark',
    setStoredTheme: (storedTheme) => set(() => {
      return {
        storedTheme: storedTheme
      }
    }),
  };
});

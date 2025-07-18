import { create } from 'zustand';

const getInitialDarkMode = () => {
  const saved = localStorage.getItem('darkMode');
  if (saved !== null) {
    return JSON.parse(saved);
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (isDark) => {
  const root = document.documentElement;
  if (isDark) {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
};

export const useDarkModeStore = create((set) => ({
  isDark: getInitialDarkMode(),
  
  toggleDarkMode: () => set((state) => {
    const newIsDark = !state.isDark;
    applyTheme(newIsDark);
    localStorage.setItem('darkMode', JSON.stringify(newIsDark));
    return { isDark: newIsDark };
  }),
}));

applyTheme(useDarkModeStore.getState().isDark);
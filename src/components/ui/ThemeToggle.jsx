import React, { useState, useEffect } from 'react';

import { Sun, Moon } from 'lucide-react';

import Switch from '../ui/Switch';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {

    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return { isDark, toggleDarkMode };
};

const ThemeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
      <Switch
        options={[
          {value: true, label: (<Moon className="w-6 h-6" />)},
          {value: !true, label: (<Sun className="w-6 h-6"/>)},
        ]}
        value={isDark}
        onChange={toggleDarkMode}
      />
    );
  }

export default ThemeToggle;
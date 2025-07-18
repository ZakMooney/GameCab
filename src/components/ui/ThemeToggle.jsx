import React, { useState, useEffect } from 'react';

import { Sun, Moon } from 'lucide-react';

import Switch from '../ui/Switch';
import Button from '../ui/Button';

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

      <Button
        onClick={toggleDarkMode}
        variant="ghost"
        className="group"
      >
        {isDark ? (
          <Moon className="w-6 h-6 transition-all duration-200 group-hover:text-indigo-300" />
        ) : (
          <Sun className="w-6 h-6 transition-all duration-200 group-hover:text-amber-500"/>
        )}
      </Button>
    );
  }

export default ThemeToggle;
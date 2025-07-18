import React from 'react';

import { Sun, Moon } from 'lucide-react';

import { useDarkModeStore } from '../../stores/ThemeStore';

import Button from '../ui/Button';

const ThemeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkModeStore();

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
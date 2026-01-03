/**
 * Theme Hook
 * Manages dark/light theme state and persistence
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'portfolio-theme';
const DARK_CLASS = 'dark';

/**
 * Custom hook for theme management
 * Provides theme state and toggle functionality with localStorage persistence
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(initialTheme);
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, []);

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      
      // Update DOM
      if (newTheme === 'dark') {
        document.documentElement.classList.add(DARK_CLASS);
      } else {
        document.documentElement.classList.remove(DARK_CLASS);
      }
      
      // Persist to localStorage
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      
      return newTheme;
    });
  }, []);

  // Set specific theme
  const setThemeMode = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    
    // Update DOM
    if (newTheme === 'dark') {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
    
    // Persist to localStorage
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme: setThemeMode,
    mounted, // Use this to prevent hydration mismatch
  };
}

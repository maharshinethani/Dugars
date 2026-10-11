'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';

interface ThemeContextValue {
  theme: 'ocean-pearl';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', 'ocean-pearl');
    root.style.colorScheme = 'light';
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'ocean-pearl' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type Theme = 'ocean-pearl' | 'ocean-midnight';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>('ocean-pearl');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('dugars-theme');

    if (
      savedTheme === 'ocean-pearl' ||
      savedTheme === 'ocean-midnight'
    ) {
      setThemeState(savedTheme);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    root.setAttribute('data-theme', theme);
    root.style.colorScheme =
      theme === 'ocean-midnight' ? 'dark' : 'light';

    localStorage.setItem('dugars-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState((current) =>
      current === 'ocean-pearl'
        ? 'ocean-midnight'
        : 'ocean-pearl'
    );
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      'useTheme must be used within ThemeProvider'
    );
  }

  return ctx;
}

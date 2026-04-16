import { createContext, useContext, useEffect, useState } from 'react';

type ColorMode = 'dark' | 'light';

interface ThemeContextValue {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  colorMode: 'dark',
  toggleColorMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('bingo-color-mode');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('bingo-color-mode', colorMode);
  }, [colorMode]);

  const toggleColorMode = () =>
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorMode() {
  return useContext(ThemeContext);
}

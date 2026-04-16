import { Sun, Moon } from 'lucide-react';
import { useColorMode } from '../context/ThemeContext';

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button
      onClick={toggleColorMode}
      aria-label={colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="btn-ghost px-3 py-2"
    >
      {colorMode === 'dark' ? (
        <><Sun className="w-3.5 h-3.5" strokeWidth={2.5} /><span>Light</span></>
      ) : (
        <><Moon className="w-3.5 h-3.5" strokeWidth={2.5} /><span>Dark</span></>
      )}
    </button>
  );
}

import { Check, Star, Sparkles } from 'lucide-react';
import type { BingoSquareData } from '../types';
import { useColorMode } from '../context/ThemeContext';
import { playMark, playUnmark } from '../utils/sounds';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  index: number;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, index, onClick }: BingoSquareProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const handleClick = () => {
    if (!square.isFreeSpace) {
      if (square.isMarked) playUnmark(); else playMark();
    }
    onClick();
  };

  const delayMs = index * 22;

  if (square.isFreeSpace) {
    return (
      <button
        disabled
        style={{ animationDelay: `${delayMs}ms` }}
        className="bingo-tile bingo-tile-free animate-square-enter"
        aria-label="Free space"
      >
        <div className="bingo-tile-gradient" />
        <div className="holo-sweep" />
        <div className="bingo-tile-inner">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} style={{ color: isDark ? 'rgba(255,255,255,0.85)' : 'var(--accent-a)' }} />
          <span className="bingo-tile-text font-black">{square.text}</span>
        </div>
      </button>
    );
  }

  if (isWinning) {
    return (
      <button
        onClick={handleClick}
        style={{ animationDelay: `${delayMs}ms` }}
        className="bingo-tile bingo-tile-winning animate-square-enter"
        aria-pressed={square.isMarked}
        aria-label={square.text}
      >
        <div className="bingo-tile-gradient-win" />
        <div className="holo-sweep" />
        <span className="absolute top-1.5 right-1.5 z-10 animate-mark-in">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]" strokeWidth={0} />
        </span>
        <div className="bingo-tile-inner">
          <span className="bingo-tile-text">{square.text}</span>
        </div>
      </button>
    );
  }

  if (square.isMarked) {
    return (
      <button
        onClick={handleClick}
        style={{ animationDelay: `${delayMs}ms` }}
        className="bingo-tile bingo-tile-marked animate-square-enter"
        aria-pressed={true}
        aria-label={square.text}
      >
        <div className="bingo-tile-gradient-marked" />
        <span className="absolute top-1.5 right-1.5 z-10 animate-mark-in">
          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 drop-shadow-[0_0_3px_rgba(var(--accent-rgb),0.5)]" style={{ color: isDark ? '#fff' : 'var(--accent-a)' }} strokeWidth={3} />
        </span>
        <div className="bingo-tile-inner">
          <span className="bingo-tile-text">{square.text}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      style={{ animationDelay: `${delayMs}ms` }}
      className="bingo-tile bingo-tile-default animate-square-enter"
      aria-pressed={false}
      aria-label={square.text}
    >
      <div className="bingo-tile-inner">
        <span className="bingo-tile-text">{square.text}</span>
      </div>
    </button>
  );
}

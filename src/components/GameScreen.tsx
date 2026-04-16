import { useEffect, useRef } from 'react';
import { ArrowLeft, CreditCard, Sparkles } from 'lucide-react';
import type { BingoSquareData, GameMode } from '../types';
import { BingoBoard } from './BingoBoard';
import { useColorMode } from '../context/ThemeContext';
import { ColorModeToggle } from './ColorModeToggle';
import { ShareButton } from './ShareButton';
import { Confetti } from './Confetti';
import { playBingo } from '../utils/sounds';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  playerName: string;
  themeId?: string;
  markedCount?: number;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
  onSwitchMode: (mode: GameMode) => void;
}

export function GameScreen({
  board, winningSquareIds, hasBingo, playerName,
  themeId = 'tech', markedCount = 0,
  onSquareClick, onReset, onSwitchMode,
}: GameScreenProps) {
  const { colorMode } = useColorMode();
  const prevBingo = useRef(false);

  useEffect(() => {
    if (hasBingo && !prevBingo.current) playBingo();
    prevBingo.current = hasBingo;
  }, [hasBingo]);

  const fillPct = Math.min((markedCount / 24) * 100, 100);

  return (
    <div className="min-h-screen px-3 pb-8 pt-5 sm:px-5">
      <Confetti active={hasBingo} />
      <div className="mx-auto w-full max-w-2xl space-y-4 animate-slide-up">

        <header className="glass rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
          <button onClick={onReset} className="btn-ghost px-3 py-2">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>Back</span>
          </button>

          <div className="text-center min-w-0">
            <p className="text-label truncate">{playerName}</p>
            <h1 className="text-lg sm:text-xl font-black tracking-tight leading-tight heading-gradient">
              Find your match
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ColorModeToggle />
            <button onClick={() => onSwitchMode('card-deck')} className="btn-ghost px-3 py-2">
              <span>Cards</span>
              <CreditCard className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </header>

        <div className="surface rounded-2xl px-4 py-2.5 flex items-center gap-4 text-xs font-semibold">
          <span className="text-label">Marked</span>
          <span className={`font-black text-sm ${colorMode === 'dark' ? 'text-cyan-400' : 'text-indigo-700'}`}>{markedCount}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/8 relative">
            <div
              className="h-full rounded-full transition-all duration-700 progress-shimmer"
              style={{
                width: `${fillPct}%`,
                background: 'linear-gradient(90deg, var(--accent-a), var(--accent-b))',
              }}
            />
          </div>
          <span className={`${hasBingo ? (colorMode === 'dark' ? 'text-amber-400' : 'text-amber-600') : 'text-muted'} font-black text-sm`}>
            {hasBingo ? 'BINGO!' : '—'}
          </span>
        </div>

        {hasBingo && (
          <div className="rounded-2xl overflow-hidden animate-bingo-pop">
            <div className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
                <p className="text-lg font-black text-white tracking-tight">Line complete — you win!</p>
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
            </div>
            <div className={`glass px-4 py-2.5 flex items-center justify-center gap-3 ${colorMode === 'light' ? 'bg-violet-50/80' : ''}`}>
              <p className="text-body text-sm">Share your win</p>
              <ShareButton playerName={playerName} themeId={themeId} markedCount={markedCount} />
            </div>
          </div>
        )}

        <div className="glass rounded-3xl p-3 sm:p-4">
          <BingoBoard board={board} winningSquareIds={winningSquareIds} onSquareClick={onSquareClick} />
        </div>

        <p className="text-center text-muted text-xs">
          Tap to mark · Tap again to unmark · Free space is yours
        </p>

      </div>
    </div>
  );
}

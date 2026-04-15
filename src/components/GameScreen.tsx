import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="min-h-full px-4 pb-8 pt-6 bg-[linear-gradient(180deg,#080b13_0%,#0d1220_100%)] sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-4 flex items-center justify-between rounded-[2rem] border border-[rgba(148,163,184,0.12)] bg-[rgba(8,15,30,0.82)] p-4 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.65)]">
          <button
            onClick={onReset}
            className="rounded-full border border-[rgba(148,163,184,0.14)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-[rgba(255,255,255,0.08)] focus-ring-neon"
          >
            ← Back
          </button>

          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-300/80">
              Bingo Mixer
            </p>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white">
              Find your match
            </h1>
          </div>

          <div className="w-24" />
        </header>

        <div className="mb-4 rounded-[1.75rem] border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.84)] p-4 text-sm leading-6 text-slate-300 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)]">
          Tap a square when it matches someone in the room. Free space is already yours.
        </div>

        {hasBingo && (
          <div className="mb-4 rounded-[1.75rem] border border-cyan-300/20 bg-gradient-to-r from-cyan-500/15 via-sky-500/15 to-violet-500/15 px-4 py-3 text-center text-sm font-semibold text-cyan-100 shadow-[0_0_30px_-15px_rgba(56,189,248,0.55)]">
            🎉 BINGO! You completed a line!
          </div>
        )}

        <div className="glass-panel overflow-hidden px-4 py-5 sm:px-5 sm:py-6">
          <BingoBoard board={board} winningSquareIds={winningSquareIds} onSquareClick={onSquareClick} />
        </div>
      </div>
    </div>
  );
}

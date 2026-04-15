import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center rounded-3xl border p-3 text-center text-[0.8rem] leading-6 transition duration-200 ease-out select-none min-h-[70px]';

  const defaultClasses =
    'bg-[rgba(15,23,42,0.72)] border-[rgba(148,163,184,0.10)] text-slate-200 hover:border-[rgba(56,189,248,0.35)] hover:bg-[rgba(71,85,105,0.72)]';

  const markedClasses =
    'bg-[rgba(59,130,246,0.18)] border-[rgba(56,189,248,0.38)] text-cyan-100 shadow-[0_0_24px_-10px_rgba(56,189,248,0.60)]';

  const winningClasses =
    'bg-[rgba(236,72,153,0.16)] border-[rgba(236,72,153,0.45)] text-fuchsia-100 shadow-[0_0_28px_-12px_rgba(236,72,153,0.7)]';

  const stateClasses = square.isMarked ? (isWinning ? winningClasses : markedClasses) : defaultClasses;
  const freeSpaceClasses = square.isFreeSpace ? 'font-semibold text-sky-200' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses} ${square.isFreeSpace ? 'cursor-default opacity-90' : 'hover:-translate-y-0.5 active:scale-[0.99]'}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="break-words hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-2 right-2 rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-100">
          ✓
        </span>
      )}
    </button>
  );
}

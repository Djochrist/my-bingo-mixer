interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="glass-panel max-w-md w-full rounded-[2rem] border-[rgba(148,163,184,0.14)] p-8 text-center shadow-[0_35px_80px_-35px_rgba(15,23,42,0.75)] animate-pulse">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-sky-500 to-cyan-400 text-6xl shadow-[0_0_40px_rgba(56,189,248,0.50)]">
          🎉
        </div>
        <h2 className="text-5xl font-bold tracking-[-0.03em] text-white mb-4 animate-bounce">BINGO!</h2>
        <p className="mx-auto mb-8 max-w-sm text-base leading-7 text-slate-200">
          🎊 You completed a line! Keep playing or reset the board for another round. 🎊
        </p>

        <button
          onClick={onDismiss}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 px-6 py-4 text-base font-bold text-white shadow-[0_18px_60px_-24px_rgba(59,130,246,0.9)] transition hover:-translate-y-1 active:translate-y-0.5"
        >
          Keep Playing 🚀
        </button>
      </div>
    </div>
  );
}

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-full px-4 py-10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.20),transparent_22%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.14),transparent_14%),linear-gradient(180deg,#06070f_0%,#090b14_100%)]">
      <div className="mx-auto max-w-3xl">
        <div className="glass-panel rounded-[2rem] border-[rgba(148,163,184,0.14)] p-8 sm:p-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80 mb-4">
              Social bingo
            </p>
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-[-0.04em] text-white">
              Bingo Mixer
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-7 text-slate-300">
              Find people who match the questions, mark the board, and claim a neon bingo
              line with your group.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75 mb-2">
                How to play
              </p>
              <ul className="space-y-3 text-sm leading-6 text-slate-300">
                <li>• Tap a square when it matches someone you know.</li>
                <li>• Build a row, column, or diagonal to win.</li>
                <li>• Use the free space as your early advantage.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75 mb-2">
                Quick tips
              </p>
              <ul className="space-y-3 text-sm leading-6 text-slate-300">
                <li>• Stay fast and keep the energy high.</li>
                <li>• Tap again to unmark if priorities change.</li>
                <li>• Celebrate each bingo with the group.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 via-sky-500 to-cyan-400 px-8 py-4 text-base font-semibold text-white shadow-[0_18px_60px_-24px_rgba(59,130,246,0.9)] transition hover:-translate-y-0.5 active:translate-y-0.5"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

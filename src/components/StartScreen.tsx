import { useState } from 'react';
import type { GameMode } from '../types';

interface StartScreenProps {
  onStartBingo: (playerName: string) => void;
  onStartCardDeck: (playerName: string) => void;
}

export function StartScreen({ onStartBingo, onStartCardDeck }: StartScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [selectedMode, setSelectedMode] = useState<GameMode>('bingo');

  const handleStart = () => {
    const name = playerName.trim() || 'Player';
    if (selectedMode === 'bingo') {
      onStartBingo(name);
    } else {
      onStartCardDeck(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };
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
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75 mb-3">
                How to play
              </p>
              <ul className="space-y-3 text-sm sm:text-base leading-6 text-slate-300">
                <li>• Tap a square when it matches someone you know.</li>
                <li>• Build a row, column, or diagonal to win.</li>
                <li>• Use the free space as your early advantage.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75 mb-3">
                Quick tips
              </p>
              <ul className="space-y-3 text-sm sm:text-base leading-6 text-slate-300">
                <li>• Stay fast and keep the energy high.</li>
                <li>• Tap again to unmark if priorities change.</li>
                <li>• Celebrate each bingo with the group.</li>
              </ul>
            </div>
          </div>

          {/* Game Mode Selection */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75 mb-4 block text-center">
              Choose Game Mode
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setSelectedMode('bingo')}
                className={`rounded-3xl border p-5 transition-all ${
                  selectedMode === 'bingo'
                    ? 'border-sky-400/50 bg-sky-500/10 text-sky-300'
                    : 'border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] text-slate-300 hover:bg-[rgba(30,41,59,0.82)]'
                }`}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Bingo Board</h3>
                  <p className="text-sm opacity-80">Classic bingo with a 5x5 board</p>
                </div>
              </button>

              <button
                onClick={() => setSelectedMode('card-deck')}
                className={`rounded-3xl border p-5 transition-all ${
                  selectedMode === 'card-deck'
                    ? 'border-violet-400/50 bg-violet-500/10 text-violet-300'
                    : 'border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] text-slate-300 hover:bg-[rgba(30,41,59,0.82)]'
                }`}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">Card Deck</h3>
                  <p className="text-sm opacity-80">Draw random question cards</p>
                </div>
              </button>
            </div>
          </div>

          <div className="mb-8 rounded-[1.75rem] border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.84)] p-5">
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300/75 mb-3 block">
              Your name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name..."
              className="w-full rounded-2xl border border-[rgba(148,163,184,0.14)] bg-[rgba(8,15,30,0.82)] px-4 py-3 text-base text-white placeholder-slate-400 transition focus:border-[rgba(56,189,248,0.38)] focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              maxLength={30}
            />
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleStart}
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

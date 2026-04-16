import { useState, useEffect } from 'react';
import {
  Grid3X3, Layers, Zap, ChevronRight, User, Check,
  Cpu, Users, Briefcase, Tv2,
} from 'lucide-react';
import type { GameMode } from '../types';
import { themes, getThemeById } from '../data/themes';
import { useColorMode } from '../context/ThemeContext';
import { ColorModeToggle } from './ColorModeToggle';
import { playTick } from '../utils/sounds';

interface StartScreenProps {
  onStartBingo: (playerName: string, themeId: string) => void;
  onStartCardDeck: (playerName: string, themeId: string) => void;
}

const THEME_ICONS: Record<string, React.ReactNode> = {
  tech:       <Cpu className="w-4 h-4" strokeWidth={1.75} />,
  social:     <Users className="w-4 h-4" strokeWidth={1.75} />,
  corporate:  <Briefcase className="w-4 h-4" strokeWidth={1.75} />,
  popculture: <Tv2 className="w-4 h-4" strokeWidth={1.75} />,
};

export function StartScreen({ onStartBingo, onStartCardDeck }: StartScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [selectedMode, setSelectedMode] = useState<GameMode>('bingo');
  const [selectedTheme, setSelectedTheme] = useState(themes[0].id);
  const { colorMode } = useColorMode();

  // Live-preview theme accent as user selects themes
  useEffect(() => {
    const theme = getThemeById(selectedTheme);
    const c = theme.css;
    const root = document.documentElement;
    root.style.setProperty('--head-a',     c.headA);
    root.style.setProperty('--head-b',     c.headB);
    root.style.setProperty('--head-c',     c.headC);
    root.style.setProperty('--head-la',    c.headLA);
    root.style.setProperty('--head-lb',    c.headLB);
    root.style.setProperty('--head-lc',    c.headLC);
    root.style.setProperty('--accent-a',   c.accentA);
    root.style.setProperty('--accent-mid', c.accentMid);
    root.style.setProperty('--accent-b',   c.accentB);
    root.style.setProperty('--accent-rgb', c.accentRGB);
    root.style.setProperty('--card-from',  c.cardFrom);
    root.style.setProperty('--card-to',    c.cardTo);
    root.style.setProperty('--mark-bg',    c.markBg);
    root.style.setProperty('--mark-border',c.markBorder);
  }, [selectedTheme]);

  const handleStart = () => {
    playTick();
    const name = playerName.trim() || 'Player';
    if (selectedMode === 'bingo') onStartBingo(name, selectedTheme);
    else onStartCardDeck(name, selectedTheme);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-xl space-y-5 animate-slide-up">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span className="text-label">Social Bingo</span>
          </div>
          <ColorModeToggle />
        </div>

        {/* Hero */}
        <div className="glass rounded-3xl p-8 sm:p-10 text-center glow-border">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1">
            <Zap className="w-3 h-3 text-violet-400" strokeWidth={2.5} />
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase">Mixer Edition</span>
          </div>
          <h1 className="mt-3 text-5xl sm:text-6xl font-black tracking-tight leading-none heading-gradient pb-1">
            Bingo<br />Mixer
          </h1>
          <p className="mt-4 text-sm sm:text-[0.9375rem] leading-relaxed text-body max-w-sm mx-auto">
            Find people who match the cards, mark the board,<br className="hidden sm:block" /> and call BINGO with the room.
          </p>
        </div>

        {/* Theme picker */}
        <div className="glass rounded-3xl p-5">
          <p className="text-label mb-4">Choose a theme</p>
          <div className="grid grid-cols-2 gap-2.5 stagger">
            {themes.map((theme) => {
              const active = selectedTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => { playTick(); setSelectedTheme(theme.id); }}
                  className={`relative rounded-2xl p-3.5 text-left transition-all duration-200 border animate-slide-up ${
                    active
                      ? 'border-violet-500/50 bg-violet-500/12 shadow-[0_0_24px_-8px_rgba(139,92,246,0.45)]'
                      : colorMode === 'dark'
                        ? 'border-white/6 bg-white/3 hover:bg-white/7'
                        : 'border-violet-100 bg-violet-50/60 hover:bg-violet-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      active
                        ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/30'
                        : colorMode === 'dark' ? 'bg-white/8 text-violet-300' : 'bg-violet-100 text-violet-600'
                    }`}>
                      {THEME_ICONS[theme.id]}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate transition-colors ${
                        active
                          ? colorMode === 'dark' ? 'text-violet-200' : 'text-violet-800'
                          : colorMode === 'dark' ? 'text-slate-200' : 'text-slate-700'
                      }`}>
                        {theme.name}
                      </p>
                      <p className="text-muted text-xs truncate mt-0.5">{theme.description}</p>
                    </div>
                  </div>
                  {active && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-violet-500 flex items-center justify-center animate-scale-in">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode + Name */}
        <div className="glass rounded-3xl p-5 space-y-5">
          {/* Game mode */}
          <div>
            <p className="text-label mb-3">Game mode</p>
            <div className="grid grid-cols-2 gap-2.5">
              {([
                { id: 'bingo' as GameMode,     label: 'Bingo Board', sub: '5×5 grid',   Icon: Grid3X3 },
                { id: 'card-deck' as GameMode, label: 'Card Deck',   sub: 'Draw cards', Icon: Layers  },
              ] as const).map(({ id, label, sub, Icon }) => {
                const active = selectedMode === id;
                return (
                  <button
                    key={id}
                    onClick={() => { playTick(); setSelectedMode(id); }}
                    className={`rounded-2xl p-4 text-center transition-all duration-200 border-2 ${
                      active
                        ? 'border-violet-500/60 bg-violet-500/12 shadow-[0_0_20px_-8px_rgba(139,92,246,0.5)]'
                        : colorMode === 'dark'
                          ? 'border-white/6 bg-white/3 hover:bg-white/7'
                          : 'border-violet-100 bg-violet-50 hover:bg-violet-100'
                    }`}
                  >
                    <div className={`mx-auto mb-2 w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      active
                        ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-md shadow-violet-500/30'
                        : colorMode === 'dark' ? 'bg-white/8 text-violet-400' : 'bg-violet-100 text-violet-600'
                    }`}>
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <p className={`text-sm font-bold transition-colors ${active ? (colorMode === 'dark' ? 'text-violet-200' : 'text-violet-800') : (colorMode === 'dark' ? 'text-slate-200' : 'text-slate-700')}`}>
                      {label}
                    </p>
                    <p className="text-muted text-xs mt-0.5">{sub}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="divider" />

          {/* Name input */}
          <div>
            <label className="text-label block mb-3">
              <User className="w-3 h-3 inline mr-1.5 -mt-0.5" strokeWidth={2.5} />
              Your name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name…"
              maxLength={30}
              className="input-field"
            />
          </div>
        </div>

        {/* How to play */}
        <div className="surface rounded-3xl p-5">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-label mb-2.5">How to play</p>
              <ul className="space-y-1.5 text-body leading-5">
                <li className="flex gap-2"><span className="text-violet-400 font-bold mt-0.5">→</span> Tap a square when it matches someone</li>
                <li className="flex gap-2"><span className="text-violet-400 font-bold mt-0.5">→</span> Row, column or diagonal = BINGO</li>
                <li className="flex gap-2"><span className="text-violet-400 font-bold mt-0.5">→</span> Free space is already yours</li>
              </ul>
            </div>
            <div>
              <p className="text-label mb-2.5">Quick tips</p>
              <ul className="space-y-1.5 text-body leading-5">
                <li className="flex gap-2"><span className="text-indigo-400 font-bold mt-0.5">→</span> Keep the energy high</li>
                <li className="flex gap-2"><span className="text-indigo-400 font-bold mt-0.5">→</span> Tap again to unmark</li>
                <li className="flex gap-2"><span className="text-indigo-400 font-bold mt-0.5">→</span> Celebrate each bingo</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center pb-4">
          <button onClick={handleStart} className="btn-primary text-base px-10 py-4">
            Launch Game
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </div>
  );
}

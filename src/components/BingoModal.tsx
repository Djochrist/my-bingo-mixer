import { Trophy, BarChart2, X } from 'lucide-react';
import { useColorMode } from '../context/ThemeContext';
import { ShareButton } from './ShareButton';
import { Confetti } from './Confetti';

interface BingoModalProps {
  playerName?: string;
  themeId?: string;
  markedCount?: number;
  onDismiss: () => void;
}

export function BingoModal({ playerName = 'Player', themeId = 'tech', markedCount = 0, onDismiss }: BingoModalProps) {
  const { colorMode } = useColorMode();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-8 sm:pb-0">
      <Confetti active={true} />
      <div className="absolute inset-0 bg-black/60 animate-backdrop-in backdrop-blur-enter" onClick={onDismiss} />

      <div className="relative w-full max-w-sm z-10 animate-modal-in">
        <div className="glass rounded-3xl p-8 text-center glow-border relative overflow-hidden">

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/8 to-cyan-500/5 rounded-3xl" />
          </div>

          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 btn-ghost px-2 py-2 z-10"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>

          <div className="animate-trophy-bounce mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_50px_-10px_rgba(139,92,246,0.85)]">
            <Trophy className="w-9 h-9 text-white" strokeWidth={1.75} />
          </div>

          <div className="animate-modal-text-1">
            <h2 className="text-4xl font-black tracking-tight heading-gradient mb-1">BINGO!</h2>
            <p className="text-body text-sm mb-6">
              {playerName} completed a line — well played!
            </p>
          </div>

          <div className="animate-modal-text-2 surface rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <BarChart2 className={`w-3.5 h-3.5 ${colorMode === 'dark' ? 'text-violet-400' : 'text-violet-600'}`} strokeWidth={2} />
              <span className="text-label">Your score</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-3xl font-black heading-gradient">{markedCount}</p>
                <p className="text-label mt-0.5">Squares marked</p>
              </div>
              <div>
                <p className="text-3xl font-black heading-gradient">1</p>
                <p className="text-label mt-0.5">Bingo line</p>
              </div>
            </div>
          </div>

          <div className="animate-modal-text-3 flex items-center justify-center gap-2 mb-5">
            <span className="text-body text-xs">Share with the group</span>
            <ShareButton playerName={playerName} themeId={themeId} markedCount={markedCount} />
          </div>

          <div className="animate-modal-text-3">
            <button onClick={onDismiss} className="btn-primary w-full justify-center">
              Keep Playing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

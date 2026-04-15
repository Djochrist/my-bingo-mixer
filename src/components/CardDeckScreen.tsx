import { useEffect, useState, useRef } from 'react';
import { questions } from '../data/questions';
import type { GameMode } from '../types';

interface CardDeckScreenProps {
  currentCard: string | null;
  drawnCards: string[];
  remainingCards: string[];
  playerName: string;
  successCount: number;
  skipCount: number;
  lastAction: 'success' | 'skip' | null;
  onDrawCard: () => void;
  onMarkSuccess: () => void;
  onMarkSkip: () => void;
  onReset: () => void;
  onSwitchMode: (mode: GameMode) => void;
}

export function CardDeckScreen({
  currentCard,
  drawnCards,
  remainingCards,
  playerName,
  successCount,
  skipCount,
  lastAction,
  onDrawCard,
  onMarkSuccess,
  onMarkSkip,
  onReset,
  onSwitchMode,
}: CardDeckScreenProps) {
  // Auto-draw first card when entering card deck mode
  useEffect(() => {
    if (!currentCard && remainingCards.length > 0) {
      onDrawCard();
    }
  }, [currentCard, remainingCards.length, onDrawCard]);

  // Swipe gesture handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    if (touchStart && Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
      setIsSwiping(true);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !isSwiping) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onMarkSkip();
    } else if (isRightSwipe) {
      onMarkSuccess();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
  };

  return (
    <div className="min-h-full px-4 py-10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.20),transparent_22%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.14),transparent_14%),linear-gradient(180deg,#06070f_0%,#090b14_100%)]">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onSwitchMode('bingo')}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(148,163,184,0.14)] bg-[rgba(15,23,42,0.82)] px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-[rgba(30,41,59,0.82)] hover:text-white"
            >
              ← Bingo Mode
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(148,163,184,0.14)] bg-[rgba(15,23,42,0.82)] px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-[rgba(30,41,59,0.82)] hover:text-white"
            >
              Reset
            </button>
          </div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80 mb-2">
            Card Deck Shuffle
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white mb-2">
            {playerName ? `${playerName}'s` : 'Your'} Question Cards
          </h1>
          <p className="text-slate-300">
            {remainingCards.length} cards remaining • {drawnCards.length} drawn
          </p>
        </div>

        {/* Current Card */}
        <div className="mb-8">
          <div
            ref={cardRef}
            className={`mx-auto max-w-2xl cursor-pointer select-none ${
              lastAction === 'success' ? 'animate-pulse bg-green-500/20' :
              lastAction === 'skip' ? 'animate-pulse bg-red-500/20' : ''
            }`}
            onClick={onDrawCard}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className={`glass-panel rounded-[2rem] border-[rgba(148,163,184,0.14)] p-8 sm:p-12 transition-all duration-300 hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)] ${
              isSwiping ? 'scale-95' : ''
            }`}>
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-300/75 mb-4">
                    Current Card
                  </p>
                </div>

                {currentCard ? (
                  <div className="space-y-4">
                    <p className="text-2xl sm:text-3xl font-semibold text-white leading-relaxed">
                      {currentCard}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Swipe right for ✓ success • Swipe left for ✗ skip
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-2xl sm:text-3xl font-semibold text-white leading-relaxed">
                      Ready to start?
                    </p>
                    <p className="text-slate-400 text-sm">
                      Tap to draw your first card
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Deck Stats */}
        <div className="grid gap-4 sm:grid-cols-5 max-w-4xl mx-auto">
          <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5 text-center">
            <div className="text-2xl font-bold text-sky-400 mb-1">
              {remainingCards.length}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75">
              Cards Left
            </p>
          </div>

          <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5 text-center">
            <div className="text-2xl font-bold text-violet-400 mb-1">
              {drawnCards.length}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75">
              Cards Drawn
            </p>
          </div>

          <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {successCount}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75">
              ✓ Success
            </p>
          </div>

          <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5 text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {skipCount}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75">
              ✗ Skip
            </p>
          </div>

          <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-5 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {questions.length}
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75">
              Total Cards
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="rounded-3xl border border-[rgba(148,163,184,0.10)] bg-[rgba(15,23,42,0.82)] p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75 mb-3">
              How to play
            </p>
            <ul className="space-y-2 text-sm leading-6 text-slate-300">
              <li>• Tap the card area to draw a new random question</li>
              <li>• Swipe right ✓ to mark as success (found a match)</li>
              <li>• Swipe left ✗ to skip/fail (no matches found)</li>
              <li>• Ask the question to your group and find matches</li>
              <li>• Keep drawing cards to keep the conversation going</li>
              <li>• Deck automatically reshuffles when empty</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
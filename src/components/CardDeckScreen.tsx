import { useEffect, useState, useRef, useCallback } from 'react';
import {
  ArrowLeft, RotateCcw, CheckCircle, XCircle,
  ChevronRight, ChevronLeft, Grid3X3, Layers,
} from 'lucide-react';
import type { GameMode } from '../types';
import { getThemeById } from '../data/themes';
import { useColorMode } from '../context/ThemeContext';
import { ColorModeToggle } from './ColorModeToggle';
import { ShareButton } from './ShareButton';
import { playCardFlip, playSuccess, playUnmark } from '../utils/sounds';

interface CardDeckScreenProps {
  currentCard: string | null;
  drawnCards: string[];
  remainingCards: string[];
  playerName: string;
  themeId?: string;
  successCount: number;
  skipCount: number;
  lastAction: 'success' | 'skip' | null;
  onDrawCard: () => void;
  onMarkSuccess: () => void;
  onMarkSkip: () => void;
  onReset: () => void;
  onSwitchMode: (mode: GameMode) => void;
}

/** Five dot progress indicators */
function ProgressDots({ current, total }: { current: number; total: number }) {
  const dots = 5;
  const filled = Math.round((current / Math.max(total, 1)) * dots);
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: dots }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-500"
          style={{
            width: i < filled ? '16px' : '6px',
            height: '6px',
            background: i < filled
              ? 'linear-gradient(90deg, var(--card-from), var(--card-to))'
              : 'rgba(128,128,128,0.25)',
          }}
        />
      ))}
    </div>
  );
}

export function CardDeckScreen({
  currentCard, drawnCards, remainingCards, playerName,
  themeId = 'tech', successCount, skipCount, lastAction,
  onDrawCard, onMarkSuccess, onMarkSkip, onReset, onSwitchMode,
}: CardDeckScreenProps) {
  const { colorMode } = useColorMode();
  const theme = getThemeById(themeId);
  const isDark = colorMode === 'dark';

  useEffect(() => {
    if (!currentCard && remainingCards.length > 0) onDrawCard();
  }, [currentCard, remainingCards.length, onDrawCard]);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayCard, setDisplayCard] = useState<string | null>(currentCard);
  const [questionKey, setQuestionKey] = useState(0);
  const pendingDrawRef = useRef(false);

  useEffect(() => {
    if (!isFlipping) {
      setDisplayCard(currentCard);
      setQuestionKey(k => k + 1);
    }
  }, [currentCard, isFlipping]);

  const triggerFlip = useCallback((action: () => void) => {
    if (isFlipping) return;
    setIsFlipping(true);
    playCardFlip();
    setTimeout(() => {
      action();
      setTimeout(() => setIsFlipping(false), 200);
    }, 180);
  }, [isFlipping]);

  const handleDraw = () => {
    if (isFlipping || pendingDrawRef.current) return;
    pendingDrawRef.current = true;
    triggerFlip(() => { onDrawCard(); pendingDrawRef.current = false; });
  };

  const handleSuccess = () => { playSuccess(); triggerFlip(onMarkSuccess); };
  const handleSkip = () => { playUnmark(); triggerFlip(onMarkSkip); };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
    setDragOffset(0); setIsSwiping(false); setSwipeDir(null);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const dx = e.targetTouches[0].clientX - touchStart.x;
    const dy = e.targetTouches[0].clientY - touchStart.y;
    if (!isSwiping && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) setIsSwiping(true);
    if (isSwiping) { setDragOffset(dx); setSwipeDir(dx > 0 ? 'right' : 'left'); }
  };
  const onTouchEnd = () => {
    if (!isSwiping || !touchStart) {
      setDragOffset(0); setIsSwiping(false); setSwipeDir(null); setTouchStart(null); return;
    }
    if (dragOffset < -60) {
      setDragOffset(-320);
      setTimeout(() => { handleSkip(); setDragOffset(0); setIsSwiping(false); setSwipeDir(null); }, 200);
    } else if (dragOffset > 60) {
      setDragOffset(320);
      setTimeout(() => { handleSuccess(); setDragOffset(0); setIsSwiping(false); setSwipeDir(null); }, 200);
    } else {
      setDragOffset(0); setIsSwiping(false); setSwipeDir(null);
    }
    setTouchStart(null);
  };

  const total = drawnCards.length + remainingCards.length || 1;
  const cardNum = drawnCards.length;
  const tilt = Math.max(-18, Math.min(18, dragOffset * 0.08));

  const cardTransform = isSwiping
    ? `translateX(${dragOffset}px) rotate(${tilt}deg)`
    : undefined;

  const swipeOpacity = isSwiping ? Math.max(0.25, 1 - Math.abs(dragOffset) / 340) : 1;

  return (
    <div className="min-h-screen px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-sm space-y-4 animate-slide-up">

        {/* ── Header bar ──────────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-2">
          <button onClick={() => onSwitchMode('bingo')} className="btn-ghost px-3 py-2 gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span className="text-sm font-semibold">Back</span>
          </button>
          <div className="flex items-center gap-1.5">
            <ColorModeToggle />
            <button onClick={onReset} className="btn-ghost px-2.5 py-2" title="Reset">
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* ── Stats strip ─────────────────────────────────────────────── */}
        <div
          className="flex items-center divide-x rounded-2xl overflow-hidden"
          style={{
            background: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff',
            border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: isDark ? 'none' : '0 1px 8px rgba(0,0,0,0.06)',
            divideColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
          }}
        >
          {([
            { label: 'Left',    value: remainingCards.length },
            { label: 'Found',   value: successCount,  accent: '#22c55e' },
            { label: 'Skipped', value: skipCount,      accent: '#f43f5e' },
            { label: 'Player',  value: playerName,     isText: true },
          ] as const).map(({ label, value, accent, isText }) => (
            <div
              key={label}
              className="flex-1 py-2.5 px-1 text-center"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }}
            >
              <p
                className={isText ? 'text-xs font-bold truncate px-1' : 'text-xl font-black tabular-nums'}
                style={{ color: accent ?? (isDark ? '#e2e0ff' : '#1e1b4b') }}
              >
                {value}
              </p>
              <p className="text-[10px] font-semibold mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.30)' : 'rgba(0,0,0,0.35)' }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* ── MAIN CARD ─────────────────────────────────────────────────
            Structure inspired by physical card / ticket design:
            • Gradient header (40% of card) — theme identity lives here
            • White body — question text, large + centred
            • Perforated divider — visual separation
            • Footer — progress, counter, swipe hint
        ────────────────────────────────────────────────────────────── */}
        <div style={{ perspective: '1200px' }}>
          <div
            onClick={!isSwiping ? handleDraw : undefined}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={`relative select-none cursor-pointer rounded-3xl overflow-hidden ${
              isFlipping ? 'animate-card-flip' : ''
            } ${!isSwiping ? 'transition-transform duration-200 hover:scale-[1.013] hover:-translate-y-1.5' : ''}`}
            style={{
              transform: cardTransform,
              opacity: swipeOpacity,
              boxShadow: isDark
                ? '0 4px 6px rgba(0,0,0,0.4), 0 20px 60px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)'
                : '0 4px 6px rgba(0,0,0,0.06), 0 20px 60px -12px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
            }}
          >
            {/* ── Swipe overlays ── */}
            {swipeDir === 'right' && dragOffset > 25 && (
              <div className="absolute inset-0 z-40 flex items-center justify-start pl-8 pointer-events-none"
                style={{ background: 'rgba(16,185,129,0.08)' }}>
                <div
                  className="rounded-xl border-[3px] font-black text-xl px-5 py-2 rotate-[-14deg]"
                  style={{ borderColor: '#22c55e', color: '#22c55e' }}
                >
                  FOUND ✓
                </div>
              </div>
            )}
            {swipeDir === 'left' && dragOffset < -25 && (
              <div className="absolute inset-0 z-40 flex items-center justify-end pr-8 pointer-events-none"
                style={{ background: 'rgba(244,63,94,0.08)' }}>
                <div
                  className="rounded-xl border-[3px] font-black text-xl px-5 py-2 rotate-[14deg]"
                  style={{ borderColor: '#f43f5e', color: '#f43f5e' }}
                >
                  SKIP ✕
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                HEADER — gradient theme area (≈38% of card)
            ════════════════════════════════════════════════════ */}
            <div
              className="relative flex flex-col items-center justify-center pt-9 pb-8 px-6 gap-3"
              style={{
                background: `linear-gradient(145deg, var(--card-from) 0%, var(--card-to) 100%)`,
              }}
            >
              {/* Subtle inner texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 50%)',
                }}
              />
              {/* Holographic sweep in header */}
              <div className="holo-sweep" />

              {/* Large emoji */}
              <div
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.28)',
                }}
              >
                {theme.emoji}
              </div>

              {/* Theme name chip */}
              <div
                className="relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
                style={{
                  background: 'rgba(255,255,255,0.20)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.30)',
                }}
              >
                <Layers className="w-3 h-3 text-white" strokeWidth={2.5} />
                <span className="text-white text-xs font-black tracking-widest uppercase">{theme.name}</span>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════
                PERFORATED DIVIDER
            ════════════════════════════════════════════════════ */}
            <div
              className="relative flex items-center"
              style={{ background: isDark ? '#111120' : '#ffffff' }}
            >
              {/* Left half-circle notch */}
              <div
                className="absolute -left-3 w-6 h-6 rounded-full z-10"
                style={{ background: isDark ? '#04050d' : '#f1f0f9' }}
              />
              {/* Right half-circle notch */}
              <div
                className="absolute -right-3 w-6 h-6 rounded-full z-10"
                style={{ background: isDark ? '#04050d' : '#f1f0f9' }}
              />
              {/* Dashed line */}
              <div
                className="w-full mx-4"
                style={{
                  height: '1px',
                  backgroundImage: `repeating-linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} 0px, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'} 6px, transparent 6px, transparent 12px)`,
                }}
              />
            </div>

            {/* ════════════════════════════════════════════════════
                BODY — the question
            ════════════════════════════════════════════════════ */}
            <div
              className="px-7 pt-7 pb-5"
              style={{ background: isDark ? '#111120' : '#ffffff' }}
            >
              <p
                className="text-center text-[11px] font-black tracking-[0.18em] uppercase mb-4"
                style={{ color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.30)' }}
              >
                Find someone who…
              </p>

              {displayCard ? (
                <div key={questionKey} className="min-h-[110px] flex items-center justify-center">
                  <p
                    className="animate-question-in text-center font-black leading-snug tracking-tight"
                    style={{
                      color: isDark ? '#f0eeff' : '#111827',
                      fontSize: displayCard.length > 50 ? '1.5rem' : displayCard.length > 30 ? '1.75rem' : '2.125rem',
                    }}
                  >
                    {displayCard}
                  </p>
                </div>
              ) : (
                <div className="min-h-[110px] flex flex-col items-center justify-center gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl animate-float"
                    style={{
                      background: `linear-gradient(135deg, var(--card-from), var(--card-to))`,
                      boxShadow: `0 8px 24px -6px rgba(var(--accent-rgb),0.50)`,
                    }}
                  >
                    🎲
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-base" style={{ color: isDark ? '#e2e0ff' : '#1e1b4b' }}>Ready to play?</p>
                    <p className="text-xs mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.35)' }}>Tap the card to draw your first question</p>
                  </div>
                </div>
              )}
            </div>

            {/* ════════════════════════════════════════════════════
                FOOTER — progress + counter + swipe hint
            ════════════════════════════════════════════════════ */}
            <div
              className="px-6 pt-3 pb-5"
              style={{
                background: isDark ? '#111120' : '#ffffff',
                borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <ProgressDots current={cardNum} total={total} />
                <span
                  className="font-mono text-xs font-bold tabular-nums"
                  style={{ color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.28)' }}
                >
                  {String(cardNum).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
              <div
                className="flex items-center justify-between text-[10px] font-semibold"
                style={{ color: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.22)' }}
              >
                <span className="flex items-center gap-0.5">
                  <ChevronLeft className="w-2.5 h-2.5" strokeWidth={3} />
                  Skip
                </span>
                <span className="tracking-widest">TAP TO DRAW</span>
                <span className="flex items-center gap-0.5">
                  Found
                  <ChevronRight className="w-2.5 h-2.5" strokeWidth={3} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Action buttons ───────────────────────────────────────────── */}
        {currentCard && (
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleSkip}
              className="flex flex-col items-center gap-1 rounded-2xl py-4 font-bold text-sm transition-all duration-200 active:scale-95"
              style={{
                background: isDark ? 'rgba(244,63,94,0.08)' : '#fff1f2',
                border: isDark ? '1.5px solid rgba(244,63,94,0.25)' : '1.5px solid rgba(244,63,94,0.20)',
                color: isDark ? '#fb7185' : '#be123c',
                boxShadow: 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px -6px rgba(244,63,94,0.40)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(244,63,94,0.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = isDark ? 'rgba(244,63,94,0.25)' : 'rgba(244,63,94,0.20)';
              }}
            >
              <XCircle className="w-6 h-6" strokeWidth={2} />
              <span>Skip</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.45, fontWeight: 500 }}>← swipe left</span>
            </button>

            <button
              onClick={handleSuccess}
              className="flex flex-col items-center gap-1 rounded-2xl py-4 font-bold text-sm text-white transition-all duration-200 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                border: '1.5px solid rgba(34,197,94,0.50)',
                boxShadow: '0 4px 20px -6px rgba(34,197,94,0.45)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px -4px rgba(34,197,94,0.65)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px -6px rgba(34,197,94,0.45)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <CheckCircle className="w-6 h-6" strokeWidth={2} />
              <span>Found it!</span>
              <span style={{ fontSize: '0.65rem', opacity: 0.65, fontWeight: 500 }}>swipe right →</span>
            </button>
          </div>
        )}

        {/* ── Footer links ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => onSwitchMode('bingo')}
            className="btn-ghost text-xs px-3 py-1.5 gap-1.5"
          >
            <Grid3X3 className="w-3 h-3" strokeWidth={2} />
            Switch to Bingo Board
          </button>
          {successCount >= 3 && (
            <ShareButton playerName={playerName} themeId={themeId} markedCount={successCount} />
          )}
        </div>

      </div>
    </div>
  );
}

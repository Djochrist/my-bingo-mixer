import { useState, useCallback } from 'react';
import { getThemeById } from '../data/themes';
import type { GameMode } from '../types';

export interface CardDeckGameState {
  gameMode: GameMode;
  currentCard: string | null;
  drawnCards: string[];
  remainingCards: string[];
  playerName: string;
  themeId: string;
  successCount: number;
  skipCount: number;
  lastAction: 'success' | 'skip' | null;
}

export interface CardDeckGameActions {
  startCardDeck: (playerName: string, themeId?: string) => void;
  drawCard: () => void;
  markSuccess: () => void;
  markSkip: () => void;
  resetGame: () => void;
  switchMode: (mode: GameMode) => void;
}

function shuffleTheme(themeId: string): string[] {
  return [...getThemeById(themeId).questions].sort(() => Math.random() - 0.5);
}

export function useCardDeckGame(): CardDeckGameState & CardDeckGameActions {
  const [gameMode, setGameMode] = useState<GameMode>('bingo');
  const [currentCard, setCurrentCard] = useState<string | null>(null);
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [remainingCards, setRemainingCards] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [themeId, setThemeId] = useState<string>('tech');
  const [successCount, setSuccessCount] = useState<number>(0);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<'success' | 'skip' | null>(null);

  const startCardDeck = useCallback((name: string, tid = 'tech') => {
    setPlayerName(name);
    setThemeId(tid);
    setGameMode('card-deck');
    setRemainingCards(shuffleTheme(tid));
    setDrawnCards([]);
    setCurrentCard(null);
    setSuccessCount(0);
    setSkipCount(0);
    setLastAction(null);
  }, []);

  const drawCard = useCallback(() => {
    setRemainingCards((prev) => {
      const deck = prev.length === 0 ? shuffleTheme(themeId) : prev;
      const [nextCard, ...rest] = deck;
      setCurrentCard(nextCard);
      setDrawnCards((d) => [...d, nextCard]);
      return rest;
    });
  }, [themeId]);

  const markSuccess = useCallback(() => {
    if (currentCard) {
      setSuccessCount((c) => c + 1);
      setLastAction('success');
      setTimeout(() => { drawCard(); setLastAction(null); }, 500);
    }
  }, [currentCard, drawCard]);

  const markSkip = useCallback(() => {
    if (currentCard) {
      setSkipCount((c) => c + 1);
      setLastAction('skip');
      setTimeout(() => { drawCard(); setLastAction(null); }, 500);
    }
  }, [currentCard, drawCard]);

  const resetGame = useCallback(() => {
    setGameMode('bingo');
    setCurrentCard(null);
    setDrawnCards([]);
    setRemainingCards([]);
    setPlayerName('');
    setThemeId('tech');
    setSuccessCount(0);
    setSkipCount(0);
    setLastAction(null);
  }, []);

  const switchMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    if (mode === 'card-deck') {
      setRemainingCards(shuffleTheme(themeId));
      setDrawnCards([]);
      setCurrentCard(null);
    }
  }, [themeId]);

  return {
    gameMode, currentCard, drawnCards, remainingCards,
    playerName, themeId, successCount, skipCount, lastAction,
    startCardDeck, drawCard, markSuccess, markSkip, resetGame, switchMode,
  };
}

import { useState, useCallback } from 'react';
import { questions } from '../data/questions';
import type { GameMode } from '../types';

export interface CardDeckGameState {
  gameMode: GameMode;
  currentCard: string | null;
  drawnCards: string[];
  remainingCards: string[];
  playerName: string;
  successCount: number;
  skipCount: number;
  lastAction: 'success' | 'skip' | null;
}

export interface CardDeckGameActions {
  startCardDeck: (playerName: string) => void;
  drawCard: () => void;
  markSuccess: () => void;
  markSkip: () => void;
  resetGame: () => void;
  switchMode: (mode: GameMode) => void;
}

export function useCardDeckGame(): CardDeckGameState & CardDeckGameActions {
  const [gameMode, setGameMode] = useState<GameMode>('bingo');
  const [currentCard, setCurrentCard] = useState<string | null>(null);
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [remainingCards, setRemainingCards] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [successCount, setSuccessCount] = useState<number>(0);
  const [skipCount, setSkipCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<'success' | 'skip' | null>(null);

  const startCardDeck = useCallback((name: string) => {
    setPlayerName(name);
    setGameMode('card-deck');
    // Shuffle the deck
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setRemainingCards(shuffled);
    setDrawnCards([]);
    setCurrentCard(null);
  }, []);

  const drawCard = useCallback(() => {
    if (remainingCards.length === 0) {
      // Reshuffle if deck is empty
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setRemainingCards(shuffled);
      setDrawnCards([]);
    }

    const [nextCard, ...rest] = remainingCards;
    setCurrentCard(nextCard);
    setDrawnCards(prev => [...prev, nextCard]);
    setRemainingCards(rest);
  }, [remainingCards]);

  const markSuccess = useCallback(() => {
    if (currentCard) {
      setSuccessCount(prev => prev + 1);
      setLastAction('success');
      // Auto-draw next card after a brief delay
      setTimeout(() => {
        drawCard();
        setLastAction(null);
      }, 500);
    }
  }, [currentCard, drawCard]);

  const markSkip = useCallback(() => {
    if (currentCard) {
      setSkipCount(prev => prev + 1);
      setLastAction('skip');
      // Auto-draw next card after a brief delay
      setTimeout(() => {
        drawCard();
        setLastAction(null);
      }, 500);
    }
  }, [currentCard, drawCard]);

  const resetGame = useCallback(() => {
    setGameMode('bingo');
    setCurrentCard(null);
    setDrawnCards([]);
    setRemainingCards([]);
    setPlayerName('');
    setSuccessCount(0);
    setSkipCount(0);
    setLastAction(null);
  }, []);

  const switchMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    if (mode === 'card-deck') {
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setRemainingCards(shuffled);
      setDrawnCards([]);
      setCurrentCard(null);
    }
  }, []);

  return {
    gameMode,
    currentCard,
    drawnCards,
    remainingCards,
    playerName,
    successCount,
    skipCount,
    lastAction,
    startCardDeck,
    drawCard,
    markSuccess,
    markSkip,
    resetGame,
    switchMode,
  };
}
import { useState, useCallback } from 'react';
import { useBingoGame } from './useBingoGame';
import { useCardDeckGame } from './useCardDeckGame';
import type { GameMode } from '../types';

export interface AppState {
  currentMode: GameMode | 'start';
}

export interface AppActions {
  startBingo: (playerName: string) => void;
  startCardDeck: (playerName: string) => void;
  resetToStart: () => void;
  switchMode: (mode: GameMode) => void;
}

export function useAppState() {
  const [currentMode, setCurrentMode] = useState<GameMode | 'start'>('start');

  const bingoGame = useBingoGame();
  const cardDeckGame = useCardDeckGame();

  const startBingo = useCallback((playerName: string) => {
    bingoGame.startGame(playerName);
    setCurrentMode('bingo');
  }, [bingoGame]);

  const startCardDeck = useCallback((playerName: string) => {
    cardDeckGame.startCardDeck(playerName);
    setCurrentMode('card-deck');
  }, [cardDeckGame]);

  const resetToStart = useCallback(() => {
    bingoGame.resetGame();
    cardDeckGame.resetGame();
    setCurrentMode('start');
  }, [bingoGame, cardDeckGame]);

  const switchMode = useCallback((mode: GameMode) => {
    if (mode === 'bingo') {
      setCurrentMode('bingo');
    } else {
      cardDeckGame.switchMode('card-deck');
      setCurrentMode('card-deck');
    }
  }, [cardDeckGame]);

  return {
    currentMode,
    startBingo,
    startCardDeck,
    resetToStart,
    switchMode,
    // Bingo game properties
    gameState: bingoGame.gameState,
    board: bingoGame.board,
    winningLine: bingoGame.winningLine,
    winningSquareIds: bingoGame.winningSquareIds,
    showBingoModal: bingoGame.showBingoModal,
    startGame: bingoGame.startGame,
    handleSquareClick: bingoGame.handleSquareClick,
    resetGame: bingoGame.resetGame,
    dismissModal: bingoGame.dismissModal,
    // Card deck properties
    currentCard: cardDeckGame.currentCard,
    drawnCards: cardDeckGame.drawnCards,
    remainingCards: cardDeckGame.remainingCards,
    successCount: cardDeckGame.successCount,
    skipCount: cardDeckGame.skipCount,
    lastAction: cardDeckGame.lastAction,
    drawCard: cardDeckGame.drawCard,
    markSuccess: cardDeckGame.markSuccess,
    markSkip: cardDeckGame.markSkip,
    // Shared properties (use bingo's playerName as primary)
    playerName: bingoGame.playerName || cardDeckGame.playerName,
  };
}
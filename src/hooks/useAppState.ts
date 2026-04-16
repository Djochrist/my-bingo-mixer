import { useState, useCallback } from 'react';
import { useBingoGame } from './useBingoGame';
import { useCardDeckGame } from './useCardDeckGame';
import { getThemeById } from '../data/themes';
import type { GameMode } from '../types';

export function useAppState() {
  const [currentMode, setCurrentMode] = useState<GameMode | 'start'>('start');
  const [themeId, setThemeId] = useState('tech');

  const bingoGame = useBingoGame();
  const cardDeckGame = useCardDeckGame();

  const startBingo = useCallback((playerName: string, tid = 'tech') => {
    const theme = getThemeById(tid);
    setThemeId(tid);
    bingoGame.startGame(playerName, theme.questions);
    setCurrentMode('bingo');
  }, [bingoGame]);

  const startCardDeck = useCallback((playerName: string, tid = 'tech') => {
    setThemeId(tid);
    cardDeckGame.startCardDeck(playerName, tid);
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

  const markedCount = bingoGame.board.filter((s) => s.isMarked && !s.isFreeSpace).length;

  return {
    currentMode,
    themeId,
    startBingo,
    startCardDeck,
    resetToStart,
    switchMode,
    // Bingo
    gameState: bingoGame.gameState,
    board: bingoGame.board,
    winningLine: bingoGame.winningLine,
    winningSquareIds: bingoGame.winningSquareIds,
    showBingoModal: bingoGame.showBingoModal,
    handleSquareClick: bingoGame.handleSquareClick,
    resetGame: bingoGame.resetGame,
    dismissModal: bingoGame.dismissModal,
    markedCount,
    // Card deck
    currentCard: cardDeckGame.currentCard,
    drawnCards: cardDeckGame.drawnCards,
    remainingCards: cardDeckGame.remainingCards,
    successCount: cardDeckGame.successCount,
    skipCount: cardDeckGame.skipCount,
    lastAction: cardDeckGame.lastAction,
    drawCard: cardDeckGame.drawCard,
    markSuccess: cardDeckGame.markSuccess,
    markSkip: cardDeckGame.markSkip,
    // Player name
    playerName: bingoGame.playerName || cardDeckGame.playerName,
  };
}

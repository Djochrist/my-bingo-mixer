import { useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import { BingoModal } from './components/BingoModal';
import { getThemeById } from './data/themes';

function App() {
  const appState = useAppState();

  // Apply theme CSS variables whenever the active theme changes
  useEffect(() => {
    const theme = getThemeById(appState.themeId);
    const c = theme.css;
    const root = document.documentElement;
    root.style.setProperty('--head-a',    c.headA);
    root.style.setProperty('--head-b',    c.headB);
    root.style.setProperty('--head-c',    c.headC);
    root.style.setProperty('--head-la',   c.headLA);
    root.style.setProperty('--head-lb',   c.headLB);
    root.style.setProperty('--head-lc',   c.headLC);
    root.style.setProperty('--accent-a',  c.accentA);
    root.style.setProperty('--accent-mid',c.accentMid);
    root.style.setProperty('--accent-b',  c.accentB);
    root.style.setProperty('--accent-rgb',c.accentRGB);
    root.style.setProperty('--card-from', c.cardFrom);
    root.style.setProperty('--card-to',   c.cardTo);
    root.style.setProperty('--mark-bg',   c.markBg);
    root.style.setProperty('--mark-border',c.markBorder);
  }, [appState.themeId]);

  if (appState.currentMode === 'start') {
    return (
      <div key="start" className="page-enter">
        <StartScreen
          onStartBingo={appState.startBingo}
          onStartCardDeck={appState.startCardDeck}
        />
      </div>
    );
  }

  if (appState.currentMode === 'card-deck') {
    return (
      <div key="card-deck" className="page-enter">
        <CardDeckScreen
          currentCard={appState.currentCard}
          drawnCards={appState.drawnCards}
          remainingCards={appState.remainingCards}
          playerName={appState.playerName}
          themeId={appState.themeId}
          successCount={appState.successCount}
          skipCount={appState.skipCount}
          lastAction={appState.lastAction}
          onDrawCard={appState.drawCard}
          onMarkSuccess={appState.markSuccess}
          onMarkSkip={appState.markSkip}
          onReset={appState.resetToStart}
          onSwitchMode={appState.switchMode}
        />
      </div>
    );
  }

  return (
    <div key="bingo" className="page-enter">
      <GameScreen
        board={appState.board}
        winningSquareIds={appState.winningSquareIds}
        hasBingo={appState.gameState === 'bingo'}
        playerName={appState.playerName}
        themeId={appState.themeId}
        markedCount={appState.markedCount}
        onSquareClick={appState.handleSquareClick}
        onReset={appState.resetToStart}
        onSwitchMode={appState.switchMode}
      />
      {appState.showBingoModal && (
        <BingoModal
          playerName={appState.playerName}
          themeId={appState.themeId}
          markedCount={appState.markedCount}
          onDismiss={appState.dismissModal}
        />
      )}
    </div>
  );
}

export default App;

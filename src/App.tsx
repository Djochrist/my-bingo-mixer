import { useAppState } from './hooks/useAppState';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import { BingoModal } from './components/BingoModal';

function App() {
  const appState = useAppState();

  if (appState.currentMode === 'start') {
    return (
      <StartScreen
        onStartBingo={appState.startBingo}
        onStartCardDeck={appState.startCardDeck}
      />
    );
  }

  if (appState.currentMode === 'card-deck') {
    return (
      <CardDeckScreen
        currentCard={appState.currentCard}
        drawnCards={appState.drawnCards}
        remainingCards={appState.remainingCards}
        playerName={appState.playerName}
        successCount={appState.successCount}
        skipCount={appState.skipCount}
        lastAction={appState.lastAction}
        onDrawCard={appState.drawCard}
        onMarkSuccess={appState.markSuccess}
        onMarkSkip={appState.markSkip}
        onReset={appState.resetToStart}
        onSwitchMode={appState.switchMode}
      />
    );
  }

  return (
    <>
      <GameScreen
        board={appState.board}
        winningSquareIds={appState.winningSquareIds}
        hasBingo={appState.gameState === 'bingo'}
        playerName={appState.playerName}
        onSquareClick={appState.handleSquareClick}
        onReset={appState.resetToStart}
        onSwitchMode={appState.switchMode}
      />
      {appState.showBingoModal && (
        <BingoModal onDismiss={appState.dismissModal} />
      )}
    </>
  );
}

export default App;

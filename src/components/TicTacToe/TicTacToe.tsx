import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GameStatus } from './GameStatus';
import { useTicTacToe } from '@/hooks/useTicTacToe';

export const TicTacToe = () => {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    gameMode,
    scores,
    makeMove,
    resetGame,
    changeGameMode
  } = useTicTacToe();

  const isGameDisabled = winner !== null || (gameMode === 'pvc' && currentPlayer === 'O');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Tic-Tac-Toe
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            The classic game with a modern twist!
          </p>
        </div>

        {/* Game Status */}
        {winner && (
          <div className="mb-6">
            <GameStatus winner={winner} gameMode={gameMode} />
          </div>
        )}

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Game Controls - Left Side */}
          <div className="order-2 lg:order-1">
            <GameControls
              gameMode={gameMode}
              onGameModeChange={changeGameMode}
              onReset={resetGame}
              scores={scores}
            />
          </div>

          {/* Game Board - Center */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-md animate-slide-up">
              <GameBoard
                board={board}
                onCellClick={makeMove}
                winningLine={winningLine}
                currentPlayer={currentPlayer}
                disabled={isGameDisabled}
              />
            </div>
          </div>

          {/* Additional Info - Right Side */}
          <div className="order-3 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border/20">
              <h3 className="text-lg font-semibold mb-4">How to Play</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Choose your game mode: Player vs Player or Player vs Computer</li>
                <li>• Players take turns placing X's and O's</li>
                <li>• First to get 3 in a row wins!</li>
                <li>• Row, column, or diagonal counts</li>
                <li>• If the board fills up, it's a draw</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Game Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🎮 Two game modes</li>
                <li>🤖 Smart AI opponent</li>
                <li>📊 Score tracking</li>
                <li>✨ Smooth animations</li>
                <li>📱 Responsive design</li>
                <li>🎨 Beautiful UI</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p>Built with ❤️ for players of all ages</p>
        </div>
      </div>
    </div>
  );
};
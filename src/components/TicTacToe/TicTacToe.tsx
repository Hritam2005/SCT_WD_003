import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { GameStatus } from './GameStatus';
import { ThemeToggle } from '@/components/theme-toggle';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <div className="flex-1">
            <div className="text-center sm:text-left animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Tic-Tac-Toe
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl">
                The classic game with a modern twist!
              </p>
            </div>
          </div>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Game Status */}
        {winner && (
          <div className="mb-6 animate-slide-up">
            <GameStatus winner={winner} gameMode={gameMode} />
          </div>
        )}

        {/* Main Game Layout */}
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
          
          {/* Game Controls - Mobile: Top, Desktop: Left */}
          <div className="lg:col-span-3 order-1">
            <GameControls
              gameMode={gameMode}
              onGameModeChange={changeGameMode}
              onReset={resetGame}
              scores={scores}
            />
          </div>

          {/* Game Board - Center */}
          <div className="lg:col-span-6 order-2 flex justify-center">
            <div className="w-full animate-slide-up">
              <GameBoard
                board={board}
                onCellClick={makeMove}
                winningLine={winningLine}
                currentPlayer={currentPlayer}
                disabled={isGameDisabled}
              />
            </div>
          </div>

          {/* Game Info - Mobile: Bottom, Desktop: Right */}
          <div className="lg:col-span-3 order-3 space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border/20">
              <h3 className="text-lg font-semibold mb-4">How to Play</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Choose your game mode</li>
                <li>• Take turns placing X's and O's</li>
                <li>• First to get 3 in a row wins!</li>
                <li>• Row, column, or diagonal counts</li>
                <li>• If board fills up, it's a draw</li>
              </ul>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>🎮</span>
                  <span>Two modes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🤖</span>
                  <span>Smart AI</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>Score tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✨</span>
                  <span>Animations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>Responsive</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎨</span>
                  <span>Dark mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 text-muted-foreground">
          <p className="text-sm sm:text-base">Built with ❤️ for players of all ages</p>
        </div>
      </div>
    </div>
  );
};
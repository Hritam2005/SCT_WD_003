import { cn } from "@/lib/utils";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  currentPlayer: 'X' | 'O';
  disabled: boolean;
}

export const GameBoard = ({ board, onCellClick, winningLine, currentPlayer, disabled }: GameBoardProps) => {
  const renderCell = (index: number) => {
    const value = board[index];
    const isWinningCell = winningLine?.includes(index);
    
    return (
      <button
        key={index}
        onClick={() => onCellClick(index)}
        disabled={disabled || value !== null}
        className={cn(
          "aspect-square rounded-xl border-2 border-border/20 transition-all duration-300",
          "flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold",
          "hover:scale-105 hover:shadow-lg active:scale-95",
          "bg-gradient-to-br from-card to-muted/30",
          "disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary/50",
          "min-h-[60px] sm:min-h-[80px] md:min-h-[100px]",
          value === null && !disabled && "hover:bg-primary/5 hover:border-primary/30",
          isWinningCell && "bg-gradient-to-br from-winner/20 to-winner/10 border-winner/50 animate-pulse-glow",
          value === 'X' && "text-player-x",
          value === 'O' && "text-player-o"
        )}
      >
        <span className={cn(
          "transition-all duration-300 select-none",
          value && "animate-bounce-in"
        )}>
          {value}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Game Board */}
      <div className={cn(
        "grid grid-cols-3 gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl",
        "bg-gradient-to-br from-background to-muted/50",
        "shadow-2xl border border-border/20",
        "transition-all duration-300",
        winningLine && "animate-celebration"
      )}>
        {Array.from({ length: 9 }, (_, i) => renderCell(i))}
      </div>
      
      {/* Current player indicator - Fixed positioning */}
      {!disabled && !winningLine && (
        <div className="mt-4 flex justify-center">
          <div className={cn(
            "px-4 py-2 rounded-full text-sm font-medium",
            "bg-gradient-to-r shadow-lg transition-all duration-300",
            "border backdrop-blur-sm",
            currentPlayer === 'X' 
              ? "from-player-x/20 to-player-x/10 text-player-x border-player-x/30"
              : "from-player-o/20 to-player-o/10 text-player-o border-player-o/30"
          )}>
            Player {currentPlayer}'s Turn
          </div>
        </div>
      )}
    </div>
  );
};
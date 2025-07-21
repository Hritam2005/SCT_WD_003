import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  gameMode: 'pvp' | 'pvc';
  onGameModeChange: (mode: 'pvp' | 'pvc') => void;
  onReset: () => void;
  scores: { X: number; O: number; draws: number };
}

export const GameControls = ({ gameMode, onGameModeChange, onReset, scores }: GameControlsProps) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Game Mode Selection */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-card to-muted/30 border-border/20 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Game Mode</h3>
        <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-3">
          <Button
            variant={gameMode === 'pvp' ? 'default' : 'outline'}
            onClick={() => onGameModeChange('pvp')}
            className={cn(
              "w-full flex items-center justify-center gap-2 h-12 transition-all duration-300 text-sm sm:text-base",
              gameMode === 'pvp' 
                ? "bg-gradient-to-r from-primary to-primary-glow shadow-lg" 
                : "hover:bg-primary/10 border-border/50"
            )}
          >
            <User size={18} />
            <span className="hidden sm:inline">Player vs Player</span>
            <span className="sm:hidden">PvP</span>
          </Button>
          <Button
            variant={gameMode === 'pvc' ? 'default' : 'outline'}
            onClick={() => onGameModeChange('pvc')}
            className={cn(
              "w-full flex items-center justify-center gap-2 h-12 transition-all duration-300 text-sm sm:text-base",
              gameMode === 'pvc' 
                ? "bg-gradient-to-r from-primary to-primary-glow shadow-lg" 
                : "hover:bg-primary/10 border-border/50"
            )}
          >
            <Bot size={18} />
            <span className="hidden sm:inline">Player vs Computer</span>
            <span className="sm:hidden">PvC</span>
          </Button>
        </div>
      </Card>

      {/* Scoreboard */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-card to-muted/30 border-border/20 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Scoreboard</h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center p-2 sm:p-3 rounded-lg bg-player-x/10 border border-player-x/20 transition-all duration-300 hover:bg-player-x/15">
            <div className="text-xl sm:text-2xl font-bold text-player-x">{scores.X}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Player X</div>
          </div>
          <div className="text-center p-2 sm:p-3 rounded-lg bg-draw/10 border border-draw/20 transition-all duration-300 hover:bg-draw/15">
            <div className="text-xl sm:text-2xl font-bold text-draw">{scores.draws}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Draws</div>
          </div>
          <div className="text-center p-2 sm:p-3 rounded-lg bg-player-o/10 border border-player-o/20 transition-all duration-300 hover:bg-player-o/15">
            <div className="text-xl sm:text-2xl font-bold text-player-o">{scores.O}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {gameMode === 'pvp' ? (
                <>
                  <span className="hidden sm:inline">Player O</span>
                  <span className="sm:hidden">Player O</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Computer</span>
                  <span className="sm:hidden">Bot</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className={cn(
          "w-full h-12 flex items-center justify-center gap-2",
          "hover:bg-accent/20 transition-all duration-300",
          "border-border/50 text-sm sm:text-base"
        )}
      >
        <RefreshCw size={18} />
        New Game
      </Button>
    </div>
  );
};
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
    <div className="space-y-6">
      {/* Game Mode Selection */}
      <Card className="p-6 bg-gradient-to-r from-card to-muted/30 border-border/20">
        <h3 className="text-lg font-semibold mb-4 text-center">Game Mode</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={gameMode === 'pvp' ? 'default' : 'outline'}
            onClick={() => onGameModeChange('pvp')}
            className={cn(
              "flex items-center gap-2 h-12 transition-all duration-300",
              gameMode === 'pvp' 
                ? "bg-gradient-to-r from-primary to-primary-glow shadow-lg animate-pulse-glow" 
                : "hover:bg-primary/10"
            )}
          >
            <User size={18} />
            Player vs Player
          </Button>
          <Button
            variant={gameMode === 'pvc' ? 'default' : 'outline'}
            onClick={() => onGameModeChange('pvc')}
            className={cn(
              "flex items-center gap-2 h-12 transition-all duration-300",
              gameMode === 'pvc' 
                ? "bg-gradient-to-r from-primary to-primary-glow shadow-lg animate-pulse-glow" 
                : "hover:bg-primary/10"
            )}
          >
            <Bot size={18} />
            Player vs Computer
          </Button>
        </div>
      </Card>

      {/* Scoreboard */}
      <Card className="p-6 bg-gradient-to-r from-card to-muted/30 border-border/20">
        <h3 className="text-lg font-semibold mb-4 text-center">Scoreboard</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-player-x/10 border border-player-x/20">
            <div className="text-2xl font-bold text-player-x">{scores.X}</div>
            <div className="text-sm text-muted-foreground">Player X</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-draw/10 border border-draw/20">
            <div className="text-2xl font-bold text-draw">{scores.draws}</div>
            <div className="text-sm text-muted-foreground">Draws</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-player-o/10 border border-player-o/20">
            <div className="text-2xl font-bold text-player-o">{scores.O}</div>
            <div className="text-sm text-muted-foreground">
              {gameMode === 'pvp' ? 'Player O' : 'Computer'}
            </div>
          </div>
        </div>
      </Card>

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full h-12 flex items-center gap-2 hover:bg-accent/20 transition-all duration-300"
      >
        <RefreshCw size={18} />
        New Game
      </Button>
    </div>
  );
};
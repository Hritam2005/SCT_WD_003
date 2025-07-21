import { cn } from "@/lib/utils";
import { Trophy, Zap } from "lucide-react";

interface GameStatusProps {
  winner: 'X' | 'O' | 'draw' | null;
  gameMode: 'pvp' | 'pvc';
}

export const GameStatus = ({ winner, gameMode }: GameStatusProps) => {
  if (!winner) return null;

  const getStatusMessage = () => {
    if (winner === 'draw') {
      return {
        title: "It's a Draw!",
        subtitle: "Great game! Want to play again?",
        icon: Zap,
        color: "text-draw",
        bgColor: "bg-draw/10",
        borderColor: "border-draw/30"
      };
    }

    if (winner === 'X') {
      return {
        title: "Player X Wins!",
        subtitle: "Congratulations! 🎉",
        icon: Trophy,
        color: "text-player-x",
        bgColor: "bg-player-x/10",
        borderColor: "border-player-x/30"
      };
    }

    // Winner is 'O'
    const isComputer = gameMode === 'pvc';
    return {
      title: isComputer ? "Computer Wins!" : "Player O Wins!",
      subtitle: isComputer ? "Better luck next time! 🤖" : "Congratulations! 🎉",
      icon: Trophy,
      color: "text-player-o",
      bgColor: "bg-player-o/10",
      borderColor: "border-player-o/30"
    };
  };

  const status = getStatusMessage();
  const Icon = status.icon;

  return (
    <div className={cn(
      "p-6 rounded-2xl border-2 text-center animate-slide-up",
      status.bgColor,
      status.borderColor
    )}>
      <div className="flex justify-center mb-3">
        <Icon className={cn("w-12 h-12 animate-bounce", status.color)} />
      </div>
      <h2 className={cn("text-2xl font-bold mb-2", status.color)}>
        {status.title}
      </h2>
      <p className="text-muted-foreground text-lg">
        {status.subtitle}
      </p>
    </div>
  );
};
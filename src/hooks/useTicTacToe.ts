import { useState, useCallback, useEffect } from 'react';

type Player = 'X' | 'O';
type GameMode = 'pvp' | 'pvc';
type Winner = Player | 'draw' | null;
type Board = (Player | null)[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Winner;
  winningLine: number[] | null;
  gameMode: GameMode;
  scores: { X: number; O: number; draws: number };
}

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const useTicTacToe = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    winningLine: null,
    gameMode: 'pvp',
    scores: { X: 0, O: 0, draws: 0 }
  });

  const checkWinner = useCallback((board: Board): { winner: Winner; winningLine: number[] | null } => {
    // Check for winning combinations
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as Player, winningLine: combination };
      }
    }

    // Check for draw
    if (board.every(cell => cell !== null)) {
      return { winner: 'draw', winningLine: null };
    }

    return { winner: null, winningLine: null };
  }, []);

  const makeMove = useCallback((index: number) => {
    setGameState(prev => {
      // Can't make move if game is over or cell is occupied
      if (prev.winner || prev.board[index]) return prev;

      const newBoard = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const { winner, winningLine } = checkWinner(newBoard);

      // Update scores if game is won
      const newScores = { ...prev.scores };
      if (winner && winner !== 'draw') {
        newScores[winner]++;
      } else if (winner === 'draw') {
        newScores.draws++;
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        winningLine,
        scores: newScores
      };
    });
  }, [checkWinner]);

  // Computer AI - Simple strategy
  const makeComputerMove = useCallback(() => {
    setGameState(prev => {
      if (prev.winner || prev.currentPlayer === 'X') return prev;

      const availableMoves = prev.board
        .map((cell, index) => cell === null ? index : null)
        .filter(index => index !== null) as number[];

      if (availableMoves.length === 0) return prev;

      // Try to win
      for (const move of availableMoves) {
        const testBoard = [...prev.board];
        testBoard[move] = 'O';
        const { winner } = checkWinner(testBoard);
        if (winner === 'O') {
          return makeMove(move), prev; // This will trigger the move
        }
      }

      // Try to block player from winning
      for (const move of availableMoves) {
        const testBoard = [...prev.board];
        testBoard[move] = 'X';
        const { winner } = checkWinner(testBoard);
        if (winner === 'X') {
          const newBoard = [...prev.board];
          newBoard[move] = 'O';
          const result = checkWinner(newBoard);
          
          const newScores = { ...prev.scores };
          if (result.winner && result.winner !== 'draw') {
            newScores[result.winner]++;
          } else if (result.winner === 'draw') {
            newScores.draws++;
          }

          return {
            ...prev,
            board: newBoard,
            currentPlayer: 'X',
            winner: result.winner,
            winningLine: result.winningLine,
            scores: newScores
          };
        }
      }

      // Take center if available
      if (availableMoves.includes(4)) {
        const newBoard = [...prev.board];
        newBoard[4] = 'O';
        const result = checkWinner(newBoard);
        
        const newScores = { ...prev.scores };
        if (result.winner && result.winner !== 'draw') {
          newScores[result.winner]++;
        } else if (result.winner === 'draw') {
          newScores.draws++;
        }

        return {
          ...prev,
          board: newBoard,
          currentPlayer: 'X',
          winner: result.winner,
          winningLine: result.winningLine,
          scores: newScores
        };
      }

      // Random move
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoard = [...prev.board];
      newBoard[randomMove] = 'O';
      const result = checkWinner(newBoard);
      
      const newScores = { ...prev.scores };
      if (result.winner && result.winner !== 'draw') {
        newScores[result.winner]++;
      } else if (result.winner === 'draw') {
        newScores.draws++;
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: 'X',
        winner: result.winner,
        winningLine: result.winningLine,
        scores: newScores
      };
    });
  }, [checkWinner]);

  // Handle computer moves
  useEffect(() => {
    if (gameState.gameMode === 'pvc' && 
        gameState.currentPlayer === 'O' && 
        !gameState.winner) {
      const timer = setTimeout(makeComputerMove, 800); // Delay for better UX
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.gameMode, gameState.winner, makeComputerMove]);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: null
    }));
  }, []);

  const changeGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({
      ...prev,
      gameMode: mode,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: null
    }));
  }, []);

  const resetScores = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      scores: { X: 0, O: 0, draws: 0 }
    }));
  }, []);

  return {
    ...gameState,
    makeMove,
    resetGame,
    changeGameMode,
    resetScores
  };
};
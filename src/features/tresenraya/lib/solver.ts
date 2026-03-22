import type { Board } from "../models/Board";
import type { PieceType } from "../models/Player";

const checkWinner = (board: Board, p: PieceType): boolean => {
  // Rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === p && board[row][1] === p && board[row][2] === p) {
      return true;
    }
  }

  // Columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === p && board[1][col] === p && board[2][col] === p) {
      return true;
    }
  }

  // Diagonals
  if (board[0][0] === p && board[1][1] === p && board[2][2] === p) return true;
  if (board[0][2] === p && board[1][1] === p && board[2][0] === p) return true;

  return false;
};

const isBoardFull = (board: Board): boolean => {
  return board.every((row) => row.every((cell) => cell !== 0));
};

const negamax = (
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  player: PieceType,
): number => {
  const opponent = (player === 1 ? 2 : 1) as PieceType;

  if (checkWinner(board, opponent)) {
    return -(10 + depth);
  }

  if (isBoardFull(board)) return 0;

  let maxEval = -Infinity;

  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    if (board[row][col] !== 0) continue;

    board[row][col] = player;
    // The negation here handles the perspective switch perfectly
    const evaluation = -negamax(board, depth - 1, -beta, -alpha, opponent);
    board[row][col] = 0;

    maxEval = Math.max(maxEval, evaluation);
    alpha = Math.max(alpha, evaluation);

    if (alpha >= beta) break;
  }

  return maxEval;
};

export const getBestMove = (board: Board, player: PieceType): number => {
  const newBoard = board.map((row) => [...row]);

  let bestScore = -Infinity;
  let bestMove = -1;
  const opponent = (player === 1 ? 2 : 1) as PieceType;

  for (let i = 0; i < 9; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;

    if (newBoard[row][col] !== 0) continue;

    newBoard[row][col] = player;
    const score = -negamax(newBoard, 9, -Infinity, Infinity, opponent);
    newBoard[row][col] = 0;

    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
};

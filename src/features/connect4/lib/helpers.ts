import type { Board, Cell } from "../models/Board";
import type { BoardDimensions } from "../models/BoardRect";

export type TTEntry = {
  depth: number;
  score: number;
  flag: "EXACT" | "LOWERBOUND" | "UPPERBOUND";
};

export const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

export const hashBoard = (board: Board): string => {
  return board.flat().join("");
};

export const getColumnIndex = (
  event: React.MouseEvent<HTMLCanvasElement>,
  boardDimensions: BoardDimensions,
) => {
  const { x, cellSize } = boardDimensions;

  const mouseXPosition = event.nativeEvent.offsetX - x;
  Math.floor(mouseXPosition / cellSize);
};

export const getAvailableRow = (board: Board, col: number): number => {
  for (let row = 5; row >= 0; row--) {
    if (board[row][col] === 0) return row;
  }
  return -1;
};

export const applyMove = (
  board: Board,
  row: number,
  col: number,
  player: Cell,
): Board => {
  const newBoard = cloneBoard(board);
  newBoard[row][col] = player;
  return newBoard;
};

export const getEmptyCell = (
  window: Cell[],
  baseRow: number,
  baseCol: number,
  dr: number,
  dc: number,
): { row: number; col: number } | undefined => {
  const emptyIndex = window.findIndex((c) => c === 0);
  if (emptyIndex === -1) return undefined;

  return {
    row: baseRow + dr * emptyIndex,
    col: baseCol + dc * emptyIndex,
  };
};

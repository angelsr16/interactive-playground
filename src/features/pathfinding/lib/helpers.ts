import { getGridIndexFromRowAndCol } from "../../../lib/canvas";
import { WALL_CELL } from "../constants/constants";

export const isCellValid = (
  row: number,
  col: number,
  gridSize: number,
): boolean => {
  return row >= 0 && row < gridSize && col >= 0 && col < gridSize;
};

export const isUnblocked = (
  grid: number[],
  row: number,
  col: number,
  gridSize: number,
) => {
  const index = getGridIndexFromRowAndCol(row, col, gridSize);
  return grid[index] !== WALL_CELL;
};

export const isDiagonalMoveValid = (
  grid: number[],
  row: number,
  col: number,
  newRow: number,
  newCol: number,
  gridSize: number,
): boolean => {
  const dr = newRow - row;
  const dc = newCol - col;

  if (Math.abs(dr) === 1 && Math.abs(dc) === 1) {
    return (
      isUnblocked(grid, row + dr, col, gridSize) &&
      isUnblocked(grid, row, col + dc, gridSize)
    );
  }

  return true;
};

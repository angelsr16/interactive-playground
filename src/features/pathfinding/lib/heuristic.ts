import { getRowAndColFromIndex } from "../../../lib/canvas";

// Euclidean Distance
export const euclideanDistance = (
  row: number,
  col: number,
  target: number,
  gridSize: number,
): number => {
  const { row: targetRow, col: targetCol } = getRowAndColFromIndex(
    gridSize,
    target,
  );
  return Math.sqrt((targetCol - col) ** 2 + (targetRow - row) ** 2);
};

// Manhattan Distance
export const manhattanDistance = (
  row: number,
  col: number,
  target: number,
  gridSize: number,
): number => {
  const { row: targetRow, col: targetCol } = getRowAndColFromIndex(
    gridSize,
    target,
  );
  return Math.abs(targetCol - col) + Math.abs(targetRow - row);
};

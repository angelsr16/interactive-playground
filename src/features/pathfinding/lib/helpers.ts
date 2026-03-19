import { getGridIndexFromRowAndCol } from "../../../lib/canvas";
import { WALL_CELL } from "../constants/constants";
import type {
  Heuristic,
  MovementType,
  Velocity,
} from "../models/SearchOptions";
import { euclideanDistance, manhattanDistance } from "./heuristic";

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

export const getVelocity = (velocity: Velocity): number => {
  switch (velocity) {
    case "slow":
      return 15;
    case "normal":
      return 10;
    case "fast":
      return 1;
    case "instant":
      return 0;
  }
};

export const getDirections = (direction: MovementType): number[][] => {
  switch (direction) {
    case "4dir":
      return [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ];
    case "8dir":
      return [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, -1],
        [-1, 1],
      ];
  }
};

export const getHeuristic = (
  row: number,
  col: number,
  target: number,
  gridSize: number,
  heuristic: Heuristic,
): number => {
  switch (heuristic) {
    case "euclidean":
      return euclideanDistance(row, col, target, gridSize);
    case "manhattan":
      return manhattanDistance(row, col, target, gridSize);
  }
};

import { GoalState } from "../constants/GoalState";
import { Moves, type Move } from "../constants/Moves";
import type { PuzzleState } from "../models/PuzzleState";

export const getRandomPuzzle = (): number[] => {
  const newGrid = [...GoalState];

  do {
    for (let i = newGrid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newGrid[i], newGrid[j]] = [newGrid[j], newGrid[i]];
    }
  } while (!isSolvable(newGrid));
  return newGrid;
};

export const moveTile = (
  grid: number[],
  move: Move,
  blankPosition: number,
): number[] => {
  const newGrid = [...grid];
  const newBlankPosition = blankPosition + Moves[move];

  const tileToMove = newGrid[newBlankPosition];
  newGrid[newBlankPosition] = newGrid[blankPosition];
  newGrid[blankPosition] = tileToMove;

  return newGrid;
};

export const getPath = (resultState: PuzzleState) => {
  const path: PuzzleState[] = [];
  let current: PuzzleState | null = resultState;

  while (current != null) {
    path.push(current);
    current = current.parent;
  }

  return path.reverse();
};

export const isSolvable = (grid: number[]): boolean => {
  let inversions = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = i + 1; j < grid.length; j++) {
      if (grid[i] !== 0 && grid[j] !== 0 && grid[i] > grid[j]) {
        inversions++;
      }
    }
  }

  return inversions % 2 === 0;
};

import { useState } from "react";
import type { PuzzleState } from "../models/PuzzleState";
import aStar from "../algorithms/aStar";
import { GoalState } from "../constants/GoalState";
import { getPath } from "../lib/helpers";

export const useEightPuzzle = (n = 3) => {
  const [grid, setGrid] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [path, setPath] = useState<PuzzleState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveTile = (clickedIndex: number) => {
    const emptyIndex = grid.indexOf(0);
    const clickedRow = Math.floor(clickedIndex / n);
    const clickedCol = clickedIndex % n;

    const emptyRow = Math.floor(emptyIndex / n);
    const emptyCol = emptyIndex % n;

    const isAdjacent =
      Math.abs(clickedRow - emptyRow) + Math.abs(clickedCol - emptyCol) === 1;

    if (isAdjacent) {
      const newGrid = [...grid];
      [newGrid[clickedIndex], newGrid[emptyIndex]] = [
        newGrid[emptyIndex],
        newGrid[clickedIndex],
      ];
      setGrid(newGrid);
    }
  };

  const solve = () => {
    const result = aStar(grid, GoalState);
    if (result) setPath(getPath(result));
  };

  return {
    grid,
    setGrid,
    setPath,
    path,
    currentIndex,
    setCurrentIndex,
    moveTile,
    solve,
  };
};

import { useState } from "react";

export type MazeGenerator = "random" | "division";

export const useMazeGenerator = ({ gridSize }: { gridSize: number }) => {
  const [mazeGeneratorAlgorithm, setMazeGeneratorAlgorithm] =
    useState<MazeGenerator>("random");

  const generateMaze = (): number[] => {
    const grid: number[] = [];

    for (let i: number = 0; i < gridSize * gridSize; i++) {
      grid.push(Math.random() < 0.2 ? 1 : 0);
    }

    return grid;
  };

  return { mazeGeneratorAlgorithm, setMazeGeneratorAlgorithm, generateMaze };
};

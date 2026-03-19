import { useState } from "react";

export const useLogicalGrid = (gridSize: number) => {
  const [grid, setGrid] = useState<number[]>(() =>
    Array(gridSize * gridSize).fill(0),
  );
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(-1);

  const [isDrawing, setIsDrawing] = useState(true);

  const selectCell = (index: number) => {
    setGrid((prev) => {
      const next = [...prev];

      if (!isDrawing) {
        if (index === startIndex) setStartIndex(-1);
        else if (index === endIndex) setEndIndex(-1);
        next[index] = 0;
        return next;
      }

      if (next[index] !== 0) {
        return next;
      }

      if (startIndex === -1 && index !== endIndex) {
        setStartIndex(index);
        next[index] = 2;
      } else if (endIndex === -1 && index !== startIndex) {
        setEndIndex(index);
        next[index] = 3;
      } else if (index !== startIndex && index !== endIndex) {
        next[index] = 1;
      }
      return next;
    });
  };

  const updateCell = (index: number, newValue: number) => {
    setGrid((prev) => {
      const next = [...prev];

      if (index !== startIndex && index !== endIndex) {
        next[index] = newValue;
      }

      return next;
    });
  };

  const resetGrid = () => {
    setStartIndex(-1);
    setEndIndex(-1);
    setGrid(() => Array(gridSize * gridSize).fill(0));
  };

  return {
    grid,
    gridSize,
    selectCell,
    resetGrid,
    updateCell,
    isDrawing,
    setIsDrawing,
    setGrid,
    startIndex,
    endIndex,
  };
};

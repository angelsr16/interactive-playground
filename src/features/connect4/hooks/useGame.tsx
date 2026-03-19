import { useState } from "react";
import { getAvailableRowIndexFromCol } from "../lib/helpers";

export const useGame = () => {
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const tryPlaceDisc = (columnIndex: number) => {
    const rowIndex = getAvailableRowIndexFromCol(grid, columnIndex);
    if (rowIndex > -1) {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[rowIndex][columnIndex] = 1;
        return next;
      });
      // console.log("Placed!");
    }
  };

  return { grid, tryPlaceDisc };
};

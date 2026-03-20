import { useState } from "react";
import { getAvailableRowIndexFromCol } from "../lib/helpers";
import { type PieceType, type Player } from "../models/Player";

type Cell = PieceType | 0;

export const useGame = ({
  redPlayer,
  yellowPlayer,
  winner,
  setWinner,
}: {
  redPlayer: Player;
  yellowPlayer: Player;
  winner: Player | null;
  setWinner: (player: Player | null) => void;
}) => {
  const [grid, setGrid] = useState<Cell[][]>([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const [currentTurn, setCurrentTurn] = useState<Player>(redPlayer);

  const reset = () => {
    setGrid([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ]);
    setWinner(null);
  };

  const tryPlaceDisc = (columnIndex: number) => {
    if (winner !== null) return;
    const rowIndex = getAvailableRowIndexFromCol(grid, columnIndex);
    if (rowIndex > -1) {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[rowIndex][columnIndex] = currentTurn.piece;
        if (checkWinner(next)) {
          setWinner(currentTurn);
        }
        return next;
      });

      if (currentTurn === redPlayer) {
        setCurrentTurn(yellowPlayer);
      } else {
        setCurrentTurn(redPlayer);
      }
    }
  };

  const checkWinner = (grid: Cell[][]): boolean => {
    const rows = grid.length;
    const cols = grid[0].length;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = grid[row][col];
        if (cell === 0) continue;

        if (
          col + 3 < cols &&
          cell === grid[row][col + 1] &&
          cell === grid[row][col + 2] &&
          cell === grid[row][col + 3]
        ) {
          return true;
        }

        // 2. Check Vertical (Down)
        if (
          row + 3 < rows &&
          cell === grid[row + 1][col] &&
          cell === grid[row + 2][col] &&
          cell === grid[row + 3][col]
        ) {
          return true;
        }

        // 3. Check Diagonal (Down-Right)
        if (
          row + 3 < rows &&
          col + 3 < cols &&
          cell === grid[row + 1][col + 1] &&
          cell === grid[row + 2][col + 2] &&
          cell === grid[row + 3][col + 3]
        ) {
          return true;
        }

        // 4. Check Diagonal (Up-Right)
        if (
          row - 3 >= 0 &&
          col + 3 < cols &&
          cell === grid[row - 1][col + 1] &&
          cell === grid[row - 2][col + 2] &&
          cell === grid[row - 3][col + 3]
        ) {
          return true;
        }
      }
    }

    return false;
  };

  return {
    grid,
    tryPlaceDisc,
    currentTurn,
    reset,
  };
};

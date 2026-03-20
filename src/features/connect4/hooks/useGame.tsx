import { useState } from "react";
import { getAvailableRowIndexFromCol } from "../lib/helpers";
import { type PieceType, type Player, type PlayerType } from "../models/Player";
import { RED_PLAYER, YELLOW_PLAYER } from "../lib/constants";

export type Cell = PieceType | 0;

export const useGame = () => {
  const [grid, setGrid] = useState<Cell[][]>([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  const [winner, setWinner] = useState<Player | null>(null);
  const [redPlayer, setRedPlayer] = useState<Player>({
    type: "human",
    piece: RED_PLAYER,
  });
  const [yellowPlayer, setYellowPlayer] = useState<Player>({
    type: "human",
    piece: YELLOW_PLAYER,
  });
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
    setCurrentTurn(redPlayer);
  };

  const canPlaceDisc = (player: Player, columnIndex: number): boolean => {
    if (winner !== null && currentTurn === player) return false;
    return getAvailableRowIndexFromCol(grid, columnIndex) !== -1;
  };

  const tryPlaceDisc = (player: Player, columnIndex: number) => {
    if (winner !== null && currentTurn === player) return;
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

  const updatePlayerType = (player: Player, type: PlayerType) => {
    const isRed = player.piece === redPlayer.piece;

    const updatedPlayer = { ...(isRed ? redPlayer : yellowPlayer), type };

    if (isRed) {
      setRedPlayer(updatedPlayer);
    } else {
      setYellowPlayer(updatedPlayer);
    }

    if (currentTurn.piece === player.piece) {
      setCurrentTurn(updatedPlayer);
    }
  };

  return {
    grid,
    canPlaceDisc,
    tryPlaceDisc,
    currentTurn,
    reset,

    redPlayer,
    yellowPlayer,
    updatePlayerType,
  };
};

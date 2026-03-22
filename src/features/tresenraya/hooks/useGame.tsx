import { useState } from "react";
import { type Player, type PlayerType } from "../models/Player";
import { BLUE_PLAYER, RED_PLAYER } from "../lib/constants";
import type { Board, GridPosition } from "../models/Board";

export const useGame = () => {
  const [board, setBoard] = useState<Board>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [winner, setWinner] = useState<Player | null>(null);
  const [bluePlayer, setBluePlayer] = useState<Player>({
    type: "human",
    piece: BLUE_PLAYER,
  });
  const [redPlayer, setRedPlayer] = useState<Player>({
    type: "human",
    piece: RED_PLAYER,
  });
  const [currentTurn, setCurrentTurn] = useState<Player>(bluePlayer);

  const reset = () => {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setWinner(null);
    setCurrentTurn(bluePlayer);
  };

  const canPlaceDisc = (
    player: Player,
    gridPosition: GridPosition,
  ): boolean => {
    if (winner !== null && currentTurn === player) return false;
    return board[gridPosition.y][gridPosition.x] === 0;
  };

  const tryPlaceDisc = (player: Player, gridPosition: GridPosition) => {
    if (winner !== null && currentTurn === player) return;

    setBoard((prev) => {
      const next = prev.map((row) => [...row]);
      next[gridPosition.y][gridPosition.x] = currentTurn.piece;
      if (checkWinner(next)) {
        setWinner(currentTurn);
      }
      return next;
    });
    if (currentTurn === bluePlayer) {
      setCurrentTurn(redPlayer);
    } else {
      setCurrentTurn(bluePlayer);
    }
  };

  const checkWinner = (board: Board): boolean => {
    const p = currentTurn.piece;

    // Rows
    for (let row = 0; row < 3; row++) {
      if (board[row][0] === p && board[row][1] === p && board[row][2] === p) {
        return true;
      }
    }

    // Columns
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === p && board[1][col] === p && board[2][col] === p) {
        return true;
      }
    }

    // Diagonals
    if (board[0][0] === p && board[1][1] === p && board[2][2] === p)
      return true;
    if (board[0][2] === p && board[1][1] === p && board[2][0] === p)
      return true;

    return false;
  };

  const updatePlayerType = (player: Player, type: PlayerType) => {
    const isRed = player.piece === bluePlayer.piece;
    const updatedPlayer = { ...(isRed ? bluePlayer : redPlayer), type };
    if (isRed) {
      setBluePlayer(updatedPlayer);
    } else {
      setRedPlayer(updatedPlayer);
    }
    if (currentTurn.piece === player.piece) {
      setCurrentTurn(updatedPlayer);
    }
  };

  return {
    board,
    canPlaceDisc,
    tryPlaceDisc,
    currentTurn,
    reset,
    bluePlayer,
    redPlayer,
    updatePlayerType,
  };
};

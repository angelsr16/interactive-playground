import { useCallback, useEffect } from "react";
import type { Player } from "../models/Player";

export const useAI = ({
  currentTurn,
  canPlaceDisc,
  tryPlaceDisc,
}: {
  currentTurn: Player;
  canPlaceDisc: (player: Player, columnIndex: number) => boolean;
  tryPlaceDisc: (player: Player, columnIndex: number) => void;
  redPlayer: Player;
  yellowPlayer: Player;
}) => {
  const calculateBestMove = useCallback((): number => {
    const availableColumns = Array.from({ length: 7 }, (_, i) => i).filter(
      (col) => canPlaceDisc(currentTurn, col),
    );

    const column =
      availableColumns[Math.floor(Math.random() * availableColumns.length)];
    return column;
  }, [canPlaceDisc, currentTurn]);

  const triggerAiMove = useCallback(() => {
    const col = calculateBestMove();
    if (col !== undefined) {
      tryPlaceDisc(currentTurn, col);
    }
  }, [calculateBestMove, tryPlaceDisc, currentTurn]);

  useEffect(() => {
    if (currentTurn.type !== "ai") return;

    const timeout = setTimeout(triggerAiMove, 500);
    return () => clearTimeout(timeout);
  }, [currentTurn, triggerAiMove]);

  return { triggerAiMove };
};

import { useCallback, useEffect, useRef } from "react";
import type { Player } from "../models/Player";
import type { Board, GridPosition } from "../models/Board";

export const useAI = ({
  board,
  currentTurn,
  tryPlaceDisc,
}: {
  board: Board;
  currentTurn: Player;
  canPlaceDisc: (player: Player, gridPosition: GridPosition) => boolean;
  tryPlaceDisc: (player: Player, gridPosition: GridPosition) => void;
  redPlayer: Player;
  bluePlayer: Player;
}) => {
  const workerRef = useRef<Worker | null>(null);
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../tresenraya.worker.ts", import.meta.url),
      { type: "module" },
    );

    return () => workerRef.current?.terminate();
  }, []);

  const triggerAiMove = useCallback(() => {
    if (!workerRef.current) return;

    workerRef.current.onmessage = (e: MessageEvent) => {
      const { result } = e.data;
      if (result !== undefined) {
        const row = Math.floor(result / 3);
        const col = result % 3;
        tryPlaceDisc(currentTurn, { y: row, x: col });
      }
    };

    workerRef.current.postMessage({
      board,
      player: currentTurn.piece,
    });
  }, [tryPlaceDisc, currentTurn, board]);

  useEffect(() => {
    if (currentTurn.type !== "ai") return;

    const timeout = setTimeout(triggerAiMove, 500);
    return () => clearTimeout(timeout);
  }, [currentTurn, triggerAiMove]);
};

import { forwardRef, useImperativeHandle, useState } from "react";
import { useBoardCanvas } from "../hooks/useBoardCanvas";
import { useGame } from "../hooks/useGame";
import type { Player } from "../models/Player";

export type GameCanvasHandle = {
  handleResetGame: () => void;
};

export const GameCanvas = forwardRef<
  GameCanvasHandle,
  {
    redPlayer: Player;
    yellowPlayer: Player;
  }
>(({ redPlayer, yellowPlayer }, ref) => {
  const [winner, setWinner] = useState<Player | null>(null);

  const { grid, tryPlaceDisc, currentTurn, reset } = useGame({
    redPlayer,
    yellowPlayer,
    winner,
    setWinner,
  });

  const { canvasRef, handleMouseMove, handleMouseLeave, handleMouseClick } =
    useBoardCanvas({
      grid,
      tryPlaceDisc,
      currentTurn,
    });

  useImperativeHandle(ref, () => ({
    handleResetGame() {
      reset();
    },
  }));

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
    />
  );
});

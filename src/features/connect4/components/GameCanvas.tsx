import { useState } from "react";
import { useBoardCanvas } from "../hooks/useBoardCanvas";
import { useGame } from "../hooks/useGame";
import type { Player } from "../models/Player";

export const GameCanvas = ({
  redPlayer,
  yellowPlayer,
}: {
  redPlayer: Player;
  yellowPlayer: Player;
}) => {
  const [winner, setWinner] = useState<Player | null>(null);

  const { grid, tryPlaceDisc, currentTurn } = useGame({
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

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
    />
  );
};

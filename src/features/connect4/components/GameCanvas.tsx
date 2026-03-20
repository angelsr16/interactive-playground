import { useBoardCanvas } from "../hooks/useBoardCanvas";
import { type Cell } from "../hooks/useGame";
import type { Player } from "../models/Player";

export const GameCanvas = ({
  grid,
  currentTurn,
  onBoardClick,
}: {
  grid: Cell[][];
  currentTurn: Player;
  onBoardClick: (columnIndex: number) => void;
}) => {
  const { canvasRef, handleMouseMove, handleMouseLeave, handleMouseClick } =
    useBoardCanvas({
      grid,
      currentTurn,
      onBoardClick,
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

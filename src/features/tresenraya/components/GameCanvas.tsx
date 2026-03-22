import { useBoardCanvas } from "../hooks/useBoardCanvas";
import type { Board, GridPosition } from "../models/Board";
import type { Player } from "../models/Player";

export const GameCanvas = ({
  grid,
  currentTurn,
  onBoardClick,
}: {
  grid: Board;
  currentTurn: Player;
  onBoardClick: (gridPosition: GridPosition) => void;
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

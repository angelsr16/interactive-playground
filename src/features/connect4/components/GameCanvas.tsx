import { useBoardCanvas } from "../hooks/useBoardCanvas";
import { useGame } from "../hooks/useGame";

export const GameCanvas = () => {
  const { grid, tryPlaceDisc } = useGame();

  const { canvasRef, handleMouseMove, handleMouseLeave, handleMouseClick } =
    useBoardCanvas({
      grid,
      tryPlaceDisc,
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

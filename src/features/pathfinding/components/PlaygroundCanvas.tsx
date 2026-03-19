import { useCallback, useState } from "react";
import { useResizableCanvas } from "../../../hooks/useResizableCanvas";
import {
  drawRoundedRect,
  getCanvasContext,
  getGridIndexFromClick,
} from "../../../lib/canvas";
import {
  EMPTY_CELL,
  END_CELL,
  FRONTIER_CELL,
  MAZE_THEMES,
  PATH_CELL,
  START_CELL,
  VISITED_CELL,
  WALL_CELL,
  type MazeTheme,
} from "../constants/constants";

export const PlaygroundCanvas = ({
  grid,
  onTileClick,
  gridSize,
  mazeTheme,
}: {
  grid: number[];
  onTileClick: (index: number) => void;
  gridSize: number;
  mazeTheme: MazeTheme;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const renderCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const canvasContext = getCanvasContext(canvas);
      if (!canvasContext) return;

      const { ctx, canvasWidth, logicalSize, dpr, canvasHeight } =
        canvasContext;

      const tileSize = (logicalSize * dpr) / gridSize;

      // Maze Background
      ctx.fillStyle = MAZE_THEMES[mazeTheme].background;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      grid.forEach((value: number, index: number) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const x = col * tileSize;
        const y = row * tileSize;

        let color = "#fff";

        switch (value) {
          case EMPTY_CELL:
            color = MAZE_THEMES[mazeTheme].empty;
            break;
          case WALL_CELL:
            color = MAZE_THEMES[mazeTheme].wall;
            break;
          case START_CELL:
            color = MAZE_THEMES[mazeTheme].start;
            break;
          case END_CELL:
            color = MAZE_THEMES[mazeTheme].end;
            break;
          case VISITED_CELL:
            color = MAZE_THEMES[mazeTheme].visited;
            break;
          case PATH_CELL:
            color = MAZE_THEMES[mazeTheme].path;
            break;
          case FRONTIER_CELL:
            color = MAZE_THEMES[mazeTheme].frontier;
        }

        drawRoundedRect(
          ctx,
          x + 1,
          y + 1,
          tileSize - 1,
          tileSize - 1,
          color,
          5,
        );
      });
    },
    [grid, gridSize, mazeTheme],
  );

  const canvasRef = useResizableCanvas(renderCanvas);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const index = getGridIndexFromClick(event, canvas, gridSize);
    if (index >= 0 && index < gridSize * gridSize) {
      onTileClick(index);
    }
  };

  const handleStartDrag = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);

    if (!canvasRef.current) return;
    const index = getGridIndexFromClick(event, canvasRef.current, gridSize);

    onTileClick(index);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    if (!canvasRef.current) return;
    const index = getGridIndexFromClick(event, canvasRef.current, gridSize);

    onTileClick(index);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      onMouseDown={handleStartDrag}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      className="boder border-2"
    />
  );
};

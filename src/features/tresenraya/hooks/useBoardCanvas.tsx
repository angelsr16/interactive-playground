import { useCallback, useRef } from "react";
import { drawRect, getCanvasContext } from "../../../lib/canvas";
import { useResizableCanvas } from "../../../hooks/useResizableCanvas";
import type { BoardDimensions } from "../models/BoardRect";
import { type Player } from "../models/Player";
import { drawBoard } from "../lib/canvas";
import type { Board, GridPosition } from "../models/Board";

export const useBoardCanvas = ({
  grid,
  onBoardClick,
}: {
  grid: Board;
  currentTurn: Player;
  onBoardClick: (position: GridPosition) => void;
}) => {
  const boardDimensionsRef = useRef<BoardDimensions | null>(null);
  const hoveredCell = useRef<GridPosition | null>(null);

  const renderCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const canvasContext = getCanvasContext(canvas);
      if (!canvasContext) return;

      const { ctx, logicalSize, dpr } = canvasContext;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, logicalSize, logicalSize);

      const horizontalSpacing = logicalSize / 3;
      const verticalSpacing = logicalSize / 3;
      const cellSize = Math.min(horizontalSpacing, verticalSpacing);

      const boardWidth = cellSize * 3;
      const boardHeight = cellSize * 3;

      drawBoard(ctx, grid, boardWidth, boardHeight, cellSize);

      boardDimensionsRef.current = {
        y: 0,
        x: 0,
        width: logicalSize,
        height: logicalSize,
        cellSize
      };
    },
    [grid],
  );

  const canvasRef = useResizableCanvas(renderCanvas);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const boardDimensions = boardDimensionsRef.current;
      if (!boardDimensions) return;

      const { x, y, cellSize } = boardDimensions;

      const mouseXPosition = e.nativeEvent.offsetX - x;
      const mouseYPosition = e.nativeEvent.offsetY - y;
      const hoveredColumn = Math.floor(mouseXPosition / cellSize);
      const hoveredRow = Math.floor(mouseYPosition / cellSize);

      if (
        (hoveredColumn < 0 || hoveredColumn >= 3) &&
        (hoveredRow < 0 || hoveredRow >= 3)
      )
        return;

      if (
        hoveredCell.current &&
        hoveredColumn === hoveredCell.current.x &&
        hoveredRow === hoveredCell.current.y
      ) {
        return;
      }

      hoveredCell.current = { x: hoveredColumn, y: hoveredRow };

      const canvas = canvasRef.current;
      if (!canvas) return;
      renderCanvas(canvas);

      const canvasContext = getCanvasContext(canvas);
      if (!canvasContext) return;

      if (grid[hoveredRow][hoveredColumn] === 0) {
        const xPosition = hoveredColumn * cellSize;
        const yPosition = hoveredRow * cellSize;
        drawRect(
          canvasContext.ctx,
          xPosition,
          yPosition,
          cellSize,
          cellSize,
          "#ffffff10",
        );
      }
    },
    [canvasRef, renderCanvas, grid],
  );

  const handleMouseLeave = useCallback(() => {
    hoveredCell.current = null;
    const canvas = canvasRef.current;
    if (canvas) renderCanvas(canvas);
  }, [renderCanvas, canvasRef]);

  const handleMouseClick = useCallback(() => {
    if (hoveredCell.current === null) return;
    onBoardClick(hoveredCell.current);
  }, [onBoardClick]);

  return { canvasRef, handleMouseMove, handleMouseLeave, handleMouseClick };
};

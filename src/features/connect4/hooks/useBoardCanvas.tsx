import { useCallback, useRef } from "react";
import { drawCircle, getCanvasContext } from "../../../lib/canvas";
import { useResizableCanvas } from "../../../hooks/useResizableCanvas";
import { drawBoard, getAvailableRowIndexFromCol } from "../lib/helpers";
import type { BoardDimensions } from "../models/BoardRect";

export const useBoardCanvas = ({
  grid,
  tryPlaceDisc,
}: {
  grid: number[][];
  tryPlaceDisc: (columnIndex: number) => void;
}) => {
  const boardDimensionsRef = useRef<BoardDimensions | null>(null);
  const hoveredColRef = useRef<number | null>(null);

  const renderCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const canvasContext = getCanvasContext(canvas);
      if (!canvasContext) return;

      const { ctx, logicalSize, dpr } = canvasContext;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, logicalSize, logicalSize);

      const horizontalSpacing = logicalSize / 7;
      const verticalSpacing = logicalSize / 6;
      const cellSize = Math.min(horizontalSpacing, verticalSpacing);

      const boardWidth = cellSize * 7;
      const boardHeight = cellSize * 6;

      drawBoard(ctx, grid, boardWidth, boardHeight, cellSize);

      boardDimensionsRef.current = {
        y: 0,
        x: 0,
        width: logicalSize,
        height: logicalSize,
        cellSize,
        horizontalSpacing,
        verticalSpacing,
      };
    },
    [grid],
  );

  const canvasRef = useResizableCanvas(renderCanvas);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const boardDimensions = boardDimensionsRef.current;
      if (!boardDimensions) return;

      const { x, cellSize } = boardDimensions;

      const mouseXPosition = e.nativeEvent.offsetX - x;
      const hoveredColumn = Math.floor(mouseXPosition / cellSize);

      if (
        (hoveredColumn < 0 || hoveredColumn >= 7) &&
        getAvailableRowIndexFromCol(grid, hoveredColumn) > -1
      )
        return;
      if (hoveredColumn === hoveredColRef.current) return;

      hoveredColRef.current = hoveredColumn;

      const canvas = canvasRef.current;
      if (!canvas) return;
      renderCanvas(canvas);

      const canvasContext = getCanvasContext(canvas);
      if (!canvasContext) return;

      const cx = cellSize * hoveredColumn + cellSize / 2;
      const cy =
        cellSize * getAvailableRowIndexFromCol(grid, hoveredColumn) +
        cellSize / 2;

      drawCircle(
        canvasContext.ctx,
        cx,
        cy,
        (cellSize / 2) * 0.8,
        "rgba(255,0,0,0.4)",
      );
    },
    [renderCanvas, canvasRef, grid],
  );

  const handleMouseLeave = useCallback(() => {
    hoveredColRef.current = null;
    const canvas = canvasRef.current;
    if (canvas) renderCanvas(canvas);
  }, [renderCanvas, canvasRef]);

  const handleMouseClick = useCallback(() => {
    if (hoveredColRef.current === null) return;
    tryPlaceDisc(hoveredColRef.current);
  }, [tryPlaceDisc]);

  return { canvasRef, handleMouseMove, handleMouseLeave, handleMouseClick };
};

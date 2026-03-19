import { useCallback } from "react";
import { useResizableCanvas } from "../../../hooks/useResizableCanvas";
import {
  drawRoundedRect,
  drawText,
  getCanvasContext,
  getIndexFromGridClick,
} from "../../../lib/canvas";

export const PuzzleCanvas = ({
  grid,
  onTileClick,
  n = 3,
}: {
  grid: number[];
  onTileClick: (index: number) => void;
  n: number;
}) => {
  const renderCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      const canvasContext = getCanvasContext(canvas);
      if (!canvasContext) return;

      const { ctx, logicalSize, dpr } = canvasContext;

      const tileSize = (logicalSize * dpr) / n;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      grid.forEach((value: number, index: number) => {
        const row = Math.floor(index / n);
        const col = index % n;
        const x = col * tileSize;
        const y = row * tileSize;

        if (value !== 0) {
          drawRoundedRect(
            ctx,
            x + 10,
            y + 10,
            tileSize - 20,
            tileSize - 20,
            "#1a1830",
            20,
          );

          const centerX = x + tileSize / 2;
          const centerY = y + tileSize / 2;

          drawText(
            ctx,
            value.toString(),
            centerX,
            centerY,
            "#e8eaf0",
            "center",
            "middle",
            `${tileSize / 3}px monospace`,
          );
        }
      });
    },
    [grid, n],
  );

  const canvasRef = useResizableCanvas(renderCanvas);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const currentTileSize = rect.width / n;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const index = getIndexFromGridClick(n, currentTileSize, mouseX, mouseY);
    if (index >= 0 && index < n * n) {
      onTileClick(index);
    }
  };

  return <canvas ref={canvasRef} onClick={handleClick} />;
};

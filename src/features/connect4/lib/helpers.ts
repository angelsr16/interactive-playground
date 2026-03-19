import { drawCircle } from "../../../lib/canvas";
import type { BoardDimensions } from "../models/BoardRect";

export const drawBoard = (
  canvasContext: CanvasRenderingContext2D,
  grid: number[][],
  boardWidth: number,
  boardHeight: number,
  cellSize: number,
) => {
  const radius = (cellSize / 2) * 0.8;

  canvasContext.fillStyle = "#2657e3";
  canvasContext.fillRect(0, 0, boardWidth, boardHeight);
  canvasContext.globalCompositeOperation = "destination-out";

  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 6; row++) {
      const x = cellSize * col + cellSize / 2;
      const y = cellSize * row + cellSize / 2;
      drawCircle(canvasContext, x, y, radius);
    }
  }

  canvasContext.globalCompositeOperation = "source-over";

  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 6; row++) {
      const cell = grid[row][col];
      if (cell === 0) continue;

      const x = cellSize * col + cellSize / 2;
      const y = cellSize * row + cellSize / 2;
      const color = cell === 1 ? "#FF2A00" : "#FBFF00";
      drawCircle(canvasContext, x, y, radius, color);
    }
  }
};

export const getColumnIndex = (
  event: React.MouseEvent<HTMLCanvasElement>,
  boardDimensions: BoardDimensions,
) => {
  const { x, cellSize } = boardDimensions;

  const mouseXPosition = event.nativeEvent.offsetX - x;
  Math.floor(mouseXPosition / cellSize);
};

export const getAvailableRowIndexFromCol = (
  grid: number[][],
  columnIndex: number,
) => {
  for (let rowIndex = grid.length - 1; rowIndex >= 0; rowIndex--) {
    const cell = grid[rowIndex][columnIndex];
    if (cell === 0) return rowIndex;
  }

  return -1;
};

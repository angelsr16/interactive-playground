import { drawCircle } from "../../../lib/canvas";
import type { BoardDimensions } from "../models/BoardRect";
import { PIECE_COLORS, type PieceType } from "../models/Player";

export const drawBoard = (
  canvasContext: CanvasRenderingContext2D,
  grid: number[][],
  boardWidth: number,
  boardHeight: number,
  cellSize: number,
) => {
  const radius = (cellSize / 2) * 0.8;
  canvasContext.clearRect(0, 0, boardWidth, boardHeight);

  canvasContext.globalCompositeOperation = "source-over";
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = grid[row][col];
      if (cell !== 0) {
        const x = cellSize * col + cellSize / 2;
        const y = cellSize * row + cellSize / 2;
        const color = PIECE_COLORS[cell as PieceType];
        drawCircle(canvasContext, x, y, radius, color);
      }
    }
  }

  canvasContext.fillStyle = "#1e2330";

  canvasContext.globalCompositeOperation = "destination-over";
  canvasContext.fillRect(0, 0, boardWidth, boardHeight);

  canvasContext.globalCompositeOperation = "destination-out";
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (grid[row][col] === 0) {
        const x = cellSize * col + cellSize / 2;
        const y = cellSize * row + cellSize / 2;
        drawCircle(canvasContext, x, y, radius);
      }
    }
  }

  // Always reset to default
  canvasContext.globalCompositeOperation = "source-over";
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

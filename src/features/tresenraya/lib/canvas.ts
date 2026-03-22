import { drawCircle, drawLine } from "../../../lib/canvas";

export const drawBoard = (
  canvasContext: CanvasRenderingContext2D,
  board: number[][],
  boardWidth: number,
  boardHeight: number,
  cellSize: number,
) => {
  canvasContext.clearRect(0, 0, boardWidth, boardHeight);

  canvasContext.fillStyle = "#1e2330";
  canvasContext.fillRect(0, 0, boardWidth, boardHeight);

  drawLine(canvasContext, cellSize, 0, cellSize, boardHeight, 3, "#fff");
  drawLine(
    canvasContext,
    cellSize * 2,
    0,
    cellSize * 2,
    boardHeight,
    3,
    "#fff",
  );

  drawLine(canvasContext, 0, cellSize, boardWidth, cellSize, 3, "#fff");
  drawLine(canvasContext, 0, cellSize * 2, boardWidth, cellSize * 2, 3, "#fff");

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = board[row][col];

      const x = col * cellSize;
      const y = row * cellSize;
      const padding = cellSize * 0.15;

      if (cell === 1) {
        // Draw X
        drawX(canvasContext, x, y, padding, cellSize);
      }

      if (cell === 2) {
        // Draw O
        drawO(canvasContext, x, y, padding, cellSize);
      }
    }
  }
};

const drawX = (
  canvasContext: CanvasRenderingContext2D,
  x: number,
  y: number,
  padding: number,
  cellSize: number,
) => {
  drawLine(
    canvasContext,
    x + padding,
    y + padding,
    x + cellSize - padding,
    y + cellSize - padding,
    10,
    "#00f",
  );
  drawLine(
    canvasContext,
    x + cellSize - padding,
    y + padding,
    x + padding,
    y + cellSize - padding,
    10,
    "#00f",
  );
};

const drawO = (
  canvasContext: CanvasRenderingContext2D,
  x: number,
  y: number,
  padding: number,
  cellSize: number,
) => {
  const centerX = x + cellSize / 2;
  const centerY = y + cellSize / 2;
  const radius = cellSize / 2 - padding;

  drawCircle(canvasContext, centerX, centerY, radius, "", 10, "#f00");
};

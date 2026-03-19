export const getCanvasContext = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dpr = window.devicePixelRatio || 1;
  const size = canvas.width / dpr;
  const logicalSize = size;

  return {
    ctx,
    logicalSize,
    dpr,
    canvasWidth: canvas.width,
    canvasHeight: canvas.height,
  };
};

export const drawCircle = (
  canvasContext: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fillColor?: string,
  lineWidth?: number,
  strokeColor?: string,
) => {
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
  canvasContext.fillStyle = fillColor ? fillColor : "";
  canvasContext.fill();
  canvasContext.lineWidth = lineWidth ? lineWidth : 0;
  canvasContext.strokeStyle = strokeColor ? strokeColor : "";
  canvasContext.stroke();
};

export const drawText = (
  canvasContext: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  alignment: CanvasTextAlign,
  textBaseAlign: CanvasTextBaseline,
  font: string,
) => {
  canvasContext.textAlign = alignment;
  canvasContext.textBaseline = textBaseAlign;
  canvasContext.font = font;
  canvasContext.fillStyle = color;
  canvasContext.fillText(text, x, y);
};

export const drawRoundedRect = (
  canvasContext: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string,
  radius: number,
) => {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.roundRect(x, y, width, height, radius);
  canvasContext.fill();
};

export const getGridIndexFromClick = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
  gridSize: number,
) => {
  const rect = canvas.getBoundingClientRect();
  const currentTileSize = rect.width / gridSize;
  const { mouseX, mouseY } = getMousePositionFromEvent(event, rect);
  return getIndexFromGridClick(gridSize, currentTileSize, mouseX, mouseY);
};

export const getMousePositionFromEvent = (
  event: React.MouseEvent<HTMLCanvasElement>,
  rect: DOMRect,
) => {
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  return { mouseX, mouseY };
};

export const getIndexFromGridClick = (
  n: number,
  tileSize: number,
  mouseX: number,
  mouseY: number,
): number => {
  const col = Math.floor(mouseX / tileSize);
  const row = Math.floor(mouseY / tileSize);
  if (row < 0 || row >= n || col < 0 || col >= n) return -1;
  return row * n + col;
};

export const getGridIndexFromRowAndCol = (
  row: number,
  col: number,
  gridSize: number,
): number => {
  return row * gridSize + col;
};

export const getRowAndColFromIndex = (gridSize: number, index: number) => {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  return { row, col };
};

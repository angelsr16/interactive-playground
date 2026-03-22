export type Cell = 0 | 1 | 2; // 0 empty, 1=x, 2=o

export type Board = Cell[][];

export interface GridPosition {
  x: number;
  y: number;
}

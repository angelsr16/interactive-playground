export class Cell {
  index: number;
  parent: Cell | null;
  fCost: number;
  gCost: number;
  hCost: number;
  constructor(index: number, parent?: Cell) {
    this.parent = parent ? parent : null;

    this.index = index;

    this.fCost = Infinity;
    this.gCost = Infinity;
    this.hCost = 0;
  }
}

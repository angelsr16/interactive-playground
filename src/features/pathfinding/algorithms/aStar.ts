import { Heapq } from "ts-heapq";
import {
  getGridIndexFromRowAndCol,
  getRowAndColFromIndex,
} from "../../../lib/canvas";
import { FRONTIER_CELL, VISITED_CELL } from "../constants/constants";
import {
  getDirections,
  getHeuristic,
  getVelocity,
  isCellValid,
  isDiagonalMoveValid,
  isUnblocked,
} from "../lib/helpers";
import { Cell } from "../models/Cell";
import { sleep } from "../../../lib/helpers";
import type { SearchOptions } from "../models/SearchOptions";

type Node = [number, number, number, number];

export const aStar = async (
  grid: number[],
  origin: number,
  target: number,
  gridSize: number,
  onUpdateCell: (index: number, newValue: number) => void,
  options: SearchOptions,
): Promise<Cell | null> => {
  const { row: startRow, col: startCol } = getRowAndColFromIndex(
    gridSize,
    origin,
  );
  const { row: targetRow, col: targetCol } = getRowAndColFromIndex(
    gridSize,
    target,
  );

  const closedList: boolean[][] = Array.from({ length: gridSize }, () =>
    new Array(gridSize).fill(false),
  );
  const cellDetails: Cell[][] = Array.from({ length: gridSize }, (_, row) =>
    Array.from(
      { length: gridSize },
      (_, col) => new Cell(getGridIndexFromRowAndCol(row, col, gridSize)),
    ),
  );

  cellDetails[startRow][startCol].fCost = 0;
  cellDetails[startRow][startCol].gCost = 0;
  cellDetails[startRow][startCol].hCost = 0;
  cellDetails[startRow][startCol].parent = null;

  const openList = new Heapq<Node>([], (a: Node, b: Node) => {
    if (a[0] === b[0]) {
      return a[1] < b[1]; // menor hCost primero
    }
    return a[0] < b[0];
  });
  openList.push([0.0, 0.0, startRow, startCol]);

  while (openList.length() > 0) {
    const [f, h, row, col] = openList.pop();
    console.log(f);
    console.log(h);

    const index = getGridIndexFromRowAndCol(row, col, gridSize);
    onUpdateCell(index, VISITED_CELL);

    if (options.velocity !== "instant") {
      await sleep(getVelocity(options.velocity));
    }

    closedList[row][col] = true;

    const directions: number[][] = getDirections(options.movements);

    for (const direction of directions) {
      const newRow = row + direction[0];
      const newCol = col + direction[1];

      if (
        isCellValid(newRow, newCol, gridSize) &&
        isUnblocked(grid, newRow, newCol, gridSize) &&
        !closedList[newRow][newCol] &&
        isDiagonalMoveValid(grid, row, col, newRow, newCol, gridSize)
      ) {
        onUpdateCell(
          getGridIndexFromRowAndCol(newRow, newCol, gridSize),
          FRONTIER_CELL,
        );

        if (options.velocity !== "instant") {
          await sleep(getVelocity(options.velocity));
        }

        if (newRow === targetRow && newCol === targetCol) {
          cellDetails[newRow][newCol].parent = cellDetails[row][col];
          return cellDetails[row][col];
        } else {
          const newGCost = cellDetails[row][col].gCost + 1.0;
          const newHCost = getHeuristic(
            newRow,
            newCol,
            target,
            gridSize,
            options.heuristic,
          );
          const newFCost = newGCost + newHCost;

          if (
            cellDetails[newRow][newCol].fCost == Infinity ||
            cellDetails[newRow][newCol].fCost > newFCost
          ) {
            openList.push([newFCost, newHCost, newRow, newCol]);

            cellDetails[newRow][newCol].fCost = newFCost;
            cellDetails[newRow][newCol].gCost = newGCost;
            cellDetails[newRow][newCol].hCost = newHCost;
            cellDetails[newRow][newCol].parent = cellDetails[row][col];
          }
        }
      }
    }
  }

  return null;
};

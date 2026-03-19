import { Heapq } from "ts-heapq";
import { Moves, type Move } from "../constants/Moves";
import { moveTile } from "../lib/helpers";
import { heuristic } from "../lib/heuristic";
import type { PuzzleState } from "../models/PuzzleState";

const aStar = (
  startGrid: number[],
  goalState: number[],
): PuzzleState | null => {
  const comparator = (a: PuzzleState, b: PuzzleState) => a.cost < b.cost;
  const openList = new Heapq<PuzzleState>([], comparator);

  const closedList = new Set<string>();

  const startPuzzleState: PuzzleState = {
    board: startGrid,
    parent: null,
    move: null,
    depth: 0,
    cost: 0,
  };
  openList.push(startPuzzleState);

  while (openList.length() > 0) {
    const currentState = openList.pop();

    if (JSON.stringify(currentState.board) === JSON.stringify(goalState)) {
      return currentState;
    }

    closedList.add(JSON.stringify(currentState.board));

    const blankPosition = currentState.board.indexOf(0);

    const moveKeys = Object.keys(Moves) as Move[];
    for (const move of moveKeys) {
      if (move == "Arriba" && blankPosition < 3) continue;
      if (move == "Abajo" && blankPosition > 5) continue;
      if (move == "Izquierda" && blankPosition % 3 == 0) continue;
      if (move == "Derecha" && blankPosition % 3 == 2) continue;

      const newBoard = moveTile(currentState.board, move, blankPosition);

      if (closedList.has(JSON.stringify(newBoard))) continue;

      const newPuzzleState: PuzzleState = {
        board: newBoard,
        parent: currentState,
        move: move,
        depth: currentState.depth + 1,
        cost: currentState.depth + 1 + heuristic(newBoard),
      };

      openList.push(newPuzzleState);
    }
  }

  return null;
};

export default aStar;

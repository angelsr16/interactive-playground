import type { Move } from "../constants/Moves";

export interface PuzzleState {
  board: number[];
  parent: PuzzleState | null;
  move: Move | null;
  depth: number;
  cost: number;
}

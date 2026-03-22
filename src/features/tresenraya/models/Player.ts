export type PlayerType = "human" | "ai";
export const PIECE_REPRESENTATION = {
  1: "X",
  2: "O",
} as const;

export type PieceType = 1 | 2;
export type PieceRepresentation = (typeof PIECE_REPRESENTATION)[PieceType];

export interface Player {
  type: PlayerType;
  piece: PieceType;
}

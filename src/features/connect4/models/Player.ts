export type PlayerType = "human" | "ai";
export const PIECE_COLORS = {
  1: "#FF2A00",
  2: "#FBFF00",
} as const;

export type PieceType = keyof typeof PIECE_COLORS;
export type PieceColor = (typeof PIECE_COLORS)[PieceType];

export interface Player {
  type: PlayerType;
  piece: PieceType;
}

export const Moves = {
  Arriba: -3,
  Abajo: 3,
  Izquierda: -1,
  Derecha: 1,
} as const;
export type Move = keyof typeof Moves;

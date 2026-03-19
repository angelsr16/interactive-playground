export type Heuristic = "manhattan" | "euclidean";
export type MovementType = "4dir" | "8dir";
export type Algorithms = "aStar";
export type Velocity = "slow" | "normal" | "fast" | "instant";

export interface SearchOptions {
  heuristic: Heuristic;
  movements: MovementType;
  searchAlgorithm: Algorithms;
  velocity: Velocity;
}

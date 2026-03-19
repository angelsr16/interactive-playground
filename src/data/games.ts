export type Tag =
  | "IA"
  | "Puzzle"
  | "Tablero"
  | "3D"
  | "Canvas"
  | "Clásico"
  | "Multijugador"
  | "Demo";
export type Accent = "plasma" | "matrix" | "danger" | "amber" | "ice";

export interface Game {
  id: string;
  title: string;
  description: string;
  route: string;
  tags: Tag[];
}

export const GAMES: Game[] = [
  {
    id: "eightPuzzle",
    title: "8 Puzzle",
    description:
      "Ordena los 8 números deslizando piezas en el espacio vacío. Activa el solver y observa cómo A* encuentra el camino óptimo hacia la solución.",
    route: "/eightpuzzle",
    tags: ["Tablero", "IA"],
  },
];

export const TAG_ALL = "Todos";
export const ALL_TAGS = [
  TAG_ALL,
  "IA",
  "Puzzle",
  "Tablero",
  "Clásico",
  "3D",
  "Canvas",
  "Demo",
] as const;

export const accentMap = {
  plasma: {
    badge: "bg-plasma-900 text-plasma-300",
    border: "border-plasma-700/40",
    text: "text-plasma-400",
    glow: "0 0 30px rgba(108,99,255,0.18)",
    dot: "#6C63FF",
    barBg: "bg-plasma-400",
  },
  matrix: {
    badge: "bg-matrix-900 text-matrix-300",
    border: "border-matrix-700/40",
    text: "text-matrix-400",
    glow: "0 0 30px rgba(0,212,170,0.15)",
    dot: "#00D4AA",
    barBg: "bg-matrix-400",
  },
  danger: {
    badge: "bg-danger-900 text-danger-300",
    border: "border-danger-700/40",
    text: "text-danger-400",
    glow: "0 0 30px rgba(255,107,107,0.15)",
    dot: "#FF6B6B",
    barBg: "bg-danger-400",
  },
  amber: {
    badge: "bg-amber-900 text-amber-300",
    border: "border-amber-700/40",
    text: "text-amber-400",
    glow: "0 0 30px rgba(255,179,71,0.15)",
    dot: "#FFB347",
    barBg: "bg-amber-400",
  },
  ice: {
    badge: "bg-ice-900 text-ice-300",
    border: "border-ice-700/40",
    text: "text-ice-400",
    glow: "0 0 30px rgba(79,195,247,0.15)",
    dot: "#4FC3F7",
    barBg: "bg-ice-400",
  },
} satisfies Record<Accent, Record<string, string>>;

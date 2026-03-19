export const EMPTY_CELL = 0;
export const WALL_CELL = 1;
export const START_CELL = 2;
export const END_CELL = 3;
export const VISITED_CELL = 4;
export const PATH_CELL = 5;
export const FRONTIER_CELL = 6;

export type MazeTheme = "cyberpunk" | "neon" | "matrix" | "lava" | "ice";

interface ThemeColors {
  background: string;
  empty: string;
  wall: string;
  start: string;
  end: string;
  grid: string;
  // Algorithm visualization
  visited: string;
  frontier: string;
  path: string;
}

export const MAZE_THEMES: Record<MazeTheme, ThemeColors> = {
  cyberpunk: {
    background: "#0d1b2a",
    empty: "#1a2a3a",
    wall: "#111111",
    start: "#0088ff",
    end: "#ff2222",
    grid: "#1e3a5f",
    visited: "#1a4a6a",
    frontier: "#00ccff",
    path: "#ffe600",
  },
  neon: {
    background: "#12001f",
    empty: "#1a0030",
    wall: "#6600cc",
    start: "#00ffcc",
    end: "#ff00ff",
    grid: "#2a0044",
    visited: "#3d0080",
    frontier: "#cc00ff",
    path: "#ffee00",
  },
  matrix: {
    background: "#000000",
    empty: "#001a00",
    wall: "#003300",
    start: "#00ff00",
    end: "#ffff00",
    grid: "#001a00",
    visited: "#004d00",
    frontier: "#00cc00",
    path: "#ffffff",
  },
  lava: {
    background: "#1a0a00",
    empty: "#2a1000",
    wall: "#cc3300",
    start: "#ffaa00",
    end: "#ffffff",
    grid: "#2a1000",
    visited: "#660000",
    frontier: "#ff6600",
    path: "#ffee00",
  },
  ice: {
    background: "#e8f4f8",
    empty: "#f0f8ff",
    wall: "#2c3e50",
    start: "#3498db",
    end: "#e74c3c",
    grid: "#b8d4e0",
    visited: "#aed6f1",
    frontier: "#5dade2",
    path: "#f39c12",
  },
};

export const DEFAULT_THEME: MazeTheme = "cyberpunk";

export const getTheme = (theme: MazeTheme = DEFAULT_THEME): ThemeColors =>
  MAZE_THEMES[theme];

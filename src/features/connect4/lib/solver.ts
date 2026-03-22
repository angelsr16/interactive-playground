import type { Board, Cell } from "../models/Board";
import { applyMove, getAvailableRow, getEmptyCell } from "./helpers";

interface WindowInfo {
  playerCount: number;
  opponentCount: number;
  emptyCount: number;
}

type TTEntry = {
  depth: number;
  score: number;
  flag: "EXACT" | "LOWERBOUND" | "UPPERBOUND";
};

const ROWS = 6;
const COLS = 7;

const COL_WEIGHT = [1, 3, 5, 9, 5, 3, 1] as const;
const ORDER = [3, 2, 4, 1, 5, 0, 6];

const WIN_SCORE = Infinity;
const TT = new Map<string, TTEntry>();

const OPEN_WINDOW_SCORE: Record<number, number> = {
  2: 15, // two in a row, two open
  3: 150, // three in a row, one open  — much more valuable than before
  4: 100_000, // four in a row — handled separately but kept for safety
};

const ODD_ROW_THREAT_BONUS = 20;

const hashBoard = (board: Board): string => board.flat().join("");

const isWinningMove = (board: Board, player: Cell): boolean => {
  // horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row][col + 1] === player &&
        board[row][col + 2] === player &&
        board[row][col + 3] === player
      )
        return true;
    }
  }

  // vertical
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      if (
        board[row][col] === player &&
        board[row + 1][col] === player &&
        board[row + 2][col] === player &&
        board[row + 3][col] === player
      )
        return true;
    }
  }

  // diagonal /
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row + 1][col + 1] === player &&
        board[row + 2][col + 2] === player &&
        board[row + 3][col + 3] === player
      )
        return true;
    }
  }

  // diagonal \
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      if (
        board[row][col] === player &&
        board[row - 1][col + 1] === player &&
        board[row - 2][col + 2] === player &&
        board[row - 3][col + 3] === player
      )
        return true;
    }
  }

  return false;
};

const isPlayable = (board: Board, row: number, col: number): boolean => {
  return row === ROWS - 1 || board[row + 1][col] !== 0;
};

const isTerminal = (board: Board): boolean => {
  return (
    isWinningMove(board, 1) ||
    isWinningMove(board, 2) ||
    board[0].every((cell) => cell !== 0)
  );
};

const analyzeWindow = (
  window: Cell[],
  player: Cell,
  opponent: Cell,
): WindowInfo => {
  let playerCount = 0;
  let opponentCount = 0;
  let emptyCount = 0;

  for (const cell of window) {
    if (cell === player) playerCount++;
    else if (cell === opponent) opponentCount++;
    else emptyCount++;
  }

  return { playerCount, opponentCount, emptyCount };
};

const scoreWindow = (
  window: Cell[],
  player: Cell,
  opponent: Cell,
  board: Board,
  empty?: { row: number; col: number },
): number => {
  const { playerCount, opponentCount, emptyCount } = analyzeWindow(
    window,
    player,
    opponent,
  );

  // Mixed window -> useless [O X O .] - Can never become a 4 in a row
  if (playerCount > 0 && opponentCount > 0) return 0;

  if (opponentCount === 3 && emptyCount === 1) {
    if (empty && isPlayable(board, empty.row, empty.col)) return -2500;
    return -500; // weaker if not immediately playable
  }

  if (opponentCount === 2 && emptyCount === 2) return -50;

  // ── Player opportunities
  if (playerCount === 4) return WIN_SCORE;

  if (playerCount === 3 && emptyCount === 1) {
    if (!empty) return 0;

    const playable = isPlayable(board, empty.row, empty.col);
    if (!playable) return 20; // weak future potential

    const base = OPEN_WINDOW_SCORE[3];
    const parityBonus = empty.row % 2 === 1 ? ODD_ROW_THREAT_BONUS : 0;
    return base + parityBonus;
  }

  if (playerCount === 2 && emptyCount === 2) {
    return OPEN_WINDOW_SCORE[2];
  }

  return 0;
};

const countWinningMoves = (board: Board, player: Cell): number => {
  let winsCount = 0;
  for (let col = 0; col < COLS; col++) {
    const row = getAvailableRow(board, col);
    if (row === -1) continue;

    (board[row][col] as Cell) = player;
    if (isWinningPosition(board, player, row, col)) winsCount++;
    (board[row][col] as Cell) = 0;
  }
  return winsCount;
};

const isWinningPosition = (
  board: Board,
  player: Cell,
  row: number,
  col: number,
): boolean => {
  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of directions) {
    let winsCount = 1;

    // Forward
    for (let step = 1; step < 4; step++) {
      const r = row + dr * step;
      const c = col + dc * step;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player)
        break;
      winsCount++;
    }

    // Backward
    for (let step = 1; step < 4; step++) {
      const r = row - dr * step;
      const c = col - dc * step;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || board[r][c] !== player)
        break;
      winsCount++;
    }

    if (winsCount >= 4) return true;
  }

  return false;
};

const verticalStackBonus = (
  board: Board,
  player: Cell,
  opponent: Cell,
): number => {
  let bonus = 0;

  for (let c = 0; c < COLS; c++) {
    const threatRows = new Set<number>();

    for (let r = 0; r <= ROWS - 4; r++) {
      const window = [
        board[r][c],
        board[r + 1][c],
        board[r + 2][c],
        board[r + 3][c],
      ];

      const { playerCount, opponentCount, emptyCount } = analyzeWindow(
        window,
        player,
        opponent,
      );

      if (playerCount === 3 && opponentCount === 0 && emptyCount === 1) {
        const emptyIndex = window.findIndex((c) => c === 0);
        const emptyRow = r + emptyIndex;

        const isPlayable =
          emptyRow === ROWS - 1 || board[emptyRow + 1][c] !== 0;

        if (isPlayable) {
          threatRows.add(emptyRow);
        }
      }
    }

    if (threatRows.size >= 2) {
      bonus += 50 * threatRows.size;
    }
  }

  return bonus;
};

const scorePosition = (board: Board, player: Cell): number => {
  const opponent = (player === 1 ? 2 : 1) as Cell;
  let score = 0;

  // 1. Immediate win / double-threat detection
  const playerWins = countWinningMoves(board, player);
  const opponentWins = countWinningMoves(board, opponent);

  if (playerWins >= 1) {
    score += 10_000 + playerWins * 500;
  }
  if (opponentWins >= 2) {
    score -= 15_000;
  } else if (opponentWins === 1) score -= 12_000;

  // 2. Column-weighted center control
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === player) score += COL_WEIGHT[col] * (ROWS - row);
      if (board[row][col] === opponent) score -= COL_WEIGHT[col] * (ROWS - row);
    }
  }

  // 3. Windows
  // Horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row][col + 1],
        board[row][col + 2],
        board[row][col + 3],
      ];

      const empty = getEmptyCell(window, row, col, 0, 1);

      score += scoreWindow(window, player, opponent, board, empty);
    }
  }

  // Vertical
  for (let col = 0; col < COLS; col++) {
    for (let row = 0; row < ROWS - 3; row++) {
      const window = [
        board[row][col],
        board[row + 1][col],
        board[row + 2][col],
        board[row + 3][col],
      ];

      const empty = getEmptyCell(window, row, col, 1, 0);

      score += scoreWindow(window, player, opponent, board, empty);
    }
  }

  // Diagonal down-right
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row + 1][col + 1],
        board[row + 2][col + 2],
        board[row + 3][col + 3],
      ];

      const empty = getEmptyCell(window, row, col, 1, 1);

      score += scoreWindow(window, player, opponent, board, empty);
    }
  }

  // Diagonal up-right
  for (let row = 3; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const window = [
        board[row][col],
        board[row - 1][col + 1],
        board[row - 2][col + 2],
        board[row - 3][col + 3],
      ];

      const empty = getEmptyCell(window, row, col, -1, 1);

      score += scoreWindow(window, player, opponent, board, empty);
    }
  }

  // 4. Vertical stack bonus
  score += verticalStackBonus(board, player, opponent);
  score -= verticalStackBonus(board, opponent, player);

  return score;
};

const minimax = (
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  player: Cell,
): number => {
  const key = hashBoard(board);
  const entry = TT.get(key);
  const originalAlpha = alpha;

  if (entry && entry.depth >= depth) {
    if (entry.flag === "EXACT") return entry.score;
    if (entry.flag === "LOWERBOUND") alpha = Math.max(alpha, entry.score);
    if (entry.flag === "UPPERBOUND") beta = Math.min(beta, entry.score);
    if (alpha >= beta) return entry.score;
  }

  const opponent = player === 1 ? 2 : 1;

  if (isWinningMove(board, player)) return WIN_SCORE;
  if (isWinningMove(board, opponent)) return -WIN_SCORE;

  if (depth === 0 || isTerminal(board)) {
    return scorePosition(board, player);
  }

  let score: number;

  if (maximizing) {
    score = -Infinity;

    for (const col of ORDER) {
      const row = getAvailableRow(board, col);
      if (row === -1) continue;

      const newBoard = applyMove(board, row, col, player);
      const evalScore = minimax(
        newBoard,
        depth - 1,
        alpha,
        beta,
        false,
        player,
      );

      score = Math.max(score, evalScore);
      alpha = Math.max(alpha, score);

      if (alpha >= beta) break;
    }
  } else {
    score = Infinity;

    for (const col of ORDER) {
      const row = getAvailableRow(board, col);
      if (row === -1) continue;

      const newBoard = applyMove(board, row, col, opponent);
      const evalScore = minimax(newBoard, depth - 1, alpha, beta, true, player);

      score = Math.min(score, evalScore);
      beta = Math.min(beta, score);

      if (alpha >= beta) break;
    }
  }

  let flag: TTEntry["flag"];

  if (score <= originalAlpha) flag = "UPPERBOUND";
  else if (score >= beta) flag = "LOWERBOUND";
  else flag = "EXACT";

  TT.set(key, { depth, score, flag });

  return score;
};

export const getBestMove = (
  board: Board,
  player: Cell,
  depth: number,
): number => {
  TT.clear();
  depth = 10;

  let bestScore = -Infinity;
  let bestCol = 3;

  for (const col of ORDER) {
    const row = getAvailableRow(board, col);
    if (row === -1) continue;

    const newBoard = applyMove(board, row, col, player);
    const score = minimax(
      newBoard,
      depth - 1,
      -Infinity,
      Infinity,
      false,
      player,
    );

    if (score > bestScore) {
      bestScore = score;
      bestCol = col;
    }
  }

  return bestCol;
};

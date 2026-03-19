export const heuristic = (board: number[]): number => {
  let distance = 0;
  for (let i = 0; i < 9; i++) {
    if (board[i] !== 0) {
      const x1 = Math.floor(i / 3);
      const y1 = i % 3;
      const x2 = Math.floor((board[i] - 1) / 3);
      const y2 = (board[i] - 1) % 3;
      distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
  }
  return distance;
};

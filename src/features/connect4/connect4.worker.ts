import { getBestMove } from "./lib/solver";

self.onmessage = async (e: MessageEvent) => {
  const { board, player, depth } = e.data;

  const result = getBestMove(board, player, depth);

  self.postMessage({ type: "DONE", result });
};

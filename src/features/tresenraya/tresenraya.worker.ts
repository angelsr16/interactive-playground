import { getBestMove } from "./lib/solver";

self.onmessage = async (e: MessageEvent) => {
  const { board, player } = e.data;

  const result = getBestMove(board, player);

  self.postMessage({ type: "DONE", result });
};

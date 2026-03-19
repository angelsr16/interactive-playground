import { aStar } from "./algorithms/aStar";

self.onmessage = async (e: MessageEvent) => {
  const { origin, target, grid, gridSize, options } = e.data;

  const result = await aStar(
    grid,
    origin,
    target,
    gridSize,
    (index: number, newValue: number) => {
      self.postMessage({ type: "EDGE", index, newValue });
    },
    options,
  );

  self.postMessage({ type: "DONE", result });
};

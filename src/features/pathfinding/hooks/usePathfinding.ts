import { useEffect, useRef, useState } from "react";
import { Cell } from "../models/Cell";
import type { SearchOptions } from "../models/SearchOptions";

export const usePathfinding = ({
  grid,
  gridSize,
  updateCell,
}: {
  grid: number[];
  gridSize: number;
  updateCell: (index: number, newValue: number) => void;
}) => {
  const workerRef = useRef<Worker | null>(null);
  const [searchAlgorithm, setSearchAlgorithm] = useState("A*");

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../pathfinding.worker.ts", import.meta.url),
      { type: "module" },
    );

    // workerRef.current.onmessage = (e: MessageEvent) => {
    //   console.log(e.data);
    // };

    return () => workerRef.current?.terminate();
  }, []);

  const searchPath = (
    origin: number,
    target: number,
    options: SearchOptions,
  ): Promise<Cell | null> => {
    return new Promise((resolve) => {
      if (!workerRef.current) return resolve(null);

      workerRef.current.onmessage = async (e: MessageEvent) => {
        const { type, result, index, newValue } = e.data;

        if (type === "EDGE") {
          updateCell(index, newValue);
        } else if (type === "DONE") {
          resolve(result);
        }
      };

      workerRef.current.postMessage({
        grid,
        origin,
        target,
        gridSize,
        options,
      });
    });
  };

  // const searchPath = async (
  //   origin: number,
  //   target: number,
  // ): Promise<Cell | null> => {
  //   workerRef.current?.postMessage({
  //     grid,
  //     origin,
  //     target,
  //     gridSize,
  //     updateCell,
  //   });
  //   return await aStar(grid, origin, target, gridSize, updateCell);
  // };

  return { searchPath, searchAlgorithm, setSearchAlgorithm };
};

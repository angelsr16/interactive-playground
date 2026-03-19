import { type Dispatch, type SetStateAction } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { PuzzleState } from "../models/PuzzleState";

export const StepControls = ({
  path,
  setGrid,
  currentPathIndex,
  setCurrentPathIndex,
}: {
  path: PuzzleState[];
  setGrid: (grid: number[]) => void;
  currentPathIndex: number;
  setCurrentPathIndex: Dispatch<SetStateAction<number>>;
}) => {
  const handlePrevio = () => {
    if (currentPathIndex - 1 >= 0) {
      setGrid(path[currentPathIndex - 1].board);
      setCurrentPathIndex((prev) => prev - 1);
    }
  };

  const handleSiguiente = () => {
    if (currentPathIndex + 1 < path.length) {
      setGrid(path[currentPathIndex + 1].board);
      setCurrentPathIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full flex gap-4 items-center justify-between">
      <button
        className="custom-button flex-1 flex justify-center gap-1 items-center uppercase"
        onClick={handlePrevio}
      >
        <FaChevronLeft />
        Previo
      </button>

      <button
        className="custom-button flex-1 flex justify-center gap-1 items-center uppercase"
        onClick={handleSiguiente}
      >
        Siguiente
        <FaChevronRight />
      </button>
    </div>
  );
};

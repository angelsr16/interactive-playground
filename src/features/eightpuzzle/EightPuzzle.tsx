import { useState } from "react";
import { TbArrowsRandom, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { PuzzleCanvas } from "./components/PuzzleCanvas";
import { StepControls } from "./components/StepControls";
import { useEightPuzzle } from "./hooks/useEightPuzzle";
import { getRandomPuzzle } from "./lib/helpers";
import { GoalState } from "./constants/GoalState";

export const EightPuzzle = () => {
  const { grid, solve, path, setPath, setGrid, moveTile } = useEightPuzzle();
  const [currentPathIndex, setCurrentPathIndex] = useState(0);

  const handleRandomizeGrid = () => {
    setGrid(getRandomPuzzle());
    setPath([]);
    setCurrentPathIndex(0);
  };

  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-20">
      <div className="w-full aspect-square place-self-center flex flex-col gap-4">
        <PuzzleCanvas
          grid={grid}
          onTileClick={(index) => {
            moveTile(index);
          }}
          n={3}
        />
      </div>

      <div className="bg-surface p-8 rounded-xl overflow-y-auto flex flex-col gap-5">
        <div className="flex gap-5 w-full justify-between">
          <button
            onClick={() => handleRandomizeGrid()}
            className="custom-button flex-1 flex gap-2 justify-center items-center uppercase"
          >
            Aleatorizar <TbArrowsRandom size={18} />
          </button>

          <button
            onClick={() => solve()}
            className="custom-button flex-1 flex gap-2 justify-center items-center uppercase"
          >
            Resolver <TbRosetteDiscountCheckFilled size={18} />
          </button>
        </div>

        <div className="flex gap-5 justify-between">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="">Initial State</label>
            <input
              disabled
              className="custom-input"
              type="text"
              value={grid.join("")}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="">Goal State</label>
            <input
              disabled
              className="custom-input"
              type="text"
              value={GoalState.join("")}
            />
          </div>
        </div>
        {path.length > 0 && (
          <>
            <h3 className="font-bold text-xl mb-2">Resultado de búsqueda</h3>
            <p className="text-text-primary mb-1">
              <strong>Movimientos:</strong> {path.length}
            </p>
            <div className="flex items-center flex-wrap gap-3">
              {path.map((state, index) => (
                <div key={index}>
                  <div
                    onClick={() => {
                      setGrid(path[index].board);
                      setCurrentPathIndex(index);
                    }}
                    className={`px-3 cursor-pointer py-1 border border-plasma-500/80 hover:bg-plasma/40 transition-all duration-200 ${currentPathIndex === index ? "bg-plasma/70" : "bg-plasma/10"} rounded-sm`}
                  >
                    <div className="text-text-primary text-xs text-center">
                      {state.move !== null ? state.move.slice(0, 3) : "Inicio"}
                    </div>
                  </div>
                  {/* {index < path.length - 1 && (
                    <span className="text-text-primary text-xs">→</span>
                  )} */}
                </div>
              ))}
            </div>

            {/* <hr className="text-plasma-500 mt-5" /> */}

            <StepControls
              currentPathIndex={currentPathIndex}
              setCurrentPathIndex={setCurrentPathIndex}
              path={path}
              setGrid={setGrid}
            />
          </>
        )}
      </div>
    </div>
  );
};

import { useState } from "react";
import { BsFillEraserFill } from "react-icons/bs";
import { GrClearOption } from "react-icons/gr";
import { MdDraw } from "react-icons/md";
import { PlaygroundCanvas } from "./components/PlaygroundCanvas";
import {
  DEFAULT_THEME,
  PATH_CELL,
  type MazeTheme,
} from "./constants/constants";
import { useLogicalGrid } from "./hooks/useLogicalGrid";
import { useMazeGenerator, type MazeGenerator } from "./hooks/useMazeGenerator";
import { usePathfinding } from "./hooks/usePathfinding";
import type { Cell } from "./models/Cell";
import { sleep } from "../../lib/helpers";

export const Pathfinding = () => {
  const [mazeTheme, setMazeTheme] = useState<MazeTheme>(DEFAULT_THEME);

  const {
    grid,
    setGrid,
    gridSize,
    resetGrid,
    selectCell,
    isDrawing,
    setIsDrawing,
    updateCell,
    startIndex,
    endIndex,
  } = useLogicalGrid(25);

  const { generateMaze, mazeGeneratorAlgorithm, setMazeGeneratorAlgorithm } =
    useMazeGenerator({ gridSize });
  const { searchPath, searchAlgorithm, setSearchAlgorithm } = usePathfinding({
    grid,
    gridSize,
    updateCell,
  });

  const handleGenerateMaze = () => {
    resetGrid();
    setGrid(generateMaze());
  };

  const handleSearchPath = async () => {
    const cell = await searchPath(startIndex, endIndex);

    if (!cell) return;

    let currentCell: Cell | null = cell;

    while (currentCell) {
      updateCell(currentCell.index, PATH_CELL);
      await sleep(10);
      currentCell = currentCell.parent;
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-10 px-10">
        <div className="w-full aspect-square">
          <PlaygroundCanvas
            grid={grid}
            onTileClick={(index) => selectCell(index)}
            gridSize={gridSize}
            mazeTheme={mazeTheme}
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-2 flex-col">
            <label htmlFor="mazeTheme">TEMA</label>
            <select
              id="mazeTheme"
              className="flex-1 custom-input"
              value={mazeTheme}
              onChange={(evt) => setMazeTheme(evt.target.value as MazeTheme)}
            >
              <option value="cyberpunk">Cyberpunk</option>
              <option value="neon">Neon</option>
              <option value="matrix">Matrix</option>
              <option value="lava">Lava</option>
              <option value="ice">Ice</option>
            </select>
          </div>

          <button
            onClick={() => resetGrid()}
            className="custom-button flex gap-2 justify-center items-center uppercase"
          >
            Limpiar <GrClearOption size={18} />
          </button>

          <div className="w-full flex gap-2">
            <button
              onClick={() => setIsDrawing((prev) => !prev)}
              className={`flex-1 uppercase flex gap-2 justify-center items-center ${isDrawing ? "custom-button-active" : "custom-button"}`}
            >
              Dibujar
              <MdDraw size={24} />
            </button>

            <button
              onClick={() => setIsDrawing((prev) => !prev)}
              className={`flex-1 uppercase flex gap-2 justify-center items-center ${!isDrawing ? "custom-button-active" : "custom-button"}`}
            >
              Borrar
              <BsFillEraserFill size={24} />
            </button>
          </div>

          <hr className="text-plasma" />

          <div className="flex flex-col gap-2">
            <label htmlFor="mazeAlgorithm">Generación de Laberinto</label>
            <div className="flex gap-5">
              <select
                id="mazeAlgorithm"
                className="flex-1 custom-input"
                value={mazeGeneratorAlgorithm}
                onChange={(evt) =>
                  setMazeGeneratorAlgorithm(evt.target.value as MazeGenerator)
                }
                name="mazeGenerator"
              >
                <option value="random">Random</option>
              </select>
              <button
                onClick={() => handleGenerateMaze()}
                className="flex-1 uppercase custom-button"
              >
                Generar
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="mazeAlgorithm">Algoritmo de búsqueda</label>
            <div className="flex gap-5">
              <select
                id="mazeAlgorithm"
                className="flex-1 custom-input"
                value={searchAlgorithm}
                onChange={(evt) => setSearchAlgorithm(evt.target.value)}
                name="selectedFruit"
              >
                <option value="random">A*</option>
                <option value="random">BFS</option>
                <option value="random">DFS</option>
                <option value="random">Dijkstra</option>
              </select>
              <button
                onClick={() => handleSearchPath()}
                className="flex-1 uppercase custom-button"
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { GameCanvas } from "./components/GameCanvas";
import { useGame } from "./hooks/useGame";
import { useAI } from "./hooks/useAI";
import { GameControls } from "./components/GameControls";
import type { GridPosition } from "./models/Board";

export const TresEnRaya = () => {
  const {
    board,
    canPlaceDisc,
    tryPlaceDisc,
    currentTurn,
    reset,
    redPlayer,
    bluePlayer,
    updatePlayerType,
  } = useGame();

  useAI({
    board,
    currentTurn,
    canPlaceDisc,
    tryPlaceDisc,
    redPlayer,
    bluePlayer,
  });

  const handleOnClick = (gridPosition: GridPosition) => {
    if (
      currentTurn.type === "human" &&
      canPlaceDisc(currentTurn, gridPosition)
    ) {
      tryPlaceDisc(currentTurn, gridPosition);
    }
  };

  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-20">
      <div className="w-full place-self-center flex flex-col gap-4">
        <GameCanvas
          grid={board}
          currentTurn={currentTurn}
          onBoardClick={handleOnClick}
        />
      </div>
      <div className="bg-surface rounded-md p-5">
        <GameControls
          bluePlayer={bluePlayer}
          redPlayer={redPlayer}
          updatePlayerType={updatePlayerType}
          reset={reset}
        />
      </div>
    </div>
  );
};

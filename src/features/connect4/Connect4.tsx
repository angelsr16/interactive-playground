import { GameCanvas } from "./components/GameCanvas";
import { useGame } from "./hooks/useGame";
import { useAI } from "./hooks/useAI";
import { GameControls } from "./components/GameControls";

export const Connect4 = () => {
  const {
    grid,
    canPlaceDisc,
    tryPlaceDisc,
    currentTurn,
    reset,
    redPlayer,
    yellowPlayer,
    updatePlayerType,
  } = useGame();

  useAI({
    currentTurn,
    canPlaceDisc,
    tryPlaceDisc,
    redPlayer,
    yellowPlayer,
  });

  const handleOnClick = (columnIndex: number) => {
    if (
      currentTurn.type === "human" &&
      canPlaceDisc(currentTurn, columnIndex)
    ) {
      tryPlaceDisc(currentTurn, columnIndex);
    }
  };

  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-20">
      <div className="w-full place-self-center flex flex-col gap-4">
        <GameCanvas
          grid={grid}
          currentTurn={currentTurn}
          onBoardClick={handleOnClick}
        />
      </div>
      <div className="bg-surface rounded-md p-5">
        <GameControls
          redPlayer={redPlayer}
          yellowPlayer={yellowPlayer}
          updatePlayerType={updatePlayerType}
          reset={reset}
        />
      </div>
    </div>
  );
};

import { useRef, useState } from "react";
import { GameCanvas, type GameCanvasHandle } from "./components/GameCanvas";
import { type Player } from "./models/Player";
import { RED_PLAYER, YELLOW_PLAYER } from "./lib/constants";

const PIECE_BG_CLASSES = {
  1: "bg-[#FF2A00]",
  2: "bg-[#FBFF00]",
} as const;

export const Connect4 = () => {
  const gameCanvasRef = useRef<GameCanvasHandle>(null);

  const [redPlayer, setRedPlayer] = useState<Player>({
    type: "human",
    piece: RED_PLAYER,
  });
  const [yellowPlayer, setYellowPlayer] = useState<Player>({
    type: "human",
    piece: YELLOW_PLAYER,
  });

  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-20">
      <div className="w-full place-self-center flex flex-col gap-4">
        <GameCanvas
          ref={gameCanvasRef}
          redPlayer={redPlayer}
          yellowPlayer={yellowPlayer}
        />
      </div>
      <div className="bg-surface rounded-md p-5">
        <div className="w-full flex flex-col gap-2 p-5">
          <span className="flex items-center gap-2 font-bold">
            Jugador 1{" "}
            <span className={`w-4 h-4 ${PIECE_BG_CLASSES[1]} rounded-full`} />
          </span>
          <div className="w-full  flex gap-5">
            <button
              onClick={() =>
                setRedPlayer((prev) => ({
                  ...prev,
                  type: "human",
                }))
              }
              className={`w-full custom-button font-bold ${redPlayer.type === "human" ? "bg-plasma-400" : ""}`}
            >
              HUMANO
            </button>
            <button
              onClick={() =>
                setRedPlayer((prev) => ({
                  ...prev,
                  type: "ai",
                }))
              }
              className={`w-full custom-button font-bold ${redPlayer.type === "ai" ? "bg-plasma-400" : ""}`}
            >
              IA
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 p-5">
          <span className="flex items-center gap-2 font-bold">
            Jugador 2
            <span
              className={`w-4 h-4 ${PIECE_BG_CLASSES[yellowPlayer.piece]} rounded-full`}
            />
          </span>
          <div className="w-full  flex gap-5">
            <button
              onClick={() =>
                setYellowPlayer((prev) => ({
                  ...prev,
                  type: "human",
                }))
              }
              className={`w-full custom-button font-bold ${yellowPlayer.type === "human" ? "bg-plasma-400" : ""}`}
            >
              HUMANO
            </button>
            <button
              onClick={() =>
                setYellowPlayer((prev) => ({
                  ...prev,
                  type: "ai",
                }))
              }
              className={`w-full custom-button font-bold ${yellowPlayer.type === "ai" ? "bg-plasma-400" : ""}`}
            >
              IA
            </button>
          </div>
        </div>

        <div className="w-full flex gap-5 mt-5">
          <button
            onClick={() => gameCanvasRef.current?.handleResetGame()}
            className="w-full custom-button"
          >
            RESETEAR
          </button>
        </div>
      </div>
    </div>
  );
};

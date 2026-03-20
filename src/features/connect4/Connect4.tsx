import { useState } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { type Player } from "./models/Player";
import { RED_PLAYER, YELLOW_PLAYER } from "./lib/constants";

const PIECE_BG_CLASSES = {
  1: "bg-[#FF2A00]",
  2: "bg-[#FBFF00]",
} as const;

export const Connect4 = () => {
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
        <GameCanvas redPlayer={redPlayer} yellowPlayer={yellowPlayer} />
      </div>
      <div className="bg-surface rounded-md">
        <div className="w-full flex flex-col gap-2 p-5">
          <span className="flex items-center gap-2 font-bold">
            Jugador 1{" "}
            <span className={`w-4 h-4 ${PIECE_BG_CLASSES[1]} rounded-full`} />
          </span>
          <div className="w-full  flex gap-5">
            <button
              onClick={() => setRedPlayer(redPlayer)}
              className="w-full custom-button font-bold"
            >
              HUMAN
            </button>
            <button className="w-full custom-button font-bold">IA</button>
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
              onClick={() => setYellowPlayer(redPlayer)}
              className="w-full custom-button font-bold"
            >
              HUMAN
            </button>
            <button className="w-full custom-button font-bold">IA</button>
          </div>
        </div>
      </div>
    </div>
  );
};

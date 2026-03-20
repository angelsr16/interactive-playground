import type { Player, PlayerType } from "../models/Player";

const PIECE_BG_CLASSES = {
  1: "bg-[#FF2A00]",
  2: "bg-[#FBFF00]",
} as const;

export const GameControls = ({
  redPlayer,
  yellowPlayer,
  updatePlayerType,
  reset,
}: {
  redPlayer: Player;
  yellowPlayer: Player;
  updatePlayerType: (player: Player, playerType: PlayerType) => void;
  reset: () => void;
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-2 p-5">
        <span className="flex items-center gap-2 font-bold">
          Jugador 1{" "}
          <span className={`w-4 h-4 ${PIECE_BG_CLASSES[1]} rounded-full`} />
        </span>
        <div className="w-full  flex gap-5">
          <button
            onClick={() => updatePlayerType(redPlayer, "human")}
            className={`w-full custom-button font-bold ${redPlayer.type === "human" ? "bg-plasma-400" : ""}`}
          >
            HUMANO
          </button>
          <button
            onClick={() => updatePlayerType(redPlayer, "ai")}
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
            onClick={() => updatePlayerType(yellowPlayer, "human")}
            className={`w-full custom-button font-bold ${yellowPlayer.type === "human" ? "bg-plasma-400" : ""}`}
          >
            HUMANO
          </button>
          <button
            onClick={() => updatePlayerType(yellowPlayer, "ai")}
            className={`w-full custom-button font-bold ${yellowPlayer.type === "ai" ? "bg-plasma-400" : ""}`}
          >
            IA
          </button>
        </div>
      </div>

      <div className="w-full flex gap-5 mt-5">
        <button onClick={() => reset()} className="w-full custom-button">
          RESETEAR
        </button>
      </div>
    </>
  );
};

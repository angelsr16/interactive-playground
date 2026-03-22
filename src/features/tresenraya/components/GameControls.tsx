import {
  PIECE_REPRESENTATION,
  type Player,
  type PlayerType,
} from "../models/Player";

export const GameControls = ({
  bluePlayer,
  redPlayer,
  updatePlayerType,
  reset,
}: {
  bluePlayer: Player;
  redPlayer: Player;
  updatePlayerType: (player: Player, playerType: PlayerType) => void;
  reset: () => void;
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-2 p-5">
        <span className="flex items-center gap-2 font-bold">
          Jugador 1
          <span className="font-black text-blue-500">
            {PIECE_REPRESENTATION[bluePlayer.piece]}
          </span>
        </span>
        <div className="w-full  flex gap-5">
          <button
            onClick={() => updatePlayerType(bluePlayer, "human")}
            className={`w-full custom-button font-bold ${bluePlayer.type === "human" ? "bg-plasma-400" : ""}`}
          >
            HUMANO
          </button>
          <button
            onClick={() => updatePlayerType(bluePlayer, "ai")}
            className={`w-full custom-button font-bold ${bluePlayer.type === "ai" ? "bg-plasma-400" : ""}`}
          >
            IA
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 p-5">
        <span className="flex items-center gap-2 font-bold">
          Jugador 2{" "}
          <span className="font-black text-red-500">
            {PIECE_REPRESENTATION[redPlayer.piece]}
          </span>
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

      <div className="w-full flex gap-5 mt-5">
        <button onClick={() => reset()} className="w-full custom-button">
          RESETEAR
        </button>
      </div>
    </>
  );
};

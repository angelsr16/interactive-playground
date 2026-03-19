import { GameShell } from "../../components/GameShell";
import { GAMES } from "../../data/games";
import { Connect4 } from "./Connect4";

export const Connect4Page = () => {
  const game = GAMES.find((g) => g.id === "connect4");

  return (
    <GameShell game={game}>
      <Connect4 />
    </GameShell>
  );
};

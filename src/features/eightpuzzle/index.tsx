import { GameShell } from "../../components/GameShell";
import { GAMES } from "../../data/games";
import { EightPuzzle } from "./EightPuzzle";

export const EightPuzzlePage = () => {
  const game = GAMES.find((g) => g.id === "eightPuzzle");

  return (
    <GameShell game={game}>
      <EightPuzzle />
    </GameShell>
  );
};

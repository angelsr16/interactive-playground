import { GameShell } from "../../components/GameShell";
import { GAMES } from "../../data/games";
import { Pathfinding } from "./Pathfinding";

export const PathfindingPage = () => {
  const game = GAMES.find((g) => g.id === "pathfinding");

  return (
    <GameShell game={game}>
      <Pathfinding />
    </GameShell>
  );
};

import { GameShell } from "../../components/GameShell";
import { GAMES } from "../../data/games";
import { TresEnRaya } from "./TresEnRaya";

export const TresEnRayaPage = () => {
  const game = GAMES.find((g) => g.id === "tresenraya");

  return (
    <GameShell game={game}>
      <TresEnRaya />
    </GameShell>
  );
};

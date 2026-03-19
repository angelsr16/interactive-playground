import { GameCanvas } from "./components/GameCanvas";

export const Connect4 = () => {
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-20">
      <div className="w-full place-self-center flex flex-col gap-4">
        <GameCanvas />
      </div>
    </div>
  );
};

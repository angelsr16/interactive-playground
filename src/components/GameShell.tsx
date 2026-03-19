import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { Game } from "../data/games";

interface Props {
  game?: Game;
  children: ReactNode;
  sidebar?: ReactNode;
}

export const GameShell = ({ game, children, sidebar }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-void flex flex-col">
      <header className="border-b border-border bg-base sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 cursor-pointer text-text-muted hover:text-text-secondary text-xs transition-colors"
          >
            <span>←</span>
            <span>Volver</span>
          </button>

          <div className="w-px h-4 bg-border" />

          <div className="flex items-center gap-2.5">
            <h1 className={`text-sm font-semibold`}>
              {game ? game.title : ""}
            </h1>
          </div>

          <div className="flex-1" />
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-6">
        {sidebar ? (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "1fr 280px" }}
          >
            <div>{children}</div>
            <aside className="flex flex-col gap-4">{sidebar}</aside>
          </div>
        ) : (
          <div className="flex justify-center">{children}</div>
        )}
      </div>
    </div>
  );
};

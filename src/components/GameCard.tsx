import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Game } from "../data/games";

interface Props {
  game: Game;
  index: number;
}

export function GameCard({ game, index }: Props) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    navigate(game.route);
  }

  return (
    <article
      className={`
        group relative flex flex-col overflow-hidden rounded-xl
        border bg-surface transition-all duration-300 cursor-pointer
      `}
      style={{
        animationDelay: `${index * 60}ms`,
        boxShadow: hovered ? "0 0 30px rgba(108,99,255,0.18)" : "",
        transform: hovered ? "translateY(-2px)" : "",
        transition:
          "box-shadow 0.3s ease, transform 0.3s ease, opacity 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`Abrir ${game.title}`}
    >
      <div className="relative h-36 overflow-hidden bg-void border-b border-border">
        <img src="https://placehold.co/600x400" alt="" />

        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, #0D0F14 0%, transparent 60%)`,
            opacity: hovered ? 0.4 : 0.5,
          }}
        />
      </div>

      <div className="flex flex-col gap-2.5 p-3.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`font-semibold text-sm leading-tight text-text-primary transition-colors duration-200`}
          >
            {game.title}
          </h3>
        </div>

        <p
          className={`${hovered ? "text-text-primary" : "text-text-muted"} transition-all duration-450 ease-in text-xs leading-relaxed line-clamp-5 flex-1`}
        >
          {game.description}
        </p>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex flex-wrap gap-1">
            {game.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-elevated text-text-muted font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <span
            className={`text-xs font-medium transition-all duration-450 text-plasma-400 ${hovered ? "translate-x-0.5" : ""}`}
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}

import { useMemo, useState } from "react";
import { GAMES, TAG_ALL, type Tag } from "../data/games";
import { FilterBar } from "../components/FilterBar";
import { GameCard } from "../components/GameCard";

export const Home = () => {
  const [activeTag, setActiveTag] = useState<string>(TAG_ALL);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return GAMES.filter((game) => {
      const matchTag =
        activeTag === TAG_ALL || game.tags.includes(activeTag as Tag);
      const matchSearch =
        search === "" ||
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        game.description.toLowerCase().includes(search.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [activeTag, search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { [TAG_ALL]: GAMES.length };
    GAMES.forEach((g) =>
      g.tags.forEach((t) => {
        c[t] = (c[t] ?? 0) + 1;
      }),
    );
    return c;
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="h-px w-6 bg-plasma-700" />
          <span className="text-plasma-400 text-xs font-mono uppercase tracking-widest">
            Interactive lab
          </span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary leading-tight">
          Juegos y demos de{" "}
          <span className="text-plasma-400">
            Inteligencia Artificial y Algoritmos
          </span>
        </h1>
        <p className="text-text-secondary text-sm max-w-lg leading-relaxed">
          Explora juegos clásicos, puzzles y visualizaciones — la mayoría con IA
          que puedes observar y desafiar.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-elevated border border-border rounded-lg text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-plasma-700/60 w-44 transition-colors"
            />
          </div>

          <div className="w-px h-5 bg-border hidden sm:block" />

          <FilterBar
            active={activeTag}
            onChange={setActiveTag}
            counts={counts}
          />
        </div>
      </section>

      {filtered.length > 0 ? (
        <section
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          }}
        >
          {filtered.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center py-24 gap-3">
          <span className="text-text-disabled text-4xl font-mono">∅</span>
          <p className="text-text-muted text-sm">
            No hay resultados para "{search}"
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveTag(TAG_ALL);
            }}
            className="text-xs text-plasma-400 hover:text-plasma-300 transition-colors mt-1"
          >
            Limpiar filtros
          </button>
        </section>
      )}

      <footer className="border-t border-border pt-6 flex items-center justify-between">
        <p className="text-text-disabled text-xs font-mono">
          React + Vite · Tailwind v4 · Canvas API · Three.js
        </p>
        <p className="text-text-disabled text-xs">
          Hover para preview animado · Click para abrir
        </p>
      </footer>
    </main>
  );
};

import { GAMES } from "../data/games";

export function Header() {
  const total = GAMES.length;

  return (
    <header className="border-b border-border bg-base">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-lg bg-plasma-900 border border-plasma-700/60 flex items-center justify-center">
            <span className="text-plasma-300 text-xs font-mono font-bold">
              AI Playground
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-5">
          <Stat value={total} label="proyectos" />
          <div className="w-px h-4 bg-border" />
        </div>
      </div>
    </header>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent?: "plasma" | "matrix";
}) {
  const textColor =
    accent === "plasma"
      ? "text-plasma-400"
      : accent === "matrix"
        ? "text-matrix-400"
        : "text-text-secondary";
  return (
    <div className="flex items-baseline gap-1.5">
      <span className={`font-mono font-medium text-sm ${textColor}`}>
        {value}
      </span>
      <span className="text-text-disabled text-xs">{label}</span>
    </div>
  );
}

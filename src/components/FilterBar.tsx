import { ALL_TAGS } from "../data/games";

interface Props {
  active: string;
  onChange: (tag: string) => void;
  counts: Record<string, number>;
}

export function FilterBar({ active, onChange, counts }: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {ALL_TAGS.map((tag) => {
        const isActive = active === tag;
        const count = counts[tag] ?? 0;
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`
              flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg
              border transition-all duration-150
              ${
                isActive
                  ? "bg-plasma-900 text-plasma-300 border-plasma-700/60"
                  : "bg-transparent text-text-muted border-border hover:bg-elevated hover:text-text-secondary"
              }
            `}
          >
            {tag}
            <span
              className={`
              text-[10px] tabular-nums
              ${isActive ? "text-plasma-400" : "text-text-disabled"}
            `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

interface TagCloudProps {
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll: () => void;
  locale: "en" | "es";
}

export function TagCloud({ tags, selectedTags, onToggleTag, onClearAll, locale }: TagCloudProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-gray-500 mr-2 uppercase tracking-wider">
          {locale === "en" ? "Filter by:" : "Filtrar por:"}
        </span>

        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggleTag(tag)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "bg-primary/10 border-primary/40 text-primary hover:bg-primary/20 shadow-[0_0_12px_rgba(21,209,217,0.15)]"
                  : "bg-gray-900/40 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200 hover:bg-gray-900/70"
              }`}
            >
              #{tag}
            </button>
          );
        })}

        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-mono text-gray-500 hover:text-primary underline underline-offset-4 cursor-pointer transition-colors duration-150 ml-2"
          >
            {locale === "en" ? "Clear filters" : "Limpiar filtros"}
          </button>
        )}
      </div>
    </div>
  );
}

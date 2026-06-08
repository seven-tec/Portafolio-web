"use client";

import { useState, useMemo } from "react";
import { SearchInput } from "./SearchInput";
import { TagCloud } from "./TagCloud";
import { Grid } from "./Grid";
import { normalizeText } from "../../lib/search";
import { Project } from "../../domain/entities/Project";
import { Engram } from "../../domain/entities/Engram";
import { ProjectCard } from "./ProjectCard";
import { EngramCard } from "./EngramCard";

type SearchableGridProps =
  | {
      type: "projects";
      items: Project[];
      locale: "en" | "es";
      placeholder?: string;
    }
  | {
      type: "notes";
      items: Engram[];
      locale: "en" | "es";
      placeholder?: string;
    };

export function SearchableGrid(props: SearchableGridProps) {
  const { items, locale, type, placeholder } = props;
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 1. Extract unique tags dynamically
  const uniqueTags = useMemo(() => {
    return Array.from(
      new Set(
        items.flatMap((item) => {
          const tags = item.tags || [];
          const topic = "topic" in item && item.topic ? [item.topic] : [];
          return [...tags, ...topic];
        })
      )
    )
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, locale));
  }, [items, locale]);

  // 2. Perform intersection filtering and text matching
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // A. Tag intersection filtering (AND match)
      if (selectedTags.length > 0) {
        const itemTags = item.tags || [];
        const itemTopic = "topic" in item && item.topic ? [item.topic] : [];
        const allItemTags = [...itemTags, ...itemTopic].map((t) => t.toLowerCase());

        const matchesAllTags = selectedTags.every((selectedTag) =>
          allItemTags.includes(selectedTag.toLowerCase())
        );
        if (!matchesAllTags) return false;
      }

      // B. Search query matching
      if (!query) return true;

      const normalizedQuery = normalizeText(query);
      const normalizedTitle = normalizeText(item.title || "");
      const normalizedSummary = normalizeText(
        ("summary" in item && item.summary) ||
        ("topic" in item && item.topic) ||
        ""
      );
      const itemTags = item.tags || [];

      const matchesTitle = normalizedTitle.includes(normalizedQuery);
      const matchesSummary = normalizedSummary.includes(normalizedQuery);
      const matchesTags = itemTags.some((tag: string) =>
        normalizeText(tag).includes(normalizedQuery)
      );

      return matchesTitle || matchesSummary || matchesTags;
    });
  }, [items, query, selectedTags]);

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
  };

  const handleReset = () => {
    setQuery("");
    setSelectedTags([]);
  };

  const defaultPlaceholder =
    placeholder ||
    (locale === "en"
      ? `Search ${type}...`
      : `Buscar ${type === "projects" ? "proyectos" : "notas"}...`);

  return (
    <section className="space-y-6" role="search" aria-label={locale === "en" ? "Content filters" : "Filtro de contenido"}>
      <div className="space-y-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
          placeholder={defaultPlaceholder}
          locale={locale}
        />

        <TagCloud
          tags={uniqueTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onClearAll={handleClearAll}
          locale={locale}
        />
      </div>

      {filteredItems.length > 0 ? (
        <div id="search-results">
          <Grid>
            {filteredItems.map((item) => (
              <div key={item.slug} className="transition-all duration-500 ease-out animate-fade-in-up">
                {type === "projects" ? (
                  <ProjectCard
                    title={item.title}
                    summary={(item as Project).summary}
                    tags={item.tags || []}
                    date={item.date}
                    slug={item.slug}
                    locale={locale}
                  />
                ) : (
                  <EngramCard
                    title={item.title}
                    topic={(item as Engram).topic}
                    date={item.date}
                    slug={item.slug}
                    locale={locale}
                  />
                )}
              </div>
            ))}
          </Grid>
        </div>
      ) : (
        <div
          id="search-results"
          className="text-center py-12 text-gray-400 border border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center gap-4 transition-all duration-300"
        >
          <p className="font-sans text-sm">
            {locale === "en"
              ? "No results found for the current filters."
              : "No se encontraron resultados para los filtros actuales."}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-mono bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition-colors cursor-pointer"
          >
            {locale === "en" ? "Clear search & filters" : "Restablecer filtros"}
          </button>
        </div>
      )}
    </section>
  );
}

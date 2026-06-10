import { normalizeText } from "./search";

interface SearchableItem {
  title: string;
  tags?: string[];
  summary?: string;
  topic?: string;
}

/**
 * Filtra una lista de elementos (proyectos o notas) basándose en una query de texto
 * (insensible a acentos/mayúsculas) y en la intersección (AND) de tags seleccionados.
 */
export function filterContent<T extends SearchableItem>(
  items: T[],
  query: string,
  selectedTags: string[]
): T[] {
  return items.filter((item) => {
    // 1. Filtrado de tags (todos los tags seleccionados deben estar presentes en el item)
    if (selectedTags.length > 0) {
      const itemTags = item.tags || [];
      const itemTopic = item.topic ? [item.topic] : [];
      const allItemTags = [...itemTags, ...itemTopic].map((t) => t.toLowerCase());

      const matchesAllTags = selectedTags.every((selectedTag) =>
        allItemTags.includes(selectedTag.toLowerCase())
      );
      if (!matchesAllTags) return false;
    }

    // 2. Filtrado por texto (búsqueda en título, resumen/tema y tags individuales)
    if (!query) return true;

    const normalizedQuery = normalizeText(query);
    const normalizedTitle = normalizeText(item.title || "");
    const normalizedSummary = normalizeText(
      item.summary ||
      item.topic ||
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
}

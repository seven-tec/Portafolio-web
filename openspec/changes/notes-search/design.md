# SDD Design: Buscador de Hazañas & Notas (Change: `notes-search`)

This document outlines the technical design details for the client-side search, filtering, and tag classification system in the portfolio.

---

## 1. Component Hierarchy & File Structure

To keep the codebase clean, modular, and reusable, we are implementing a generic, type-safe filtering system under the `src/components/ui/` directory.

### A. Directory Layout
```
src/
├── components/
│   └── ui/
│       ├── SearchableGrid.tsx  (Core Orchestrator - Client Component)
│       ├── SearchInput.tsx     (Accessible Input Field - Client Component)
│       └── TagCloud.tsx        (Interactive Dynamic Tags - Client Component)
```

### B. Core Orchestration Layout
```
+------------------------------------------------------------+
| SearchableGrid<T> (Client State: query, selectedTags)       |
|                                                            |
|  +------------------------------------------------------+  |
|  | SearchInput (Shortcuts, Clear Button, A11y Roles)    |  |
|  +------------------------------------------------------+  |
|  | TagCloud (Unique tag extraction, selection toggles)  |  |
|  +------------------------------------------------------+  |
|  | Grid / GridList (Renders filtered items via renderItem)|  |
|  +------------------------------------------------------+  |
+------------------------------------------------------------+
```

---

## 2. Component Interface & API Design

### A. `SearchableGrid` (Generic Component)
`SearchableGrid` is the main container. It manages client-side filtering state, handles text normalization, performs tag intersection matching, and coordinates rendering.

```typescript
// src/components/ui/SearchableGrid.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { TagCloud } from "./TagCloud";
import { Grid } from "./Grid";

interface SearchableGridProps<T> {
  items: T[];
  locale: "en" | "es";
  type: "projects" | "notes";
  placeholder?: string;
  renderItem: (item: T) => React.ReactNode;
}
```

### B. `SearchInput`
Manages the input node, handles keyboard shortcuts (`/` or `Ctrl + K` to focus, `Esc` to clear), and displays the appropriate indicators.

```typescript
// src/components/ui/SearchInput.tsx
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  locale: "en" | "es";
}
```

### C. `TagCloud`
Renders a filterable list of active and inactive tag chips.

```typescript
// src/components/ui/TagCloud.tsx
interface TagCloudProps {
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll: () => void;
  locale: "en" | "es";
}
```

---

## 3. Core Logic & Utility Algorithms

### A. Accent-Insensitive Text Normalization
To prevent queries from failing due to diacritics (like `á`, `é`, `í`, `ó`, `ú`, `ü`), we will define a centralized normalization utility in `src/lib/search.ts`.

```typescript
// src/lib/search.ts
export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")                  // Decompose combining diacritical marks
    .replace(/[\u0300-\u036f]/g, "")   // Remove diacritical marks
    .toLowerCase()                     // Convert to lowercase
    .trim();
};
```

### B. Runtime Dynamic Tag Extraction
The unique tags list will be computed dynamically from the items array. To handle both `Project` and `Engram` structures (or backward compatibility if an item lacks tags), the tag extractor must query the `tags` array or fall back to the `topic` field:

```typescript
const uniqueTags = Array.from(
  new Set(
    items.flatMap((item: any) => {
      const tags = item.tags || [];
      const topic = item.topic ? [item.topic] : [];
      return [...tags, ...topic];
    })
  )
)
  .filter(Boolean)
  .sort();
```

### C. Filtering Algorithm (Substring + Tag Intersection)
An item qualifies for rendering if and only if it matches:
1.  **Search Input (Sub-string match)**: The query must match the normalized `title`, `summary`, or `tags` of the item.
2.  **Tag Intersection (AND logic)**: The item must contain *every* tag selected in the `selectedTags` array.

```typescript
const filteredItems = items.filter((item: any) => {
  // 1. Tag intersection filtering (AND match)
  if (selectedTags.length > 0) {
    const itemTags = item.tags || [];
    const itemTopic = item.topic ? [item.topic] : [];
    const allItemTags = [...itemTags, ...itemTopic].map(t => t.toLowerCase());
    
    const matchesAllTags = selectedTags.every(selectedTag => 
      allItemTags.includes(selectedTag.toLowerCase())
    );
    if (!matchesAllTags) return false;
  }

  // 2. Search query matching
  if (!query) return true;
  
  const normalizedQuery = normalizeText(query);
  const normalizedTitle = normalizeText(item.title || "");
  const normalizedSummary = normalizeText(item.summary || item.topic || "");
  const itemTags = item.tags || [];
  
  const matchesTitle = normalizedTitle.includes(normalizedQuery);
  const matchesSummary = normalizedSummary.includes(normalizedQuery);
  const matchesTags = itemTags.some(tag => normalizeText(tag).includes(normalizedQuery));

  return matchesTitle || matchesSummary || matchesTags;
});
```

---

## 4. UI/UX Styles & Premium Aesthetics (Tailwind v4)

Our visual guidelines dictate a premium, high-fidelity dark glassmorphic design system matching the rest of the application.

### A. Search Input Styling
A dark glassmorphic panel with glowing focus rings and micro-interactions.
```html
<div className="relative w-full">
  <input
    type="text"
    className="bg-gray-950/40 backdrop-blur-md border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all duration-300 rounded-xl px-4 py-3 w-full text-gray-200 placeholder-gray-500 font-sans"
    ...
  />
</div>
```

### B. Tag Chips
Monospace design highlighting selected options with a cyan glow:
*   **Idle / Unselected state**:
    `bg-gray-900/40 border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200 hover:bg-gray-900/70`
*   **Selected state**:
    `bg-primary/10 border-primary/40 text-primary hover:bg-primary/20 shadow-[0_0_12px_rgba(var(--primary-rgb),0.15)]`
*   **Active tag base class**:
    `font-mono text-xs px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer`

### C. Layout Grid & Smooth Transitions
To present a responsive list, matching items will fade-in smoothly when filters are toggled:
*   Standard Tailwind classes: `transition-all duration-500 ease-out`
*   Animation presets: `animate-fade-in-up` applied during grid item render to ensure a premium visual flow.

---

## 5. Accessibility (A11y) & UX Enhancements

*   **Keyboard Shortcuts**:
    *   Pressing `Ctrl + K` or `/` focuses the search bar input.
    *   Pressing `Esc` inside the search input clears it and blurs focus.
*   **Semantic Roles**:
    *   Search container wrapped in a `<section role="search" aria-label="Filtro de contenido">` layout.
    *   Active/Inactive tag chips utilize `role="checkbox"` and standard `aria-checked` bindings.
*   **Zero Search Results State**:
    *   Renders a dashed-border card (`border border-dashed border-border/40 rounded-xl bg-surface/10 py-12 text-center`).
    *   Features an "Ajustar filtros" / "Clear Filters" button that clears search criteria and resets focus.

---

## 6. Page Integration Specs

Instead of directly mapping lists inside Next.js page components, the Server Components will now act as data-fetchers and pass the initial pre-fetched lists into `SearchableGrid`.

### A. Notes Index (`src/app/[locale]/notes/page.tsx`)
```tsx
import { SearchableGrid } from "../../../components/ui/SearchableGrid";
import { EngramCard } from "../../../components/ui/EngramCard";

// inside NotesIndex component
const engrams = EngramUseCases.getPublishedEngrams(activeLocale);

return (
  <main className="p-8 min-h-screen bg-background text-foreground">
    <div className="max-w-4xl mx-auto space-y-12 mt-8">
      <PageHeader title={title} description={desc} />
      
      <SearchableGrid
        items={engrams}
        locale={activeLocale}
        type="notes"
        placeholder={activeLocale === "en" ? "Search journal entries..." : "Buscar entradas del diario..."}
        renderItem={(engram) => (
          <EngramCard
            key={engram.slug}
            title={engram.title}
            topic={engram.topic}
            date={engram.date}
            slug={engram.slug}
            locale={activeLocale}
          />
        )}
      />
    </div>
  </main>
);
```

### B. Projects Index (`src/app/[locale]/projects/page.tsx`)
```tsx
import { SearchableGrid } from "../../../components/ui/SearchableGrid";
import { ProjectCard } from "../../../components/ui/ProjectCard";

// inside ProjectsIndex component
const projects = ProjectUseCases.getPublishedProjects(activeLocale);

return (
  <main className="p-8 min-h-screen bg-background text-foreground">
    <div className="max-w-4xl mx-auto space-y-12 mt-8">
      <PageHeader title={title} description={desc} />

      <SearchableGrid
        items={projects}
        locale={activeLocale}
        type="projects"
        placeholder={activeLocale === "en" ? "Search case studies..." : "Buscar casos de estudio..."}
        renderItem={(project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            summary={project.summary}
            tags={project.tags}
            date={project.date}
            slug={project.slug}
            locale={activeLocale}
          />
        )}
      />
    </div>
  </main>
);
```

---

## 7. Risks & Trade-offs

1.  **Tailwind CSS v4 compatibility**: We are using standard CSS variables and standard modifiers (like `/opacity` matching color opacity configurations). All utility classes are fully compatible with Tailwind CSS v4's architecture.
2.  **SEO Impact**: Crawlers receive the initial SSG HTML with the raw items list embedded, preserving standard indexing. Client-side filtering is non-destructive to search engines.

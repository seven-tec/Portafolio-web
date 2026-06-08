# SDD Specification: Buscador de Hazañas & Notas (Change: `notes-search`)

This specification defines the functional, data, UI/UX, and accessibility requirements for implementing client-side search, filtering, and tag classification for projects (hazañas) and engineering notes (engrams) in the portfolio.

---

## 1. Data Schema Additions

To support search and tagging, the domain entities and their Zod schemas must be extended. Since existing content files might not yet contain these new fields, the new fields **MUST** be optional or default to prevent runtime parser crashes in `src/infrastructure/mdxParser.ts`.

### A. Project Entity Updates (`src/domain/entities/Project.ts`)
*   **`tags`**: Make the array optional, defaulting to an empty array `[]` if not provided (though existing projects already have tags, this keeps it safe).
*   **`featured`**: Add an optional boolean field to designate highly significant projects.

```typescript
export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  summary: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  tags: z.array(z.string()).min(1, "Debe tener al menos un tag").optional().default([]),
  date: z.string(),
  repositoryUrl: z.string().url("Debe ser una URL válida").optional(),
  demoUrl: z.string().url("Debe ser una URL válida").optional(),
  metrics: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  featured: z.boolean().optional(), // New optional boolean
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}
```

### B. Engram Entity Updates (`src/domain/entities/Engram.ts`)
*   **`tags`**: Add an optional array of strings, defaulting to `[]`.
*   **`summary`**: Add an optional string for the note summary, enabling deep matching beyond the title.
*   **`difficulty`**: Add an optional string representing technical depth (e.g., `"Easy"`, `"Medium"`, `"Hard"`).

```typescript
export const EngramFrontmatterSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  date: z.string(),
  readTimeMinutes: z.number().positive().optional(),
  tags: z.array(z.string()).optional().default([]), // New optional tags array
  summary: z.string().optional(),                  // New optional summary
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(), // New optional difficulty
});

export type EngramFrontmatter = z.infer<typeof EngramFrontmatterSchema>;

export interface Engram extends EngramFrontmatter {
  slug: string;
  content: string;
}
```

---

## 2. Search Logic & Normalization

To ensure high-quality multi-lingual search (Spanish & English), matches must be **case-insensitive** and **accent-insensitive** (ignoring tildes and diacritics like `á`, `é`, `í`, `ó`, `ú`, `ü`).

### A. Text Normalization Utility
All search queries and searchable fields (titles, summaries, tags) must be normalized using the following standard mapping:

```typescript
export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")                  // Decompose combining diacritical marks
    .replace(/[\u0300-\u036f]/g, "")   // Remove diacritical marks
    .toLowerCase()                     // Convert to lowercase
    .trim();
};
```

### B. Match Evaluation Rules
For any given item (Project or Engram), a match is found if the normalized search query is a substring of:
1.  The normalized `title`.
2.  The normalized `summary` (or topic).
3.  Any of the normalized `tags`.

### C. Multi-Tag Filtering Logic
*   When multiple tag chips are selected, the filtering must perform an **intersection (AND)** match.
*   An item is included in the results if and only if its `tags` array contains **all** of the currently active selected tags.

---

## 3. UI/UX Design System Integration

The search component must match the existing dark, glassmorphic portfolio theme, using Tailwind CSS classes.

| UI Element | Design Specifications | Tailwind Utility Classes (V4) |
| :--- | :--- | :--- |
| **Search Input Bar** | Dark glassmorphism, subtle border, left search icon, right keyboard hint. On focus, apply a glowing primary border. | `bg-surface/40 backdrop-blur-md border border-border/60 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 shadow-[0_0_15px_rgba(21,209,217,0.1)]` |
| **Tag Chip (Inactive)** | Dark background, rounded border, light gray text. Hover scale-up and border brightened. | `bg-surface border border-border/40 text-gray-400 hover:border-primary/50 hover:text-foreground transition-all duration-200 cursor-pointer` |
| **Tag Chip (Active)** | Glowing cyan background or border with cyan shadow and white text. | `bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(21,209,217,0.3)] transition-all duration-200 cursor-pointer` |
| **Clear Button** | Sleek reset link or cross icon inside the input. | `text-gray-400 hover:text-primary transition-colors duration-150` |
| **No Results State** | Minimalist message showing a clear message and a prominent button to clear active filters. | `text-center py-12 text-gray-400 border border-dashed border-border/40 rounded-xl bg-surface/10` |

---

## 4. Component Structure & Page Routing

### A. Component Hierarchy
We will place a dedicated client-side component on both `/notes` and `/projects` indexes:
1.  **`src/components/SearchableGrid.tsx`**: A generic, reusable client component that handles state management (search text, active tags) and coordinate sub-components.
    *   **Props**:
        *   `items`: Array of serializeable objects (either `Project[]` or `Engram[]`).
        *   `locale`: Current locale (`"es"` or `"en"`).
        *   `renderItem`: A render prop callback function `(item) => React.ReactNode` to render the individual card (`ProjectCard` or `EngramCard`).
        *   `placeholder`: String to show in the search input.
2.  **`src/components/SearchInput.tsx`**: Client component containing the input field, clear trigger, and shortcut display.
3.  **`src/components/TagCloud.tsx`**: Client component listing unique tags extracted from the list, with multi-selection logic.

```
+------------------------------------------------------------+
| SearchableGrid (Client State: query, selectedTags)         |
|                                                            |
|  +------------------------------------------------------+  |
|  | SearchInput (Value: query, onClear(), A11y attributes)|  |
|  +------------------------------------------------------+  |
|  | TagCloud (List: uniqueTags, selectedTags, onToggle())|  |
|  +------------------------------------------------------+  |
|  | Grid / GridList (Renders filtered items or NoResults) |  |
|  +------------------------------------------------------+  |
+------------------------------------------------------------+
```

### B. i18n & Routing
*   Next.js Dynamic Routing (`/[locale]/notes/page.tsx` and `/[locale]/projects/page.tsx`) resolves the current locale in the page Server Component.
*   The Server Component fetches localized content via `EngramUseCases.getPublishedEngrams(activeLocale)` or `ProjectUseCases.getPublishedProjects(activeLocale)`.
*   The Server Component passes this pre-filtered locale-specific dataset as props to `SearchableGrid`, preserving full static generation (SSG) and SEO since the raw list is embedded in the HTML payload.

---

## 5. Accessibility (A11y) & UX Details

To comply with high engineering standards, the following attributes must be implemented:
*   **Keyboard Shortcuts**:
    *   Pressing `Esc` while the search input is focused clears the search input query.
    *   Pressing `Ctrl + K` or `/` focuses the search input.
*   **Focus Ring Indicator**: A glowing focus ring utilizing the primary cyan color `var(--primary)` on all interactive controls.
*   **Aria Roles**:
    *   Search container has `role="search"`.
    *   Search input has `type="text"`, `aria-label="Buscar" / aria-label="Search"`, and `aria-controls`.
    *   Active tags have `role="checkbox"` and `aria-checked="true" / "false"`.
*   **Zero Search Results State**:
    *   Provides a friendly message: *"No se encontraron resultados para los filtros actuales"* (or English equivalent).
    *   Includes a button focused automatically or easily accessible that resets the search query and selected tags.

---

## 6. SEO Preservation Check

Because Next.js renders the initial Server Component HTML containing the list of projects or notes before hydration, search engine crawlers can index the complete text. The client-side filter is only applied post-hydration, meaning:
*   **SEO Impact**: Neutral/Positive. All links are present in the DOM during static rendering.
*   **LCP (Largest Contentful Paint)**: Excellent. The initial grid renders instantly.
*   **CLS (Cumulative Layout Shift)**: Minimal. The layout will adapt dynamically as filters are typed, but the header and layout skeleton remain static.

---

## 7. Implementation Checklist

- [ ] Update `src/domain/entities/Project.ts` Zod schema & TypeScript type.
- [ ] Update `src/domain/entities/Engram.ts` Zod schema & TypeScript type.
- [ ] Add `normalizeText` utility function in `src/lib/search.ts` with unit tests.
- [ ] Implement `src/components/SearchInput.tsx` with accessibility support.
- [ ] Implement `src/components/TagCloud.tsx` with selection indicators.
- [ ] Implement `src/components/SearchableGrid.tsx` to orchestrate filtering.
- [ ] Integrate `SearchableGrid` in `src/app/[locale]/notes/page.tsx`.
- [ ] Integrate `SearchableGrid` in `src/app/[locale]/projects/page.tsx`.
- [ ] Update existing MDX files in `content/engrams/*` to add tags, summaries, and difficulties if appropriate.

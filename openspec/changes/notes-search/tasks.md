# SDD Tasks: Buscador de Hazañas & Notas (Change: `notes-search`)

This document lists the step-by-step implementation tasks for introducing the client-side search, filtering, and tag cloud functionality for projects and engrams.

## 1. Schema & Infrastructure Updates

- [x] **Update Project schema and type**: Modify `src/domain/entities/Project.ts`
  - Make `tags` array optional in `ProjectFrontmatterSchema` with a default of `[]`.
  - Add optional `featured` boolean field to `ProjectFrontmatterSchema`.
- [x] **Update Engram schema and type**: Modify `src/domain/entities/Engram.ts`
  - Add optional `tags` array of strings to `EngramFrontmatterSchema` with a default of `[]`.
  - Add optional `summary` string to `EngramFrontmatterSchema`.
  - Add optional `difficulty` enum (`"Easy" | "Medium" | "Hard"`) to `EngramFrontmatterSchema`.
- [x] **Create text normalization utility**: Implement `normalizeText` in `src/lib/search.ts`
  - Must strip diacritics / accents using `.normalize("NFD").replace(/[\u0300-\u036f]/g, "")`.
  - Must convert text to lowercase and trim it.

## 2. UI Components

- [x] **Implement `SearchInput.tsx`**: Create `src/components/ui/SearchInput.tsx`
  - Dark glassmorphic input styling matching design guidelines.
  - Keyboard shortcuts: `/` or `Ctrl + K` to focus input; `Esc` to clear input and blur.
  - Accessible attributes (`role="search"`, `aria-label`, `aria-controls`).
  - Clear button trigger inside the input bar.
- [x] **Implement `TagCloud.tsx`**: Create `src/components/ui/TagCloud.tsx`
  - Monospace active/inactive tag chips matching design system classes.
  - Multi-select capability with intersection (AND) logic.
  - Toggle and reset actions.
  - Accessible attributes (`role="checkbox"`, `aria-checked`).
- [x] **Implement `SearchableGrid.tsx`**: Create `src/components/ui/SearchableGrid.tsx`
  - Polymeric client-side controller component taking `items`, `locale`, `type`, `placeholder`, and `renderItem` props.
  - Computes unique tags list dynamically from `items` (tags and topics).
  - Performs intersection filtering for tags (AND matching) and case-insensitive, diacritic-insensitive search matching for query terms against title, summary, topic, and tags.
  - Renders `SearchInput`, `TagCloud`, and the filtered items grid.
  - Includes a zero search results state with an "Ajustar filtros" button that resets filters.
  - Refactored to render cards internally to comply with RSC boundary serialization rules.

## 3. Page Integrations

- [x] **Integrate `SearchableGrid` in Notes Index**: Modify `src/app/[locale]/notes/page.tsx`
  - Replace the static mapping grid with the `SearchableGrid` client component.
  - Fetch raw localized notes using `EngramUseCases.getPublishedEngrams(activeLocale)` and pass them to `SearchableGrid`.
- [x] **Integrate `SearchableGrid` in Projects Index**: Modify `src/app/[locale]/projects/page.tsx`
  - Replace the static mapping grid with the `SearchableGrid` client component.
  - Fetch raw localized projects using `ProjectUseCases.getPublishedProjects(activeLocale)` and pass them to `SearchableGrid`.

## 4. Content Adjustments & Verification

- [x] **Add metadata to test notes and projects**:
  - Update `content/engrams/es/primer-engram.mdx` (e.g. add `tags`, `summary`, `difficulty`).
  - Update `content/projects/es/logistica-express.mdx` (e.g. add `tags`, `summary`).
  - Update `tests/mocks/test-validador.mdx` if needed to ensure Zod parsing validation checks pass.
- [x] **Run verification suites**:
  - Execute parser tests: `npm run test:parser`
  - Run TypeScript compilation checks: `npx tsc --noEmit`
  - Run lint validation (if any): `npm run lint`

## Review Workload Forecast

- **Estimated lines of change**: ~290 lines (new: ~245, modified: ~45)
- **400-line budget risk**: Low
- **Chained PRs recommended**: No
- **Decision needed before apply**: No

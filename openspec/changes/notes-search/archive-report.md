# SDD Archive Report: Buscador de Hazañas & Notas (Change: `notes-search`)

The implementation of the interactive client-side search engine and tag cloud filters has been successfully completed, verified, and merged into the main development line.

## Summary of Completed Change
We implemented an in-memory client-side search and filtering system for `/notes` (engrams) and `/projects` index views.
This approach preserves full SSG (Static Site Generation) output for search engines (SEO) since the raw grid payload is fully rendered in the initial HTML, while allowing instant, sub-millisecond client-side filtering once hydrated.

## Artifacts Trait
- Proposal: [proposal.md](proposal.md) (engram: `sdd/notes-search/proposal`)
- Specification: [spec.md](spec.md) (engram: `sdd/notes-search/spec`)
- Design: [design.md](design.md) (engram: `sdd/notes-search/design`)
- Tasks: [tasks.md](tasks.md) (engram: `sdd/notes-search/tasks`)
- Verification: [verify-report.md](verify-report.md) (engram: `sdd/notes-search/verify-report`)

## Implementation Details

### File Changes

#### Schema
- `src/domain/entities/Project.ts` - Removed `.min(1)` on tags validator and added optional `featured` boolean.
- `src/domain/entities/Engram.ts` - Added optional `tags` array, `summary` string, and `difficulty` enum validator.

#### Logic & Utilities
- `src/lib/search.ts` - Created `normalizeText` helper function to handle accent/diacritic-insensitive and case-insensitive string matching.

#### Components
- `src/components/ui/SearchInput.tsx` - Search bar with esc to clear, slash / focus event, and focus borders.
- `src/components/ui/TagCloud.tsx` - Monospace chips with intersection AND select logic.
- `src/components/ui/SearchableGrid.tsx` - Polymorphic grid coordinator wrapping filter states and empty match views.

#### Pages
- `src/app/[locale]/notes/page.tsx` - Replaced static mapping with `SearchableGrid` wrapping `EngramCard` rendering.
- `src/app/[locale]/projects/page.tsx` - Replaced static mapping with `SearchableGrid` wrapping `ProjectCard` rendering.

## Verification Run
- Ran unit tests for parser: `npm run test:parser` -> All checks passed.
- Checked type definitions: `npx tsc --noEmit` -> Zero errors.
- Verified lint formatting: All files validated against ESLint config.

# Proposal: Buscador de Hazañas & Notas (Change: `notes-search`)

This proposal outlines the design and architecture for introducing client-side search, filtering, and tag selection for both projects (hazañas) and engineering notes (engrams) in the portfolio.

---

## 1. Problem Statement

As the portfolio grows, discovering specific projects or notes by technology stack (e.g., Rust, WebAssembly, i18n, Clean Architecture) becomes cumbersome. The current UI lists all items statically without any way for the user to query or filter them. 

We need a lightweight, lightning-fast search mechanism that preserves the static generation (SSG) of the portfolio while offering a highly responsive, interactive, and visually stunning search experience.

---

## 2. Proposed Architecture

We propose a **Client-Side In-Memory Search & Filtering** model.

```
+-------------------------------------------------------------+
|                     Next.js Server Page                     |
|  - Reads MDX files at build time (SSG)                      |
|  - Parses metadata via Zod & gray-matter                    |
+------------------------------+------------------------------+
                               | Passes pre-fetched list
                               v
+-------------------------------------------------------------+
|                Client-Side Search Component                 |
|  - Receives serialized array of items                       |
|  - Maintains interactive state (query, selected tags)       |
|  - Filters items in-memory instantly                        |
+-------------------------------------------------------------+
```

### Why this approach?
- **Zero Runtime DB Queries**: Since the site is statically generated, fetching and filtering metadata entirely in the browser keeps hosting costs at zero and loading times near-instant.
- **SEO Optimization**: The initial page load contains the full list of notes/projects in the HTML, allowing search engines to index all content. Client-side state takes over for interactivity.
- **Fast Search Indexing**: Since the total number of notes and projects is expected to be under a few hundred, in-memory filtering via a simple substring match is highly performant and requires no heavy external libraries.

---

## 3. Schema & Metadata Updates

To make searching notes as robust as projects, we must align the metadata schemas:

### A. Update `EngramFrontmatterSchema` (`src/domain/entities/Engram.ts`):
- Add `tags`: `z.array(z.string()).min(1, "Debe tener al menos un tag")` (to support multi-tag filtering, deprecating or supplementing the single `topic` field).
- Add `summary`: `z.string().min(10).optional()` (to search against description text).
- Add `difficulty`: `z.enum(["principiante", "intermedio", "avanzado"]).optional()` (to classify notes/hazañas by technical depth).

```typescript
export const EngramFrontmatterSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  tags: z.array(z.string()).default([]), // New field
  summary: z.string().optional(),          // New field
  date: z.string(),
  readTimeMinutes: z.number().positive().optional(),
});
```

---

## 4. UI/UX Specifications (Premium Aesthetic)

The search control will be integrated directly into the `notes` and `projects` pages, maintaining the dark glassmorphic UI.

1. **Search Bar**:
   - A modern input field with a glowing primary border (`#15D1D9` / `var(--primary)`) on focus.
   - Glassmorphic backdrop (`backdrop-blur-md bg-surface/40 border-border/60`).
   - Clean "Search" icon (`lucide-react` or inline SVG) and a keyboard shortcut hint (`Ctrl + K`).
2. **Tag Cloud**:
   - Interactive, horizontal pill-cloud that allows multi-selection.
   - Selected tags glow with a primary shadow (`shadow-[0_0_10px_rgba(21,209,217,0.3)]`) and use primary text.
   - Smooth hover micro-animations (subtle scale-up and border brightening).
3. **No Results State**:
   - A beautiful, minimalist illustration or feedback text (e.g., "No engrams match your filters") with a button to clear all active filters.

---

## 5. Alternative Solutions & Trade-offs

| Alternative | Pros | Cons |
| :--- | :--- | :--- |
| **Simple In-Memory Filter (Recommended)** | Instant search, zero bundle size overhead, retains full static generation (SSG). | Search is basic (exact match); doesn't handle typos or advanced stemming. |
| **FlexSearch / MiniSearch Index** | Handles fuzzy search, typing corrections, and field weighting. | Adds 5-10KB to the JavaScript bundle; unnecessary for small datasets. |
| **Dynamic Server-Side Search (API Route)** | Scale to thousands of items without bloating client bundle. | Breaks SSG (requires Server-Side Rendering or client-side API fetches), increases latencies and cost. |

---

## 6. Implementation Plan & Deliverables

1. **Phase 1: Domain & Content Setup**
   - Update `Engram.ts` entity and update existing MDX files to include `tags` and `summary`.
2. **Phase 2: Component Architecture**
   - Implement `SearchInput` and `TagCloud` components using React state.
   - Implement `FilteredGrid` that coordinates state and displays the filtered list of card components.
3. **Phase 3: Page Integration**
   - Replace the static list in `src/app/[locale]/notes/page.tsx` and `src/app/[locale]/projects/page.tsx` with the new interactive components.
4. **Phase 4: Validation & Optimization**
   - Verify layout on responsive break-points (mobile, tablet, desktop).
   - Ensure screen-readers can navigate the search bar and tag toggles.

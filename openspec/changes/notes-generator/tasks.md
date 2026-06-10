# SDD Tasks: Generador de Notas y Hazañas (Change: `notes-generator`)

This document lists the step-by-step implementation tasks for introducing the CLI drafts generator script.

## 1. CLI Tooling & Integration
* `[x]` Add `"drafts": "tsx scripts/generate-drafts.ts"` to `package.json` scripts.
* `[x]` Create CLI script `scripts/generate-drafts.ts`.
  * `[x]` Parse arguments using native `util.parseArgs` (Node 18.3+).
  * `[x]` Clean arguments from npm-specific double dashes `--` to avoid positional parsing blockages.
  * `[x]` Extract commits from native Git logs.
  * `[x]` Clean message prefixes and classify into categories.
  * `[x]` Perform in-memory validation of frontmatter against `EngramFrontmatterSchema` and `ProjectFrontmatterSchema`.
  * `[x]` Build bilingual Markdown templates containing hitos list.
  * `[x]` Write bilingual drafts to `content/engrams/{es,en}` or `content/projects/{es,en}`.

## 2. Verification & CI/CD Validation
* `[x]` Run TypeScript static checks with `npx tsc --noEmit`.
* `[x]` Run ESLint checks with `npm run lint`.
* `[x]` Verify manually:
  * `[x]` Default execution (`npx tsx scripts/generate-drafts.ts`) generates drafts.
  * `[x]` Zero commits execution (`npx tsx scripts/generate-drafts.ts --days 0` / `--since 2030-01-01`) logs gracefully and writes no files.
  * `[x]` Zod validation failure (`npx tsx scripts/generate-drafts.ts --topic=''`) catches errors and prints to stderr.
  * `[x]` Custom output directory and slug (`npx tsx scripts/generate-drafts.ts --type project --slug "mi-hazaña-wasm" --output-dir "tests/mocks"`) behaves as expected.

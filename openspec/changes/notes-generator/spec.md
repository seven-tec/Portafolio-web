# Specification: Generador de Notas y Hazañas (Change: `notes-generator`)

This document defines the behavior, interface, and testable requirements for the CLI draft generator script, which parses Git commits and generates bilingual MDX drafts for technical notes and projects.

---

## 1. Requirements

### 1.1 Inputs & Options
The script MUST be executed as a local command-line script under Node.js using `tsx`.
It MUST support the following CLI options:
* `--days <number>`: Number of days to look back in the Git history. Defaults to `7`.
* `--since <commit-ish|date>`: Starting Git reference point (commit hash, branch name, tag, or date string). If provided, it MUST override `--days`.
* `--type <engram|project>`: Type of draft content to generate. MUST be either `engram` (technical note) or `project` (case study). Defaults to `engram`.
* `--topic <string>`: Main topic category. Defaults to `Desarrollo` (ES) and `Development` (EN).
* `--featured`: Boolean flag to set `featured: true` (only valid when `--type` is `project`).
* `--slug <string>`: Custom slug name to use for the output files. If not provided, the script MUST generate a slug automatically with the format `actividad-YYYY-MM-DD` using the current local date.
* `--output-dir <path>`: Directory override for writing files. If not provided, it MUST write to the default content directories:
  * For `engram`: `content/engrams/es/` and `content/engrams/en/`
  * For `project`: `content/projects/es/` and `content/projects/en/`

### 1.2 Git Activity Extraction
* The script MUST use a native Git call (e.g. `git log`) to extract the list of commits from the current repository.
* The script MUST filter out:
  * Merge commits (commits with multiple parents).
  * Commits whose message starts with `wip:`, `temp:`, `chore:`, or empty lines.
* The script MUST categorize the remaining commits by parsing their conventional prefixes (`feat`, `fix`, `refactor`, `style`, `docs`, `perf`, `test`).

### 1.3 Frontmatter Validation
* The script MUST validate the constructed frontmatter object in memory using the corresponding Zod schema:
  * `EngramFrontmatterSchema` (imported from `src/domain/entities/Engram.ts`) when `--type engram` is selected.
  * `ProjectFrontmatterSchema` (imported from `src/domain/entities/Project.ts`) when `--type project` is selected.
* If the generated frontmatter fails validation, the script MUST print the validation errors to `stderr` and exit with code `1` without writing any files.

### 1.4 Output Generation
* The script MUST write the drafts in both Spanish and English simultaneously using the same slug: `[slug].mdx`.
* The content of the drafts MUST be structured in markdown with headers for each commit group.
* If no matching commits are found, the script MUST NOT write any files, inform the user, and exit cleanly with code `0`.

---

## 2. Scenarios

### Scenario 1: Generating standard bilingual notes from recent commits
* **Given** a Git repository containing the following commits within the last 7 days:
  * `feat: add glassmorphic search inputs`
  * `fix: prevent text selection cursor on links`
  * `refactor: clean unused component props`
* **When** I run `npm run drafts` with no options
* **Then** the script MUST query the Git log.
* **And** it MUST parse and group the commits by prefix.
* **And** it MUST construct a frontmatter object:
  ```json
  {
    "title": "Borrador de Actividad: actividad-2026-06-09",
    "topic": "Desarrollo",
    "date": "2026-06-09",
    "tags": ["git", "nextjs", "typescript"],
    "summary": "Resumen autogenerado de la actividad técnica: implementación de features y resolución de bugs.",
    "difficulty": "Medium"
  }
  ```
* **And** it MUST validate this object against `EngramFrontmatterSchema`.
* **And** it MUST write two files:
  * `content/engrams/es/actividad-2026-06-09.mdx` (containing Spanish templates and the categorized hitos).
  * `content/engrams/en/actividad-2026-06-09.mdx` (containing English templates and translated hitos).
* **And** the script MUST print a success message to `stdout` and exit with code `0`.

### Scenario 2: Running with no commits found
* **Given** a Git repository with no commits matching the filter criteria within the last `--days` or since `--since`
* **When** I run `npm run drafts -- --days 1`
* **Then** the script MUST detect that the filtered commits list is empty.
* **And** it MUST NOT write or modify any files on disk.
* **And** it MUST print a message to `stdout` indicating no activity was found.
* **And** it MUST exit cleanly with code `0`.

### Scenario 3: Validation failure due to invalid inputs
* **Given** an invalid `--topic` parameter that violates Zod validation (e.g. an empty string) or missing required metadata
* **When** I run `npm run drafts -- --topic ""`
* **Then** the script MUST construct the frontmatter object with the empty topic.
* **And** it MUST run Zod validation which will fail because the topic string has length 0.
* **And** it MUST catch the validation error, format it legibly, print it to `stderr`, and exit with code `1`.
* **And** no files MUST be created or modified.

### Scenario 4: Custom slug and output override
* **Given** a Git repository with commits
* **When** I run `npm run drafts -- --slug "mi-hazaña-wasm" --output-dir "tests/mocks"`
* **Then** the script MUST generate files named `mi-hazaña-wasm.mdx`.
* **And** it MUST write them to:
  * `tests/mocks/es/mi-hazaña-wasm.mdx`
  * `tests/mocks/en/mi-hazaña-wasm.mdx`
* **And** it MUST exit with code `0`.

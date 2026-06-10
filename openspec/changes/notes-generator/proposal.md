# Proposal: Generador de Notas y Hazañas (Change: `notes-generator`)

Este documento presenta la propuesta técnica para implementar un generador automático de borradores (drafts) de notas técnicas (`engrams`) y proyectos (`projects`) a partir de la actividad de Git del repositorio local. El objetivo es automatizar el andamiaje bilingüe inicial y asegurar la validación estricta de metadatos (Zod) antes de su publicación.

---

## 1. Problem Statement

Che, seamos sinceros: a nadie le gusta escribir documentación a mano desde cero. En el día a día del laburo, vas metiendo commits y, al final de la semana, sentarte a revisar qué hiciste para armar una nota técnica o actualizar el portfolio es un quilombo bárbaro. Terminas perdiendo tiempo en:
1. Buscar los commits con `git log` a mano.
2. Traducir y estructurar el frontmatter del MDX.
3. Asegurar que las validaciones de Zod no exploten en runtime (ej. el límite de caracteres del `summary`).
4. Crear la estructura bilingüe repetitiva para `/es/` y `/en/`.

Para no dejarnos estar y evitar la mediocridad de tener un portfolio desactualizado, necesitamos una herramienta local robusta que automatice este andamiaje. Queremos un script que inspeccione el historial de Git, agrupe la actividad relevante, valide los tipos de Zod en tiempo de ejecución, y nos escupa los borradores de MDX listos para pulir en ambos idiomas.

---

## 2. Proposed Architecture & Script Logic

Proponemos una solución basada en un script CLI en TypeScript (`scripts/generate-drafts.ts`) ejecutado directamente en el entorno local a través de `tsx` (que ya lo tenemos instalado en el proyecto, así que ni en pedo agregamos dependencias pesadas al cohete).

```
+------------------------------------------------------------+
|                       Git Repository                       |
|  - Extrae commits locales (child_process: git log)         |
+-----------------------------+------------------------------+
                              | Commits en crudo
                              v
+------------------------------------------------------------+
|                 CLI Script (generate-drafts.ts)            |
|  - Filtra commits de merge o triviales (wip, temp)         |
|  - Agrupa por convención (feat, fix, refactor, etc.)       |
|  - Estructura metadatos según esquemas Zod                  |
+-----------------------------+------------------------------+
                              | Escribe borradores MDX
                              v
+------------------------------------------------------------+
|             Bilingüe MDX (content/engrams/)                |
|  - /es/borrador-2026-06-09.mdx  -> Frontmatter + ES text   |
|  - /en/borrador-2026-06-09.mdx  -> Frontmatter + EN text   |
+------------------------------------------------------------+
```

### Script Workflow

1. **Extracción de Commits**:
   El script ejecutará un comando de Git nativo usando `child_process.execSync` para obtener los commits filtrados por rango de tiempo (o un ref específico):
   ```bash
   git log --no-merges --pretty=format:"%h|%s|%an|%ad" --date=short
   ```
2. **Filtrado & Limpieza**:
   - Se descartarán automáticamente aquellos commits considerados triviales (ej: `wip:`, `temp:`, `chore(deps):`, o commits vacíos).
   - Se limpiarán los prefijos convencionales para hacer los textos más legibles en el borrador final.
3. **Agrupamiento & Clasificación**:
   - Los commits se agruparán según su prefijo convencional (`feat`, `fix`, `refactor`, `style`, `docs`, `perf`, `test`).
   - Esto facilitará la autogeneración de los `tags` de la nota y la estructuración del cuerpo del borrador en secciones lógicas.
4. **Validación de Zod en Tiempo de Generación**:
   - El script importará directamente `EngramFrontmatterSchema` y `ProjectFrontmatterSchema` de `src/domain/entities/` para validar el frontmatter del draft en memoria antes de escribir el archivo físico. Esto garantiza que cualquier draft generado sea 100% compatible con el parser de Next.js (`src/infrastructure/mdxParser.ts`).
5. **Andamiaje Bilingüe**:
   - Por defecto, el script escribirá dos archivos de manera simultánea usando el mismo slug: uno en `content/engrams/es/` and otro en `content/engrams/en/`.
   - El frontmatter en inglés incluirá placeholders traducidos (e.g. `topic: "Architecture"` vs `topic: "Arquitectura"`).

---

## 3. Command Line Interface (CLI) Specification

El script se ejecutará mediante `npm run drafts` y soportará las siguientes opciones en línea de comandos:

- `--days <number>`: Cantidad de días hacia atrás a buscar en el log de git. Por defecto: `7`.
- `--since <commit|tag|date>`: Punto de partida específico de Git (ej. `--since=v1.2.0` o `--since="2026-06-01"`). Sobrescribe el valor de `--days`.
- `--type <engram|project>`: Define si queremos generar una nota técnica (`engram`) o un caso de estudio/proyecto (`project`). Por defecto: `engram`.
- `--topic <string>`: Define el tema principal (para notas). Por defecto: `Desarrollo`.
- `--featured`: Para proyectos, establece `featured: true` en el frontmatter.
- `--slug <string>`: Slug personalizado para el nombre de archivo MDX. Si no se provee, se autogenera con formato `actividad-YYYY-MM-DD`.
- `--output-dir <path>`: Permite desviar la escritura de los drafts a otro directorio para testing.

---

## 4. Draft Templates & Bilingual Generation

### A. Template de Nota Técnica (`engram`)

El script generará los archivos con el siguiente formato exacto:

**content/engrams/es/[slug].mdx**:
```markdown
---
title: "Borrador de Actividad: [Slug]"
topic: "Desarrollo"
date: "2026-06-09"
readTimeMinutes: 5
tags: ["git", "nextjs", "typescript"]
summary: "Resumen autogenerado de la actividad técnica: implementación de features y resolución de bugs."
difficulty: "Medium"
---

# Actividad Semanal ([Fecha])

Este borrador recopila los desarrollos realizados en el repositorio local. ¡Revisá y ponete a escribir los detalles, boludo!

## Hitos Técnicos Alcanzados

### Características Nuevas (Features)
- [Hito] [Descripción basada en commit feat]

### Correcciones (Bug Fixes)
- [Bug] [Descripción basada en commit fix]

### Refactorizaciones & Estilo
- [Refactor] [Descripción basada en commit refactor/style]
```

**content/engrams/en/[slug].mdx**:
```markdown
---
title: "Activity Draft: [Slug]"
topic: "Development"
date: "2026-06-09"
readTimeMinutes: 5
tags: ["git", "nextjs", "typescript"]
summary: "Autogenerated summary of technical activity: features implementation and bug resolution."
difficulty: "Medium"
---

# Weekly Activity ([Date])

This draft compiles the developments completed in the local repository. Review and refine the details!

## Technical Milestones

### New Features
- [Milestone] [Description based on feat commits]

### Bug Fixes
- [Bug] [Description based on fix commits]

### Refactoring & Style
- [Refactor] [Description based on refactor/style commits]
```

---

## 5. Alternative Solutions & Trade-offs

| Alternativa | Ventajas | Desventajas |
| :--- | :--- | :--- |
| **Generación Basada en Plantillas (Recomendada)** | Rápida, 100% offline, cero dependencias, control predecible del frontmatter. | Requiere edición manual posterior para dar contexto humano al cuerpo de la nota. |
| **Integración con LLM (OpenRouter/API)** | Puede resumir y redactar la nota técnica completa a partir de las diferencias de código (`git diff`). | Requiere API Key en el entorno local, costo por token, latencia en la generación, riesgo de alucinaciones técnicas. |
| **Escribir todo a mano** | Calidad artesanal sin código "basura". | Pérdida de tiempo enorme y propensión a errores de sintaxis en el frontmatter de MDX. |

*Decisión de arquitectura*: Nos inclinamos por la **Generación Basada en Plantillas** para arrancar. Es limpia, determinista y no nos ata a APIs externas. En el futuro se podría integrar un flag `--ai` si queremos que use un LLM para escribir la descripción completa, pero la base debe ser sólida y determinista.

---

## 6. Rollback Plan & Affected Modules

### Affected Modules:
- **`package.json`**: Se agregará el script `npm run drafts` apuntando a `tsx scripts/generate-drafts.ts`.
- **`scripts/generate-drafts.ts`**: Creación del archivo que encapsulará la lógica de Git, parseo y validación de Zod.

### Rollback Plan:
1. Eliminar el archivo `scripts/generate-drafts.ts`.
2. Remover el script `"drafts"` de `package.json`.
3. Ningún otro módulo del portfolio se verá afectado en runtime, ya que es una herramienta CLI en tiempo de desarrollo.

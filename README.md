# 🚀 High-Performance Portfolio & Engineering Platform

[![Site Status](https://img.shields.io/website?down_message=offline&label=live%20demo&up_message=online&url=https%3A%2F%2Fportfolio-arquitectura.vercel.app)](https://portfolio-arquitectura.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20React%2019%20%7C%20TS-blue)](https://nextjs.org)
[![Validation](https://img.shields.io/badge/Validation-Zod%20%2F%20Runtime-purple)](https://zod.dev)
[![Architecture](https://img.shields.io/badge/Architecture-Hexagonal-success)](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))

Este repositorio contiene el código fuente de mi plataforma de portafolio y hub técnico profesional. Diseñado bajo principios de **arquitectura hexagonal**, **código fuertemente tipado** y **validación estricta de datos en runtime**, sirve como demostración práctica de cómo estructurar aplicaciones frontend robustas y listas para producción.

*   **🔗 Sitio en producción:** [portfolio-arquitectura.vercel.app](https://portfolio-arquitectura.vercel.app)

---

## 🏛️ Arquitectura Interna del Proyecto

Para evitar el desorden típico de los proyectos frontend a medida que crecen, esta plataforma se estructuró siguiendo los principios de la **Arquitectura Hexagonal (Puertos y Adaptadores)**. Esto separa las decisiones de negocio y presentación de la forma en que se obtienen los datos.

```mermaid
graph TD
    subgraph Capa_de_Presentación [Capa de Presentación (Next.js 16 + React 19)]
        UI[Componentes React / UI]
        Pages[Next.js App Router Pages]
    end

    subgraph Capa_de_Aplicación [Capa de Aplicación (Casos de Uso)]
        ProjectUC[ProjectUseCases]
        EngramUC[EngramUseCases]
    end

    subgraph Capa_de_Dominio [Capa de Dominio (Núcleo Puro)]
        ProjEntity[Entity: Project]
        EngEntity[Entity: Engram]
        ZodSchema[Zod Contracts / Schemas]
    end

    subgraph Capa_de_Infraestructura [Capa de Infraestructura (Adaptadores)]
        MDXParser[MDX File System Parser]
        LocalFiles[(Markdown/MDX Files)]
    end

    UI --> ProjectUC
    Pages --> ProjectUC
    ProjectUC --> ProjEntity
    ProjectUC --> MDXParser
    MDXParser --> ZodSchema
    MDXParser --> LocalFiles
```

### Detalle de las Capas:

1.  **Dominio (`src/domain`):** Define los modelos de datos puros y las reglas de validación básicas utilizando **Zod**. No depende de ningún framework ni del sistema de archivos. Es JavaScript/TypeScript puro y portable.
2.  **Aplicación (`src/application`):** Contiene los casos de uso del sistema (ej. `ProjectUseCases`, `EngramUseCases`). Es la encargada de coordinar la lógica empresarial y servir como puente entre la interfaz de usuario y la infraestructura.
3.  **Infraestructura (`src/infrastructure`):** Implementa el acceso al sistema de archivos local (`mdxParser.ts`) para leer y analizar los ficheros Markdown/MDX. En el futuro, aquí se inyectarán adaptadores alternativos (ej: clientes de la API de GitHub).
4.  **Presentación / UI (`src/app` & `src/components`):** Capa de UI construida con Next.js (App Router) y Tailwind CSS. Consume los casos de uso para renderizar vistas estáticas ultra optimizadas.

---

## 🛡️ Validación Defensiva en Runtime (Zod)

El contenido del portafolio se escribe en archivos `.mdx` utilizando metadatos en formato YAML (frontmatter). Confiar en que no cometeremos un error ortográfico en el frontmatter que rompa la UI en producción es una mala práctica.

Para solucionar esto, implementamos validación estricta utilizando **Zod**. Cuando el parseador lee un archivo MDX del disco, valida su estructura contra el esquema del dominio en tiempo real:

```typescript
// src/domain/entities/Project.ts
export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  summary: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  tags: z.array(z.string()).min(1, "Debe tener al menos un tag"),
  date: z.string(),
  repositoryUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  metrics: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});
```

Si un archivo no cumple con el contrato (por ejemplo, si falta el título o el resumen es demasiado corto), el parser lanzará un error detallado inmediatamente, evitando que el sitio compile con datos corruptos o incompletos.

---

## ⚙️ Decisiones Técnicas y Trade-offs

*   **MDX Local vs CMS Headless (Contentful/Sanity):** Se priorizó una arquitectura orientada a archivos y versionada bajo Git. Esto garantiza **latencia cero** en consultas, costo de infraestructura cero, y permite mantener toda la base de conocimiento (`engrams/` y `projects/`) bajo el mismo ciclo de vida de desarrollo de la plataforma.
*   **Static Site Generation (SSG):** Next.js pre-renderiza todas las páginas en tiempo de compilación. Esto reduce drásticamente el Time to First Byte (TTFB), mejora el SEO técnico (puntuación de 100 en Core Web Vitals) y permite servir el portfolio de manera ultra-rápida desde una CDN global (Vercel).
*   **Tailwind CSS v4 + @tailwindcss/postcss:** Uso de la versión más reciente del compilador de CSS, reduciendo el tamaño del bundle generado y aprovechando la configuración declarativa mediante variables CSS.

---

## 🛠️ Instalación y Comandos de Desarrollo

### Requisitos Previos:
- Node.js (v18.0 o superior)
- npm o pnpm

### Pasos:

1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/seven-tec/Portafolio-web.git
    cd Portafolio-web
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Copiar variables de entorno de desarrollo:
    ```bash
    cp .env.local.example .env.local
    ```
4.  Levantar el servidor local:
    ```bash
    npm run dev
    ```

### Ejecutar Tests del Parser:
Para validar que tus archivos MDX de proyectos o engrams no contengan errores de frontmatter o sintaxis que rompan la validación Zod, podés ejecutar el comando de pruebas integrado:

```bash
npm run test:parser
```

Este script ejecuta `tests/infrastructure/test-parser.ts` usando `tsx` de manera directa, garantizando que el parseador compile y valide la estructura simulada del disco sin problemas.

---

## 📅 Hoja de Ruta e Integraciones Futuras

En la carpeta `docs/` se documentan las siguientes fases y directrices de ingeniería de la plataforma:
- [Integración Dinámica con GitHub](./docs/github-integration.md): Especificación técnica para consumir la API de GitHub e inyectar repositorios dinámicamente como adaptadores de la capa de infraestructura.
- [Políticas de SEO & Dominio](./docs/seo-and-domain-policy.md): Lineamientos de marcado semántico, metadatos y optimización de rastreo.
- [Mapeo de Analíticas](./docs/analytics-policy.md): Integración con Vercel Analytics para medir el embudo de conversión de leads técnicos.

# Estrategia de Integración Dinámica con GitHub

Este documento describe la especificación técnica para inyectar repositorios públicos de GitHub de forma dinámica en el portfolio web. Este diseño sigue las pautas de la Arquitectura Hexagonal del proyecto, asegurando que el cambio no rompa la estructura actual.

---

## 🎯 Objetivo

Mostrar en la plataforma web una selección curada de repositorios públicos directamente desde la API de GitHub, manteniendo la información de estrellas, lenguajes y actualizaciones en tiempo real, sin comprometer el rendimiento del sitio.

---

## 🏛️ Diseño de Arquitectura

Para mantener la independencia tecnológica de la capa de aplicación, introduciremos un puerto (interfaz) en el dominio y un adaptador correspondiente en la infraestructura.

```
       Capa de Dominio            |           Capa de Infraestructura
----------------------------------+--------------------------------------------
 [ GithubRepo (Entidad Zod) ]     |
               ▲                  |
               │                  |
    [ GithubPort (Interfaz) ]  ◄──┼─── [ OctokitGithubAdapter (Implementación) ]
                                  |                     │
                                  |                     ▼
                                  |              [ API de GitHub ]
```

### 1. Definición del Puerto (Dominio)
Creamos una interfaz en `src/domain/ports/GithubPort.ts` que defina el contrato:

```typescript
export interface GithubPort {
  getStarredRepos(username: string): Promise<GithubRepo[]>;
  getRepoDetails(owner: string, repo: string): Promise<GithubRepo>;
}
```

Y la entidad validada con Zod en `src/domain/entities/GithubRepo.ts`:
```typescript
import { z } from "zod";

export const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  htmlUrl: z.string().url(),
  stars: z.number(),
  forks: z.number(),
  language: z.string().nullable(),
  topics: z.array(z.string()),
  updatedAt: z.string(),
});

export type GithubRepo = z.infer<typeof GithubRepoSchema>;
```

### 2. Implementación del Adaptador (Infraestructura)
Creamos el adaptador en `src/infrastructure/repositories/OctokitGithubAdapter.ts`.
Este adaptador consultará a GitHub usando `fetch` nativo de Next.js, inyectando el token `GITHUB_PAT` (Personal Access Token) desde las variables de entorno de producción para habilitar la cuota de 5,000 peticiones por hora.

---

## ⚡ Estrategia de Performance y Caché

Consultar directamente a la API de GitHub en cada petición del usuario degradaría la performance del sitio y consumiría rápidamente el límite de la cuota de peticiones.

### Alternativas de Implementación:

#### Opción A: Incremental Static Regeneration (ISR) - Recomendada
Next.js permite revalidar páginas estáticas en segundo plano. Configurando la ruta de carga de proyectos para revalidarse cada hora, Next.js servirá datos estáticos instantáneos a los usuarios y consultará a GitHub asíncronamente solo una vez cada 3600 segundos.

```typescript
// En el componente de Next.js o en la ruta de obtención:
export const revalidate = 3600; // Revalidar cada 1 hora
```

#### Opción B: Ruta API con Caché Vercel KV / Redis
Crear un endpoint interno en `/api/repos` que almacene la respuesta de la API de GitHub en una base de datos clave-valor rápida (ej: Vercel KV) con un TTL de 1 hora. Si la caché existe, devuelve inmediatamente; si expiró, consulta a GitHub y actualiza la caché.

---

## 🛠️ Plan de Trabajo para la Integración

1.  **Configurar Variables de Entorno:**
    *   `GITHUB_PAT`: Token personal de lectura de repositorios.
    *   `GITHUB_USERNAME`: Nombre de usuario a consultar (`seven-tec`).
2.  **Crear Entidades y Contratos Zod** en `src/domain/`.
3.  **Implementar Adaptador HTTP** en `src/infrastructure/`.
4.  **Crear el Caso de Uso** `GetGithubProjects` en `src/application/use-cases/`.
5.  **Actualizar UI:** Reemplazar o complementar la lectura de MDX local en el componente de "Casos Destacados" o en la página `/projects` para combinar proyectos en disco con repositorios dinámicos de GitHub.

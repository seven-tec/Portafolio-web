# SEO & Domain Policy v1

## SEO v1

### Alcance implementado
- Metadata `title` y `description` en todas las rutas públicas: `/`, `/projects`, `/projects/[slug]`, `/engrams`, `/engrams/[slug]`, `/architecture-review`
- Canonical URL via `alternates.canonical` en páginas de detalle (`/projects/[slug]`)
- OpenGraph tags para compartir en redes sociales
- JSON-LD (`Person` schema) en la Home
- Sitemap dinámico (`/sitemap.xml`) con todas las rutas estáticas y dinámicas
- Robots dinámico (`/robots.txt`) permitiendo crawling completo

### Cómo se genera la URL base
Todas las URLs canónicas, sitemap y metadatos dependen de una única función:

```typescript
// src/lib/site.ts
export function siteUrl(path = ""): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://tusitio.com";
  return `${base}${path}`;
}
```

El fallback `https://tusitio.com` es un placeholder. En producción, setear `NEXT_PUBLIC_SITE_URL` en Vercel al dominio real.

### Sitemap
Incluye:
- `/` (Home)
- `/projects`
- `/engrams`
- `/architecture-review`
- Cada proyecto individual (`/projects/[slug]`)
- Cada engrama individual (`/engrams/[slug]`)

## Domain Strategy

### Costo esperado
- **Dominio**: compra anual (~$10–15 USD en Namecheap, Cloudflare, o similar)
- **Hosting**: Vercel Hobby (gratuito mientras se mantenga dentro de límites)
- Sin costos adicionales por analytics, SSL, CDN o email

### Cuándo comprar dominio
No hay urgencia. El sitio funciona con la URL de Vercel (`*.vercel.app`). Comprar el dominio es un paso separado que puede esperar hasta que:
- El portfolio esté listo para compartirse públicamente de forma estable
- Se quiera una URL profesional para email o branding
- Se necesite migrar a Pro (y el dominio ya esté listo)

### Cómo conectar un dominio real
1. Comprar dominio en un registrar (Cloudflare, Namecheap, etc.)
2. En Vercel: proyecto → Settings → Domains → agregar dominio
3. Seguir instrucciones de DNS de Vercel (puede apuntar CNAME o usar nameservers de Vercel)
4. Actualizar `NEXT_PUBLIC_SITE_URL` en Vercel Environment Variables al nuevo dominio
5. Listo — el sitemap, robots, canonical y metadata usan el dominio nuevo sin tocar código

## Posibles mejoras futuras (post-v1)
- OpenGraph image por página (og-image dinámico)
- Breadcrumb structured data
- Mejores descriptions si el contenido se expande
- Favicon completo (actualmente el sitio no tiene uno declarado)

## Historial

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2026-05-21 | v1 | Policy inicial — SEO técnico mínimo, canonical strategy, sitemap completo, siteUrl helper |

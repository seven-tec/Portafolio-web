# Production Readiness

## Ya está listo

- **Favicon**: icono SVG `~/` en `src/app/icon.svg`. Sobrio, oscuro, monospace — alineado con la marca del nav.
- **Open Graph**: metadatos OG completos (title, description, url, siteName, locale, type) + OG image automática vía `src/app/opengraph-image.tsx`. Links compartidos muestran título, descripción e imagen de previsualización.
- **Canonical / Domain**: `metadataBase` apunta a `NEXT_PUBLIC_SITE_URL`. `siteUrl()` usado en OG url, sitemap y robots.txt. Fallback a `localhost:3000` para desarrollo.
- **Sitemap**: cubre `/`, `/projects`, `/engrams`, `/architecture-review` y todas las rutas dinámicas de proyectos y engrams.
- **robots.txt**: permite crawling completo, apunta al sitemap.
- **SEO base**: metadata por página, title template, description, páginas generadas como static.
- **Analytics**: Vercel Web Analytics activo (sin trackers de terceros).
- **Performance**: todas las rutas son static (SSG), cero runtime dinámico.

## Para compartir el sitio públicamente

1. **Configurar `NEXT_PUBLIC_SITE_URL`** en Vercel:
   - Variable de entorno:`NEXT_PUBLIC_SITE_URL=https://tudominio.com`
   - Sin esta variable, el sitemap, OG url y metadataBase usan `localhost:3000`.

2. **Conectar dominio custom**: el sitio está listo para recibir cualquier dominio. No requiere cambios de código. Solo configurar el dominio en Vercel y setear `NEXT_PUBLIC_SITE_URL`.

3. **Verificar OG preview**:
   - Usar https://opengraph.dev/ o similar para testear cómo se ve el link al compartir.
   - La OG image se genera automáticamente con `next/og` (edge runtime en Vercel).
   - En desarrollo local no funciona el edge runtime de OG image — hay que deployar para ver el resultado real.

## Fuera de scope (mejoras futuras)

- **PWA / manifest**: no hay service worker ni manifest.json. No necesario para un portfolio, pero si se quiere soporte offline o instalación, hay que agregarlo.
- **RSS feed**: no implementado. Útil si los engrams se convierten en blog regular.
- **Performance presets (Lighthouse)**: no se ha hecho una carrera formal de Lighthouse. Se recomienda antes del lanzamiento público.
- **Custom 404**: la página 404 es la default de Next.js. Si se quiere una personalizada, crear `src/app/not-found.tsx`.
- **Email / contacto directo**: el canal de conversión v1 es el formulario de `/architecture-review`. No hay un mailto público ni formulario de contacto genérico, por diseño (el filtro técnico es parte de la propuesta de valor).

## Resumen técnico

| Aspecto | Estado | Observación |
|---------|--------|-------------|
| Favicon | ✅ | SVG minimalista (`~/`) |
| OG tags | ✅ | Title, desc, image, URL |
| OG image | ✅ | Auto-generada vía `next/og` |
| Canonical URL | ✅ | Via `siteUrl()` + `metadataBase` |
| Sitemap | ✅ | Automático |
| robots.txt | ✅ | Allow all |
| Analytics | ✅ | Vercel Web Analytics |
| Performance | ✅ | SSG 100% |
| Domain | 🔲 | Pendiente configurar en Vercel |
| PWA | 🔲 | No planeado |
| Lighthouse | 🔲 | Pendiente antes del launch |

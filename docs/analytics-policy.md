# Analytics Policy v1

## Fuente primaria
**Vercel Web Analytics** (básico, incluido en el plan Hobby / Pro).

Implementado mediante `@vercel/analytics/react` — componente `<Analytics />` montado en el root layout. Sin configuración adicional, sin custom events.

Dashboard: `https://vercel.com/{project}/analytics`

## Fuente de verdad de conversión
**Formspree** → `3bc41pnvc2010@gmail.com`

Los leads del formulario en `/architecture-review` se entregan vía Server Action al endpoint configurado (`LEAD_ENDPOINT_URL` en `.env.local`). No se trackean conversiones vía analytics — la fuente real son los correos recibidos.

## Restricciones

| Prohibido | Motivo |
|-----------|--------|
| Custom events (`track()`, `va.track`) | Costo en Vercel Analytics (plan Pro cobra por events) |
| Google Analytics | Costo de recursos, compliance, latencia |
| Hotjar / Mixpanel / Clarity | Overkill para portfolio, riesgo de fuga de datos de leads |
| Facebook Pixel / Ads trackers | Sin sentido en portfolio técnico |
| Cualquier script de terceros | Sin waiver explícito, no se agrega |

## Operación

1. Revisar el dashboard de Vercel Analytics periódicamente (tráfico, páginas populares)
2. En Hobby no hay overage charges: si el proyecto excede los límites, se frena y toca migrar a Pro — no hay costo sorpresa. Si se acerca al límite, se puede deshabilitar `<Analytics />` o evaluar el salto a Pro.
3. Para agregar un nuevo tracker o custom event, se requiere:
   - Documentación del caso de uso
   - Aprobación explícita del maintainer
   - Esta policy actualizada

## Cómo deshabilitar analytics (si hace falta)

```tsx
// En src/app/layout.tsx — comentar o eliminar:
// import { Analytics } from "@vercel/analytics/react";
// ...
// <Analytics />
```

Sin esta línea, el portfolio opera sin enviar datos a Vercel.

## Historial

| Fecha | Versión | Cambio |
|-------|---------|--------|
| 2026-05-21 | v1 | Policy inicial — solo Vercel Web Analytics básico |

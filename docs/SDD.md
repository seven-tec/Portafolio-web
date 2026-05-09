# Software Design Document (SDD) - Portfolio & Engineering Platform

## 1. Propósito
Plataforma estática de alto rendimiento diseñada para documentar arquitectura de software, casos de estudio y engrams técnicos.

## 2. Arquitectura del Sistema
- **Capa de Presentación:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion.
- **Capa de Dominio:** Entidades estáticas tipadas en TypeScript.
- **Capa de Infraestructura:** Sistema de archivos local (Markdown/MDX) procesado en tiempo de compilación.

## 3. Patrones y Decisiones (Trade-offs)
- **Por qué MDX local vs. CMS Headless:** Se prioriza la velocidad de desarrollo y el control de versiones directo en Git para demostrar prácticas de ingeniería, sacrificando la edición remota (innecesaria para este contexto).
- **Renderizado Estático (SSG):** Todo el contenido se pre-renderiza para maximizar la velocidad de carga y el SEO técnico.

## 4. Estructura de Datos
### Entidad: Project
- id: string
- title: string
- architecture_summary: string
- impact_metrics: string[]
### Entidad: Engram
- id: string
- topic: string
- date: date
- technical_notes: string

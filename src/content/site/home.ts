import { PortfolioHomeContentSchema } from "@/domain/entities/PortfolioHome";

export const homeContent = PortfolioHomeContentSchema.parse({
  eyebrow: "Arquitectura · Performance · IA aplicada",
  headline: "Arquitectura web de alto rendimiento e IA aplicada con criterio real de negocio.",
  subheadline:
    "Diseño y construyo — para startups, creadores premium y empresas B2B — aplicaciones rápidas, modulares y escalables con foco en performance, automatización y decisiones técnicas que resistan el crecimiento.",
  primaryCta: {
    label: "Solicitar evaluación de arquitectura",
    href: "/architecture-review",
  },
  secondaryCta: {
    label: "Ver casos de estudio",
    href: "/projects",
  },
  painPoints: [
    {
      id: "slow-products",
      title: "Aplicaciones lentas o difíciles de escalar",
      businessImpact: "La experiencia se degrada, cae la conversión y aumenta el costo operativo.",
      technicalImpact: "El sistema crece sobre una base frágil, con cuellos de botella y decisiones difíciles de sostener.",
    },
    {
      id: "fragmented-processes",
      title: "Procesos manuales o fragmentados",
      businessImpact: "El equipo pierde tiempo coordinando herramientas y tareas repetitivas.",
      technicalImpact: "La lógica vive dispersa, sin una arquitectura que conecte datos, automatización y operación.",
    },
    {
      id: "weak-foundation",
      title: "Productos con mala base técnica",
      businessImpact: "Cada nuevo feature cuesta más y aumenta el riesgo de romper lo existente.",
      technicalImpact: "La deuda técnica bloquea velocidad, testabilidad y capacidad de evolución.",
    },
    {
      id: "misused-ai",
      title: "Integraciones de IA sin criterio de producto",
      businessImpact: "Se invierte en automatización sin retorno claro ni impacto medible.",
      technicalImpact: "La IA queda desacoplada del flujo real del negocio y genera complejidad en vez de valor.",
    },
  ],
  capabilities: [
    {
      id: "performance-web",
      title: "High-Performance Web",
      summary: "Arquitecturas web orientadas a velocidad, escalabilidad y costos operativos sanos.",
      technologies: ["Next.js", "TypeScript", "Performance Engineering"],
    },
    {
      id: "rust-wasm",
      title: "Rust + WASM para núcleos críticos",
      summary: "Uso Rust/WASM cuando el problema exige lógica intensiva, ejecución rápida o experiencia interactiva superior.",
      technologies: ["Rust", "WebAssembly", "Systems Design"],
    },
    {
      id: "modular-architecture",
      title: "Arquitectura modular y mantenible",
      summary: "Diseño sistemas que pueden crecer sin colapsar cada vez que cambia el negocio.",
      technologies: ["Hexagonal Architecture", "Domain Modeling", "Typed Contracts"],
    },
    {
      id: "applied-ai",
      title: "IA aplicada a procesos y producto",
      summary: "Integro LLMs y automatización donde aportan valor real, no como adorno.",
      technologies: ["LLMs", "Workflow Design", "Transmedia Automation"],
    },
  ],
  featuredCases: [
    {
      slug: "scientific-sudoku",
      title: "Scientific Sudoku",
      summary: "Demostración de lógica computacional compleja y experiencia interactiva con foco en rendimiento.",
      problem: "Resolver un problema de cálculo y UX interactiva sin sacrificar velocidad ni claridad.",
      solution: "Arquitectura centrada en WASM y UI reactiva para validar dominio técnico en performance y lógica.",
      href: "/projects/scientific-sudoku",
      tags: ["WASM", "Svelte 5", "Performance"],
    },
    {
      slug: "novelavox-studio",
      title: "NovelaVox Studio",
      summary: "Sandbox de integración entre LLMs, audio y experiencia de usuario de alta fidelidad.",
      problem: "Orquestar IA y generación de audio dentro de una interfaz operativa y usable.",
      solution: "Integración de modelos y reproducción interactiva para mostrar IA aplicada a un flujo real.",
      href: "/projects/novelavox-studio",
      tags: ["LLMs", "Audio", "UX", "AI Orchestration"],
    },
    {
      slug: "logistica-express",
      title: "Sistema de Inventario Logístico",
      summary: "Caso de gestión empresarial con validación de datos, seguridad y foco en operación real.",
      problem: "Reducir fricción operativa en procesos de inventario y control de stock.",
      solution: "Aplicación de negocio con estructura modular y foco en eficiencia, validación y robustez.",
      href: "/projects/logistica-express",
      tags: ["B2B", "Inventory", "Validation", "Operations"],
    },
  ],
  processSteps: [
    {
      id: "review",
      title: "Evaluación técnica",
      description: "Primero analizo el problema, el contexto y las restricciones reales del producto.",
    },
    {
      id: "diagnosis",
      title: "Diagnóstico y criterios",
      description: "Defino qué está frenando rendimiento, escalabilidad o claridad operativa.",
    },
    {
      id: "proposal",
      title: "Propuesta estructurada",
      description: "Devuelvo una propuesta concreta con dirección técnica, prioridades y tradeoffs.",
    },
    {
      id: "execution",
      title: "Implementación por fases",
      description: "Ejecuto cambios en bloques verificables para mantener velocidad sin perder control.",
    },
  ],
  architectureReviewPitch: {
    title: "Una evaluación técnica seria, no un formulario de contacto",
    description:
      "Esto es un filtro técnico asíncrono. Mejor entiendo tu problema antes de proponerte una solución. Sin llamadas de ventas, sin propuestas genéricas.",
    fitExamples: [
      "Problemas de rendimiento o escalabilidad",
      "Procesos internos fragmentados o manuales",
      "Integración de IA con valor operativo real",
    ],
  },
  authorityClose: {
    title: "Ingeniería con criterio, no software decorativo",
    description:
      "Cada proyecto lo abordo con un proceso estructurado: diagnostico primero, propongo con tradeoffs explícitos, ejecuto en fases verificables. No improviso. No vendo código sin contexto.",
  },
  heroBadges: [
    "Clean Architecture",
    "Rust / WASM",
    "Performance Engineering",
    "IA Aplicada",
  ],
  metricsHighlight: [
    {
      value: "< 50ms",
      label: "Resolución Algorítmica (WASM)",
      description: "Ejecución del motor transaccional de Sudoku a tiempo nativo dentro del cliente.",
    },
    {
      value: "Sub-10ms",
      label: "Latencia en Concurrencia (Rust)",
      description: "Gestión transaccional y control de stock atómico con mutex locks de alta eficiencia.",
    },
    {
      value: "100% Local",
      label: "Persistencia In-Browser (IndexedDB)",
      description: "Generación de audios in-browser eliminando costos cloud y latencia de red.",
    }
  ],
});

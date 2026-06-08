import { PortfolioHomeContentSchema } from "@/domain/entities/PortfolioHome";

export const homeContentEn = PortfolioHomeContentSchema.parse({
  eyebrow: "Architecture · Performance · Applied AI",
  headline: "High-performance web architecture and AI systems applied with real business criteria.",
  subheadline:
    "I design and build — for startups, premium creators, and B2B companies — fast, modular, and scalable applications focused on performance, automation, and technical decisions that withstand growth.",
  primaryCta: {
    label: "Request architecture evaluation",
    href: "/architecture-review",
  },
  secondaryCta: {
    label: "View case studies",
    href: "/projects",
  },
  painPoints: [
    {
      id: "slow-products",
      title: "Slow or hard to scale applications",
      businessImpact: "User experience degrades, conversion drops, and operational costs rise.",
      technicalImpact: "The system grows on a fragile foundation, with bottlenecks and hard-to-maintain decisions.",
    },
    {
      id: "fragmented-processes",
      title: "Manual or fragmented processes",
      businessImpact: "The team wastes time coordinating tools and repetitive tasks.",
      technicalImpact: "Logic lives dispersed, lacking an architecture that connects data, automation, and operations.",
    },
    {
      id: "weak-foundation",
      title: "Products with poor technical foundation",
      businessImpact: "Every new feature costs more and increases the risk of breaking existing ones.",
      technicalImpact: "Technical debt blocks velocity, testability, and the ability to evolve.",
    },
    {
      id: "misused-ai",
      title: "AI integrations without product criteria",
      businessImpact: "Investments are made in automation without clear returns or measurable impact.",
      technicalImpact: "AI remains decoupled from real business workflows and generates complexity instead of value.",
    },
  ],
  capabilities: [
    {
      id: "performance-web",
      title: "High-Performance Web",
      summary: "Web architectures oriented toward speed, scalability, and healthy operating costs.",
      technologies: ["Next.js", "TypeScript", "Performance Engineering"],
    },
    {
      id: "rust-wasm",
      title: "Rust + WASM for Critical Cores",
      summary: "Using Rust/WASM when the problem demands intensive logic, fast execution, or superior interactive experience.",
      technologies: ["Rust", "WebAssembly", "Systems Design"],
    },
    {
      id: "modular-architecture",
      title: "Modular and Maintainable Architecture",
      summary: "Designing systems that can grow without collapsing every time the business changes.",
      technologies: ["Hexagonal Architecture", "Domain Modeling", "Typed Contracts"],
    },
    {
      id: "applied-ai",
      title: "AI Applied to Processes and Product",
      summary: "Integrating LLMs and automation where they bring real value, not as decoration.",
      technologies: ["LLMs", "Workflow Design", "Transmedia Automation"],
    },
  ],
  featuredCases: [
    {
      slug: "scientific-sudoku",
      title: "Scientific Sudoku",
      summary: "Demonstration of complex computational logic and interactive experience focused on performance.",
      problem: "Solve a calculation and interactive UX problem without sacrificing speed or clarity.",
      solution: "WASM-centered architecture and reactive UI to validate technical domain in performance and logic.",
      href: "/projects/scientific-sudoku",
      tags: ["WASM", "Svelte 5", "Performance"],
    },
    {
      slug: "novelavox-studio",
      title: "NovelaVox Studio",
      summary: "Sandbox of integration between LLMs, audio, and high-fidelity user experience.",
      problem: "Orchestrate AI and audio generation within an operational and usable interface.",
      solution: "Model integration and interactive playback to showcase AI applied to a real workflow.",
      href: "/projects/novelavox-studio",
      tags: ["LLMs", "Audio", "UX", "AI Orchestration"],
    },
    {
      slug: "logistica-express",
      title: "Logistics Inventory System",
      summary: "Business management case with data validation, security, and focus on real operations.",
      problem: "Reduce operational friction in inventory processes and atomic stock control.",
      solution: "Business application with modular structure and focus on efficiency, validation, and robustness.",
      href: "/projects/logistica-express",
      tags: ["B2B", "Inventory", "Validation", "Operations"],
    },
  ],
  processSteps: [
    {
      id: "review",
      title: "Technical evaluation",
      description: "First, I analyze the problem, context, and real product constraints.",
    },
    {
      id: "diagnosis",
      title: "Diagnosis and criteria",
      description: "I define what is hindering performance, scalability, or operational clarity.",
    },
    {
      id: "proposal",
      title: "Structured proposal",
      description: "I deliver a concrete proposal with technical direction, priorities, and explicit trade-offs.",
    },
    {
      id: "execution",
      title: "Phased execution",
      description: "I execute changes in verifiable blocks to maintain velocity without losing control.",
    },
  ],
  architectureReviewPitch: {
    title: "A serious technical evaluation, not a contact form",
    description:
      "This is an asynchronous technical filter. I want to understand your problem before proposing a solution. No sales calls, no generic proposals.",
    fitExamples: [
      "Performance or scalability issues",
      "Fragmented or manual internal processes",
      "AI integration with real operational value",
    ],
  },
  authorityClose: {
    title: "Engineering with criteria, not decorative software",
    description:
      "I approach every project with a structured process: diagnose first, propose with explicit trade-offs, execute in verifiable phases. I do not improvise. I do not sell code without context.",
  },
  heroBadges: [
    "Clean Architecture",
    "Rust / WASM",
    "Performance Engineering",
    "Applied AI",
  ],
  metricsHighlight: [
    {
      value: "< 50ms",
      label: "Algorithmic Solving (WASM)",
      description: "Execution of the Sudoku transactional engine at native speed inside the client.",
    },
    {
      value: "Sub-10ms",
      label: "Concurrency Latency (Rust)",
      description: "Transactional management and atomic stock control with high-efficiency mutex locks.",
    },
    {
      value: "100% Local",
      label: "In-Browser Persistence (IndexedDB)",
      description: "In-browser audio generation eliminating cloud costs and network latency.",
    }
  ],
});

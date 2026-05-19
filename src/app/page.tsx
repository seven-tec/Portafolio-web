import { ProjectUseCases } from "../application/use-cases/ProjectUseCases";
import { EngramUseCases } from "../application/use-cases/EngramUseCases";
import { ImpactDashboard } from "../components/ImpactDashboard";
import { Metadata } from "next";
import { SectionHeader } from "../components/ui/SectionHeader";
import { Grid } from "../components/ui/Grid";
import { ProjectCard } from "../components/ui/ProjectCard";
import { EngramCard } from "../components/ui/EngramCard";

export const metadata: Metadata = {
  title: "Seven | Software Engineer & Systems Orchestrator",
  description: "Transformo lógica compleja en impacto comercial real. Especializado en arquitecturas de alto rendimiento (Rust, Next.js).",
};

export default function Home() {
  const projects = ProjectUseCases.getPublishedProjects();
  const engrams = EngramUseCases.getPublishedEngrams().slice(0, 3); // Mostramos solo los últimos 3

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Seven",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://tusitio.com",
    "jobTitle": "Software Engineer & Systems Orchestrator",
    "description": "Transformo lógica compleja en impacto comercial real. Especializado en arquitecturas de alto rendimiento.",
  };

  return (
    <main className="p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-16 mt-8">
        
        {/* Hero Section */}
        <header className="space-y-4">
          <span className="inline-block text-sm font-mono text-primary uppercase tracking-wider animate-fade-in-up">
            Ingeniero Informático & Arquitecto de Software
          </span>
          <h1 className="text-5xl font-bold text-white tracking-tight animate-fade-in-up animation-delay-200">
            Transformo lógica compleja en impacto comercial real.
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-400">
            Me especializo en el diseño de arquitecturas de software de alto rendimiento (Rust, Next.js) y en la creación de modelos de negocio B2B escalables. No tiro código al azar; construyo sistemas eficientes que resuelven problemas de negocio reales, optimizando infraestructura y eliminando dependencias innecesarias.
          </p>
        </header>

        {/* Dashboard de Impacto */}
        <ImpactDashboard />

        {/* Proyectos Destacados (Bento Grid) */}
        <section>
          <SectionHeader title="Casos de Estudio" href="/projects" />
          <Grid className="gap-4">
            {projects.map((project) => (
              <ProjectCard 
                key={project.slug}
                title={project.title}
                summary={project.summary}
                tags={project.tags}
                date=""
                slug={project.slug}
                variant="featured"
              />
            ))}
          </Grid>
        </section>

        {/* Engineering Journal */}
        <section>
          <SectionHeader title="Engineering Journal" href="/engrams" />
          <Grid className="gap-4">
            {engrams.map((engram) => (
              <EngramCard 
                key={engram.slug}
                title={engram.title}
                topic={engram.topic}
                date={engram.date}
                slug={engram.slug}
                variant="featured"
              />
            ))}
          </Grid>
        </section>

      </div>
    </main>
  );
}

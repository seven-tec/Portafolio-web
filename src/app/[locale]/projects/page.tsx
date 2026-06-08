import { ProjectUseCases } from "../../../application/use-cases/ProjectUseCases";
import { PageHeader } from "../../../components/ui/PageHeader";
import { SearchableGrid } from "../../../components/ui/SearchableGrid";
import { ProjectCard } from "../../../components/ui/ProjectCard";
import { Metadata } from "next";
import { siteUrl } from "../../../lib/site";

interface ProjectsIndexProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: ProjectsIndexProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Projects" : "Proyectos",
    description: locale === "en"
      ? "Case studies on high-performance web architecture, WASM, applied AI, and modular systems. Real projects with measurable business impact."
      : "Casos de estudio de arquitectura web de alto rendimiento, WASM, IA aplicada y sistemas modulares. Proyectos reales con impacto comercial medible.",
    alternates: {
      canonical: `${siteUrl()}/${locale}/projects`,
    },
  };
}

export default async function ProjectsIndex({ params }: ProjectsIndexProps) {
  const { locale } = await params;
  const activeLocale = (locale === "en" ? "en" : "es") as "en" | "es";
  const projects = ProjectUseCases.getPublishedProjects(activeLocale);

  const title = activeLocale === "en" ? "Orchestrated Projects" : "Proyectos Orquestados";
  const desc = activeLocale === "en" 
    ? "Detailed case studies highlighting the business problem, architecture, and real impact." 
    : "Estudios de caso detallando el problema de negocio, la arquitectura y el impacto real.";

  return (
    <main className="p-8 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-12 mt-8">
        
        <PageHeader title={title} description={desc} />

        <SearchableGrid
          items={projects}
          locale={activeLocale}
          type="projects"
          placeholder={activeLocale === "en" ? "Search case studies..." : "Buscar casos de estudio..."}
          renderItem={(project) => (
            <ProjectCard 
              key={project.slug}
              title={project.title}
              summary={project.summary}
              tags={project.tags}
              date={project.date}
              slug={project.slug}
              locale={activeLocale}
            />
          )}
        />

      </div>
    </main>
  );
}

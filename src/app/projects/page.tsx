import { ProjectUseCases } from "../../application/use-cases/ProjectUseCases";
import { PageHeader } from "../../components/ui/PageHeader";
import { Grid } from "../../components/ui/Grid";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { Metadata } from "next";
import { siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Casos de estudio de arquitectura web de alto rendimiento, WASM, IA aplicada y sistemas modulares. Proyectos reales con impacto comercial medible.",
  alternates: {
    canonical: siteUrl("/projects"),
  },
  openGraph: {
    url: siteUrl("/projects"),
  },
};

export default function ProjectsIndex() {
  const projects = ProjectUseCases.getPublishedProjects();

  return (
    <main className="p-8 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-12 mt-8">
        
        <PageHeader title="Proyectos Orquestados" description="Estudios de caso detallando el problema de negocio, la arquitectura y el impacto real." />

        <Grid>
          {projects.map((project) => (
            <ProjectCard 
              key={project.slug}
              title={project.title}
              summary={project.summary}
              tags={project.tags}
              date={project.date}
              slug={project.slug}
            />
          ))}
        </Grid>

      </div>
    </main>
  );
}

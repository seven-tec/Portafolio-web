import { ProjectUseCases } from "../../application/use-cases/ProjectUseCases";
import { PageHeader } from "../../components/ui/PageHeader";
import { Grid } from "../../components/ui/Grid";
import { ProjectCard } from "../../components/ui/ProjectCard";

export const metadata = {
  title: "Proyectos | Seven",
  description: "Casos de estudio detallados sobre arquitectura de sistemas, resolución de problemas complejos e impacto comercial real.",
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

import Link from "next/link";
import { ProjectUseCases } from "../../application/use-cases/ProjectUseCases";

export const metadata = {
  title: "Proyectos | Seven",
  description: "Casos de estudio, arquitectura de sistemas and soluciones.",
};

export default function ProjectsIndex() {
  const projects = ProjectUseCases.getPublishedProjects();

  return (
    <main className="p-8 min-h-screen bg-[#0a0a0a] text-gray-200">
      <div className="max-w-4xl mx-auto space-y-12 mt-8">
        
        <header className="border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Proyectos Orquestados
          </h1>
          <p className="text-gray-400 text-lg">
            Estudios de caso detallando el problema de negocio, la arquitectura y el impacto real.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="group flex flex-col p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-emerald-500/50 transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-emerald-400 bg-gray-900 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold text-gray-200 group-hover:text-emerald-400 transition-colors mb-3">
                {project.title}
              </h2>
              
              <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                {project.summary}
              </p>
              
              <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-between items-center text-xs font-mono text-gray-500">
                <span>{project.date}</span>
                <span className="text-emerald-400/0 group-hover:text-emerald-400 transition-colors duration-300">
                  Leer caso -{">"}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

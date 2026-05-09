import Link from "next/link";
import { ProjectUseCases } from "../application/use-cases/ProjectUseCases";
import { EngramUseCases } from "../application/use-cases/EngramUseCases";
import { ImpactDashboard } from "../components/ImpactDashboard";

export default function Home() {
  const projects = ProjectUseCases.getPublishedProjects();
  const engrams = EngramUseCases.getPublishedEngrams().slice(0, 3); // Mostramos solo los últimos 3

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pablo Valenzuela",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://tusitio.com",
    "jobTitle": "Ingeniero Informático",
    "description": "Especializado en resolver problemas complejos mediante arquitectura moderna, automatización y desarrollo local de IA.",
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
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Orquestando sistemas escalables y agentes inteligentes.
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
            Ingeniero Informático especializado en resolver problemas complejos mediante arquitectura moderna, automatización y desarrollo local de IA.
          </p>
        </header>

        {/* Dashboard de Impacto */}
        <ImpactDashboard />

        {/* Proyectos Destacados (Bento Grid) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Casos de Estudio</h2>
            <Link href="/projects" className="text-sm font-mono text-emerald-400 hover:underline">
              Ver todos -{">"}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Link 
                href={`/projects/${project.slug}`} 
                key={project.slug}
                className="group block p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex gap-2 mb-3">
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-mono text-gray-500 bg-gray-900 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-200 group-hover:text-emerald-400 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Engineering Journal */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Engineering Journal</h2>
            <Link href="/engrams" className="text-sm font-mono text-blue-400 hover:underline">
              Abrir terminal -{">"}
            </Link>
          </div>
          <div className="space-y-3">
            {engrams.map((engram) => (
              <Link 
                href={`/engrams/${engram.slug}`} 
                key={engram.slug}
                className="flex items-center justify-between p-4 bg-[#111] border border-gray-800 rounded-lg hover:border-blue-500/50 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono text-blue-400 mr-3 uppercase tracking-wider">
                    {engram.topic}
                  </span>
                  <span className="text-sm font-medium text-gray-300">
                    {engram.title}
                  </span>
                </div>
                <span className="text-xs font-mono text-gray-600 hidden sm:block">
                  {engram.date}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

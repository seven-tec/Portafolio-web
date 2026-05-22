import { ProjectUseCases } from "../../../application/use-cases/ProjectUseCases";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArchitectureFlow } from "../../../components/mdx/ArchitectureFlow";
import { WaveformPlayer } from "../../../components/mdx/WaveformPlayer";
import { SpotlightCard } from "../../../components/SpotlightCard";
import { siteUrl } from "../../../lib/site";

export async function generateStaticParams() {
  const projects = ProjectUseCases.getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const project = ProjectUseCases.getProjectDetail(slug);

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: siteUrl(`/projects/${slug}`),
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: siteUrl(`/projects/${slug}`),
      type: 'article',
      publishedTime: project.date,
      authors: ['Seven'],
      tags: project.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const project = ProjectUseCases.getProjectDetail(slug);

    const mdxOptions = {
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark-dimmed",
              keepBackground: false,
            },
          ],
        ] as any,
      },
    };

    return (
      <main className="min-h-screen bg-[#0a0a0a] text-gray-200 p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-12 mt-8">
          
          {/* Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono bg-gray-900 px-2 py-1 rounded text-emerald-400">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-bold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
              {project.summary}
            </p>
          </header>

          {/* Métricas de Impacto del Proyecto */}
          {project.metrics && project.metrics.length > 0 && (
            <section>
              <h2 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
                Métricas de Impacto
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.metrics.map((metric) => (
                  <SpotlightCard key={metric}>
                    <div className="flex flex-col h-full justify-between">
                      <span className="text-xs font-mono text-emerald-400 mb-2">
                        [LOGRO]
                      </span>
                      <p className="text-base font-medium text-white">
                        {metric}
                      </p>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </section>
          )}

          {/* Contenido principal */}
          <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar con info adicional */}
            <aside className="lg:col-span-1 space-y-6 text-sm">
              <div>
                <h3 className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">
                  Fecha
                </h3>
                <p className="text-gray-400 font-mono">{project.date}</p>
              </div>
              <div>
                <h3 className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">
                  Rol
                </h3>
                <p className="text-gray-400">Arquitecto de Software</p>
              </div>
              {project.repositoryUrl && (
                <div>
                  <h3 className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">
                    Código
                  </h3>
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">
                    Ver Repositorio
                  </a>
                </div>
              )}
              {project.demoUrl && (
                <div>
                  <h3 className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">
                    Demo
                  </h3>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">
                    Ver Proyecto
                  </a>
                </div>
              )}
            </aside>

            {/* Contenido MDX */}
            <article className="lg:col-span-3 prose prose-invert prose-emerald max-w-none">
              <MDXRemote source={project.content} options={mdxOptions} components={{ ArchitectureFlow, WaveformPlayer }} />
            </article>
          </section>

        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}

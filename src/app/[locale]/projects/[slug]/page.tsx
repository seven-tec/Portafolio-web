import { ProjectUseCases } from "../../../../application/use-cases/ProjectUseCases";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArchitectureFlow } from "../../../../components/mdx/ArchitectureFlow";
import { WaveformPlayer } from "../../../../components/mdx/WaveformPlayer";
import { SpotlightCard } from "../../../../components/SpotlightCard";
import { siteUrl } from "../../../../lib/site";

interface ProjectDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["es", "en"];
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    const projects = ProjectUseCases.getPublishedProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ 
  params 
}: ProjectDetailProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = ProjectUseCases.getProjectDetail(slug, locale);

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `${siteUrl()}/${locale}/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `${siteUrl()}/${locale}/projects/${slug}`,
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

const dicts = {
  es: {
    impactMetrics: "Métricas de Impacto",
    logLabel: "[LOGRO]",
    dateLabel: "Fecha",
    roleLabel: "Rol",
    roleValue: "Arquitecto de Software",
    codeLabel: "Código",
    demoLabel: "Demo",
    viewRepo: "Ver Repositorio",
    viewProject: "Ver Proyecto",
  },
  en: {
    impactMetrics: "Impact Metrics",
    logLabel: "[ACHIEVEMENT]",
    dateLabel: "Date",
    roleLabel: "Role",
    roleValue: "Software Architect",
    codeLabel: "Code",
    demoLabel: "Demo",
    viewRepo: "View Repository",
    viewProject: "View Project",
  }
} as const;

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  let project;
  let activeLocale: "en" | "es" = "es";
  try {
    const { slug, locale } = await params;
    activeLocale = (locale === "en" ? "en" : "es") as "en" | "es";
    project = ProjectUseCases.getProjectDetail(slug, activeLocale);
  } catch {
    notFound();
  }

  const dict = dicts[activeLocale];

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any,
    },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-200 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12 mt-8">
        
        {/* Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
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
              {dict.impactMetrics}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.metrics.map((metric: string) => (
                <SpotlightCard key={metric}>
                  <div className="flex flex-col h-full justify-between">
                    <span className="text-xs font-mono text-emerald-400 mb-2">
                      {dict.logLabel}
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
                {dict.dateLabel}
              </h3>
              <p className="text-gray-400 font-mono">{project.date}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">
                {dict.roleLabel}
              </h3>
              <p className="text-gray-400">{dict.roleValue}</p>
            </div>
            {project.repositoryUrl && (
              <div>
                <h3 className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">
                  {dict.codeLabel}
                </h3>
                <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">
                  {dict.viewRepo}
                </a>
              </div>
            )}
            {project.demoUrl && (
              <div>
                <h3 className="text-xs font-mono text-gray-600 uppercase tracking-wider mb-1">
                  {dict.demoLabel}
                </h3>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-mono">
                  {dict.viewProject}
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
}

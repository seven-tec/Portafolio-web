import { ProjectUseCases } from "../../../application/use-cases/ProjectUseCases";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArchitectureFlow } from "../../../components/mdx/ArchitectureFlow";
import { WaveformPlayer } from "../../../components/mdx/WaveformPlayer";

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
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      publishedTime: project.date,
      authors: ['Pablo Valenzuela'],
      tags: project.tags,
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
        <div className="max-w-3xl mx-auto">
          
          <header className="mb-8 border-b border-gray-800 pb-8 mt-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-emerald-400">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {project.summary}
            </p>
          </header>

          <section className="mt-8">
            <article className="prose prose-invert prose-emerald max-w-none bg-[#111] p-8 rounded-xl border border-gray-800">
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

import { EngramUseCases } from "../../../application/use-cases/EngramUseCases";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  const engrams = EngramUseCases.getPublishedEngrams();
  return engrams.map((engram) => ({ slug: engram.slug }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const engram = EngramUseCases.getEngramDetail(slug);

  return {
    title: engram.title,
    description: engram.title,
    openGraph: {
      title: engram.title,
      description: engram.title,
      type: 'article',
      publishedTime: engram.date,
      authors: ['Pablo Valenzuela'],
      tags: [engram.topic],
    },
  };
}

export default async function EngramDetail({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const engram = EngramUseCases.getEngramDetail(slug);

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
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded">
                Engram / {engram.topic}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {engram.date}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              {engram.title}
            </h1>
            
            {engram.readTimeMinutes && (
              <p className="text-sm text-gray-500 font-mono">
                Estimated Reading: {engram.readTimeMinutes} min
              </p>
            )}
          </header>

          <section className="mt-8">
            <article className="prose prose-invert prose-emerald max-w-none bg-[#111] p-8 rounded-xl border border-gray-800">
              <MDXRemote source={engram.content} options={mdxOptions} />
            </article>
          </section>

        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}

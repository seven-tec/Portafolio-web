import { EngramUseCases } from "../../../../application/use-cases/EngramUseCases";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArchitectureFlow } from "../../../../components/mdx/ArchitectureFlow";
import { WaveformPlayer } from "../../../../components/mdx/WaveformPlayer";
import { siteUrl } from "../../../../lib/site";

interface NoteDetailProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["es", "en"];
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    const engrams = EngramUseCases.getPublishedEngrams(locale);
    for (const engram of engrams) {
      params.push({ locale, slug: engram.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ 
  params 
}: NoteDetailProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const engram = EngramUseCases.getEngramDetail(slug, locale);

  return {
    title: engram.title,
    description: engram.title,
    alternates: {
      canonical: `${siteUrl()}/${locale}/notes/${slug}`,
    },
    openGraph: {
      title: engram.title,
      description: engram.title,
      url: `${siteUrl()}/${locale}/notes/${slug}`,
      type: 'article',
      publishedTime: engram.date,
      authors: ['Seven'],
      tags: [engram.topic],
    },
  };
}

const dicts = {
  es: {
    note: "Nota",
    estimatedReading: "Lectura estimada",
    minutes: "min"
  },
  en: {
    note: "Note",
    estimatedReading: "Estimated reading",
    minutes: "min"
  }
} as const;

export default async function NoteDetail({ params }: NoteDetailProps) {
  let engram;
  let activeLocale: "en" | "es" = "es";
  try {
    const { slug, locale } = await params;
    activeLocale = (locale === "en" ? "en" : "es") as "en" | "es";
    engram = EngramUseCases.getEngramDetail(slug, activeLocale);
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
      <div className="max-w-3xl mx-auto">
        
        <header className="mb-8 border-b border-gray-800 pb-8 mt-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded">
              {dict.note} / {engram.topic}
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
              {dict.estimatedReading}: {engram.readTimeMinutes} {dict.minutes}
            </p>
          )}
        </header>

        <section className="mt-8">
          <article className="prose prose-invert prose-emerald max-w-none bg-[#111] p-8 rounded-xl border border-gray-800">
            <MDXRemote source={engram.content} options={mdxOptions} components={{ ArchitectureFlow, WaveformPlayer }} />
          </article>
        </section>

      </div>
    </main>
  );
}

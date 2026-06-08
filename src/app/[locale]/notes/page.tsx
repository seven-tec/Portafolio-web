import { EngramUseCases } from "../../../application/use-cases/EngramUseCases";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Grid } from "../../../components/ui/Grid";
import { EngramCard } from "../../../components/ui/EngramCard";
import { siteUrl } from "../../../lib/site";
import { Engram } from "../../../domain/entities/Engram";
import { Metadata } from "next";

interface NotesIndexProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: NotesIndexProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Notes" : "Notas",
    description: locale === "en"
      ? "Engineering journal, notes on systems architecture, and registry of technical decisions."
      : "Diario de ingeniería, notas sobre arquitectura de sistemas y registro de decisiones técnicas.",
    alternates: {
      canonical: `${siteUrl()}/${locale}/notes`,
    },
  };
}

export default async function NotesIndex({ params }: NotesIndexProps) {
  const { locale } = await params;
  const activeLocale = (locale === "en" ? "en" : "es") as "en" | "es";
  const engrams = EngramUseCases.getPublishedEngrams(activeLocale);

  const title = activeLocale === "en" ? "Engineering Journal" : "Diario de Ingeniería";
  const desc = activeLocale === "en" 
    ? "Activity log, experimentation, and technical decision records." 
    : "Log de actividad, experimentación y registro de decisiones técnicas.";

  return (
    <main className="p-8 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-12 mt-8">
        
        <PageHeader title={title} description={desc} />

        <Grid>
          {engrams.map((engram: Engram) => (
            <EngramCard 
              key={engram.slug}
              title={engram.title}
              topic={engram.topic}
              date={engram.date}
              slug={engram.slug}
              locale={activeLocale}
            />
          ))}
        </Grid>

      </div>
    </main>
  );
}

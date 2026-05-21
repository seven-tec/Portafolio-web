import { EngramUseCases } from "../../application/use-cases/EngramUseCases";
import { PageHeader } from "../../components/ui/PageHeader";
import { Grid } from "../../components/ui/Grid";
import { EngramCard } from "../../components/ui/EngramCard";
import { siteUrl } from "../../lib/site";

export const metadata = {
  title: "Engrams",
  description: "Diario de ingeniería, notas sobre arquitectura de sistemas y registro de decisiones técnicas.",
  alternates: {
    canonical: siteUrl("/engrams"),
  },
  openGraph: {
    url: siteUrl("/engrams"),
  },
};

export default function EngramsIndex() {
  const engrams = EngramUseCases.getPublishedEngrams();

  return (
    <main className="p-8 min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-12 mt-8">
        
        <PageHeader title="Engineering Journal" description="Log de actividad, experimentación y registro de decisiones técnicas." />

        <Grid>
          {engrams.map((engram) => (
            <EngramCard 
              key={engram.slug}
              title={engram.title}
              topic={engram.topic}
              date={engram.date}
              slug={engram.slug}
            />
          ))}
        </Grid>

      </div>
    </main>
  );
}

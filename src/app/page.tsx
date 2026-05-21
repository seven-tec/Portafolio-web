import { PortfolioUseCases } from "../application/use-cases/PortfolioUseCases";
import { Metadata } from "next";
import Link from "next/link";
import { SpotlightCard } from "../components/SpotlightCard";
import { Badge } from "../components/ui/Badge";
import { ArrowRight, AlertTriangle, Zap, Cpu, Layers, Brain, Route, Target, FileCheck, BarChart3 } from "lucide-react";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Seven | Arquitectura web de alto rendimiento e IA aplicada",
  description: "Arquitectura web de alto rendimiento y sistemas de IA aplicados a problemas reales de negocio. Diseño y construyo aplicaciones rápidas, modulares y escalables.",
  alternates: {
    canonical: siteUrl(),
  },
};

const painPointIcons = [AlertTriangle, Zap, Cpu, Brain] as const;
const capabilityIcons = [Zap, Cpu, Layers, Brain] as const;

export default function Home() {
  const content = PortfolioUseCases.getHomeContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Seven",
    "url": siteUrl(),
    "jobTitle": "Arquitecto de Software",
    "description": "Arquitectura web de alto rendimiento y sistemas de IA aplicados a problemas reales de negocio.",
  };

  return (
    <main className="p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-24 mt-8">

        {/* 1. Hero */}
        <header className="space-y-6">
          <span className="inline-block text-sm font-mono text-primary uppercase tracking-wider animate-fade-in-up">
            {content.eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight animate-fade-in-up animation-delay-200 leading-tight">
            {content.headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-400">
            {content.subheadline}
          </p>
          <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-up animation-delay-400">
            <Link
              href={content.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              {content.primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-gray-300 font-medium rounded-lg hover:border-primary/40 hover:text-primary transition-all"
            >
              {content.secondaryCta.label}
            </Link>
          </div>

          {content.heroBadges && (
            <div className="flex flex-wrap gap-2 pt-2 animate-fade-in-up animation-delay-400">
              {content.heroBadges.map((badge) => (
                <Badge key={badge} variant="outline">{badge}</Badge>
              ))}
            </div>
          )}
        </header>

        {/* 2. Problemas que resuelvo */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Problemas que resuelvo</h2>
            <p className="text-gray-400 text-sm">
              No tomo cualquier proyecto. Estos son los problemas donde realmente agrego valor.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.painPoints.map((point, i) => {
              const Icon = painPointIcons[i] || Target;
              return (
                <SpotlightCard key={point.id}>
                  <div className="flex gap-3">
                    <div className="mt-1 shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                      <p className="text-sm text-gray-400">{point.businessImpact}</p>
                      <p className="text-xs text-gray-500 font-mono">{point.technicalImpact}</p>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        {/* 3. Capacidades principales */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Capacidades principales</h2>
            <p className="text-gray-400 text-sm">
              Stack técnico y áreas de especialización.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.capabilities.map((cap, i) => {
              const Icon = capabilityIcons[i] || Layers;
              return (
                <SpotlightCard key={cap.id}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">{cap.summary}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {cap.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        {/* 4. Casos destacados */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Casos destacados</h2>
            <p className="text-gray-400 text-sm">
              Proyectos que demuestran enfoque, ejecución y resultados concretos.
            </p>
          </div>
          <div className="space-y-4">
            {content.featuredCases.map((caso) => (
              <Link key={caso.slug} href={caso.href} className="block group">
                <SpotlightCard>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {caso.tags.map((tag) => (
                        <Badge key={tag} variant="primary">{tag}</Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-200 group-hover:text-primary transition-colors">
                      {caso.title}
                    </h3>
                    <p className="text-sm text-gray-400">{caso.summary}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Problema</span>
                        <p className="text-sm text-gray-400">{caso.problem}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Solución</span>
                        <p className="text-sm text-gray-400">{caso.solution}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-mono text-primary group-hover:underline pt-2">
                      Ver caso completo <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Cómo trabajo */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">Cómo trabajo</h2>
            <p className="text-gray-400 text-sm">
              Proceso estructurado para evitar ruido y llegar rápido a resultados.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.processSteps.map((step, i) => (
              <SpotlightCard key={step.id}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold font-mono text-primary shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* 6. Filtro de auditoría */}
        <section className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-8 md:p-10">
          <div className="relative z-10 space-y-6 max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">{content.architectureReviewPitch.title}</h2>
            <p className="text-gray-400 leading-relaxed">
              {content.architectureReviewPitch.description}
            </p>
            <div className="space-y-3">
              <span className="text-xs font-mono text-primary uppercase tracking-wider">Encaja si</span>
              <ul className="space-y-2">
                {content.architectureReviewPitch.fitExamples.map((example, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <FileCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={content.primaryCta.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              {content.primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 7. Cierre / autoridad */}
        <section className="text-center pb-16">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold text-white">{content.authorityClose.title}</h2>
            <p className="text-gray-400 leading-relaxed">
              {content.authorityClose.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href={content.primaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
              >
                {content.primaryCta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={content.secondaryCta.href}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-gray-300 font-medium rounded-lg hover:border-primary/40 hover:text-primary transition-all"
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

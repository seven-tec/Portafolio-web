import { PortfolioUseCases } from "../../application/use-cases/PortfolioUseCases";
import { Metadata } from "next";
import Link from "next/link";
import { SpotlightCard } from "../../components/SpotlightCard";
import { CheckCircle2, XCircle, ArrowRight, FileCheck } from "lucide-react";
import { ArchitectureReviewForm } from "./ArchitectureReviewForm";
import { siteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Solicitar evaluación de arquitectura",
  description: "Evaluación técnica de arquitectura para startups, empresas B2B y creadores premium con problemas reales de rendimiento, escalabilidad o integración de IA.",
  alternates: {
    canonical: siteUrl("/architecture-review"),
  },
  openGraph: {
    url: siteUrl("/architecture-review"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Solicitar evaluación de arquitectura | SevenTec",
    description:
      "Evaluación técnica de arquitectura para startups, empresas B2B y creadores premium con problemas reales de rendimiento, escalabilidad o integración de IA.",
  },
};

export default function ArchitectureReviewPage() {
  const content = PortfolioUseCases.getArchitectureReviewContent();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const linkedin = process.env.NEXT_PUBLIC_CONTACT_LINKEDIN;

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto space-y-16 mt-8">

        {/* Header */}
        <header className="space-y-4">
          <span className="inline-block text-sm font-mono text-primary uppercase tracking-wider">
            Consultoría técnica
          </span>
          <h1 className="text-4xl font-bold text-white tracking-tight leading-tight">
            {content.title}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
            {content.intro}
          </p>
        </header>

        {/* What you get */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">Qué obtienes</h2>
          <p className="text-sm text-gray-400 mb-6">
            No vendo humo. Esto es lo que recibís después de enviar tu solicitud.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.whatYouGet.map((item, i) => (
              <SpotlightCard key={i}>
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Fit criteria */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">Para quién es</h2>
          <p className="text-sm text-gray-400 mb-6">
            Este proceso está diseñado para equipos y proyectos con un problema real.
          </p>
          <ul className="space-y-3">
            {content.fitCriteria.map((criterion, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-300">{criterion}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Non-fit criteria */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">Para quién NO es</h2>
          <p className="text-sm text-gray-400 mb-6">
            Si esto describe tu consulta, probablemente no sea el canal adecuado.
          </p>
          <ul className="space-y-3">
            {content.nonFitCriteria.map((criterion, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">{criterion}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technical form */}
        <ArchitectureReviewForm
          fields={content.fields}
          responseExpectation={content.responseExpectation}
          submitLabel={content.submitLabel}
        />

        {/* Canales alternativos (Habilitados dinámicamente) */}
        {email && linkedin && (
          <section className="text-center border-t border-border/30 pt-12 max-w-xl mx-auto space-y-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-white">¿Preferís contacto directo?</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Si tu consulta es puntual y no querés completar el formulario detallado, podés escribirme directamente a mi correo o conectar por LinkedIn.
            </p>
            <div className="flex justify-center gap-6 text-sm font-mono text-gray-500 pt-2">
              <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                {email}
              </a>
              <span>•</span>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </section>
        )}

        {/* Close */}
        <section className="text-center pb-16">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              ¿No estás seguro si esto es para vos?
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Si tu problema no encaja en los criterios de arriba pero igual tenés una consulta técnica seria, mandala igual. Si no puedo ayudar, te lo digo sin vueltas.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
            >
              Ver casos de estudio <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

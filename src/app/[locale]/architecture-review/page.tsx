import { PortfolioUseCases } from "../../../application/use-cases/PortfolioUseCases";
import { Metadata } from "next";
import Link from "next/link";
import { SpotlightCard } from "../../../components/SpotlightCard";
import { CheckCircle2, XCircle, ArrowRight, FileCheck } from "lucide-react";
import { ArchitectureReviewForm } from "./ArchitectureReviewForm";
import { siteUrl } from "../../../lib/site";

interface ArchitectureReviewProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: ArchitectureReviewProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Request architecture evaluation" : "Solicitar evaluación de arquitectura",
    description: locale === "en"
      ? "Technical architecture evaluation for startups, B2B companies, and premium creators with real performance, scalability, or AI integration issues."
      : "Evaluación técnica de arquitectura para startups, empresas B2B y creadores premium con problemas reales de rendimiento, escalabilidad o integración de IA.",
    alternates: {
      canonical: `${siteUrl()}/${locale}/architecture-review`,
    },
  };
}

const dicts = {
  es: {
    eyebrow: "Consultoría técnica",
    whatYouGetTitle: "Qué obtienes",
    whatYouGetSubtitle: "No vendo humo. Esto es lo que recibís después de enviar tu solicitud.",
    whoItsForTitle: "Para quién es",
    whoItsForSubtitle: "Este proceso está diseñado para equipos y proyectos con un problema real.",
    whoItsNotForTitle: "Para quién NO es",
    whoItsNotForSubtitle: "Si esto describe tu consulta, probablemente no sea el canal adecuado.",
    directContactTitle: "¿Preferís contacto directo?",
    directContactSubtitle: "Si tu consulta es puntual y no querés completar el formulario detallado, podés escribirme directamente a mi correo o conectar por LinkedIn.",
    notSureTitle: "¿No estás seguro si esto es para vos?",
    notSureSubtitle: "Si tu problema no encaja en los criterios de arriba pero igual tenés una consulta técnica seria, mandala igual. Si no puedo ayudar, te lo digo sin vueltas.",
    viewCases: "Ver casos de estudio",
  },
  en: {
    eyebrow: "Technical consulting",
    whatYouGetTitle: "What you get",
    whatYouGetSubtitle: "No fluff. This is what you receive after submitting your request.",
    whoItsForTitle: "Who it is for",
    whoItsForSubtitle: "This process is designed for teams and projects with a real problem.",
    whoItsNotForTitle: "Who it is NOT for",
    whoItsNotForSubtitle: "If this describes your query, this is probably not the right channel.",
    directContactTitle: "Prefer direct contact?",
    directContactSubtitle: "If your inquiry is brief and you do not want to fill out the detailed form, you can write directly to my email or connect via LinkedIn.",
    notSureTitle: "Not sure if this is for you?",
    notSureSubtitle: "If your issue doesn't fit the criteria above but you still have a serious technical question, send it anyway. If I can't help, I'll tell you straight.",
    viewCases: "View case studies",
  }
} as const;

export default async function ArchitectureReviewPage({ params }: ArchitectureReviewProps) {
  const { locale } = await params;
  const activeLocale = (locale === "en" ? "en" : "es") as "en" | "es";
  const content = PortfolioUseCases.getArchitectureReviewContent(activeLocale);
  const dict = dicts[activeLocale];
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const linkedin = process.env.NEXT_PUBLIC_CONTACT_LINKEDIN;

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto space-y-16 mt-8">

        {/* Header */}
        <header className="space-y-4">
          <span className="inline-block text-sm font-mono text-primary uppercase tracking-wider">
            {dict.eyebrow}
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
          <h2 className="text-2xl font-semibold text-white mb-2">{dict.whatYouGetTitle}</h2>
          <p className="text-sm text-gray-400 mb-6">
            {dict.whatYouGetSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.whatYouGet.map((item: string, i: number) => (
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
          <h2 className="text-2xl font-semibold text-white mb-2">{dict.whoItsForTitle}</h2>
          <p className="text-sm text-gray-400 mb-6">
            {dict.whoItsForSubtitle}
          </p>
          <ul className="space-y-3">
            {content.fitCriteria.map((criterion: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-300">{criterion}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Non-fit criteria */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-2">{dict.whoItsNotForTitle}</h2>
          <p className="text-sm text-gray-400 mb-6">
            {dict.whoItsNotForSubtitle}
          </p>
          <ul className="space-y-3">
            {content.nonFitCriteria.map((criterion: string, i: number) => (
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

        {/* Canales alternativos */}
        {email && linkedin && (
          <section className="text-center border-t border-border/30 pt-12 max-w-xl mx-auto space-y-4">
            <h3 className="text-lg font-semibold text-white">{dict.directContactTitle}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {dict.directContactSubtitle}
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
              {dict.notSureTitle}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {dict.notSureSubtitle}
            </p>
            <Link
              href={`/${activeLocale}/projects`}
              className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
            >
              {dict.viewCases} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

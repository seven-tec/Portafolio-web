import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "../../lib/site";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(siteUrl()),
    title: {
      default: locale === "en"
        ? 'SevenTec | Systems Architecture & High Performance'
        : 'SevenTec | Arquitectura de Sistemas y Alto Rendimiento',
      template: `%s | SevenTec`,
    },
    description: locale === "en"
      ? 'High-performance systems architecture, software engineering, and AI applied to real business problems. Technical consulting for startups, B2B companies, and premium creators.'
      : 'Arquitectura de sistemas de alto rendimiento, ingeniería de software e IA aplicada a problemas reales de negocio. Consultoría técnica para startups, empresas B2B y creadores premium.',
  };
}

const navDict = {
  es: {
    home: "Inicio",
    projects: "Proyectos",
    notes: "Notas",
    cta: "Solicitar evaluación",
    rights: "© 2026 SevenTec. Todos los derechos reservados.",
    tagline: "Sistemas Orquestados · IA & Systems Architecture"
  },
  en: {
    home: "Home",
    projects: "Projects",
    notes: "Notes",
    cta: "Request evaluation",
    rights: "© 2026 SevenTec. All rights reserved.",
    tagline: "Orchestrated Systems · AI & Systems Architecture"
  }
} as const;

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const activeLocale = (locale === "en" ? "en" : "es") as "en" | "es";
  const dict = navDict[activeLocale];

  return (
    <html lang={activeLocale} className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${sora.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-primary/30">
        
        {/* Background Grid */}
        <div className="fixed inset-0 grid-background pointer-events-none"></div>
        <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 20%, var(--background) 90%)' }}></div>
        
        {/* Navegación Sticky */}
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link 
              href={`/${activeLocale}`} 
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <svg 
                viewBox="45 60 165 115" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-auto"
              >
                <path d="M56 68H186L206 88L174 120H122V140H88V108H154L162 100H56V68Z" fill="#15D1D9"/>
                <path d="M200 148L180 168H70L50 148L82 116H134V96H168V128H102L94 136H200V148Z" fill="#8C96A5"/>
              </svg>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-none">
                SevenTec
              </span>
            </Link>
            
            <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
              <Link href={`/${activeLocale}`} className="hover:text-white transition-colors">
                {dict.home}
              </Link>
              <Link href={`/${activeLocale}/projects`} className="hover:text-white transition-colors">
                {dict.projects}
              </Link>
              <Link href={`/${activeLocale}/notes`} className="hover:text-white transition-colors">
                {dict.notes}
              </Link>
              <Link 
                href={`/${activeLocale}/architecture-review`} 
                className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 px-3 py-1.5 rounded-lg text-xs transition-all font-semibold"
              >
                {dict.cta}
              </Link>

              {/* Language Selector */}
              <div className="flex items-center gap-1.5 border border-border/40 rounded-full px-2 py-0.5 text-[11px] font-mono bg-surface/20">
                <Link href="/es" className={activeLocale === "es" ? "text-primary font-bold" : "text-gray-500 hover:text-gray-300 transition-colors"}>
                  ES
                </Link>
                <span className="text-border/30 select-none">|</span>
                <Link href="/en" className={activeLocale === "en" ? "text-primary font-bold" : "text-gray-500 hover:text-gray-300 transition-colors"}>
                  EN
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Contenedor Principal inyectado desde las pages */}
        <div className="flex-grow w-full">
          {children}
        </div>
        <Analytics />

        {/* Footer Minimalista */}
        <footer className="border-t border-border py-8 mt-auto">
          <div className="max-w-4xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
            <div className="flex items-center gap-3">
              <Image 
                src="/logo/seventec-logomark.svg" 
                alt="SevenTec Logomark" 
                width={20} 
                height={20} 
                className="opacity-45 hover:opacity-80 transition-opacity"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-400">{dict.rights}</span>
                <span className="text-[10px] text-gray-600">{dict.tagline}</span>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}

import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'Seven | Arquitectura web, IA aplicada y sistemas de alto rendimiento',
    template: '%s | Seven',
  },
  description: 'Arquitectura web de alto rendimiento, sistemas modulares e IA aplicada a problemas reales de negocio. Consultoría técnica para startups, empresas B2B y creadores premium.',
  openGraph: {
    title: 'Seven | Arquitectura web de alto rendimiento e IA aplicada',
    description: 'Arquitectura web de alto rendimiento, sistemas modulares e IA aplicada a problemas reales de negocio.',
    url: siteUrl(),
    siteName: 'Seven',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seven | Arquitectura web de alto rendimiento e IA aplicada',
    description: 'Arquitectura web de alto rendimiento, sistemas modulares e IA aplicada a problemas reales de negocio.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-primary/30">
        
        {/* Background Grid */}
        <div className="fixed inset-0 grid-background pointer-events-none"></div>
        <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 20%, var(--background) 90%)' }}></div>
        
        {/* Navegación Sticky */}
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link 
              href="/" 
              className="font-bold text-white tracking-tight hover:text-primary transition-colors"
            >
              ~/seven
            </Link>
            
            <div className="flex gap-6 text-sm font-medium text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/projects" className="hover:text-white transition-colors">
                Proyectos
              </Link>
              <Link href="/engrams" className="hover:text-white transition-colors">
                Engrams
              </Link>
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
            <p>© {new Date().getFullYear()} Sistemas Orquestados.</p>
            <p>Built with Next.js 16</p>
          </div>
        </footer>

      </body>
    </html>
  );
}

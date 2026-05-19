import "./globals.css"; // Asegurate de que esto importe Tailwind
import Link from "next/link";
import { ReactNode } from "react";
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com'), // Acordate de cambiarlo por tu dominio real
  title: {
    default: 'Seven | Software Engineer & Systems Orchestrator',
    template: '%s | Seven',
  },
  description: 'Ingeniero Informático especializado en arquitectura de sistemas, orquestación de IA local y desarrollo de alto rendimiento.',
  openGraph: {
    title: 'Seven | Arquitectura y Orquestación',
    description: 'Portafolio de ingeniería, estudios de caso y diario técnico.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com',
    siteName: 'Sistemas Orquestados',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seven | Arquitectura de Software',
    description: 'Estudios de caso y diario técnico de ingeniería.',
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
              {/* Nota: Estas dos rutas (índices) las tendremos que crear luego, 
                  por ahora apuntan al vacío o al 404 si no existen */}
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
            <p>Built with Next.js 16 & Antigravity</p>
          </div>
        </footer>

      </body>
    </html>
  );
}

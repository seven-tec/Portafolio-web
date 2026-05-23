import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { siteUrl } from "../lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'SevenTec | Arquitectura de Sistemas y Alto Rendimiento',
    template: '%s | SevenTec',
  },
  description: 'Arquitectura de sistemas de alto rendimiento, ingeniería de software e IA aplicada a problemas reales de negocio. Consultoría técnica para startups, empresas B2B y creadores premium.',
  openGraph: {
    title: 'SevenTec | Arquitectura de Sistemas y Alto Rendimiento',
    description: 'Arquitectura de sistemas de alto rendimiento, ingeniería de software e IA aplicada a problemas reales de negocio.',
    url: siteUrl(),
    siteName: 'SevenTec',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SevenTec | Arquitectura de Sistemas y Alto Rendimiento',
    description: 'Arquitectura de sistemas de alto rendimiento, ingeniería de software e IA aplicada a problemas reales de negocio.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable} ${sora.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-primary/30">
        
        {/* Background Grid */}
        <div className="fixed inset-0 grid-background pointer-events-none"></div>
        <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 20%, var(--background) 90%)' }}></div>
        
        {/* Navegación Sticky */}
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-8 py-4 flex justify-between items-center">
            <Link 
              href="/" 
              className="flex items-center hover:opacity-90 transition-opacity"
            >
              <Image 
                src="/logo/seventec-horizontal-navbar.svg" 
                alt="SevenTec Logo" 
                width={143} 
                height={28}
                priority
                className="h-7 w-auto object-contain"
              />
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
            <div className="flex items-center gap-3">
              <Image 
                src="/logo/seventec-logomark.svg" 
                alt="SevenTec Logomark" 
                width={20} 
                height={20} 
                className="opacity-45 hover:opacity-80 transition-opacity"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-400">© 2026 SevenTec. Todos los derechos reservados.</span>
                <span className="text-[10px] text-gray-600">Sistemas Orquestados · IA & Systems Architecture</span>
              </div>
            </div>
            <p>Built with Next.js 16</p>
          </div>
        </footer>

      </body>
    </html>
  );
}

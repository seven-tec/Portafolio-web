import { ImageResponse } from "next/og";

export const alt = "SevenTec | Systems Architecture & High Performance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

export default async function Image({ params }: ImageProps) {
  const { locale } = await params;
  const isEn = locale === "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #0B0F14 0%, #111827 100%)",
          fontFamily: "monospace",
        }}
      >
        {/* Isotipo simulado en CSS en vez del texto ~/seven */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#15D1D9",
              letterSpacing: "4px",
            }}
          >
            SEVENTEC
          </div>
          <div
            style={{
              width: "1px",
              height: "20px",
              background: "#334155",
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: "#A7B0BF",
              letterSpacing: "2px",
            }}
          >
            {isEn ? "SYSTEMS ARCHITECTURE" : "ARQUITECTURA DE SISTEMAS"}
          </div>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "#E6EDF7",
            letterSpacing: "-1.5px",
            lineHeight: 1.15,
            marginBottom: "12px",
          }}
        >
          {isEn ? "High-performance" : "Arquitectura web"}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "#E6EDF7",
            letterSpacing: "-1.5px",
            lineHeight: 1.15,
            marginBottom: "32px",
          }}
        >
          {isEn ? "web architecture" : "de alto rendimiento"}
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#A7B0BF",
            lineHeight: 1.4,
            letterSpacing: "-0.5px",
          }}
        >
          {isEn
            ? "Applied AI · Performance Engineering · Modular Architecture"
            : "IA Aplicada · Performance Engineering · Arquitectura Modular"}
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const alt = "Seven | Arquitectura web, IA aplicada y sistemas de alto rendimiento";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#facc15",
            marginBottom: 16,
          }}
        >
          ~/seven
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "#f5f5f5",
            letterSpacing: "-1",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Arquitectura web
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "#f5f5f5",
            letterSpacing: "-1",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          de alto rendimiento
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a0a0a0",
            lineHeight: 1.4,
          }}
        >
          IA aplicada · Performance Engineering · Arquitectura modular
        </div>
      </div>
    ),
    { ...size }
  );
}

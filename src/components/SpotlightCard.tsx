"use client";

import { useState, useRef } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
}

export const SpotlightCard = ({ children }: SpotlightCardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden p-6 bg-surface/70 backdrop-blur-md border border-border rounded-xl hover:border-primary/20 transition-colors group"
    >
      {/* Spotlight effect overlay (Fondo) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--primary-rgb), 0.1), transparent 80%)`,
        }}
      />
      
      {/* Spotlight effect overlay (Borde) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl border border-transparent"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(var(--primary-rgb), 0.5), transparent 80%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

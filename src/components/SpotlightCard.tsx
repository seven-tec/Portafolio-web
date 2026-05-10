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
      className="relative overflow-hidden p-6 bg-[#111] border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-colors group"
    >
      {/* Spotlight effect overlay */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.15), transparent 80%)`,
        }}
      />
      
      {/* Borde sutil que también brilla */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.4), transparent 80%)`,
          maskImage: 'linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black)',
          maskClip: 'content-box',
          WebkitMaskClip: 'content-box',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

"use client";

import { useState } from "react";

export const WaveformPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Generamos alturas "random" predefinidas para simular la onda de voz
  const bars = [30, 50, 40, 80, 60, 45, 90, 70, 55, 40, 85, 65, 50, 75, 45, 95, 60, 40, 80, 50];

  return (
    <div className="my-10 p-5 bg-[#0d1117] border border-gray-800 rounded-2xl flex items-center gap-6 shadow-2xl font-mono select-none">
      
      {/* Botón Play/Pause */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-14 h-14 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] ${
          isPlaying 
            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]" 
            : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        {isPlaying ? (
          // Icono Pause
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
          </svg>
        ) : (
          // Icono Play
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Waveform (Las barras) */}
      <div className="flex-grow flex items-end gap-[3px] h-12">
        {bars.map((height, i) => (
          <div 
            key={i} 
            className={`w-full rounded-t-sm transition-colors duration-300 ${
              isPlaying ? "bg-emerald-400" : "bg-gray-700"
            }`}
            style={{ 
              height: `${height}%`,
              // Si está reproduciendo, le aplicamos la animación CSS custom
              animation: isPlaying ? `audioBounce 1.2s ease-in-out infinite alternate` : 'none',
              // Desfasamos cada barra para que no salten todas juntas
              animationDelay: `${i * 0.05}s` 
            }}
          ></div>
        ))}
      </div>

      {/* Timestamp */}
      <div className="text-xs text-gray-500 flex-shrink-0 w-24 text-right">
        <span className={isPlaying ? "text-emerald-400 font-bold" : "text-gray-400"}>
          {isPlaying ? "00:14" : "00:00"}
        </span> 
        {" "} / 00:42
      </div>
    </div>
  );
};

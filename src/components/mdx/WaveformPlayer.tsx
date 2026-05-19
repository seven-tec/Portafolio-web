"use client";

import { useState } from "react";
import { Play, Pause } from "lucide-react";

interface WaveformPlayerProps {
  duration?: string;
  bars?: number[];
}

export const WaveformPlayer = ({
  duration = "00:42",
  bars = [30, 50, 40, 80, 60, 45, 90, 70, 55, 40, 85, 65, 50, 75, 45, 95, 60, 40, 80, 50]
}: WaveformPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="my-10 p-5 bg-surface border border-border rounded-2xl flex items-center gap-6 shadow-2xl font-mono select-none">
      
      {/* Botón Play/Pause */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className={`w-14 h-14 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] ${
          isPlaying 
            ? "bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]" 
            : "bg-surface-hover border-border text-gray-300 hover:bg-border hover:text-white"
        }`}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 fill-current" />
        ) : (
          <Play className="w-6 h-6 ml-1 fill-current" />
        )}
      </button>

      {/* Waveform (Las barras) */}
      <div className="flex-grow flex items-end gap-[3px] h-12">
        {bars.map((height, i) => (
          <div 
            key={i} 
            className={`w-full rounded-t-sm transition-colors duration-300 ${
              isPlaying ? "bg-primary" : "bg-gray-700"
            }`}
            style={{ 
              height: `${height}%`,
              animation: isPlaying ? `audioBounce 1.2s ease-in-out infinite alternate` : 'none',
              animationDelay: `${i * 0.05}s` 
            }}
          ></div>
        ))}
      </div>

      {/* Timestamp */}
      <div className="text-xs text-gray-500 flex-shrink-0 w-24 text-right">
        <span className={isPlaying ? "text-primary font-bold" : "text-gray-400"}>
          {isPlaying ? "00:14" : "00:00"}
        </span> 
        {" "} / {duration}
      </div>
    </div>
  );
};

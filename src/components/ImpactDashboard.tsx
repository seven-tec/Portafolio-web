"use client";

import { useEffect, useState } from "react";

export const ImpactDashboard = () => {
  const [latency, setLatency] = useState(0);
  const [localRate, setLocalRate] = useState(0);
  const [models, setModels] = useState(0);
  const [words, setWords] = useState(0);

  useEffect(() => {
    const animateCount = (end: number, duration: number, setter: (v: number) => void) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function: easeOutQuad
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        
        setter(Math.floor(easeOutQuad * end));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Animaciones de 1.5 segundos (1500ms)
    animateCount(10, 1500, setLatency);
    animateCount(100, 1500, setLocalRate);
    animateCount(12, 1500, setModels);
    animateCount(50, 1500, setWords);
  }, []);

  return (
    <section className="my-12">
      <h2 className="text-2xl font-semibold text-white mb-6">Métricas de Impacto (NovelaVox Studio)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Card 1: Latencia (Grande) */}
        <div className="md:col-span-2 p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 hover:bg-gradient-to-br hover:from-surface hover:to-primary/10 transition-all duration-500 group">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Latencia de Procesamiento</p>
          <h3 className="text-5xl font-bold font-mono text-emerald-400 mb-2">
            &lt; {latency} ms
          </h3>
          <p className="text-sm text-gray-400">
            Síntesis local en tiempo real sin pasar por la red. Cero delay en el flujo creativo.
          </p>
        </div>

        {/* Card 2: Dependencia Cloud */}
        <div className="p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 hover:bg-gradient-to-br hover:from-surface hover:to-primary/10 transition-all duration-500 group">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Procesamiento Local</p>
          <h3 className="text-5xl font-bold font-mono text-white mb-2">
            {localRate}%
          </h3>
          <p className="text-sm text-gray-400">
            Cero dependencia de servidores externos para el renderizado de voz.
          </p>
        </div>

        {/* Card 3: Modelos */}
        <div className="p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 hover:bg-gradient-to-br hover:from-surface hover:to-primary/10 transition-all duration-500 group">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Modelos</p>
          <h3 className="text-5xl font-bold font-mono text-white mb-2">
            {models}
          </h3>
          <p className="text-sm text-gray-400">
            Voces optimizadas corriendo simultáneamente.
          </p>
        </div>

        {/* Card 4: Escalabilidad (Full Width abajo para romper la monotonía) */}
        <div className="md:col-span-4 p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 hover:bg-gradient-to-br hover:from-surface hover:to-primary/10 transition-all duration-500 group">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">Escalabilidad de Negocio</p>
              <h3 className="text-5xl font-bold font-mono text-primary mb-2">
                +{words}k
              </h3>
              <p className="text-sm text-gray-400">
                Palabras procesadas por mes proyectadas.
              </p>
            </div>
            <div className="text-sm text-gray-400 max-w-md border-l border-border md:pl-6">
              <strong className="text-white">Costo de infraestructura: $0.</strong> Al trasladar el peso del TTS al navegador del usuario mediante IndexedDB y modelos locales, el margen de ganancia escala al 100%. Esto es lo que los inversores llaman viabilidad comercial pura.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

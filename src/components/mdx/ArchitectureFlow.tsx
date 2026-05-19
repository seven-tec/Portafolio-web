import React from 'react';

interface ArchitectureFlowProps {
  node1Icon: string;
  node1Title: string;
  node1Subtitle: string;
  node1Color?: 'orange' | 'blue' | 'emerald' | 'purple';
  node2Icon: string;
  node2Title: string;
  node2Subtitle: string;
  node2Color?: 'orange' | 'blue' | 'emerald' | 'purple';
  flowLabel: string;
  flowSublabel: string;
}

const colorMap = {
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    shadow: "shadow-[0_0_15px_rgba(249,115,22,0.1)]",
    ping: "bg-orange-400",
    pingBg: "bg-orange-500",
    from: "from-orange-500/20",
    to: "to-orange-500/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    shadow: "shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    ping: "bg-blue-400",
    pingBg: "bg-blue-500",
    from: "from-blue-500/20",
    to: "to-blue-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    shadow: "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    ping: "bg-emerald-400",
    pingBg: "bg-emerald-500",
    from: "from-emerald-500/20",
    to: "to-emerald-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-400",
    shadow: "shadow-[0_0_15px_rgba(168,85,247,0.1)]",
    ping: "bg-purple-400",
    pingBg: "bg-purple-500",
    from: "from-purple-500/20",
    to: "to-purple-500/20",
  }
};

export const ArchitectureFlow = ({
  node1Icon,
  node1Title,
  node1Subtitle,
  node1Color = 'orange',
  node2Icon,
  node2Title,
  node2Subtitle,
  node2Color = 'blue',
  flowLabel,
  flowSublabel
}: ArchitectureFlowProps) => {
  const c1 = colorMap[node1Color];
  const c2 = colorMap[node2Color];

  return (
    <div className="my-10 p-6 bg-surface border border-border rounded-xl font-mono text-sm shadow-2xl overflow-x-auto">
      <div className="min-w-[600px] flex items-center justify-between gap-4">
        
        {/* Nodo 1 */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className={`w-16 h-16 rounded-2xl ${c1.bg} border ${c1.border} flex items-center justify-center ${c1.text} ${c1.shadow} relative group`}>
            <span className="font-bold text-xl">{node1Icon}</span>
            <span className="absolute top-0 right-0 w-3 h-3 flex items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c1.ping} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${c1.pingBg}`}></span>
            </span>
          </div>
          <div className="text-center">
            <p className="text-gray-200 font-semibold">{node1Title}</p>
            <p className="text-xs text-gray-500">{node1Subtitle}</p>
          </div>
        </div>

        {/* Flujo de Datos */}
        <div className="flex flex-col items-center justify-center w-1/3 text-gray-500 relative">
          <p className="text-xs text-primary mb-1 uppercase tracking-widest bg-surface px-2 z-10">
            {flowLabel}
          </p>
          <div className={`w-full h-px bg-gradient-to-r ${c1.from} via-primary/50 ${c2.to} relative`}>
            <div className="absolute w-2 h-2 bg-primary rounded-full top-1/2 -translate-y-1/2 animate-[ping-pong_2s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-[10px] mt-1 text-gray-600">{flowSublabel}</p>
        </div>

        {/* Nodo 2 */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className={`w-16 h-16 rounded-2xl ${c2.bg} border ${c2.border} flex items-center justify-center ${c2.text} ${c2.shadow}`}>
            <span className="font-bold text-xl">{node2Icon}</span>
          </div>
          <div className="text-center">
            <p className="text-gray-200 font-semibold">{node2Title}</p>
            <p className="text-xs text-gray-500">{node2Subtitle}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

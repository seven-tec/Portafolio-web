export const ArchitectureFlow = () => {
  return (
    <div className="my-10 p-6 bg-[#0d1117] border border-gray-800 rounded-xl font-mono text-sm shadow-2xl overflow-x-auto">
      <div className="min-w-[600px] flex items-center justify-between gap-4">
        
        {/* Nodo 1: Frontend (Svelte 5) */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)] relative group">
            <span className="font-bold text-xl">S5</span>
            {/* Ping animation para dar sensación de reactividad */}
            <span className="absolute top-0 right-0 w-3 h-3 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
          </div>
          <div className="text-center">
            <p className="text-gray-200 font-semibold">Cliente Reactivo</p>
            <p className="text-xs text-gray-500">Svelte 5 UI</p>
          </div>
        </div>

        {/* Flujo de Datos */}
        <div className="flex flex-col items-center justify-center w-1/3 text-gray-500 relative">
          <p className="text-xs text-emerald-400 mb-1 uppercase tracking-widest bg-[#0d1117] px-2 z-10">
            Mutación Atómica
          </p>
          <div className="w-full h-px bg-gradient-to-r from-orange-500/20 via-emerald-500/50 to-blue-500/20 relative">
            <div className="absolute w-2 h-2 bg-emerald-400 rounded-full top-1/2 -translate-y-1/2 animate-[ping-pong_2s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-[10px] mt-1 text-gray-600">Latencia Sub-10ms</p>
        </div>

        {/* Nodo 2: Backend (Rust + DB) */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="font-bold text-xl">RS</span>
          </div>
          <div className="text-center">
            <p className="text-gray-200 font-semibold">Core Engine</p>
            <p className="text-xs text-gray-500">Rust + Mutex Locks</p>
          </div>
        </div>

      </div>
    </div>
  );
};

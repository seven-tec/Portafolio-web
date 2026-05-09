import Link from "next/link";
import { EngramUseCases } from "../../application/use-cases/EngramUseCases";

export const metadata = {
  title: "Engrams | Seven",
  description: "Diario de ingeniería, notas técnicas y aprendizajes en desarrollo.",
};

export default function EngramsIndex() {
  const engrams = EngramUseCases.getPublishedEngrams();

  return (
    <main className="p-8 min-h-screen bg-[#0a0a0a] text-gray-200">
      <div className="max-w-4xl mx-auto space-y-12 mt-8">
        
        <header className="border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Engineering Journal
          </h1>
          <p className="text-gray-400 text-lg">
            Log de actividad, experimentación y registro de decisiones técnicas.
          </p>
        </header>

        <div className="space-y-4">
          {engrams.map((engram) => (
            <Link
              href={`/engrams/${engram.slug}`}
              key={engram.slug}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-[#111] border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all gap-4"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                    {engram.topic}
                  </span>
                </div>
                <h2 className="text-lg font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                  {engram.title}
                </h2>
              </div>
              
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-1 border-t border-gray-800 sm:border-t-0 pt-3 sm:pt-0">
                <span className="text-xs font-mono text-gray-500">
                  {engram.date}
                </span>
                {engram.readTimeMinutes && (
                  <span className="text-xs font-mono text-gray-600">
                    ~{engram.readTimeMinutes} min
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

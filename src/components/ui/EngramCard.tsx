import Link from "next/link";
import { SpotlightCard } from "../SpotlightCard";
import { Badge } from "./Badge";
import { ArrowRight } from "lucide-react";

interface EngramCardProps {
  title: string;
  topic: string;
  date: string;
  slug: string;
  locale: string;
  variant?: "default" | "featured";
}

export function EngramCard({ title, topic, date, slug, locale, variant = "default" }: EngramCardProps) {
  const isEn = locale === "en";

  return (
    <Link href={`/${locale}/notes/${slug}`} className="block group">
      <SpotlightCard>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="primary">{topic}</Badge>
            <span className="text-xs font-mono text-gray-500">
              {date}
            </span>
          </div>
          
          <h3 className={`${variant === "featured" ? "text-lg" : "text-xl"} font-bold text-gray-200 group-hover:text-primary transition-colors mb-3`}>
            {title}
          </h3>
          
          {variant === "default" && (
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-xs font-mono text-gray-500 mt-auto">
              <span>{slug}.md</span>
              <span className="flex items-center text-primary/0 group-hover:text-primary transition-colors duration-300">
                {isEn ? "Read entry" : "Leer entrada"} <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          )}
        </div>
      </SpotlightCard>
    </Link>
  );
}

import Link from "next/link";
import { SpotlightCard } from "../SpotlightCard";
import { Badge } from "./Badge";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  summary: string;
  tags: string[];
  date: string;
  slug: string;
  locale: string;
  variant?: "default" | "featured";
}

export function ProjectCard({ title, summary, tags, date, slug, locale, variant = "default" }: ProjectCardProps) {
  const displayedTags = variant === "featured" ? tags.slice(0, 2) : tags;
  const isEn = locale === "en";

  return (
    <Link href={`/${locale}/projects/${slug}`} className="block group">
      <SpotlightCard>
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap gap-2 mb-4">
            {displayedTags.map(tag => (
              <Badge key={tag} variant="primary">{tag}</Badge>
            ))}
          </div>
          
          <h3 className={`${variant === "featured" ? "text-xl" : "text-2xl"} font-bold text-gray-200 group-hover:text-primary transition-colors mb-3`}>
            {title}
          </h3>
          
          <p className="text-sm text-gray-400 leading-relaxed flex-grow">
            {summary}
          </p>
          
          {variant === "default" && (
            <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center text-xs font-mono text-gray-500">
              <span>{date}</span>
              <span className="flex items-center text-primary/0 group-hover:text-primary transition-colors duration-300">
                {isEn ? "Read case" : "Leer caso"} <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          )}
        </div>
      </SpotlightCard>
    </Link>
  );
}

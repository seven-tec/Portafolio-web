import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export function TextLink({ href, children, className = "", showArrow = true }: TextLinkProps) {
  return (
    <Link href={href} className={`flex items-center gap-1 text-sm font-mono text-primary hover:underline ${className}`}>
      {children}
      {showArrow && <ArrowRight className="w-4 h-4" />}
    </Link>
  );
}

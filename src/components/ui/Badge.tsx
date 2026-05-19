import { ReactNode } from "react";

type BadgeVariant = "default" | "outline" | "primary";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "text-gray-500 bg-gray-900",
  outline: "text-gray-400 border border-border",
  primary: "text-primary bg-gray-900",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span className={`text-xs font-mono px-2 py-1 rounded ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

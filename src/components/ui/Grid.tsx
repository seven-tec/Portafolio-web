interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export function Grid({ children, className = "" }: GridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {children}
    </div>
  );
}

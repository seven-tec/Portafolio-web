interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border pb-8">
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-gray-400 text-lg">
        {description}
      </p>
    </header>
  );
}

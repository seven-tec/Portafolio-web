import { TextLink } from "./TextLink";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkText?: string;
}

export function SectionHeader({ title, href, linkText = "Ver todos" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {href && <TextLink href={href}>{linkText}</TextLink>}
    </div>
  );
}

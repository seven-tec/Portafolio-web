import { MetadataRoute } from 'next';
import { ProjectUseCases } from '../application/use-cases/ProjectUseCases';
import { EngramUseCases } from '../application/use-cases/EngramUseCases';
import { siteUrl } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["es", "en"];
  const urls: { url: string; lastModified: Date }[] = [];

  for (const locale of locales) {
    // Base paths
    urls.push({ url: `${siteUrl()}/${locale}`, lastModified: new Date() });
    urls.push({ url: `${siteUrl()}/${locale}/projects`, lastModified: new Date() });
    urls.push({ url: `${siteUrl()}/${locale}/notes`, lastModified: new Date() });
    urls.push({ url: `${siteUrl()}/${locale}/architecture-review`, lastModified: new Date() });

    // Project paths
    const projects = ProjectUseCases.getPublishedProjects(locale);
    projects.forEach((p) => {
      urls.push({
        url: `${siteUrl()}/${locale}/projects/${p.slug}`,
        lastModified: new Date(),
      });
    });

    // Note paths
    const engrams = EngramUseCases.getPublishedEngrams(locale);
    engrams.forEach((e) => {
      urls.push({
        url: `${siteUrl()}/${locale}/notes/${e.slug}`,
        lastModified: new Date(),
      });
    });
  }

  return urls;
}

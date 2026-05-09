import { MetadataRoute } from 'next';
import { ProjectUseCases } from '../application/use-cases/ProjectUseCases';
import { EngramUseCases } from '../application/use-cases/EngramUseCases';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com';
  const projects = ProjectUseCases.getPublishedProjects();
  const engrams = EngramUseCases.getPublishedEngrams();

  const projectUrls = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const engramUrls = engrams.map((e) => ({
    url: `${baseUrl}/engrams/${e.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/engrams`,
      lastModified: new Date(),
    },
    ...projectUrls,
    ...engramUrls,
  ];
}

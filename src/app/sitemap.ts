import { MetadataRoute } from 'next';
import { ProjectUseCases } from '../application/use-cases/ProjectUseCases';
import { EngramUseCases } from '../application/use-cases/EngramUseCases';
import { siteUrl } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = ProjectUseCases.getPublishedProjects();
  const engrams = EngramUseCases.getPublishedEngrams();

  const projectUrls = projects.map((p) => ({
    url: siteUrl(`/projects/${p.slug}`),
    lastModified: new Date(),
  }));

  const engramUrls = engrams.map((e) => ({
    url: siteUrl(`/engrams/${e.slug}`),
    lastModified: new Date(),
  }));

  return [
    { url: siteUrl(), lastModified: new Date() },
    { url: siteUrl('/projects'), lastModified: new Date() },
    { url: siteUrl('/engrams'), lastModified: new Date() },
    { url: siteUrl('/architecture-review'), lastModified: new Date() },
    ...projectUrls,
    ...engramUrls,
  ];
}

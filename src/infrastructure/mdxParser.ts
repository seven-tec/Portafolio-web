import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, ProjectFrontmatterSchema } from "../domain/entities/Project";
import { Engram, EngramFrontmatterSchema } from "../domain/entities/Engram";

// Rutas base asumiendo que corremos el código desde la raíz del proyecto
const PROJECTS_PATH = (locale: string) => path.join(process.cwd(), "content", "projects", locale);
const ENGRAMS_PATH = (locale: string) => path.join(process.cwd(), "content", "engrams", locale);

function resolvePath(localeOrPath: string, defaultPathResolver: (loc: string) => string): string {
  if (
    localeOrPath.includes("/") || 
    localeOrPath.includes("\\") || 
    path.isAbsolute(localeOrPath) || 
    localeOrPath.includes("mocks")
  ) {
    return localeOrPath;
  }
  return defaultPathResolver(localeOrPath);
}

export function getProjectBySlug(slug: string, localeOrPath = "es"): Project {
  const realSlug = slug.replace(/\.mdx$/, "");
  const basePath = resolvePath(localeOrPath, PROJECTS_PATH);
  const fullPath = path.join(basePath, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // gray-matter separa la metadata (data) del markdown (content)
  const { data, content } = matter(fileContents);

  // Validación en runtime con Zod. Si falla, explota acá con un mensaje claro.
  const validatedFrontmatter = ProjectFrontmatterSchema.parse(data);

  return {
    slug: realSlug,
    content,
    ...validatedFrontmatter,
  };
}

export function getAllProjects(localeOrPath = "es"): Project[] {
  const basePath = resolvePath(localeOrPath, PROJECTS_PATH);
  if (!fs.existsSync(basePath)) return [];
  
  const files = fs.readdirSync(basePath);
  const projects = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getProjectBySlug(file, localeOrPath))
    // Ordenamos por fecha descendente
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return projects;
}

export function getEngramBySlug(slug: string, localeOrPath = "es"): Engram {
  const realSlug = slug.replace(/\.mdx$/, "");
  const basePath = resolvePath(localeOrPath, ENGRAMS_PATH);
  const fullPath = path.join(basePath, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  
  // Zod atajando penales nuevamente
  const validatedFrontmatter = EngramFrontmatterSchema.parse(data);

  return {
    slug: realSlug,
    content,
    ...validatedFrontmatter,
  };
}

export function getAllEngrams(localeOrPath = "es"): Engram[] {
  const basePath = resolvePath(localeOrPath, ENGRAMS_PATH);
  if (!fs.existsSync(basePath)) return [];
  
  const files = fs.readdirSync(basePath);
  const engrams = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getEngramBySlug(file, localeOrPath))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return engrams;
}

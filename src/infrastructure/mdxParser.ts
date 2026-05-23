import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, ProjectFrontmatterSchema } from "../domain/entities/Project";
import { Engram, EngramFrontmatterSchema } from "../domain/entities/Engram";

// Ruta base asumiendo que corremos el código desde la raíz del proyecto
const PROJECTS_PATH = path.join(process.cwd(), "content", "projects");

export function getProjectBySlug(slug: string, basePath = PROJECTS_PATH): Project {
  const realSlug = slug.replace(/\.mdx$/, "");
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

export function getAllProjects(basePath = PROJECTS_PATH): Project[] {
  if (!fs.existsSync(basePath)) return [];
  
  const files = fs.readdirSync(basePath);
  const projects = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getProjectBySlug(file, basePath))
    // Ordenamos por fecha descendente
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return projects;
}

const ENGRAMS_PATH = path.join(process.cwd(), "content", "engrams");

export function getEngramBySlug(slug: string, basePath = ENGRAMS_PATH): Engram {
  const realSlug = slug.replace(/\.mdx$/, "");
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

export function getAllEngrams(basePath = ENGRAMS_PATH): Engram[] {
  if (!fs.existsSync(basePath)) return [];
  
  const files = fs.readdirSync(basePath);
  const engrams = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getEngramBySlug(file, basePath))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return engrams;
}

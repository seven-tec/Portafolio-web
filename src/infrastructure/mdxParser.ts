import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, ProjectFrontmatterSchema } from "../domain/entities/Project";
import { Engram, EngramFrontmatterSchema } from "../domain/entities/Engram";

// Ruta base asumiendo que corremos el código desde la raíz del proyecto
const PROJECTS_PATH = path.join(process.cwd(), "content", "projects");

export function getProjectBySlug(slug: string): Project {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(PROJECTS_PATH, `${realSlug}.mdx`);
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

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_PATH)) return [];
  
  const files = fs.readdirSync(PROJECTS_PATH);
  const projects = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getProjectBySlug(file))
    // Ordenamos por fecha descendente
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return projects;
}

const ENGRAMS_PATH = path.join(process.cwd(), "content", "engrams");

export function getEngramBySlug(slug: string): Engram {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(ENGRAMS_PATH, `${realSlug}.mdx`);
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

export function getAllEngrams(): Engram[] {
  if (!fs.existsSync(ENGRAMS_PATH)) return [];
  
  const files = fs.readdirSync(ENGRAMS_PATH);
  const engrams = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getEngramBySlug(file))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return engrams;
}

import { z } from "zod";

// 1. Definimos el esquema estricto para el frontmatter
export const ProjectFrontmatterSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  summary: z.string().min(10, "El resumen debe tener al menos 10 caracteres"),
  tags: z.array(z.string()).min(1, "Debe tener al menos un tag"),
  date: z.string(), // Podríamos usar z.string().datetime() si quisiéramos ser ultra nazis con el formato ISO
  repositoryUrl: z.string().url("Debe ser una URL válida").optional(),
  demoUrl: z.string().url("Debe ser una URL válida").optional(),
  metrics: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

// 2. Extraemos el tipo de TypeScript automáticamente (DRY)
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

// 3. Definimos la entidad completa (Frontmatter + la metadata del sistema de archivos)
export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}

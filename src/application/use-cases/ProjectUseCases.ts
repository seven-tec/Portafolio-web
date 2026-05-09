import { Project } from "../../domain/entities/Project";
import { getAllProjects, getProjectBySlug } from "../../infrastructure/mdxParser";

export class ProjectUseCases {
  
  static getPublishedProjects(): Project[] {
    const allProjects = getAllProjects();
    
    // Acá entra la "lógica de negocio". 
    // Por ejemplo, podríamos filtrar proyectos que tengan fecha en el futuro 
    // o un flag de 'draft: true' si lo agregamos al frontmatter después.
    // Por ahora, simplemente retornamos todos.
    return allProjects;
  }

  static getProjectDetail(slug: string): Project {
    if (!slug) {
      throw new Error("Se requiere un slug para buscar el proyecto.");
    }
    
    return getProjectBySlug(slug);
  }
}

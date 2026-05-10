import { Project } from "../../domain/entities/Project";
import { getAllProjects, getProjectBySlug } from "../../infrastructure/mdxParser";

export class ProjectUseCases {
  
  static getPublishedProjects(): Project[] {
    const allProjects = getAllProjects();
    
    // Filtramos los proyectos que son borradores
    return allProjects.filter(project => !project.draft);
  }

  static getProjectDetail(slug: string): Project {
    if (!slug) {
      throw new Error("Se requiere un slug para buscar el proyecto.");
    }
    
    return getProjectBySlug(slug);
  }
}

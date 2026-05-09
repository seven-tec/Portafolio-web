import { Engram } from "../../domain/entities/Engram";
import { getAllEngrams, getEngramBySlug } from "../../infrastructure/mdxParser";

export class EngramUseCases {
  
  static getPublishedEngrams(): Engram[] {
    // Si el día de mañana queremos agregar un tag "draft: true" en el MDX,
    // es acá donde metemos el .filter() sin tocar ni la vista ni el parser.
    return getAllEngrams();
  }

  static getEngramDetail(slug: string): Engram {
    if (!slug) {
      throw new Error("Se requiere un slug para buscar el engram.");
    }
    return getEngramBySlug(slug);
  }
}

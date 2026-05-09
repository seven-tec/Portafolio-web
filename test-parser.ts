import { getAllProjects, getProjectBySlug } from "./src/infrastructure/mdxParser";

console.log("--- INICIANDO TEST DEL PARSER ---");

try {
  // 1. Probamos traer todo el directorio
  console.log("\n1. Probando getAllProjects()...");
  const allProjects = getAllProjects();
  console.log(`✅ Se encontraron ${allProjects.length} proyectos.`);
  
  // 2. Probamos traer el proyecto específico que acabamos de crear
  console.log("\n2. Probando getProjectBySlug('test-validador')...");
  const testProject = getProjectBySlug("test-validador");
  
  // Mostramos el resultado hermoso y tipado
  console.log("✅ Proyecto parseado con éxito:");
  console.log(JSON.stringify(testProject, null, 2));

} catch (error) {
  console.error("❌ ¡Explotó todo! El validador Zod atajó un problema o falló la lectura:");
  console.error(error);
}

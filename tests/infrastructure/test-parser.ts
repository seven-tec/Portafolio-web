import path from "path";
import { getAllProjects, getProjectBySlug } from "../../src/infrastructure/mdxParser";

console.log("--- INICIANDO TEST DEL PARSER ---");

const MOCKS_PATH = path.join(process.cwd(), "tests", "mocks");

try {
  // 1. Probamos traer todo el directorio de mocks
  console.log(`\n1. Probando getAllProjects() sobre ${MOCKS_PATH}...`);
  const allProjects = getAllProjects(MOCKS_PATH);
  console.log(`✅ Se encontraron ${allProjects.length} proyectos de prueba.`);
  
  // 2. Probamos traer el proyecto específico desde los mocks
  console.log("\n2. Probando getProjectBySlug('test-validador') sobre mocks...");
  const testProject = getProjectBySlug("test-validador", MOCKS_PATH);
  
  // Mostramos el resultado hermoso y tipado
  console.log("✅ Proyecto parseado con éxito:");
  console.log(JSON.stringify(testProject, null, 2));

} catch (error) {
  console.error("❌ ¡Explotó todo! El validador Zod atajó un problema o falló la lectura:");
  console.error(error);
  process.exit(1);
}

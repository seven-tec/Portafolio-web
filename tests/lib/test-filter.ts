import { filterContent } from "../../src/lib/filter";

console.log("--- INICIANDO TEST DEL FILTRADO DE CONTENIDO ---");

interface MockItem {
  title: string;
  tags?: string[];
  summary?: string;
  topic?: string;
}

const mockItems: MockItem[] = [
  {
    title: "Buscador de Hazañas & Notas",
    tags: ["React", "TypeScript", "Next.js"],
    summary: "Implementación de un buscador interactivo ultra rápido con tags.",
    topic: "Desarrollo",
  },
  {
    title: "Sudoku Científico WASM",
    tags: ["Rust", "WASM", "Algoritmos"],
    summary: "Generador de sudokus matemáticos de alto rendimiento.",
    topic: "Investigación",
  },
  {
    title: "Evaluador de Arquitectura de Sistemas",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    summary: "Formulario inteligente con cálculo interactivo de métricas.",
    topic: "Arquitectura",
  },
];

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

try {
  // Test 1: Búsqueda por texto simple (mayúsculas/minúsculas e insensible a diacríticos)
  console.log("\n1. Testeando búsqueda por texto simple...");
  
  const search1 = filterContent(mockItems, "sudoku", []);
  assert(search1.length === 1, "Debería encontrar exactamente 1 item para 'sudoku'");
  assert(search1[0].title === "Sudoku Científico WASM", "Debería ser el Sudoku");

  const search2 = filterContent(mockItems, "hazana", []); // Insensible a acentos/ñ
  assert(search2.length === 1, "Debería encontrar 1 item para 'hazana' sin acento");
  assert(search2[0].title === "Buscador de Hazañas & Notas", "Debería ser el buscador");

  const search3 = filterContent(mockItems, "inexistente", []);
  assert(search3.length === 0, "Debería retornar 0 items para búsqueda inexistente");

  console.log("✅ Búsqueda por texto simple exitosa.");

  // Test 2: Filtrado por tags individuales y múltiples (intersección AND)
  console.log("\n2. Testeando filtrado por tags (intersección AND)...");

  const tags1 = filterContent(mockItems, "", ["TypeScript"]);
  assert(tags1.length === 2, "Debería encontrar 2 items con tag 'TypeScript'");

  const tags2 = filterContent(mockItems, "", ["TypeScript", "Next.js"]);
  assert(tags2.length === 2, "Debería encontrar 2 items con tags 'TypeScript' y 'Next.js'");

  const tags3 = filterContent(mockItems, "", ["TypeScript", "React"]);
  assert(tags3.length === 1, "Debería encontrar exactly 1 item con tags 'TypeScript' y 'React'");
  assert(tags3[0].title === "Buscador de Hazañas & Notas", "Debería ser el buscador");

  const tags4 = filterContent(mockItems, "", ["TypeScript", "Rust"]);
  assert(tags4.length === 0, "Debería retornar 0 items para tags incompatibles (TypeScript + Rust)");

  console.log("✅ Filtrado por tags exitoso.");

  // Test 3: Combinación de búsqueda y tags
  console.log("\n3. Testeando combinación de búsqueda + tags...");

  const combined1 = filterContent(mockItems, "evaluador", ["TypeScript"]);
  assert(combined1.length === 1, "Debería encontrar 1 item con texto 'evaluador' y tag 'TypeScript'");
  assert(combined1[0].title === "Evaluador de Arquitectura de Sistemas", "Debería ser el evaluador");

  const combined2 = filterContent(mockItems, "evaluador", ["Rust"]);
  assert(combined2.length === 0, "Debería retornar 0 items para texto 'evaluador' con tag 'Rust'");

  console.log("✅ Combinación de búsqueda + tags exitosa.");

  // Test 4: Topic considerado como tag
  console.log("\n4. Testeando que 'topic' actúe como tag...");

  const topic1 = filterContent(mockItems, "", ["Desarrollo"]);
  assert(topic1.length === 1, "Debería encontrar 1 item por el topic 'Desarrollo'");
  assert(topic1[0].title === "Buscador de Hazañas & Notas", "Debería ser el buscador");

  const topic2 = filterContent(mockItems, "", ["Investigación"]);
  assert(topic2.length === 1, "Debería encontrar 1 item por el topic 'Investigación'");

  console.log("✅ Filtrado considerando 'topic' como tag exitoso.");

  console.log("\n🚀 ¡TODOS LOS TESTS DE FILTRADO PASARON DE DIEZ! 🚀");
  process.exit(0);

} catch (error) {
  console.error("\n❌ ¡Falló el test del filtro!");
  console.error(error);
  process.exit(1);
}

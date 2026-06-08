export const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")                  // Decompose combining diacritical marks
    .replace(/[\u0300-\u036f]/g, "")   // Remove diacritical marks
    .toLowerCase()                     // Convert to lowercase
    .trim();
};

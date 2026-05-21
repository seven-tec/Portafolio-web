import { z } from "zod";

export const ArchitectureReviewFieldSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(["text", "email", "textarea", "select", "url"]),
  required: z.boolean(),
  placeholder: z.string().optional(),
  helpText: z.string().optional(),
  options: z.array(z.string()).optional(),
});

export type ArchitectureReviewField = z.infer<typeof ArchitectureReviewFieldSchema>;

export const ArchitectureReviewFormSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.email("Ingresa un email válido"),
  companyOrProject: z.string().min(2, "Indica empresa o proyecto"),
  productType: z.string().min(2, "Describe el tipo de producto"),
  problemDescription: z.string().min(30, "Describe el problema con más detalle"),
  currentSystemState: z.string().min(20, "Explica el estado actual del sistema"),
  primaryPainPoint: z.string().min(10, "Indica el principal pain point"),
  urgency: z.enum(["low", "medium", "high", "critical"]),
  desiredOutcome: z.string().min(10, "Indica el objetivo esperado"),
  currentStack: z.string().optional(),
  estimatedTraffic: z.string().optional(),
  technicalConstraints: z.string().optional(),
  relevantLinks: z.string().optional(),
  timeline: z.string().optional(),
  budgetRange: z.string().optional(),
});

export type ArchitectureReviewFormValues = z.infer<typeof ArchitectureReviewFormSchema>;

export const ArchitectureReviewContentSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  whatYouGet: z.array(z.string()).min(1),
  fitCriteria: z.array(z.string()).min(1),
  nonFitCriteria: z.array(z.string()).min(1),
  responseExpectation: z.string().min(1),
  submitLabel: z.string().min(1),
  fields: z.array(ArchitectureReviewFieldSchema).min(1),
});

export type ArchitectureReviewContent = z.infer<typeof ArchitectureReviewContentSchema>;

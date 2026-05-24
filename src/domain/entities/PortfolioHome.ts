import { z } from "zod";

export const PainPointSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  businessImpact: z.string().min(1),
  technicalImpact: z.string().min(1),
});

export type PainPoint = z.infer<typeof PainPointSchema>;

export const CapabilitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  technologies: z.array(z.string()).min(1),
});

export type Capability = z.infer<typeof CapabilitySchema>;

export const FeaturedCaseReferenceSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
  href: z.string().min(1),
  tags: z.array(z.string()).min(1),
});

export type FeaturedCaseReference = z.infer<typeof FeaturedCaseReferenceSchema>;

export const ProcessStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export type ProcessStep = z.infer<typeof ProcessStepSchema>;

export const MetricHighlightSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

export type MetricHighlight = z.infer<typeof MetricHighlightSchema>;

export const PortfolioHomeContentSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  primaryCta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
  secondaryCta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
  painPoints: z.array(PainPointSchema).min(1),
  capabilities: z.array(CapabilitySchema).min(1),
  featuredCases: z.array(FeaturedCaseReferenceSchema).min(3),
  processSteps: z.array(ProcessStepSchema).min(1),
  architectureReviewPitch: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    fitExamples: z.array(z.string()).min(1),
  }),
  authorityClose: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  heroBadges: z.array(z.string()).optional(),
  metricsHighlight: z.array(MetricHighlightSchema).optional(),
});

export type PortfolioHomeContent = z.infer<typeof PortfolioHomeContentSchema>;

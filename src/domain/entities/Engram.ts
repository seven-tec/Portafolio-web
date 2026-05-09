import { z } from "zod";

export const EngramFrontmatterSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  date: z.string(),
  readTimeMinutes: z.number().positive().optional(),
});

export type EngramFrontmatter = z.infer<typeof EngramFrontmatterSchema>;

export interface Engram extends EngramFrontmatter {
  slug: string;
  content: string;
}

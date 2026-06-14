import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  keyword: z.string().optional(),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).optional().default([]),
});

const settoriCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/settori" }),
  schema: baseSchema.extend({
    sector: z.string(),
    painPoints: z.array(z.string()).optional().default([]),
    solutions: z.array(z.object({
      title: z.string(),
      desc: z.string()
    })).optional().default([]),
  }),
});

const confrontiCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/confronti" }),
  schema: baseSchema.extend({
    topic: z.string(),
    nameA: z.string(),
    nameB: z.string(),
    geoDefinition: z.string().optional(),
    comparisonData: z.array(z.object({
      feature: z.string(),
      itemA: z.string(),
      itemB: z.string(),
      winner: z.enum(['A', 'B', 'Tie']).optional()
    })).optional().default([]),
    whenToChooseA: z.array(z.string()).optional().default([]),
    whenToChooseB: z.array(z.string()).optional().default([]),
  }),
});

const serviziCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/servizi" }),
  schema: baseSchema
});

const soluzioniCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/soluzioni" }),
  schema: baseSchema
});

const progettiCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/progetti" }),
  schema: baseSchema
});

const risorseCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/risorse" }),
  schema: baseSchema
});

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: baseSchema
});

export const collections = {
  'servizi': serviziCollection,
  'settori': settoriCollection,
  'soluzioni': soluzioniCollection,
  'confronti': confrontiCollection,
  'progetti': progettiCollection,
  'risorse': risorseCollection,
  'blog': blogCollection,
};

import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      heroImage: image().or(z.string()).optional(),
      readingTime: z.string().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      ogImage: z.string().optional(),
      canonicalURL: z.string().optional(),
      // About page fields
      name: z.string().optional(),
      role: z.string().optional(),
      avatar: image().or(z.string()).optional(),
      bio: z.string().optional(),
      location: z.string().optional(),
      email: z.string().optional(),
      socials: z
        .object({
          github: z.string().optional(),
          twitter: z.string().optional(),
          linkedin: z.string().optional(),
        })
        .optional(),
    }),
});

const series = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/series" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().or(z.string()).optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      order: z.number().default(0),
    }),
});

const thoughts = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/thoughts",
  }),
  schema: z.object({
    pubDatetime: z.date(),
    tags: z.array(z.string()).default([]),
    mood: z.string().optional(),
    location: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/books" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      cover: image().or(z.string()).optional(),
      rating: z.number().min(0).max(5).optional(),
      review: z.string().optional(),
      tags: z.array(z.string()).default([]),
      status: z
        .enum(["reading", "completed", "want-to-read"])
        .default("want-to-read"),
      readDate: z.date().optional(),
      link: z.string().optional(),
    }),
});

const tools = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/tools" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      icon: image().or(z.string()).optional(),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      recommendation: z
        .enum(["essential", "recommended", "optional"])
        .default("recommended"),
      link: z.string(),
    }),
});

export const collections = { posts, pages, series, thoughts, books, tools };

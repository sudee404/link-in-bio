import { z } from "zod"

export const SocialLinksSchema = z.object({
  instagram: z.string().url().optional(),
  tiktok: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
})

export const BioLinkSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  url: z.string().url("Invalid URL"),
  icon: z.string().optional(),
  price: z.number().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
  buttonText: z.string().optional(),
})

export const ThemeSchema = z.object({
  mode: z.enum(["light", "dark"]),
  primary: z.string(),
})

export const BioDataSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  avatar: z.string().url("Invalid avatar URL"),
  socialLinks: SocialLinksSchema,
  links: z.array(BioLinkSchema),
  theme: ThemeSchema,
})

export type SocialLinks = z.infer<typeof SocialLinksSchema>
export type BioLink = z.infer<typeof BioLinkSchema>
export type Theme = z.infer<typeof ThemeSchema>
export type BioData = z.infer<typeof BioDataSchema>


import type { MetadataRoute } from "next"
import { docPages } from "@/lib/docs/pages"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://docs.example.com"

  const docRoutes = docPages.map((page) => ({
    url: `${baseUrl}/docs/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docRoutes,
  ]
}

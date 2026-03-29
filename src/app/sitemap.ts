import type { MetadataRoute } from "next";

const SITE_URL = "https://rohiths-portfolio.vercel.app";

/**
 * Next.js App Router sitemap — auto-served at /sitemap.xml
 * Add new routes here as the portfolio grows.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#journey`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#terminal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}

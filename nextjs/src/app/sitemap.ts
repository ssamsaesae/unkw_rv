import { MetadataRoute } from "next";

const SITE_URL = "https://unknownriver.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ko"];
  const routes = ["", "/about", "/project", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // Default locale (en) — no prefix
    entries.push({
      url: `${SITE_URL}${route || "/"}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            l === "en"
              ? `${SITE_URL}${route || "/"}`
              : `${SITE_URL}/${l}${route}`,
          ])
        ),
      },
    });
  }

  return entries;
}

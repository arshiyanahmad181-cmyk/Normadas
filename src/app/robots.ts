import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep transactional pages out of search results.
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}

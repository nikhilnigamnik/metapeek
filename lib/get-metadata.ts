"use server";

import { parse } from "node-html-parser";

export async function fetchMetadata(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);

    const getMetaContent = (name: string, property: string) =>
      root
        .querySelector(`meta[name="${name}"], meta[property="${property}"]`)
        ?.getAttribute("content") ?? "";

    const metadata = {
      // Basic metadata
      title: root.querySelector("title")?.text ?? "",
      description: getMetaContent("description", "og:description"),

      // Open Graph metadata
      ogTitle: getMetaContent("", "og:title"),
      ogDescription: getMetaContent("", "og:description"),
      ogImage: getMetaContent("", "og:image"),
      ogUrl: getMetaContent("", "og:url"),
      ogType: getMetaContent("", "og:type"),
      ogSiteName: getMetaContent("", "og:site_name"),

      // Twitter Card metadata
      twitterCard: getMetaContent("twitter:card", ""),
      twitterSite: getMetaContent("twitter:site", ""),
      twitterTitle: getMetaContent("twitter:title", ""),
      twitterDescription: getMetaContent("twitter:description", ""),
      twitterImage: getMetaContent("twitter:image", ""),

      // LinkedIn specific
      linkedinTitle: getMetaContent("", "og:title"),
      linkedinDescription: getMetaContent("", "og:description"),
      linkedinImage: getMetaContent("", "og:image"),

      // WhatsApp specific (uses Open Graph)
      whatsappTitle: getMetaContent("", "og:title"),
      whatsappDescription: getMetaContent("", "og:description"),
      whatsappImage: getMetaContent("", "og:image"),

      // Discord specific (uses Open Graph)
      discordTitle: getMetaContent("", "og:title"),
      discordDescription: getMetaContent("", "og:description"),
      discordImage: getMetaContent("", "og:image"),

      // Other useful metadata
      author: getMetaContent("author", ""),
      keywords: getMetaContent("keywords", ""),
      canonical:
        root.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",

      // Favicon
      favicon: (() => {
        const faviconLink =
          root.querySelector('link[rel="icon"]') ??
          root.querySelector('link[rel="shortcut icon"]') ??
          root.querySelector('link[rel="apple-touch-icon"]');
        return faviconLink
          ? new URL(faviconLink.getAttribute("href") ?? "", url).href
          : "";
      })(),

      // Schema.org metadata
      schemaOrg:
        root.querySelector('script[type="application/ld+json"]')?.text ?? "",
    };

    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}

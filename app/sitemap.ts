import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://syntegra.co.id";
  const staticPaths = [
    "",
    "/produk",
    "/produk/social-media-builder",
    "/produk/pos",
    "/produk/syntia",
    "/produk/halo",
    "/tentang",
    "/insights",
    "/kontak",
  ];
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${base}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: p === "" ? 1 : 0.6,
      });
    }
    for (const post of getAllPosts(locale)) {
      entries.push({
        url: `${base}/${locale}/insights/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }
  return entries;
}

import { MetadataRoute } from "next";
import { services, blogPosts, branches } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://clocksy.com.tr";

  const staticPages = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/kesifet`, priority: 0.95 },
    { url: `${baseUrl}/randevularim`, priority: 0.9 },
    { url: `${baseUrl}/randevu`, priority: 0.95 },
    { url: `${baseUrl}/hizmetler`, priority: 0.9 },
    { url: `${baseUrl}/subeler`, priority: 0.9 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
    { url: `${baseUrl}/hakkimizda`, priority: 0.6 },
    { url: `${baseUrl}/iletisim`, priority: 0.7 },
    { url: `${baseUrl}/sss`, priority: 0.7 },
  ].map((p) => ({
    ...p,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));

  const servicePages = services.map((s) => ({
    url: `${baseUrl}/hizmetler/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const branchPages = branches.map((b) => ({
    url: `${baseUrl}/subeler/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...branchPages];
}

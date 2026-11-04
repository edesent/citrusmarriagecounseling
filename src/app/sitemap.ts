import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["", 1],
    ["/christian-marriage-counseling", 0.9],
    ["/premarital-counseling", 0.9],
    ["/faith-based-counseling", 0.8],
    ["/pastor-brandon-bankert", 0.7],
    ["/free-consultation", 0.7],
    ["/areas", 0.7],
    ...areas.map((a): [string, number] => [`/areas/${a.slug}`, 0.7]),
  ];
  return pages.map(([p, priority]) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly", priority }));
}

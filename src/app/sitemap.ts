import type { MetadataRoute } from "next";
import { areas } from "@/lib/areas";
import { areaPic, pagePics } from "@/lib/images";
import { siteUrl } from "@/lib/site";

/** Every page, with the pictures on it (an image sitemap, so they can show in image search). */
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
  const picsFor = (p: string) => {
    const area = areas.findIndex((a) => `/areas/${a.slug}` === p);
    const list = area >= 0 ? [areaPic(area)] : (pagePics[p] ?? []);
    return list.map((pic) => `${siteUrl}${pic.src}`);
  };
  return pages.map(([p, priority]) => ({
    url: `${siteUrl}${p}`,
    changeFrequency: "monthly",
    priority,
    images: picsFor(p),
  }));
}

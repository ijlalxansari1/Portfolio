import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://dataden.vercel.app/" },
    { url: "https://dataden.vercel.app/demos/doomsday" },
  ];
}

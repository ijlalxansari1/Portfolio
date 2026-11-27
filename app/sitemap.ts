import type { MetadataRoute } from "next";
import { SITE_URL } from "./utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/demos/doomsday` },
  ];
}

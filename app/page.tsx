import Home from "./Home";
import { getStoreData } from "./utils/adminStore";
import { getPublishedServices } from "./utils/services";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps<"/">) {
  const { article } = await searchParams;
  return <Home content={getHomepageContent(typeof article === "string" ? article : article?.[0])} />;
}

function savedEntries(value: unknown) {
  return Array.isArray(value) && value.length > 0 ? value : undefined;
}

function publicEntries(value: unknown) {
  return savedEntries(value)?.filter((entry) => entry && entry.status !== "Draft");
}

function getHomepageContent(article?: string) {
  const store = getStoreData();
  const articleId = article ? Number.parseInt(article, 10) : NaN;
  return {
    article: Number.isSafeInteger(articleId) ? articleId : null,
    maintenanceMode: Boolean(store["admin-config"]?.maintenanceMode),
    hero: store["admin-hero"],
    milestones: savedEntries(store["admin-milestones"]),
    services: getPublishedServices(store["admin-services-jr"], "en"),
    demos: publicEntries(store["admin-demos"]),
    coreStack: publicEntries(store["admin-core-stack"]),
    cloudPlatforms: publicEntries(store["admin-cloud-platforms"]),
    projects: publicEntries(store["admin-projects"]),
    languages: publicEntries(store["admin-languages"]),
    certifications: publicEntries(store["admin-certs"]),
    posts: publicEntries(store["admin-posts"]),
  };
}

export type HomepageContent = ReturnType<typeof getHomepageContent>;

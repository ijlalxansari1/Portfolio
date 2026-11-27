import type { Metadata } from "next";
import Home from "./Home";
import { getStoreData } from "./utils/adminStore";
import { DEFAULT_HOME_SEO, SITE_NAME, SITE_OWNER, SITE_URL } from "./utils/seo";
import { getPublishedServices } from "./utils/services";

export const dynamic = "force-dynamic";

const socialImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Ijlal Ansari, Data Engineer, DataDen",
};

export function generateMetadata(): Metadata {
  const config = getStoreData()["admin-config"];
  const title = typeof config?.title === "string" ? config.title.trim() : "";
  const description = typeof config?.description === "string" ? config.description.trim() : "";
  const pageTitle = title || DEFAULT_HOME_SEO.title;
  const pageDescription = description || DEFAULT_HOME_SEO.description;

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    keywords: config?.keywords,
    authors: [{ name: SITE_OWNER }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      siteName: SITE_NAME,
      title: pageTitle,
      description: pageDescription,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [socialImage],
    },
  };
}

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;
const profileSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      alternateName: "Ijlal Ansari Portfolio",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      url: `${SITE_URL}/`,
      isPartOf: { "@id": websiteId },
      mainEntity: {
        "@type": "Person",
        "@id": personId,
        name: SITE_OWNER,
        jobTitle: "Data Engineer",
        image: `${SITE_URL}/profile-portrait.webp`,
        sameAs: [
          "https://github.com/ijlalxansari1",
          "https://www.linkedin.com/in/ijlal-ansari/",
        ],
      },
    },
  ],
};

export default async function Page({ searchParams }: PageProps<"/">) {
  const { article } = await searchParams;
  const content = getHomepageContent(typeof article === "string" ? article : article?.[0]);

  return (
    <>
      {!content.maintenanceMode && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <Home content={content} />
    </>
  );
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
    movies: publicEntries(store["admin-movies"]),
    books: publicEntries(store["admin-books"]),
    certifications: publicEntries(store["admin-certs"]),
    posts: publicEntries(store["admin-posts"]),
  };
}

export type HomepageContent = ReturnType<typeof getHomepageContent>;

import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/Toast";
import { ThemeProvider } from "./components/ThemeProvider";
import dynamic from "next/dynamic";
import Script from "next/script";
import { LanguageProvider } from "./context/LanguageContext";
const CustomCursor = dynamic(() => import("./components/CustomCursor"));
const TemporalRadiation = dynamic(() => import("./components/TemporalRadiation"));
const DataLoader = dynamic(() => import("./components/DataLoader"));
import { AudioProvider } from "./context/AudioContext";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function generateMetadata(): Promise<Metadata> {
  let config: any = {};
  try {
    const storePath = path.join(process.cwd(), 'app', 'api', 'data', 'admin-store.json');
    if (existsSync(storePath)) {
      const data = await fs.readFile(storePath, 'utf8');
      config = JSON.parse(data)['admin-config'] || {};
    }
  } catch (e) {
    console.error("Failed to read SEO config", e);
  }

  const title = config.title || 'Ijlal Ansari — Data Engineer';
  const description = config.description || "Data Engineer focused on building reliable data pipelines, modern analytics systems, and practical data platforms. Skilled in Python, SQL, dbt, Airflow, FastAPI, DuckDB, PostgreSQL, and cloud tooling.";
  const keywords = config.keywords || "data engineer, data engineering portfolio, Python data engineer, dbt developer, data ops engineer, FastAPI developer, DuckDB analytics, data pipeline engineer, Ijlal Ansari, data governance, ETL pipeline, Airflow orchestration, open source data platform";

  return {
    title: {
      default: title,
      template: '%s | Ijlal Ansari',
    },
    description: description,
    keywords: keywords,
    authors: [{ name: "Ijlal Ansari" }],
    creator: 'Ijlal Ansari',
    metadataBase: new URL('https://dataden.vercel.app'),
    robots: "index, follow",
    alternates: {
      canonical: "https://dataden.vercel.app/",
    },
    openGraph: {
      type: "website",
      url: "https://dataden.vercel.app/",
      title: title,
      description: description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Ijlal Ansari Portfolio",
        },
      ],
      siteName: "Ijlal Ansari — Data Den",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["https://dataden.vercel.app/og-image.jpg"],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    verification: {
      google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN',
    },
  };
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ijlal Ansari",
  "url": "https://dataden.vercel.app",
  "image": "https://dataden.vercel.app/profile.jpg",
  "jobTitle": "Data Engineer",
  "description": "Data Engineer building reliable pipelines, analytics systems, and practical data platforms with a strong focus on maintainability and trust.",
  "knowsAbout": [
    "Data Engineering",
    "ETL Pipeline Design",
    "Python",
    "dbt Core",
    "Dagster",
    "Apache Airflow",
    "Apache Kafka",
    "FastAPI",
    "DuckDB",
    "PostgreSQL",
    "Fairlearn",
    "SHAP",
    "Ethical AI",
    "Data Governance",
    "RBAC Design"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Remote"
  },
  "sameAs": [
    "https://github.com/ijlalxansari1",
    "https://linkedin.com/in/ijlal-ansari-56b0371b0",
    "https://dataden.vercel.app"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Self-Taught Researcher"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ijlal Ansari — Data Engineer Portfolio",
  "url": "https://dataden.vercel.app",
  "description": "Portfolio of Ijlal Ansari, Data Engineer and AI Ethics Researcher.",
  "author": {
    "@type": "Person",
    "name": "Ijlal Ansari"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://api.github.com" />
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" strategy="lazyOnload" />
      </head>
      <body className="antialiased font-sans transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="portfolio-theme-v4" enableSystem={false} themes={['dark', 'midnight', 'tva', 'slate', 'bordeaux', 'void']}>
          <LanguageProvider>
            <AudioProvider>
              <CustomCursor />
              <TemporalRadiation />
              <DataLoader />
              <ToastProvider>
                {children}
              </ToastProvider>
            </AudioProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

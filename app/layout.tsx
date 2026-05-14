import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/Toast";
import { ThemeProvider } from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";
import { LanguageProvider } from "./context/LanguageContext";
import Script from "next/script";

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

export const metadata: Metadata = {
  title: {
    default: 'Ijlal Ansari — Data Engineer & AI Ethics Researcher',
    template: '%s | Ijlal Ansari',
  },
  description: "Data Engineer and AI Ethics Researcher building AETHER — an open-source ethical data platform with bias detection, SHAP explainability, and data governance. Skilled in Python, dbt, Dagster, FastAPI, DuckDB, PostgreSQL, and Kafka.",
  keywords: "data engineer, data engineering portfolio, Python data engineer, dbt developer, AI ethics researcher, AETHER platform, Fairlearn SHAP bias detection, FastAPI developer, DuckDB analytics, data pipeline engineer, Ijlal Ansari, data governance, ETL pipeline, Dagster orchestration, open source data platform",
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
    title: "Ijlal Ansari — Data Engineer & AI Ethics Researcher",
    description: "Building AETHER — an open-source ethical data platform with bias detection and explainability. Skilled in Python, dbt, Dagster, FastAPI, and DuckDB.",
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
    title: "Ijlal Ansari — Data Engineer & AI Ethics Researcher",
    description: "Building AETHER — ethical data platform with bias detection, SHAP explainability & data governance. Python, dbt, FastAPI, DuckDB.",
    images: ["https://dataden.vercel.app/og-image.jpg"],
  },
  themeColor: "#0d0d0d",
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

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ijlal Ansari",
  "url": "https://dataden.vercel.app",
  "image": "https://dataden.vercel.app/profile.jpg",
  "jobTitle": "Data Engineer & AI Ethics Researcher",
  "description": "Data Engineer and AI Ethics Researcher building AETHER — an open-source ethical data analysis platform with bias detection, SHAP explainability, and data governance.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
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
        <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" />
      </head>
      <body className="antialiased font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} themes={['dark', 'light', 'cmd', 'midnight', 'forest', 'slate', 'bordeaux']}>
          <LanguageProvider>
            <CustomCursor />
            <ToastProvider>{children}</ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./components/Toast";
import { ThemeProvider } from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  description: 'Ijlal Ansari is a Data Engineer and AI Ethics Researcher building AETHER — an ethical data analysis platform. Specialising in Python, dbt, FastAPI, DuckDB, Dagster, SHAP, and Fairlearn.',
  keywords: ['data engineer', 'AI ethics', 'AETHER', 'dbt', 'FastAPI', 'DuckDB', 'Dagster', 'SHAP', 'Fairlearn', 'Python', 'data pipeline', 'Pakistan'],
  authors: [{ name: 'Ijlal Ansari' }],
  creator: 'Ijlal Ansari',
  metadataBase: new URL('https://dataden.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dataden.vercel.app',
    siteName: 'Ijlal Ansari — Data Den',
    title: 'Ijlal Ansari — Data Engineer & AI Ethics Researcher',
    description: 'Builder of AETHER, an ethical data analysis platform. Python · dbt · FastAPI · DuckDB · Dagster.',
    images: [{
      url: '/og-image.jpg', // Placeholder for now, I'll add the generator later
      width: 1200,
      height: 630,
      alt: 'Ijlal Ansari — Data Den Portfolio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ijlal Ansari — Data Engineer & AI Ethics Researcher',
    description: 'Builder of AETHER, an ethical data analysis platform.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_VERIFICATION_TOKEN',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ijlal Ansari",
  "jobTitle": "Data Engineer & AI Ethics Researcher",
  "url": "https://dataden.vercel.app",
  "image": "https://dataden.vercel.app/profile.png",
  "description": "Data Engineer and AI Ethics Researcher building AETHER — an ethical data analysis and truthful storytelling platform.",
  "knowsAbout": ["Data Engineering", "AI Ethics", "Python", "dbt", "FastAPI", "DuckDB", "Dagster", "SHAP", "Fairlearn", "PostgreSQL", "Next.js"],
  "sameAs": [
    "https://github.com/ijlalxansari1",
    "https://linkedin.com/in/ijlal-ansari-56b0371b0"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Independent Researcher"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomCursor />
          <ToastProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

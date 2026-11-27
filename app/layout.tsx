import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./theme-experiences.css";
import { ToastProvider } from "./components/Toast";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./context/LanguageContext";
import { SITE_NAME, SITE_URL } from "./utils/seo";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
  },
  verification: {
    google: "5be1d19eb21097d3",
  },
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
      </head>
      <body className="antialiased font-sans transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="portfolio-theme-v4" enableSystem={false} themes={['dark', 'midnight', 'slate', 'doom', 'loki']}>
          <LanguageProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

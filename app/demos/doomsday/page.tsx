import type { Metadata } from "next";
import { SITE_NAME } from "../../utils/seo";
import DoomsdayDrill from "./DoomsdayDrill";

const title = "Doomsday Drill – Data Engineering Demo";
const description = "Investigate duplicate events across three timelines in this interactive data engineering demo. Recover event IDs and trace who tampered with the feed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demos/doomsday" },
  openGraph: {
    type: "website",
    url: "/demos/doomsday",
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

export default function DoomsdayPage() {
  return <DoomsdayDrill />;
}

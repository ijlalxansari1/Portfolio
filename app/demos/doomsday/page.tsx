import type { Metadata } from "next";
import DoomsdayDrill from "./DoomsdayDrill";

const title = "Doomsday Drill";
const description = "A TVA-themed data engineering demo. Trace duplicate events across three timelines, recover their IDs, and find out who tampered with the feed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/demos/doomsday" },
  openGraph: {
    type: "website",
    url: "/demos/doomsday",
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

export default function DoomsdayPage() {
  return <DoomsdayDrill />;
}

import { NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "app", "api", "data");
const analyticsFile = path.join(dataDir, "analytics.json");

// Initialize analytics file if it doesn't exist
async function initAnalytics() {
  try {
    await mkdir(dataDir, { recursive: true });
    const defaultData = {
      totalViews: 0,
      uniqueVisitors: 0,
      todayViews: 0,
      lastReset: new Date().toISOString().split("T")[0],
      sections: {} as Record<string, number>,
      visitors: [] as string[],
    };
    await writeFile(analyticsFile, JSON.stringify(defaultData, null, 2));
    return defaultData;
  } catch (error) {
    console.error("Error initializing analytics:", error);
    return null;
  }
}

export async function GET() {
  try {
    let data;
    try {
      const fileContents = await readFile(analyticsFile, "utf8");
      data = JSON.parse(fileContents);
    } catch {
      data = await initAnalytics();
      if (!data) {
        return NextResponse.json({ error: "Failed to initialize analytics" }, { status: 500 });
      }
    }

    // Reset today's views if it's a new day
    const today = new Date().toISOString().split("T")[0];
    if (data.lastReset !== today) {
      data.todayViews = 0;
      data.lastReset = today;
      await writeFile(analyticsFile, JSON.stringify(data, null, 2));
    }

    // Get popular sections
    const popularSections = Object.entries(data.sections || {})
      .map(([section, views]) => ({ section, views: views as number }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return NextResponse.json({
      totalViews: data.totalViews || 0,
      uniqueVisitors: data.visitors?.length || 0,
      todayViews: data.todayViews || 0,
      popularSections,
    });
  } catch (error) {
    console.error("Error reading analytics:", error);
    return NextResponse.json({ error: "Failed to read analytics" }, { status: 500 });
  }
}


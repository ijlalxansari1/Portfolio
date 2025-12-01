import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "app", "api", "data");
const analyticsFile = path.join(dataDir, "analytics.json");

async function getOrInitAnalytics() {
  try {
    const fileContents = await readFile(analyticsFile, "utf8");
    return JSON.parse(fileContents);
  } catch {
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
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { section } = body;
    
    // Get visitor ID from headers (simple fingerprint)
    const visitorId = request.headers.get("x-forwarded-for") || 
                      request.headers.get("x-real-ip") || 
                      `anonymous-${Date.now()}`;

    let data = await getOrInitAnalytics();
    const today = new Date().toISOString().split("T")[0];

    // Reset today's views if new day
    if (data.lastReset !== today) {
      data.todayViews = 0;
      data.lastReset = today;
    }

    // Increment counters
    data.totalViews = (data.totalViews || 0) + 1;
    data.todayViews = (data.todayViews || 0) + 1;

    // Track section views
    if (section) {
      data.sections = data.sections || {};
      data.sections[section] = (data.sections[section] || 0) + 1;
    }

    // Track unique visitors (simple approach)
    if (!data.visitors) {
      data.visitors = [];
    }
    if (!data.visitors.includes(visitorId)) {
      data.visitors.push(visitorId);
      data.uniqueVisitors = data.visitors.length;
    }

    // Save data
    await writeFile(analyticsFile, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking analytics:", error);
    return NextResponse.json({ error: "Failed to track analytics" }, { status: 500 });
  }
}


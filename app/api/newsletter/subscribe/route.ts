import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "app", "api", "data");
const newsletterFile = path.join(dataDir, "newsletter.json");

async function getSubscribers() {
  try {
    await mkdir(dataDir, { recursive: true });
    const fileContents = await readFile(newsletterFile, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return { subscribers: [] };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const data = await getSubscribers();
    
    // Check if already subscribed
    if (data.subscribers.includes(email)) {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 });
    }

    // Add subscriber
    data.subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
    });

    await writeFile(newsletterFile, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}


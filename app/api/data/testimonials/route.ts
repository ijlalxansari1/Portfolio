import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";

const dataDir = path.join(process.cwd(), "app", "api", "data");
const testimonialsFile = path.join(dataDir, "testimonials.json");

async function initTestimonials() {
  try {
    await mkdir(dataDir, { recursive: true });
    const defaultData: any[] = [];
    await writeFile(testimonialsFile, JSON.stringify(defaultData, null, 2));
    return defaultData;
  } catch (error) {
    console.error("Error initializing testimonials:", error);
    return [];
  }
}

export async function GET() {
  try {
    let data;
    try {
      const fileContents = await readFile(testimonialsFile, "utf8");
      data = JSON.parse(fileContents);
    } catch {
      data = await initTestimonials();
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading testimonials:", error);
    return NextResponse.json({ error: "Failed to read testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let data;
    try {
      const fileContents = await readFile(testimonialsFile, "utf8");
      data = JSON.parse(fileContents);
    } catch {
      data = await initTestimonials();
    }

    const newTestimonial = {
      id: data.length > 0 ? Math.max(...data.map((t: any) => t.id)) + 1 : 1,
      ...body,
    };

    data.push(newTestimonial);
    await writeFile(testimonialsFile, JSON.stringify(data, null, 2));

    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return NextResponse.json({ error: "Failed to add testimonial" }, { status: 500 });
  }
}


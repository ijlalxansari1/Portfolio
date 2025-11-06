import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "categories.json");

// Common Data domain categories
const defaultCategories = {
  projects: [
    "Data Engineering",
    "Machine Learning",
    "AI Ethics",
    "Data Analytics",
    "Cloud Architecture",
    "ETL/ELT",
    "Data Pipeline",
    "Data Warehousing",
    "Big Data",
    "Data Science",
    "Business Intelligence",
    "Data Governance",
    "Data Quality",
    "Streaming Data",
    "Data Modeling",
  ],
  blogs: [
    "Data Engineering",
    "AI Ethics",
    "Machine Learning",
    "Data Analytics",
    "Cloud Computing",
    "Best Practices",
    "Tutorials",
    "Case Studies",
    "Industry Insights",
  ],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "projects";

    // Try to read existing categories
    try {
      const fileContents = await readFile(filePath, "utf8");
      const data = JSON.parse(fileContents);
      return NextResponse.json(data[type] || defaultCategories[type as keyof typeof defaultCategories] || []);
    } catch {
      // If file doesn't exist, return defaults
      return NextResponse.json(defaultCategories[type as keyof typeof defaultCategories] || []);
    }
  } catch (error) {
    console.error("Error reading categories:", error);
    return NextResponse.json({ error: "Failed to read categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, category } = await request.json();

    if (!type || !category) {
      return NextResponse.json({ error: "Type and category are required" }, { status: 400 });
    }

    let data: any = {};
    try {
      const fileContents = await readFile(filePath, "utf8");
      data = JSON.parse(fileContents);
    } catch {
      // File doesn't exist, use defaults
      data = defaultCategories;
    }

    if (!data[type]) {
      data[type] = [];
    }

    // Add category if it doesn't exist
    if (!data[type].includes(category)) {
      data[type].push(category);
      await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    }

    return NextResponse.json({ success: true, categories: data[type] });
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
  }
}


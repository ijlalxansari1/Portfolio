import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Common Data domain categories (fallback)
const defaultCategories = {
  projects: [
    "Data Engineering", "Machine Learning", "AI Ethics", "Data Analytics",
    "Cloud Architecture", "ETL/ELT", "Data Pipeline", "Data Warehousing",
    "Big Data", "Data Science", "Business Intelligence", "Data Governance",
    "Data Quality", "Streaming Data", "Data Modeling",
  ],
  blogs: [
    "Data Engineering", "AI Ethics", "Machine Learning", "Data Analytics",
    "Cloud Computing", "Best Practices", "Tutorials", "Case Studies",
    "Industry Insights",
  ],
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "projects";

    const { rows } = await sql`SELECT name FROM categories WHERE type = ${type} ORDER BY name ASC`;

    // If no categories found in DB, return defaults
    if (rows.length === 0 && (type === 'projects' || type === 'blogs')) {
      return NextResponse.json(defaultCategories[type as keyof typeof defaultCategories]);
    }

    return NextResponse.json(rows.map(r => r.name));
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

    // Insert if not exists (handled by UNIQUE constraint in schema)
    try {
      await sql`
        INSERT INTO categories (type, name)
        VALUES (${type}, ${category})
        ON CONFLICT (type, name) DO NOTHING
      `;
    } catch (error) {
      // Ignore unique constraint violation
    }

    // Return updated list
    const { rows } = await sql`SELECT name FROM categories WHERE type = ${type} ORDER BY name ASC`;
    return NextResponse.json({ success: true, categories: rows.map(r => r.name) });
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
  }
}


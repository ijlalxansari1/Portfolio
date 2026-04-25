import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM skills ORDER BY id ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error reading skills:", error);
    return NextResponse.json({ error: "Failed to read skills" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newSkill = await request.json();

    const { rows } = await sql`
      INSERT INTO skills (name, category, icon, image, percentage)
      VALUES (
        ${newSkill.name}, 
        ${newSkill.category}, 
        ${newSkill.icon},
        ${newSkill.image},
        ${newSkill.percentage ?? 80}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, skill: rows[0] });
  } catch (error) {
    console.error("Error saving skill:", error);
    return NextResponse.json({ error: "Failed to save skill" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedSkill = await request.json();

    if (!updatedSkill.id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    const { rows } = await sql`
      UPDATE skills 
      SET 
        name = ${updatedSkill.name},
        category = ${updatedSkill.category},
        icon = ${updatedSkill.icon},
        image = ${updatedSkill.image},
        percentage = ${updatedSkill.percentage ?? 80}
      WHERE id = ${updatedSkill.id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, skill: rows[0] });
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { rowCount } = await sql`DELETE FROM skills WHERE id = ${id}`;

    if (rowCount === 0) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

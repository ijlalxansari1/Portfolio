import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM projects ORDER BY id ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json();

    const { rows } = await sql`
      INSERT INTO projects (title, description, category, technologies, image, date, status, github_url, demo_url)
      VALUES (
        ${newProject.title}, 
        ${newProject.description}, 
        ${newProject.category}, 
        ${newProject.technologies}, 
        ${newProject.image}, 
        ${newProject.date}, 
        ${newProject.status}, 
        ${newProject.github_url}, 
        ${newProject.demo_url}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, project: rows[0] });
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProject = await request.json();

    if (!updatedProject.id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const { rows } = await sql`
      UPDATE projects 
      SET 
        title = ${updatedProject.title},
        description = ${updatedProject.description},
        category = ${updatedProject.category},
        technologies = ${updatedProject.technologies},
        image = ${updatedProject.image},
        date = ${updatedProject.date},
        status = ${updatedProject.status},
        github_url = ${updatedProject.github_url},
        demo_url = ${updatedProject.demo_url}
      WHERE id = ${updatedProject.id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project: rows[0] });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { rowCount } = await sql`DELETE FROM projects WHERE id = ${id}`;

    if (rowCount === 0) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}


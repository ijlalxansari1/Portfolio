import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM blogs ORDER BY id ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error reading blogs:", error);
    return NextResponse.json({ error: "Failed to read blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newBlog = await request.json();

    const { rows } = await sql`
      INSERT INTO blogs (
        title, description, category, excerpt, content, image, date, 
        allow_comments, comments, emoji_reactions, technologies
      )
      VALUES (
        ${newBlog.title}, 
        ${newBlog.description}, 
        ${newBlog.category}, 
        ${newBlog.excerpt}, 
        ${newBlog.content}, 
        ${newBlog.image}, 
        ${newBlog.date}, 
        ${newBlog.allow_comments ?? true}, 
        ${JSON.stringify(newBlog.comments || [])}, 
        ${JSON.stringify(newBlog.emoji_reactions || {})}, 
        ${newBlog.technologies || []}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, blog: rows[0] });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedBlog = await request.json();

    if (!updatedBlog.id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const { rows } = await sql`
      UPDATE blogs 
      SET 
        title = ${updatedBlog.title},
        description = ${updatedBlog.description},
        category = ${updatedBlog.category},
        excerpt = ${updatedBlog.excerpt},
        content = ${updatedBlog.content},
        image = ${updatedBlog.image},
        date = ${updatedBlog.date},
        allow_comments = ${updatedBlog.allow_comments},
        comments = ${JSON.stringify(updatedBlog.comments)},
        emoji_reactions = ${JSON.stringify(updatedBlog.emoji_reactions)},
        technologies = ${updatedBlog.technologies}
      WHERE id = ${updatedBlog.id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: rows[0] });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { rowCount } = await sql`DELETE FROM blogs WHERE id = ${id}`;

    if (rowCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}


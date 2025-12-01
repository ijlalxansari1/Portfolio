import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM certifications ORDER BY id ASC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error reading certifications:", error);
    return NextResponse.json({ error: "Failed to read certifications" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newCert = await request.json();

    const { rows } = await sql`
      INSERT INTO certifications (
        title, issuer, date, image, credential_url, description, skills
      )
      VALUES (
        ${newCert.title}, 
        ${newCert.issuer}, 
        ${newCert.date}, 
        ${newCert.image}, 
        ${newCert.credential_url}, 
        ${newCert.description}, 
        ${newCert.skills || []}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, certification: rows[0] });
  } catch (error) {
    console.error("Error saving certification:", error);
    return NextResponse.json({ error: "Failed to save certification" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedCert = await request.json();

    if (!updatedCert.id) {
      return NextResponse.json({ error: "Certification ID is required" }, { status: 400 });
    }

    const { rows } = await sql`
      UPDATE certifications 
      SET 
        title = ${updatedCert.title},
        issuer = ${updatedCert.issuer},
        date = ${updatedCert.date},
        image = ${updatedCert.image},
        credential_url = ${updatedCert.credential_url},
        description = ${updatedCert.description},
        skills = ${updatedCert.skills}
      WHERE id = ${updatedCert.id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, certification: rows[0] });
  } catch (error) {
    console.error("Error updating certification:", error);
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { rowCount } = await sql`DELETE FROM certifications WHERE id = ${id}`;

    if (rowCount === 0) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}


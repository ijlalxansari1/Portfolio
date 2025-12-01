import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM emails ORDER BY date DESC`;

    // Normalize data to match frontend expectations (camelCase)
    const normalizedData = rows.map((email) => ({
      ...email,
      serviceType: email.service_type,
    }));

    return NextResponse.json(normalizedData);
  } catch (error) {
    console.error("Error reading emails:", error);
    return NextResponse.json({ error: "Failed to read emails" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newEmail = await request.json();

    const { rows } = await sql`
      INSERT INTO emails (name, email, service_type, message, date, status)
      VALUES (
        ${newEmail.name}, 
        ${newEmail.email}, 
        ${newEmail.serviceType || "Not specified"}, 
        ${newEmail.message}, 
        ${new Date().toISOString()}, 
        'unread'
      )
      RETURNING *
    `;

    // Map back to camelCase for response
    const savedEmail = {
      ...rows[0],
      serviceType: rows[0].service_type
    };

    return NextResponse.json({ success: true, email: savedEmail });
  } catch (error) {
    console.error("Error saving email:", error);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const { rowCount } = await sql`DELETE FROM emails WHERE id = ${id}`;

    if (rowCount === 0) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json({ error: "Failed to delete email" }, { status: 500 });
  }
}


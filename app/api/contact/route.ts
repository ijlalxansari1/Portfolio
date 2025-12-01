import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, serviceType } = body;

    if (!name || !email || !message || !serviceType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Insert into Vercel Postgres
    await sql`
      INSERT INTO emails (name, email, service_type, message, date, status)
      VALUES (
        ${name}, 
        ${email}, 
        ${serviceType}, 
        ${message}, 
        ${new Date().toISOString()}, 
        'unread'
      )
    `;

    return NextResponse.json(
      { success: true, message: "Email submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting email:", error);
    return NextResponse.json(
      { error: "Failed to submit email" },
      { status: 500 }
    );
  }
}


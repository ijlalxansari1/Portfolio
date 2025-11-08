import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

    // Read existing emails
    const emailsPath = path.join(process.cwd(), "app/api/data/emails.json");
    let emails = [];
    
    if (fs.existsSync(emailsPath)) {
      const fileContent = fs.readFileSync(emailsPath, "utf-8");
      emails = JSON.parse(fileContent);
    }

    // Generate ID (find max ID + 1)
    const maxId = emails.length > 0 ? Math.max(...emails.map((e: any) => e.id || 0)) : 0;

    // Add new email with all form details
    const newEmail = {
      id: maxId + 1,
      name,
      email,
      serviceType,
      message,
      date: new Date().toISOString(),
    };

    emails.push(newEmail);

    // Write back to file
    fs.writeFileSync(emailsPath, JSON.stringify(emails, null, 2));

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


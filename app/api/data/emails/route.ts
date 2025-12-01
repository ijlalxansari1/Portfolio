import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "emails.json");

export async function GET() {
  try {
    const fileContents = await readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    // Ensure all emails have required fields
    const normalizedData = Array.isArray(data) ? data.map((email: any) => ({
      ...email,
      serviceType: email.serviceType || "Not specified",
      email: email.email || "",
      name: email.name || "Unknown",
      message: email.message || "",
      date: email.date || new Date().toISOString()
    })) : [];
    return NextResponse.json(normalizedData);
  } catch (error: any) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return NextResponse.json([]);
    }
    console.error("Error reading emails:", error);
    return NextResponse.json({ error: "Failed to read emails" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const fileContents = await readFile(filePath, "utf8");
    const emails = JSON.parse(fileContents);

    const filteredEmails = emails.filter((e: any) => e.id !== id);
    
    if (filteredEmails.length === emails.length) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    await writeFile(filePath, JSON.stringify(filteredEmails, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: "No emails file found" }, { status: 404 });
    }
    console.error("Error deleting email:", error);
    return NextResponse.json({ error: "Failed to delete email" }, { status: 500 });
  }
}


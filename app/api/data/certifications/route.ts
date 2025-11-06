import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "certifications.json");

export async function GET() {
  try {
    const fileContents = await readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading certifications:", error);
    return NextResponse.json({ error: "Failed to read certifications" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newCert = await request.json();
    const fileContents = await readFile(filePath, "utf8");
    const certifications = JSON.parse(fileContents);

    // Generate ID if not provided
    if (!newCert.id) {
      newCert.id = certifications.length > 0 ? Math.max(...certifications.map((c: any) => c.id)) + 1 : 1;
    }

    certifications.push(newCert);
    await writeFile(filePath, JSON.stringify(certifications, null, 2), "utf8");

    return NextResponse.json({ success: true, certification: newCert });
  } catch (error) {
    console.error("Error saving certification:", error);
    return NextResponse.json({ error: "Failed to save certification" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedCert = await request.json();
    const fileContents = await readFile(filePath, "utf8");
    const certifications = JSON.parse(fileContents);

    const index = certifications.findIndex((c: any) => c.id === updatedCert.id);
    if (index === -1) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    certifications[index] = updatedCert;
    await writeFile(filePath, JSON.stringify(certifications, null, 2), "utf8");

    return NextResponse.json({ success: true, certification: updatedCert });
  } catch (error) {
    console.error("Error updating certification:", error);
    return NextResponse.json({ error: "Failed to update certification" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    const fileContents = await readFile(filePath, "utf8");
    const certifications = JSON.parse(fileContents);

    const filteredCerts = certifications.filter((c: any) => c.id !== id);
    await writeFile(filePath, JSON.stringify(filteredCerts, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting certification:", error);
    return NextResponse.json({ error: "Failed to delete certification" }, { status: 500 });
  }
}


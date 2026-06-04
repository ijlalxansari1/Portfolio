import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { verifyAuth } from "@/app/utils/auth";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export async function POST(request: NextRequest) {
  // SECURITY: Verify session token
  const isAuth = await verifyAuth(request);
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // SECURITY: Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (Max 50MB)" }, { status: 400 });
    }

    // SECURITY: Validate file type
    const isValidType = file.type.startsWith("image/") || 
                        file.type === "application/pdf" || 
                        file.type.startsWith("video/") || 
                        file.type.startsWith("audio/");
                        
    if (!isValidType) {
      return NextResponse.json({ error: "Invalid file type. Only media files and PDFs allowed." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}-${originalName}`;

    // Determine upload directory based on type
    const type = formData.get("type") as string || "projects";
    const uploadDir = join(process.cwd(), "public", type);

    // Save file
    const filepath = join(uploadDir, filename);
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filepath, buffer);

    // Return file URL
    const fileUrl = `/${type}/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: fileUrl,
      filename: filename 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}


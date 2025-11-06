import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "blogs.json");

export async function GET() {
  try {
    const fileContents = await readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading blogs:", error);
    return NextResponse.json({ error: "Failed to read blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newBlog = await request.json();
    const fileContents = await readFile(filePath, "utf8");
    const blogs = JSON.parse(fileContents);

    // Generate ID if not provided
    if (!newBlog.id) {
      newBlog.id = blogs.length > 0 ? Math.max(...blogs.map((b: any) => b.id)) + 1 : 1;
    }

    blogs.push(newBlog);
    await writeFile(filePath, JSON.stringify(blogs, null, 2), "utf8");

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedBlog = await request.json();
    const fileContents = await readFile(filePath, "utf8");
    const blogs = JSON.parse(fileContents);

    const index = blogs.findIndex((b: any) => b.id === updatedBlog.id);
    if (index === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    blogs[index] = updatedBlog;
    await writeFile(filePath, JSON.stringify(blogs, null, 2), "utf8");

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    const fileContents = await readFile(filePath, "utf8");
    const blogs = JSON.parse(fileContents);

    const filteredBlogs = blogs.filter((b: any) => b.id !== id);
    await writeFile(filePath, JSON.stringify(filteredBlogs, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}


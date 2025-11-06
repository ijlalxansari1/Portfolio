import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "app", "api", "data", "projects.json");

export async function GET() {
  try {
    const fileContents = await readFile(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProject = await request.json();
    const fileContents = await readFile(filePath, "utf8");
    const projects = JSON.parse(fileContents);

    // Generate ID if not provided
    if (!newProject.id) {
      newProject.id = projects.length > 0 ? Math.max(...projects.map((p: any) => p.id)) + 1 : 1;
    }

    projects.push(newProject);
    await writeFile(filePath, JSON.stringify(projects, null, 2), "utf8");

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error("Error saving project:", error);
    return NextResponse.json({ error: "Failed to save project" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedProject = await request.json();
    const fileContents = await readFile(filePath, "utf8");
    const projects = JSON.parse(fileContents);

    const index = projects.findIndex((p: any) => p.id === updatedProject.id);
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[index] = updatedProject;
    await writeFile(filePath, JSON.stringify(projects, null, 2), "utf8");

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    const fileContents = await readFile(filePath, "utf8");
    const projects = JSON.parse(fileContents);

    const filteredProjects = projects.filter((p: any) => p.id !== id);
    await writeFile(filePath, JSON.stringify(filteredProjects, null, 2), "utf8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}


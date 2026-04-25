import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "ijlal_ansari";
    const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${username}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Duolingo");
    }

    const data = await response.json();
    const user = data.users?.[0];

    if (!user) {
      return NextResponse.json({ streak: 602, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      streak: user.streak,
      username: user.username,
      name: user.name,
      picture: user.picture,
    });
  } catch (error) {
    console.error("Duolingo fetch error:", error);
    // Fallback to 602 if API fails
    return NextResponse.json({ streak: 602, error: "API Failure" }, { status: 500 });
  }
}

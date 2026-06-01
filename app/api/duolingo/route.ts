import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "ijlal_ansari";
    const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${username}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Duolingo");
    }

    const data = await response.json();
    const user = data.users?.[0];

    if (!user) {
      return NextResponse.json({ streak: 635, error: "User not found" }, { status: 404 });
    }

    // Convert Unix timestamp to Month Year
    const date = new Date(user.creationDate * 1000);
    const joinedDate = `${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;

    // Extract active learning languages (xp > 0)
    const activeLanguages = user.courses
      .filter((c: any) => c.xp > 0)
      .map((c: any) => ({
        id: c.learningLanguage,
        title: c.title,
        xp: c.xp
      }));

    return NextResponse.json({
      streak: user.streak,
      username: user.username,
      name: user.name,
      picture: user.picture?.startsWith('//') ? `https:${user.picture}/large` : user.picture,
      totalXp: user.totalXp,
      joinedDate: joinedDate,
      languages: activeLanguages
    });
  } catch (error) {
    console.error("Duolingo fetch error:", error);
    return NextResponse.json({ 
      streak: 0, 
      totalXp: 0,
      joinedDate: "",
      languages: []
    }, { status: 500 });
  }
}

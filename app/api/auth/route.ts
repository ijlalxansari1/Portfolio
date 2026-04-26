import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // In a real production app, use process.env.ADMIN_USER and process.env.ADMIN_PASS
  // For this portfolio, we'll use a slightly safer server-side check than client-side hardcoding
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "ijlal2025";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    // Generate a simple token (in production, use JWT with a secret)
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}

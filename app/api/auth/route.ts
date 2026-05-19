import { NextResponse } from 'next/server';
import { signToken } from '../../utils/auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const ADMIN_USER = process.env.ADMIN_USER || "admin";
  const ADMIN_PASS = process.env.ADMIN_PASS || "ijlal2025";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = signToken(username);
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}

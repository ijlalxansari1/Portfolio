import { NextResponse } from 'next/server';
import { loginAdmin } from '../../utils/auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ success: false, error: "Username and password are required." }, { status: 400 });
  }

  const token = await loginAdmin(username, password);

  if (token) {
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}

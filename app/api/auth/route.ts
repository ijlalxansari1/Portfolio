import { NextResponse } from 'next/server';
import { loginAdmin } from '../../utils/auth';

export async function POST(request: Request) {
  const { pin } = await request.json();

  if (!pin) {
    return NextResponse.json({ success: false, error: "PIN code is required." }, { status: 400 });
  }

  const token = await loginAdmin(pin);

  if (token) {
    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json({ success: false, error: "Invalid PIN code" }, { status: 401 });
}

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    await sql`UPDATE admins SET password_hash = ${hash}`;
    return NextResponse.json({ success: true, message: "Admin password forcibly reset to 123456 on LIVE DB" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

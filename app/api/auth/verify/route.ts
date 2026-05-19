import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '@/app/utils/auth';

export async function GET(request: NextRequest) {
  const isValid = await verifyAuth(request);
  if (isValid) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
}

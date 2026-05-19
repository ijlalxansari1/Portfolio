import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '../../../utils/auth';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyAuth(request);
  if (!isAuthorized) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const logsPath = path.join(process.cwd(), 'app', 'api', 'data', 'logs.json');
  let logs = [];
  try {
    if (fs.existsSync(logsPath)) {
      logs = JSON.parse(fs.readFileSync(logsPath, 'utf8'));
    }
  } catch (error) {
    console.error("Error reading logs:", error);
  }

  return NextResponse.json({ success: true, logs });
}

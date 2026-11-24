import { NextResponse, NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { verifyAuth } from '../../../utils/auth';
import fs from 'fs';
import path from 'path';
import { getStoreData, STORE_FILE } from '../../../utils/adminStore';

// Helper to save data
function saveStoreData(data: any) {
  try {
    const dir = path.dirname(STORE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing admin store:", error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  const store = getStoreData();
  
  const all = searchParams.get('all') === 'true';
  
  if (key) {
    return NextResponse.json({ data: store[key] !== undefined ? store[key] : null });
  }
  
  // Omit massive payloads from the default full fetch to save bandwidth
  const lightweightStore = { ...store };
  if (!all) {
    delete lightweightStore['admin-certs'];
  }
  
  return NextResponse.json({ data: lightweightStore });
}

export async function POST(request: NextRequest) {
  // Only admins can write
  const isAuthorized = await verifyAuth(request);
  if (!isAuthorized) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { key, data } = body;
    
    if (!key) {
      return NextResponse.json({ success: false, error: "Missing key" }, { status: 400 });
    }

    const store = getStoreData();
    if (saveStoreData({ ...store, [key]: data })) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}

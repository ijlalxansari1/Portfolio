import { NextResponse, NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
import { verifyAuth } from '../../../utils/auth';
import fs from 'fs';
import path from 'path';

const STORE_FILE = path.join(process.cwd(), 'app', 'api', 'data', 'admin-store.json');

// Helper to get all data
function getStoreData() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error reading admin store:", error);
  }
  return {};
}

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
  
  if (key) {
    return NextResponse.json({ data: store[key] !== undefined ? store[key] : null });
  }
  
  // Omit massive payloads from the default full fetch to save bandwidth
  const lightweightStore = { ...store };
  delete lightweightStore['admin-certs'];
  
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
    store[key] = data;
    
    if (saveStoreData(store)) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}

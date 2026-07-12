import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const STORE_FILE = path.join(process.cwd(), 'app', 'api', 'data', 'admin-store.json');

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

export async function POST(request: NextRequest) {
  try {
    // Expected payload: { title, issuer, date, credentialId, verificationUrl }
    const payload = await request.json();
    const { title, issuer, date, credentialId, verificationUrl, image } = payload;
    
    if (!title || !issuer) {
      return NextResponse.json({ success: false, error: "Missing required fields: title, issuer" }, { status: 400 });
    }

    const store = getStoreData();
    const certs = store['admin-certs'] || [];
    
    const newCert = {
      id: Date.now(),
      title,
      issuer,
      date: date || new Date().toISOString().split('T')[0],
      credentialId: credentialId || "",
      image: image || "",
      verificationUrl: verificationUrl || "",
      status: "Active"
    };
    
    // Add to the top
    store['admin-certs'] = [newCert, ...certs];
    
    if (saveStoreData(store)) {
      return NextResponse.json({ success: true, certification: newCert });
    } else {
      return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
  }
}

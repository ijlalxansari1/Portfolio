import { NextResponse, NextRequest } from 'next/server';
import { verifyAuth } from '../../../utils/auth';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');
  
  try {
    if (key) {
      const { rows } = await sql`SELECT value FROM site_data WHERE key = ${key}`;
      if (rows.length > 0) {
        return NextResponse.json({ data: rows[0].value });
      }
      return NextResponse.json({ data: null });
    }
    
    // Get all data
    const { rows } = await sql`SELECT key, value FROM site_data`;
    const store: any = {};
    rows.forEach(r => {
      store[r.key] = r.value;
    });
    return NextResponse.json({ data: store });
  } catch (error) {
    console.error("Error fetching site_data:", error);
    return NextResponse.json({ data: {} });
  }
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

    // Upsert the data in Postgres
    await sql`
      INSERT INTO site_data (key, value) 
      VALUES (${key}, ${JSON.stringify(data)})
      ON CONFLICT (key) 
      DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving site_data:", error);
    return NextResponse.json({ success: false, error: "Invalid request or DB error" }, { status: 500 });
  }
}

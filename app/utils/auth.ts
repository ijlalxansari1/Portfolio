import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Validate credentials and return a secure session token
export async function loginAdmin(pinAttempt: string): Promise<string | null> {
  const trimmedPin = pinAttempt.trim();

  try {
    // We assume there's one primary admin account, typically named 'admin'
    const { rows } = await sql`
      SELECT id, password_hash FROM admins
      ORDER BY created_at ASC LIMIT 1
    `;

    if (rows.length === 0) {
      const defaultUser = process.env.ADMIN_USER?.trim() || 'admin';
      const defaultPin = process.env.ADMIN_SECRET?.trim() || '123456';

      const hash = await bcrypt.hash(defaultPin, 10);

      await sql`
        INSERT INTO admins (username, password_hash)
        VALUES (${defaultUser}, ${hash})
      `;

      if (defaultPin === trimmedPin) {
        return await loginAdmin(trimmedPin);
      }
      return null;
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(trimmedPin, admin.password_hash);
    if (!isMatch) return null;

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    await sql`
      INSERT INTO admin_sessions (admin_id, token, expires_at)
      VALUES (${admin.id}, ${token}, ${expiresAt.toISOString()})
    `;

    await sql`
      UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ${admin.id}
    `;

    return token;
  } catch (err) {
    console.error("Login Error:", err);
    return null;
  }
}

// Ensure the token from the request is valid and unexpired in the DB
export async function verifyAuth(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  if (!token) return false;

  try {
    const { rows } = await sql`
      SELECT id FROM admin_sessions 
      WHERE token = ${token} AND expires_at > CURRENT_TIMESTAMP
    `;
    
    if (rows.length === 0) return false;
    
    return true;
  } catch (err) {
    console.error("Auth Verify Error:", err);
    return false;
  }
}

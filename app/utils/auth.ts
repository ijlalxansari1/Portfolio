import { NextRequest } from "next/server";
import crypto from "crypto";

const SECRET = process.env.ADMIN_SECRET || "aether_super_secret_key_2025";

export function signToken(username: string): string {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

export async function verifyAuth(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [username, timestamp, signature] = decoded.split(':');
    
    if (!username || !timestamp || !signature) return false;
    
    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    if (username !== ADMIN_USER) return false;
    
    // Verify expiration (24 hours)
    const tokenTime = parseInt(timestamp);
    if (Date.now() - tokenTime > 24 * 60 * 60 * 1000) return false;
    
    // Cryptographically verify signature
    const expectedPayload = `${username}:${timestamp}`;
    const expectedSignature = crypto.createHmac('sha256', SECRET).update(expectedPayload).digest('hex');
    
    // Prevent timing attacks using crypto.timingSafeEqual
    if (signature.length !== expectedSignature.length) return false;
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch (err) {
    return false;
  }
}

import { NextRequest } from "next/server";

/**
 * Verifies if the request is authorized by checking the Authorization header.
 * For this implementation, we check if the token starts with the expected base64 format.
 * In a production environment with multiple users, use JWT (jsonwebtoken library).
 */
export async function verifyAuth(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  if (!token) return false;

  try {
    // Decrypt the simple base64 token (username:timestamp)
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [username, timestamp] = decoded.split(':');
    
    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    
    // Check if username matches and timestamp is within a reasonable range (e.g., 24 hours)
    // For a portfolio, we just check the username for simplicity, but in production, 
    // you'd verify a signature or check against a session DB.
    if (username === ADMIN_USER) {
      // Basic expiration check (24 hours)
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      if (now - tokenTime < 24 * 60 * 60 * 1000) {
        return true;
      }
    }
  } catch (err) {
    return false;
  }

  return false;
}

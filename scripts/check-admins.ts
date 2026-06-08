import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verify() {
  const { rows } = await sql`SELECT id, username, role, created_at FROM admins`;
  console.log("Admins in Database:", rows);
  process.exit(0);
}
verify();

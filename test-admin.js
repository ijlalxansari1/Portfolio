require('dotenv').config({path: '.env.local'});
const { sql } = require('@vercel/postgres');

async function test() {
  const { rows } = await sql`SELECT id, username, password_hash, created_at FROM admins`;
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}

test().catch(console.error);

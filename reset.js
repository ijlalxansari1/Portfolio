require('dotenv').config({path: '.env.local'});
const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function reset() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('123456', salt);
  await sql`UPDATE admins SET password_hash = ${hash}`;
  console.log('Admin password reset to 123456');
  process.exit(0);
}

reset().catch(console.error);

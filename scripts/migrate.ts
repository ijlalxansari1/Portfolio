import { sql } from '@vercel/postgres';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

async function main() {
  const data = JSON.parse(fs.readFileSync('app/api/data/admin-store.json', 'utf8'));
  for (const [key, value] of Object.entries(data)) {
    await sql.query('INSERT INTO site_data (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value', [key, JSON.stringify(value)]);
  }
  console.log('Migration complete');
}

main();
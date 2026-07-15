require('dotenv').config({path: '.env.local'});
const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    console.log("Connecting to Postgres to backup data...");
    const { rows } = await sql`SELECT key, value FROM site_data`;
    const store = {};
    rows.forEach(r => {
      store[r.key] = r.value;
    });
    
    const storePath = path.join(process.cwd(), 'app', 'api', 'data', 'admin-store.json');
    fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
    console.log(`Successfully backed up ${rows.length} records to admin-store.json`);
  } catch (e) {
    console.error("Backup failed:", e);
  }
}
run();

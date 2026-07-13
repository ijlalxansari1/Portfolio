require('dotenv').config({path: '.env.local'});
const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("Fetching site data...");
  const res = await sql`SELECT * FROM site_data`;
  for (const row of res.rows) {
    let changed = false;
    const data = row.value;
    
    // We expect data to be an array for most things
    if (Array.isArray(data)) {
      for (let item of data) {
        // Check for image/flag/logo fields
        const fields = ['image', 'flag', 'logo'];
        for (const field of fields) {
          if (item[field] && typeof item[field] === 'string' && item[field].startsWith('/')) {
            const localPath = path.join(process.cwd(), 'public', item[field]);
            if (fs.existsSync(localPath)) {
              console.log(`Found local file for ${item[field]}, converting to base64...`);
              const buffer = fs.readFileSync(localPath);
              const ext = path.extname(localPath).substring(1);
              const mime = ext === 'jpg' ? 'jpeg' : ext === 'svg' ? 'svg+xml' : ext;
              const base64Str = `data:image/${mime};base64,${buffer.toString("base64")}`;
              item[field] = base64Str;
              changed = true;
            } else {
              console.log(`Local file NOT found for ${item[field]}`);
            }
          }
        }
      }
    }
    
    if (changed) {
      console.log(`Updating ${row.key} in database...`);
      await sql`UPDATE site_data SET value = ${JSON.stringify(data)} WHERE key = ${row.key}`;
    }
  }
  console.log("Done!");
}

main().catch(console.error);

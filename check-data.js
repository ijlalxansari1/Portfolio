require('dotenv').config({path: '.env.local'});
const { sql } = require('@vercel/postgres');

async function check() {
  const { rows } = await sql`SELECT key, value FROM site_data`;
  const result = rows.map(r => {
    let images = [];
    if (Array.isArray(r.value)) {
      images = r.value.map(item => item.image || item.flag || item.logo).filter(Boolean);
    }
    return { key: r.key, images: images.map(i => i.substring(0, 50) + (i.length > 50 ? '...' : '')) };
  });
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}
check().catch(console.error);

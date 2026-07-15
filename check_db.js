require('dotenv').config({path: '.env.local'});
const { sql } = require('@vercel/postgres');

async function run() {
  try {
    const res = await sql`SELECT key, LENGTH(value::text) as size FROM site_data`;
    let total = 0;
    res.rows.forEach(r => {
      console.log(r.key, r.size);
      total += r.size;
    });
    console.log("Total DB Size in bytes:", total);
  } catch (e) {
    console.error("DB ERROR:", e);
  }
}
run();

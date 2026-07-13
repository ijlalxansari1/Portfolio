const { sql } = require('@vercel/postgres');
require('dotenv').config({path: '.env.local'});

async function run() {
  const res = await sql`SELECT value FROM site_data WHERE key = 'admin-core-stack'`;
  if (res.rows.length > 0) {
    let data = typeof res.rows[0].value === 'string' ? JSON.parse(res.rows[0].value) : res.rows[0].value;
    data.forEach(d => {
      if(d.name === 'Dagster') d.icon = 'https://cdn.simpleicons.org/dagster/white';
      if(d.name === 'Power BI') d.icon = 'https://cdn.simpleicons.org/powerbi/white';
    });
    await sql`UPDATE site_data SET value = ${JSON.stringify(data)} WHERE key = 'admin-core-stack'`;
    console.log('Fixed DB');
  } else {
    console.log('No admin-core-stack found in DB. Good, it will use defaults.');
  }
}

run().catch(console.error);

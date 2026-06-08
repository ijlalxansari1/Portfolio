import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function setupAdminDatabase() {
  console.log('🗄️  Setting up Vercel Postgres database for Admin module...\n');

  try {
    // Create admins table
    console.log('Creating admins table...');
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Admins table created\n');

    // Create admin_sessions table
    console.log('Creating admin_sessions table...');
    await sql`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Admin Sessions table created\n');

    // Check if an admin user already exists
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPassword = process.env.ADMIN_SECRET || 'changeme123';

    console.log(`Checking if admin user '${adminUser}' exists...`);
    const { rowCount } = await sql`SELECT 1 FROM admins WHERE username = ${adminUser}`;

    if (rowCount === 0) {
      console.log(`Admin user '${adminUser}' not found. Creating default admin...`);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(adminPassword, salt);
      
      await sql`
        INSERT INTO admins (username, password_hash)
        VALUES (${adminUser}, ${hash})
      `;
      console.log('✅ Default admin user created (password hashed securely)\n');
    } else {
      console.log(`✅ Admin user '${adminUser}' already exists. Skipping creation.\n`);
    }

    console.log('🎉 Admin Database setup complete!');

  } catch (error) {
    console.error('❌ Error setting up admin database:', error);
    throw error;
  }
}

setupAdminDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

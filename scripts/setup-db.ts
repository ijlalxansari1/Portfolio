import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function setupDatabase() {
  console.log('🗄️  Setting up Vercel Postgres database...\n');

  try {
    // Create projects table
    console.log('Creating projects table...');
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        technologies TEXT[],
        image TEXT,
        date TIMESTAMP,
        status TEXT,
        github_url TEXT,
        demo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Projects table created\n');

    // Create blogs table
    console.log('Creating blogs table...');
    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        excerpt TEXT,
        content TEXT,
        image TEXT,
        date TIMESTAMP,
        allow_comments BOOLEAN DEFAULT true,
        comments JSONB DEFAULT '[]',
        emoji_reactions JSONB DEFAULT '{}',
        technologies TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Blogs table created\n');

    // Create certifications table
    console.log('Creating certifications table...');
    await sql`
      CREATE TABLE IF NOT EXISTS certifications (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        issuer TEXT,
        date TIMESTAMP,
        image TEXT,
        credential_url TEXT,
        description TEXT,
        skills TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Certifications table created\n');

    // Create emails table
    console.log('Creating emails table...');
    await sql`
      CREATE TABLE IF NOT EXISTS emails (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        service_type TEXT,
        message TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Emails table created\n');

    // Create categories table
    console.log('Creating categories table...');
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(type, name)
      )
    `;
    console.log('✅ Categories table created\n');

    console.log('🎉 Database setup complete!');
    console.log('\n📊 Created tables:');
    console.log('   - projects');
    console.log('   - blogs');
    console.log('   - certifications');
    console.log('   - emails');
    console.log('   - categories');
    console.log('\n✅ Ready to migrate data! Run: npm run migrate:data');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

setupDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

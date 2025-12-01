import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const DATA_DIR = path.join(process.cwd(), 'app', 'api', 'data');

async function migrateData() {
    console.log('🚀 Starting data migration...\n');

    try {
        // 1. Migrate Projects
        console.log('📦 Migrating Projects...');
        try {
            const projectsPath = path.join(DATA_DIR, 'projects.json');
            const projectsData = await fs.readFile(projectsPath, 'utf8');
            const projects = JSON.parse(projectsData);

            if (projects.length > 0) {
                // Clear existing data to avoid duplicates
                await sql`TRUNCATE TABLE projects RESTART IDENTITY`;

                for (const p of projects) {
                    await sql`
            INSERT INTO projects (title, description, category, technologies, image, date, status, github_url, demo_url)
            VALUES (
              ${p.title}, ${p.description}, ${p.category}, ${p.technologies}, 
              ${p.image}, ${p.date}, ${p.status}, ${p.github_url}, ${p.demo_url}
            )
          `;
                }
                console.log(`✅ Migrated ${projects.length} projects`);
            } else {
                console.log('ℹ️ No projects to migrate');
            }
        } catch (e: any) {
            if (e.code === 'ENOENT') console.log('ℹ️ No projects.json found');
            else console.error('❌ Error migrating projects:', e);
        }

        // 2. Migrate Blogs
        console.log('\n📝 Migrating Blogs...');
        try {
            const blogsPath = path.join(DATA_DIR, 'blogs.json');
            const blogsData = await fs.readFile(blogsPath, 'utf8');
            const blogs = JSON.parse(blogsData);

            if (blogs.length > 0) {
                await sql`TRUNCATE TABLE blogs RESTART IDENTITY`;

                for (const b of blogs) {
                    await sql`
            INSERT INTO blogs (
              title, description, category, excerpt, content, image, date, 
              allow_comments, comments, emoji_reactions, technologies
            )
            VALUES (
              ${b.title}, ${b.description}, ${b.category}, ${b.excerpt}, ${b.content}, 
              ${b.image}, ${b.date}, ${b.allow_comments ?? true}, 
              ${JSON.stringify(b.comments || [])}, 
              ${JSON.stringify(b.emoji_reactions || {})}, 
              ${b.technologies || []}
            )
          `;
                }
                console.log(`✅ Migrated ${blogs.length} blogs`);
            } else {
                console.log('ℹ️ No blogs to migrate');
            }
        } catch (e: any) {
            if (e.code === 'ENOENT') console.log('ℹ️ No blogs.json found');
            else console.error('❌ Error migrating blogs:', e);
        }

        // 3. Migrate Certifications
        console.log('\n🎓 Migrating Certifications...');
        try {
            const certsPath = path.join(DATA_DIR, 'certifications.json');
            const certsData = await fs.readFile(certsPath, 'utf8');
            const certs = JSON.parse(certsData);

            if (certs.length > 0) {
                await sql`TRUNCATE TABLE certifications RESTART IDENTITY`;

                for (const c of certs) {
                    await sql`
            INSERT INTO certifications (
              title, issuer, date, image, credential_url, description, skills
            )
            VALUES (
              ${c.title}, ${c.issuer}, ${c.date}, ${c.image}, 
              ${c.credential_url}, ${c.description}, ${c.skills || []}
            )
          `;
                }
                console.log(`✅ Migrated ${certs.length} certifications`);
            } else {
                console.log('ℹ️ No certifications to migrate');
            }
        } catch (e: any) {
            if (e.code === 'ENOENT') console.log('ℹ️ No certifications.json found');
            else console.error('❌ Error migrating certifications:', e);
        }

        // 4. Migrate Emails
        console.log('\n📧 Migrating Emails...');
        try {
            const emailsPath = path.join(DATA_DIR, 'emails.json');
            const emailsData = await fs.readFile(emailsPath, 'utf8');
            const emails = JSON.parse(emailsData);

            if (emails.length > 0) {
                await sql`TRUNCATE TABLE emails RESTART IDENTITY`;

                for (const e of emails) {
                    await sql`
            INSERT INTO emails (name, email, service_type, message, date, status)
            VALUES (
              ${e.name}, ${e.email}, ${e.serviceType || "Not specified"}, 
              ${e.message}, ${e.date}, ${e.status || 'unread'}
            )
          `;
                }
                console.log(`✅ Migrated ${emails.length} emails`);
            } else {
                console.log('ℹ️ No emails to migrate');
            }
        } catch (e: any) {
            if (e.code === 'ENOENT') console.log('ℹ️ No emails.json found');
            else console.error('❌ Error migrating emails:', e);
        }

        // 5. Migrate Categories
        console.log('\n🏷️ Migrating Categories...');
        try {
            const catsPath = path.join(DATA_DIR, 'categories.json');
            const catsData = await fs.readFile(catsPath, 'utf8');
            const cats = JSON.parse(catsData);

            // We don't truncate categories, just insert missing ones
            let count = 0;

            // Migrate project categories
            if (cats.projects) {
                for (const name of cats.projects) {
                    try {
                        await sql`
              INSERT INTO categories (type, name) VALUES ('projects', ${name})
              ON CONFLICT (type, name) DO NOTHING
            `;
                        count++;
                    } catch { }
                }
            }

            // Migrate blog categories
            if (cats.blogs) {
                for (const name of cats.blogs) {
                    try {
                        await sql`
              INSERT INTO categories (type, name) VALUES ('blogs', ${name})
              ON CONFLICT (type, name) DO NOTHING
            `;
                        count++;
                    } catch { }
                }
            }
            console.log(`✅ Migrated categories`);
        } catch (e: any) {
            if (e.code === 'ENOENT') console.log('ℹ️ No categories.json found');
            else console.error('❌ Error migrating categories:', e);
        }

        console.log('\n🎉 Data migration complete!');

    } catch (error) {
        console.error('❌ Fatal error during migration:', error);
        process.exit(1);
    }
}

migrateData()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

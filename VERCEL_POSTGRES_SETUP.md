# 🗄️ Vercel Postgres Setup Guide

## 📋 **Quick Setup (Follow These Steps):**

### **Part 1: Enable Postgres in Vercel Dashboard**

1. **Go to your Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard
   - Select your portfolio project

2. **Go to Storage Tab**:
   - Click "Storage" in the top menu
   - Click "Create Database"
   - Select "Postgres"
   - Choose region closest to you
   - Click "Create"

3. **Connect to Project**:
   - After creation, click "Connect Project"
   - Select your portfolio project
   - Click "Connect"
   - This will auto-add environment variables

4. **Get Connection String** (for local development):
   - In the database page, click ".env.local" tab
   - Copy all the variables shown
   - Add them to your local `.env.local` file

---

### **Part 2: Run Database Migration**

After setting up in Vercel:

1. **Copy the environment variables** to `.env.local`:
```env
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

2. **Run the migration script**:
```bash
npm run setup:db
```

This will create all necessary tables.

---

### **Part 3: Migrate Your Existing Data**

Run this to copy your JSON data to Postgres:
```bash
npm run migrate:data
```

---

## 📊 **Database Schema**

The migration creates these tables:

### **1. projects**
- id (serial, primary key)
- title (text)
- description (text)
- category (text)
- technologies (text[])
- image (text)
- date (timestamp)
- status (text)
- github_url (text)
- demo_url (text)
- created_at (timestamp)

### **2. blogs**
- id (serial, primary key)
- title (text)
- description (text)
- category (text)
- excerpt (text)
- content (text)
- image (text)
- date (timestamp)
- allow_comments (boolean)
- comments (jsonb)
- emoji_reactions (jsonb)
- technologies (text[])
- created_at (timestamp)

### **3. certifications**
- id (serial, primary key)
- title (text)
- issuer (text)
- date (timestamp)
- image (text)
- credential_url (text)
- description (text)
- skills (text[])
- created_at (timestamp)

### **4. emails**
- id (serial, primary key)
- name (text)
- email (text)
- service_type (text)
- message (text)
- date (timestamp)
- status (text, default 'unread')
- created_at (timestamp)

### **5. categories**
- id (serial, primary key)
- type (text) -- 'projects' or 'blogs'
- name (text)
- created_at (timestamp)
- UNIQUE constraint on (type, name)

---

## 🚀 **After Setup:**

1. ✅ Database is created in Vercel
2. ✅ Tables are created
3. ✅ Data is migrated
4. ✅ Deploy to Vercel

**Then your portfolio will work perfectly in production!**

---

## 🔧 **Troubleshooting:**

**Can't connect locally?**
- Make sure you copied ALL environment variables to `.env.local`
- Restart your dev server: `npm run dev`

**Migration fails?**
- Check that environment variables are correct
- Make sure Vercel Postgres is fully provisioned (takes ~1 minute)

**Data not showing?**
- Run `npm run migrate:data` again
- Check Vercel dashboard → Data tab to see if tables have data

---

## 📝 **Next Steps:**

Once you've completed the Vercel dashboard setup (Part 1):

1. Copy environment variables to `.env.local`
2. I'll create the migration scripts
3. Run migrations
4. Deploy!

**Let me know when you've completed Part 1** (creating the database in Vercel dashboard)!

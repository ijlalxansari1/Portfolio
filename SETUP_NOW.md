# 🚀 Quick Start: Vercel Postgres Setup

## ✅ **What's Been Installed:**
- `@vercel/postgres` - Database client
- `tsx` - TypeScript execution
- Setup scripts created

---

## 📝 **YOUR ACTION REQUIRED:**

### **Step 1: Create Database in Vercel** (5 minutes)

1. Go to: https://vercel.com/dashboard
2. Click your portfolio project
3. Click **"Storage"** tab
4. Click **"Create Database"**
5. Select **"Postgres"**
6. Choose your region
7. Click **"Create"**

### **Step 2: Get Environment Variables** (2 minutes)

After database is created:

1. In the database page, find **".env.local"** tab
2. Copy ALL the variables shown
3. Paste them into your local `.env.local` file

It will look like this:
```env
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
POSTGRES_USER="default"
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

### **Step 3: Create Database Tables** (1 minute)

Run this command:
```bash
npm run setup:db
```

You should see:
```
🗄️  Setting up Vercel Postgres database...
✅ Projects table created
✅ Blogs table created
✅ Certifications table created
✅ Emails table created
✅ Categories table created
🎉 Database setup complete!
```

### **Step 4: Restart Dev Server**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## ✅ **After These Steps:**

1. Your database is ready
2. Tables are created
3. Next: I'll create the updated API routes to use Postgres instead of JSON
4. Then: Your portfolio will work perfectly on Vercel!

---

## ❓ **Need Help?**

**Database not connecting?**
- Make sure you copied ALL environment variables
- Check `.env.local` has no typos
- Database takes ~1 minute to provision

**Setup script fails?**
- Wait 1-2 minutes after creating database
- Try again: `npm run setup:db`

---

**👉 Let me know when you've completed Steps 1-3!**

Then I'll update all your API routes to use Postgres.

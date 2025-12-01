# Quick Deploy to Vercel - 5 Minutes

## Fastest Method (GitHub + Vercel)

### 1. Push to GitHub
```bash
cd Portfolio
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your repository
4. **Add Environment Variable:**
   - Name: `GOOGLE_AI_API_KEY`
   - Value: Your Google AI API key
5. Click "Deploy"

### 3. Done! 🎉
Your site is live at `your-project.vercel.app`

---

## Using Vercel CLI

```bash
# Install CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd Portfolio
vercel

# Add environment variable
vercel env add GOOGLE_AI_API_KEY

# Deploy to production
vercel --prod
```

---

## Important: Environment Variables

**Required:**
- `GOOGLE_AI_API_KEY` - For AI features in admin dashboard

**How to get Google AI API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key and add it to Vercel environment variables

---

## Troubleshooting

**Build fails?**
- Check `package.json` has all dependencies
- Fix any TypeScript errors
- Check Vercel build logs

**API not working?**
- Verify `GOOGLE_AI_API_KEY` is set in Vercel
- Check it's added for Production environment

**Need help?**
- Full guide: See `DEPLOYMENT.md`
- Vercel docs: https://vercel.com/docs


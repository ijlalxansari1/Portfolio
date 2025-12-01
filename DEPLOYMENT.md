# Deploying to Vercel - Step by Step Guide

## Prerequisites
- A GitHub account
- A Vercel account (free tier works perfectly)
- Your project code ready

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push Your Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   cd Portfolio
   git init
   git add .
   git commit -m "Initial commit - Portfolio ready for deployment"
   ```

2. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it something like `portfolio` or `data-engineering-portfolio`
   - **Don't** initialize with README, .gitignore, or license

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account (recommended)

2. **Import Your Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: Leave as `./` or set to `Portfolio` if your repo root is different
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables** (Important!):
   Click "Environment Variables" and add:
   ```
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   ```
   - This is needed for the AI features in the admin dashboard
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `your-project-name.vercel.app`

### Step 3: Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain (e.g., `ijlalansari.com`)
4. Follow the DNS configuration instructions

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
cd Portfolio
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (for first deployment)
- Project name? Enter a name or press Enter for default
- Directory? `./` (current directory)
- Override settings? **No**

### Step 4: Set Environment Variables
```bash
vercel env add GOOGLE_AI_API_KEY
```
Enter your API key when prompted.

### Step 5: Deploy to Production
```bash
vercel --prod
```

## Important Notes

### Environment Variables
Make sure to set `GOOGLE_AI_API_KEY` in Vercel:
- Go to Project Settings → Environment Variables
- Add the variable for Production, Preview, and Development

### File Size Limits
- Vercel has a 100MB limit for serverless functions
- Your video file (`bg.mp4`) should be fine if it's under 50MB
- If larger, consider hosting it on a CDN or reducing quality

### Build Settings
Vercel will automatically:
- Detect Next.js
- Run `npm install`
- Run `npm run build`
- Deploy your app

### Troubleshooting

**Build Fails:**
- Check that all dependencies are in `package.json`
- Ensure TypeScript errors are fixed
- Check build logs in Vercel dashboard

**API Routes Not Working:**
- Ensure environment variables are set
- Check that API routes are in `app/api/` directory
- Verify file permissions

**Images/Assets Not Loading:**
- Ensure files are in `public/` directory
- Use `/filename.ext` for public assets (not `/public/filename.ext`)

**Admin Dashboard Issues:**
- Make sure `GOOGLE_AI_API_KEY` is set in environment variables
- Check browser console for errors

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test contact form submission
- [ ] Test admin dashboard login
- [ ] Verify background video plays
- [ ] Check all images load
- [ ] Test on mobile devices
- [ ] Verify environment variables are set
- [ ] Test AI features in admin dashboard

## Updating Your Site

After making changes:
1. Commit and push to GitHub
2. Vercel will automatically redeploy (if connected to GitHub)
3. Or run `vercel --prod` if using CLI

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Vercel Support: https://vercel.com/support


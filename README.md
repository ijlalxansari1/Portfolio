# Poono DataOps Portfolio

A modern, glassmorphic portfolio website inspired by the RyanCV DataOps theme, built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Dark Glassmorphic Design** - Modern dark theme with glassmorphism effects
- 🎬 **Animated Video Background** - Full-page video background with background music
- 📱 **Responsive Design** - Mobile-first approach with collapsible sidebar
- ✨ **Framer Motion Animations** - Smooth animations throughout the site
- 🎯 **Fixed Sidebar** - Desktop sidebar stays fixed while content scrolls
- 🌈 **Neon Accents** - Beautiful neon mint (#00FFB3) and cyan (#4BE1EC) accents
- 🎵 **Background Music** - Ambient background music with mute/unmute control
- 🔐 **Admin Dashboard** - Full admin panel for managing projects, certifications, blogs, and emails

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** (Icons)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your assets to the `public` folder:
   - `bg.mp4` - Your background video
   - `bg-music.mp3` or `bg-music.ogg` - Your background music
   - `profile.png` - Your profile picture
   - `Poono-Resume.pdf` - Your resume PDF
   - Project images in `/public/projects/`
   - Blog images in `/public/blog/`
   - Certification images in `/public/certifications/`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

5. Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)
   - Default password: `admin123`

## Admin Dashboard

The admin dashboard allows you to:
- **Manage Projects** - Add, edit, and delete portfolio projects
- **Manage Certifications** - Add and manage your certifications
- **Manage Blog Posts** - Create and edit blog articles
- **View Email Submissions** - See all contact form submissions

### Admin Login
- URL: `/admin`
- Password: `admin123` (change this in production!)

## Project Structure

```
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts      # Contact form API
│   │   └── data/
│   │       ├── projects.json
│   │       ├── certifications.json
│   │       ├── blogs.json
│   │       └── emails.json
│   ├── components/
│   │   ├── About.tsx
│   │   ├── BackgroundVideo.tsx
│   │   ├── Blog.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── LeftSidebar.tsx
│   │   ├── Pricing.tsx
│   │   ├── Projects.tsx
│   │   ├── Services.tsx
│   │   ├── Skills.tsx
│   │   ├── Technologies.tsx
│   │   └── Testimonials.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── bg.mp4
│   ├── bg-music.mp3
│   ├── profile.png
│   ├── Poono-Resume.pdf
│   ├── projects/
│   ├── blog/
│   └── certifications/
└── package.json
```

## Customization

### Colors

Edit `tailwind.config.ts` to change the neon colors:

```typescript
colors: {
  neon: {
    mint: "#00FFB3",  // Primary accent
    cyan: "#4BE1EC",  // Secondary accent
  },
}
```

### Content

Update the content in each component file or use the admin dashboard:
- `About.tsx` - Personal summary and counters
- `Technologies.tsx` - Technology stack
- `Skills.tsx` - Skills and languages
- `Services.tsx` - Services offered
- `Projects.tsx` - Portfolio projects (managed via admin)
- `Experience.tsx` - Work experience and education
- `Contact.tsx` - Contact information

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy with default settings

### Other Platforms

Build the project:
```bash
npm run build
```

The output will be in the `.next` folder, ready for deployment.

## Security Notes

⚠️ **Important**: The admin dashboard uses a simple password check. For production:
- Implement proper authentication (NextAuth.js, Auth0, etc.)
- Use environment variables for sensitive data
- Add rate limiting to API routes
- Implement proper database instead of JSON files

## License

© 2025 Poono — Data Engineering & AI Ethics Portfolio

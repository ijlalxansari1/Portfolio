# 🚀 Data Engineering Portfolio

A modern, glassmorphic portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Features a comprehensive admin dashboard for managing projects, certifications, blogs, and contact inquiries.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Routes](#-api-routes)
- [Admin Dashboard](#-admin-dashboard)
- [Deployment](#-deployment)

## 🛠 Tech Stack

### Core Framework
- **Next.js 14.2.5** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS 3.4.4** - Utility-first CSS framework
- **Framer Motion 11.3.6** - Animation library
- **Lucide React 0.424.0** - Icon library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Data Storage
- **JSON Files** - File-based data storage for:
  - Projects
  - Certifications
  - Blog posts
  - Contact emails
  - Categories
  - Analytics

## 📁 Project Structure

```
Portfolio/
├── app/
│   ├── admin/                    # Admin dashboard
│   │   ├── components/
│   │   │   └── AdminForm.tsx     # Form component for CRUD operations
│   │   └── page.tsx              # Admin dashboard page
│   │
│   ├── api/                      # API routes
│   │   ├── ai/
│   │   │   └── route.ts          # Google AI (Gemini) integration
│   │   ├── analytics/
│   │   │   ├── route.ts          # Analytics endpoints
│   │   │   └── track/
│   │   │       └── route.ts      # Analytics tracking
│   │   ├── contact/
│   │   │   └── route.ts          # Contact form submission
│   │   ├── data/                 # Data management APIs
│   │   │   ├── blogs/
│   │   │   │   └── route.ts      # Blog CRUD operations
│   │   │   ├── certifications/
│   │   │   │   └── route.ts      # Certification CRUD
│   │   │   ├── projects/
│   │   │   │   └── route.ts      # Project CRUD
│   │   │   ├── emails/
│   │   │   │   └── route.ts      # Email management
│   │   │   ├── categories/
│   │   │   │   └── route.ts      # Category management
│   │   │   └── *.json            # JSON data files
│   │   ├── newsletter/
│   │   │   └── subscribe/
│   │   │       └── route.ts      # Newsletter subscription
│   │   └── upload/
│   │       └── route.ts          # Image upload endpoint
│   │
│   ├── components/               # React components
│   │   ├── About.tsx             # About section
│   │   ├── BackgroundVideo.tsx   # Video background
│   │   ├── Blog.tsx              # Blog posts display
│   │   ├── Certifications.tsx     # Certifications display
│   │   ├── Contact.tsx           # Contact form
│   │   ├── Experience.tsx        # Work experience
│   │   ├── LeftSidebar.tsx       # Navigation sidebar
│   │   ├── Pricing.tsx           # Pricing plans
│   │   ├── Projects.tsx          # Projects showcase
│   │   ├── ScrollToTop.tsx      # Scroll navigation buttons
│   │   ├── Services.tsx          # Services offered
│   │   ├── Skills.tsx            # Skills section
│   │   ├── SpotifyPlayer.tsx    # Music player
│   │   ├── Technologies.tsx      # Tech stack display
│   │   └── Toast.tsx             # Toast notifications
│   │
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
│
├── public/                       # Static assets
│   ├── bg.mp4                    # Background video
│   ├── profile.png               # Profile picture
│   ├── Poono-Resume.pdf          # Resume PDF
│   ├── icons/                    # Technology icons
│   ├── projects/                 # Project images
│   ├── blog/                     # Blog images
│   └── certifications/          # Certification images
│
├── next.config.js                # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## ✨ Features

### Frontend Features
- 🎨 **Glassmorphic Design** - Modern dark theme with glass effects
- 🎬 **Video Background** - Full-page animated video background
- 📱 **Responsive Design** - Mobile-first, fully responsive
- ✨ **Smooth Animations** - Framer Motion animations throughout
- 🎯 **Fixed Sidebar** - Desktop sidebar with navigation
- 🌈 **Neon Accents** - Custom neon mint (#00FFB3) and cyan (#4BE1EC) colors
- 🎵 **Spotify Integration** - Embedded Spotify playlist player
- 📜 **Scroll Navigation** - Scroll to top/bottom buttons
- 💬 **Contact Form** - Service-based contact form with validation

### Admin Dashboard Features
- 🔐 **Authentication** - Simple password-based login
- 📊 **Dashboard Overview** - Statistics and metrics
- ➕ **CRUD Operations** - Full Create, Read, Update, Delete for:
  - Projects
  - Certifications
  - Blog posts
  - Contact emails
- 🖼️ **Image Upload** - Drag & drop image uploads
- 🤖 **AI Integration** - Google Gemini AI for content generation
- 📧 **Email Management** - View and manage contact form submissions
- 🔍 **Search & Filter** - Search and filter functionality
- 📤 **Data Export** - Export all data as JSON

### Technical Features
- ⚡ **Server-Side Rendering** - Next.js SSR for performance
- 🔄 **API Routes** - RESTful API endpoints
- 📝 **TypeScript** - Full type safety
- 🎯 **Optimized Performance** - Code splitting and lazy loading
- 🔒 **Error Handling** - Comprehensive error handling
- 📊 **Analytics** - Built-in analytics tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google AI API key (optional, for AI features)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (optional)
Create a `.env.local` file:
```env
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

4. **Add required assets**
Place these files in the `public/` directory:
- `bg.mp4` - Background video
- `profile.png` - Profile picture
- `Poono-Resume.pdf` - Resume PDF
- Technology icons in `public/icons/`

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Access Admin Dashboard

- URL: `http://localhost:3000/admin`
- Default password: `admin123` (⚠️ Change in production!)

## 🔌 API Routes

### Data Management
- `GET /api/data/projects` - Get all projects
- `POST /api/data/projects` - Create new project
- `PUT /api/data/projects` - Update project
- `DELETE /api/data/projects?id={id}` - Delete project

- `GET /api/data/certifications` - Get all certifications
- `POST /api/data/certifications` - Create certification
- `PUT /api/data/certifications` - Update certification
- `DELETE /api/data/certifications?id={id}` - Delete certification

- `GET /api/data/blogs` - Get all blog posts
- `POST /api/data/blogs` - Create blog post
- `PUT /api/data/blogs` - Update blog post
- `DELETE /api/data/blogs?id={id}` - Delete blog post

- `GET /api/data/emails` - Get all contact emails
- `DELETE /api/data/emails?id={id}` - Delete email

### Other Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/upload` - Upload images
- `POST /api/ai` - AI content generation
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `GET /api/analytics` - Get analytics data
- `POST /api/analytics/track` - Track analytics events

## 🎛️ Admin Dashboard

### Features
- **Projects Management**: Add, edit, delete projects with images, technologies, GitHub links
- **Certifications Management**: Manage certifications with verification URLs
- **Blog Management**: Create blog posts with comments and emoji reactions
- **Email Management**: View contact form submissions, reply via Gmail, copy emails
- **Category Management**: Add custom categories for projects and blogs
- **Image Upload**: Drag & drop image uploads with preview
- **AI Content Generation**: Generate titles and descriptions using Google AI

### Admin Form Fields

#### Projects
- Title, Description, Category
- Technologies (comma-separated)
- GitHub URL, Demo URL
- Status (Completed, In Progress, On Hold, Planning)
- Image, Date

#### Certifications
- Title, Issuer, Credential ID
- Verification URL (Credly, etc.)
- Image, Date

#### Blogs
- Title, Category, Excerpt, Content
- Allow Comments (toggle)
- Comments Management
- Emoji Reactions
- Image, Date

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables for Production

```env
GOOGLE_AI_API_KEY=your_production_api_key
NODE_ENV=production
```

### Recommended Platforms
- **Vercel** (Recommended) - Optimized for Next.js
- **Netlify** - Easy deployment
- **AWS Amplify** - AWS integration
- **DigitalOcean App Platform** - Simple deployment

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  neon: {
    mint: "#00FFB3",  // Primary accent
    cyan: "#4BE1EC",  // Secondary accent
  },
}
```

### Technologies
Edit `app/components/Technologies.tsx` to add/remove technologies.

### Sections
Modify `app/page.tsx` to add/remove/reorder sections.

## 📝 License

This project is private and proprietary.

## 👤 Author

**Ijlal Ansari**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

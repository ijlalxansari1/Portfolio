/*
  # Create Portfolio Database Schema

  ## Tables Created
  
  1. **projects**
     - `id` (uuid, primary key)
     - `title` (text) - Project name
     - `description` (text) - Project description
     - `category` (text) - Project category for filtering
     - `image_url` (text) - Project thumbnail image
     - `project_url` (text, nullable) - Live project link
     - `github_url` (text, nullable) - GitHub repository link
     - `technologies` (text[]) - Array of technologies used
     - `featured` (boolean) - Whether to feature on homepage
     - `order_index` (integer) - Display order
     - `created_at` (timestamptz)

  2. **skills**
     - `id` (uuid, primary key)
     - `name` (text) - Skill name
     - `category` (text) - Skill category
     - `proficiency` (integer) - Proficiency percentage (0-100)
     - `icon` (text, nullable) - Icon identifier
     - `order_index` (integer)
     - `created_at` (timestamptz)

  3. **experience**
     - `id` (uuid, primary key)
     - `title` (text) - Job title
     - `company` (text) - Company name
     - `location` (text, nullable)
     - `start_date` (date) - Start date
     - `end_date` (date, nullable) - End date (null for current)
     - `description` (text) - Job description
     - `type` (text) - 'work' or 'education'
     - `order_index` (integer)
     - `created_at` (timestamptz)

  4. **testimonials**
     - `id` (uuid, primary key)
     - `name` (text) - Person's name
     - `role` (text) - Person's role/title
     - `company` (text, nullable) - Company name
     - `content` (text) - Testimonial content
     - `avatar_url` (text, nullable) - Avatar image
     - `rating` (integer, nullable) - Rating out of 5
     - `order_index` (integer)
     - `created_at` (timestamptz)

  5. **blog_posts**
     - `id` (uuid, primary key)
     - `title` (text) - Post title
     - `slug` (text, unique) - URL slug
     - `excerpt` (text) - Short description
     - `content` (text) - Full post content
     - `image_url` (text, nullable) - Featured image
     - `category` (text) - Post category
     - `read_time` (integer) - Estimated read time in minutes
     - `published` (boolean) - Publication status
     - `published_at` (timestamptz, nullable)
     - `created_at` (timestamptz)

  6. **contact_submissions**
     - `id` (uuid, primary key)
     - `name` (text) - Sender name
     - `email` (text) - Sender email
     - `subject` (text) - Message subject
     - `message` (text) - Message content
     - `read` (boolean) - Whether message has been read
     - `created_at` (timestamptz)

  7. **services**
     - `id` (uuid, primary key)
     - `title` (text) - Service title
     - `description` (text) - Service description
     - `icon` (text) - Icon identifier
     - `order_index` (integer)
     - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for public read access to public-facing content
  - Restrict write access to authenticated admin users only
  - Contact submissions can be created by anyone but only read by authenticated users
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  project_url text,
  github_url text,
  technologies text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('work', 'education')),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text,
  content text NOT NULL,
  avatar_url text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text,
  category text NOT NULL,
  read_time integer DEFAULT 5,
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Projects policies (public read)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- Skills policies (public read)
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

-- Experience policies (public read)
CREATE POLICY "Anyone can view experience"
  ON experience FOR SELECT
  TO anon, authenticated
  USING (true);

-- Testimonials policies (public read)
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog posts policies (public read for published posts)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Services policies (public read)
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Contact submissions policies (anyone can create, only authenticated can read)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_experience_type ON experience(type);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
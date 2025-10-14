export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url?: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order_index: number;
  created_at: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  start_date: string;
  end_date?: string;
  description: string;
  type: 'work' | 'education';
  order_index: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar_url?: string;
  rating?: number;
  order_index: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  read_time: number;
  published: boolean;
  published_at?: string;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
  created_at: string;
}

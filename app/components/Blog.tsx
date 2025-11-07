"use client";

import { motion } from "framer-motion";
import { Calendar, Tag, Clock } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content?: string;
}

// Calculate reading time (average reading speed: 200 words per minute)
const calculateReadingTime = (text: string): number => {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes || 1; // Minimum 1 minute
};

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch("/api/data/blogs");
        if (response.ok) {
          const data = await response.json();
          // Format dates if needed
          const formattedBlogs = data.map((blog: any) => ({
            ...blog,
            date: blog.date 
              ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
              : "Recent",
          }));
          setBlogPosts(formattedBlogs);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="text-center text-secondary">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
          >
            My Blog
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-gray-300 mb-12 text-center"
          >
            Exploring Our Blog
          </motion.h3>

          {/* Blog Posts Grid */}
          {blogPosts.length === 0 ? (
            <div className="text-center text-secondary py-12">
              <p className="text-lg mb-2">No blog posts yet</p>
              <p className="text-sm text-tertiary">Add blog posts from the admin dashboard</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                borderColor: "#00FFB3",
                boxShadow: "0 0 30px rgba(0, 255, 179, 0.2)",
              }}
              className="glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-mint/50 transition-all cursor-pointer"
            >
              <div className="relative h-48 bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl text-neon-mint/50">{post.title[0]}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={14} />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {calculateReadingTime(post.content || post.excerpt)} min read
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-secondary text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-neon-mint text-xs font-medium hover:underline"
                >
                  Read More →
                </motion.button>
              </div>
            </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

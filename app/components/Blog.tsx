"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Calendar, Tag } from "lucide-react";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  useEffect(() => {
    // Load blogs from API route
    fetch("/api/data/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogPosts(data);
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((post: BlogPost) => post.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error loading blogs:", err));
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <section id="blog" className="min-h-screen py-20 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Exploring Our Blog
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-neon-mint text-black border-2 border-neon-mint"
                  : "glass text-gray-300 border border-white/10 hover:border-neon-mint/50 hover:text-neon-mint"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedPost(post.id)}
                className="glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-mint/50 transition-all cursor-pointer group"
              >
                <div className="relative h-48 bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20 flex items-center justify-center overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="text-6xl opacity-30">📝</div>
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-neon-mint font-semibold text-lg">Read More</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-neon-mint uppercase tracking-wider font-medium flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Tag size={12} />
                    {post.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No blog posts found. Check back soon!</p>
          </motion.div>
        )}
      </div>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-xl p-8 max-w-3xl w-full border border-neon-mint/50 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-white hover:text-neon-mint transition-colors z-10"
              >
                <X size={24} />
              </button>

              {(() => {
                const post = blogPosts.find((p) => p.id === selectedPost);
                if (!post) return null;
                return (
                  <>
                    <div className="relative h-64 bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="text-8xl opacity-30">📝</div>
                      )}
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag size={16} />
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-wrap">
                      {post.content || post.excerpt}
                    </p>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

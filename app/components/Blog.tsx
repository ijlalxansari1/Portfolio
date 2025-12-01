"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, X, Heart, ThumbsUp, Smile, MessageCircle } from "lucide-react";
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
  allowComments?: boolean;
  comments?: Array<{
    id?: number;
    name: string;
    email: string;
    message: string;
    date: string;
  }>;
  emojiReactions?: {
    [key: string]: number;
  };
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [commentForm, setCommentForm] = useState({ name: "", email: "", message: "" });
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setCommentForm({ name: "", email: "", message: "" });
    }
  }, [selectedPost]);

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
              onClick={() => setSelectedPost(post)}
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
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={14} />
                    {post.category}
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

      {/* Blog Detail Modal - Full Screen */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="min-h-screen w-full relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="fixed top-4 right-4 z-50 w-12 h-12 glass rounded-full border border-white/10 text-white hover:text-neon-mint hover:border-neon-mint/50 transition-all flex items-center justify-center"
              >
                <X size={24} />
              </button>

              {/* Content Container */}
              <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Hero Image */}
                <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
                  {selectedPost.image ? (
                    <Image
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20">
                      <span className="text-8xl text-neon-mint/50">{selectedPost.title[0]}</span>
                    </div>
                  )}
                </div>

                {/* Meta Information */}
                <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <Calendar size={18} />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Tag size={18} />
                    {selectedPost.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{selectedPost.title}</h1>
                <p className="text-neon-mint text-xl mb-8 italic">{selectedPost.excerpt}</p>

                {/* Emoji Reactions */}
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
                  <span className="text-white font-medium">Reactions:</span>
                  {['👍', '❤️', '😊', '🎉', '🔥'].map((emoji) => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={async () => {
                        const currentCount = (selectedPost.emojiReactions?.[emoji] || 0) + 1;
                        const updatedReactions = {
                          ...(selectedPost.emojiReactions || {}),
                          [emoji]: currentCount
                        };
                        
                        try {
                          const response = await fetch(`/api/data/blogs`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              ...selectedPost,
                              emojiReactions: updatedReactions
                            }),
                          });
                          if (response.ok) {
                            setSelectedPost({
                              ...selectedPost,
                              emojiReactions: updatedReactions
                            });
                          }
                        } catch (error) {
                          console.error("Error updating reactions:", error);
                        }
                      }}
                      className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                    >
                      {emoji} {selectedPost.emojiReactions?.[emoji] || 0}
                    </motion.button>
                  ))}
                </div>

                {/* Blog Content */}
                <div className="prose prose-invert prose-lg max-w-none mb-12">
                  <div className="text-secondary text-lg leading-relaxed whitespace-pre-wrap">
                    {selectedPost.content || selectedPost.excerpt}
                  </div>
                </div>

                {/* Comments Section */}
                {selectedPost.allowComments !== false && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <MessageCircle size={24} />
                      Comments ({selectedPost.comments?.length || 0})
                    </h3>

                    {/* Comment Form */}
                    <div className="glass rounded-xl p-6 border border-white/10 mb-8">
                      <h4 className="text-white font-semibold mb-4">Leave a Comment</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={commentForm.name}
                            onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-mint"
                          />
                          <input
                            type="email"
                            placeholder="Your Email"
                            value={commentForm.email}
                            onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-mint"
                          />
                        </div>
                        <textarea
                          placeholder="Your Comment"
                          value={commentForm.message}
                          onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-mint resize-none"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={async () => {
                            if (!commentForm.name || !commentForm.message) return;
                            setSubmittingComment(true);
                            try {
                              const newComment = {
                                name: commentForm.name,
                                email: commentForm.email,
                                message: commentForm.message,
                                date: new Date().toISOString()
                              };
                              const updatedPost = {
                                ...selectedPost,
                                comments: [...(selectedPost.comments || []), newComment]
                              };
                              
                              const response = await fetch(`/api/data/blogs`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(updatedPost),
                              });
                              
                              if (response.ok) {
                                setSelectedPost(updatedPost);
                                setCommentForm({ name: "", email: "", message: "" });
                              }
                            } catch (error) {
                              console.error("Error submitting comment:", error);
                            } finally {
                              setSubmittingComment(false);
                            }
                          }}
                          disabled={submittingComment || !commentForm.name || !commentForm.message}
                          className="px-6 py-3 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submittingComment ? "Submitting..." : "Post Comment"}
                        </motion.button>
                      </div>
                    </div>

                    {/* Comments List */}
                    {selectedPost.comments && selectedPost.comments.length > 0 && (
                      <div className="space-y-4">
                        {selectedPost.comments.map((comment, idx) => (
                          <div key={idx} className="glass rounded-lg p-4 border border-white/10">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-white font-semibold">{comment.name}</p>
                                {comment.email && (
                                  <p className="text-gray-400 text-sm">{comment.email}</p>
                                )}
                              </div>
                              {comment.date && (
                                <p className="text-gray-500 text-xs">
                                  {new Date(comment.date).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <p className="text-secondary leading-relaxed">{comment.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    id: 1,
    image: "https://picsum.photos/400/240?random=10",
    date: "January 2025",
    category: "Platform Design",
    title: "Building AETHER: Designing an Ethical Data Platform from Scratch",
    excerpt: "How I approached building governance, bias detection, and explainability as structural features — not afterthoughts."
  },
  {
    id: 2,
    image: "https://picsum.photos/400/240?random=11",
    date: "February 2025",
    category: "Data Engineering",
    title: "Why Append-Only Audit Logs Matter in Data Governance",
    excerpt: "The case for immutable audit trails and how to implement them in PostgreSQL without sacrificing performance."
  },
  {
    id: 3,
    image: "https://picsum.photos/400/240?random=12",
    date: "March 2025",
    category: "Ethics & AI",
    title: "Detecting Bias in ML Pipelines with Fairlearn and SHAP",
    excerpt: "A practical walkthrough of measuring demographic parity and using SHAP to explain model decisions to non-technical stakeholders."
  },
  {
    id: 4,
    image: "https://picsum.photos/400/240?random=13",
    date: "April 2025",
    category: "Data Engineering",
    title: "The 80/20 Data Engineering Curriculum That Actually Works",
    excerpt: "How I designed a 20-hour curriculum covering only the skills that appear in 80% of data engineering roles — and built a tracker to stay accountable."
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(articles);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-posts");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          setPosts(parsed.filter((p: any) => p.status !== 'Draft'));
        } else {
          setPosts(articles);
        }
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  return (
    <div className="w-full">
      <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">ARTICLES</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-4">Blog & Research</h2>
      <p className="text-[14px] text-[var(--text-secondary)] opacity-50 mb-10">A collection of research notes, technical walkthroughs, and thoughts on ethical data systems.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {posts.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="blog-card group bg-[#141414] border border-[#222] rounded-xl overflow-hidden hover:border-[var(--accent)] hover:translate-y-[-4px] transition-all cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[16/9]">
               <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                    {article.category}
                  </span>
               </div>
            </div>
            
            <div className="p-6 space-y-4">
               <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{article.date}</p>
               <h3 className="text-[16px] font-black text-white group-hover:text-[var(--accent)] transition-all leading-tight">
                  {article.title}
               </h3>
               <p className="text-[12px] text-white/50 leading-relaxed line-clamp-2">
                  {article.excerpt}
               </p>
               <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--accent)]">
                    Read More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Clock, BookOpen, ArrowLeft } from "lucide-react";
import Image from "next/image";

const articles = [
  {
    id: 1,
    image: "https://picsum.photos/400/240?random=10",
    date: "January 2025",
    category: "Platform Design",
    title: "Building AETHER: Designing an Ethical Data Platform from Scratch",
    excerpt: "How I approached building governance, bias detection, and explainability as structural features — not afterthoughts.",
    readTime: "8 min read",
    content: [
      "Most data platforms treat governance as a checkbox — something you bolt on after the core product is built. With AETHER, I wanted to challenge that assumption fundamentally.",
      "The core insight was simple: if bias detection and explainability aren't structural features of your pipeline, they'll always be afterthoughts that get deprioritized when deadlines hit.",
      "I designed AETHER around a 10-stage analytical pipeline where every dataset must pass through schema validation, bias detection (using Fairlearn), and SHAP-based explainability before reaching the output layer.",
      "The RBAC system implements 24 granular permissions across 3 tiers — Viewer, Analyst, and Admin — ensuring that sensitive data access is always auditable.",
      "Every action in the system is logged to an append-only audit trail in PostgreSQL, creating an immutable record that satisfies most compliance frameworks.",
    ],
    keyPoints: ["Governance must be structural, not decorative", "Bias detection as a mandatory pipeline stage", "Append-only audit logs for compliance", "RBAC with 24 granular permissions"]
  },
  {
    id: 2,
    image: "https://picsum.photos/400/240?random=11",
    date: "February 2025",
    category: "Data Engineering",
    title: "Why Append-Only Audit Logs Matter in Data Governance",
    excerpt: "The case for immutable audit trails and how to implement them in PostgreSQL without sacrificing performance.",
    readTime: "6 min read",
    content: [
      "In any regulated industry, the question isn't whether you need audit logs — it's whether your audit logs can be trusted. Mutable logs are essentially worthless for compliance because they can be retroactively altered.",
      "Append-only tables in PostgreSQL use a simple but powerful pattern: no UPDATE or DELETE permissions on the audit table, with all writes going through a dedicated INSERT-only function.",
      "The performance concern is real but manageable. By partitioning the audit table by month and using BRIN indexes on the timestamp column, we maintain sub-millisecond insert times even at scale.",
      "For AETHER, I implemented a trigger-based system where every data mutation automatically generates an audit entry with the previous state, new state, user ID, and timestamp.",
    ],
    keyPoints: ["Mutable logs are worthless for compliance", "INSERT-only functions prevent tampering", "BRIN indexes for time-series performance", "Trigger-based automatic audit generation"]
  },
  {
    id: 3,
    image: "https://picsum.photos/400/240?random=12",
    date: "March 2025",
    category: "Ethics & AI",
    title: "Detecting Bias in ML Pipelines with Fairlearn and SHAP",
    excerpt: "A practical walkthrough of measuring demographic parity and using SHAP to explain model decisions to non-technical stakeholders.",
    readTime: "10 min read",
    content: [
      "Fairness in machine learning isn't a single metric — it's a family of sometimes-contradictory definitions. Demographic parity, equalized odds, and calibration each capture different aspects of what 'fair' means.",
      "Fairlearn makes it straightforward to measure these metrics across protected groups. The key insight is that you need to define your fairness criteria before training, not after.",
      "SHAP (SHapley Additive exPlanations) bridges the gap between technical model behavior and stakeholder understanding. When a loan application is denied, SHAP can show exactly which features contributed most to that decision.",
      "The combination of Fairlearn for measurement and SHAP for explanation creates a powerful audit toolkit that satisfies both technical teams and compliance officers.",
    ],
    keyPoints: ["Fairness has multiple valid definitions", "Define fairness criteria before training", "SHAP explains individual decisions", "Combine measurement with explanation"]
  },
  {
    id: 4,
    image: "https://picsum.photos/400/240?random=13",
    date: "April 2025",
    category: "Data Engineering",
    title: "The 80/20 Data Engineering Curriculum That Actually Works",
    excerpt: "How I designed a 20-hour curriculum covering only the skills that appear in 80% of data engineering roles — and built a tracker to stay accountable.",
    readTime: "7 min read",
    content: [
      "After analyzing 200+ data engineering job postings, I noticed a clear pattern: about 20% of skills appeared in 80% of listings. SQL, Python, ETL fundamentals, and basic cloud concepts dominated.",
      "I distilled this into a focused 20-hour curriculum with 8 modules, each targeting a high-frequency skill. No fluff, no edge cases — just the core competencies that employers actually screen for.",
      "To stay accountable, I built an interactive tracker using Next.js and localStorage. It visualizes progress, estimates completion time, and uses spaced repetition principles to reinforce learning.",
      "The result: a structured learning path that gets you interview-ready in weeks instead of months, by ruthlessly cutting everything that doesn't directly impact employability.",
    ],
    keyPoints: ["20% of skills appear in 80% of jobs", "20-hour focused curriculum", "8 modules covering core competencies", "Built-in accountability tracker"]
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(articles);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

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

  const activeArticle = posts.find(a => a.id === selectedArticle);

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
            onClick={() => setSelectedArticle(article.id)}
            className="blog-card group bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] hover:translate-y-[-4px] transition-all cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[16/9]">
               <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                    {article.category}
                  </span>
               </div>
            </div>
            
            <div className="p-6 space-y-4">
               <p className="text-[11px] font-bold text-[var(--text-secondary)] opacity-30 uppercase tracking-widest">{article.date}</p>
               <h3 className="text-[16px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-all leading-tight">
                  {article.title}
               </h3>
               <p className="text-[12px] text-[var(--text-secondary)] opacity-50 leading-relaxed line-clamp-2">
                  {article.excerpt}
               </p>
               <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--accent)]">
                    Read Article <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle !== null && activeArticle && (
          <div className="fixed inset-0 z-[4000] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedArticle(null)} className="fixed inset-0 bg-black/92 backdrop-blur-md" />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full md:w-[640px] h-full bg-[#111111] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col z-10 overflow-hidden"
            >
              {/* Header */}
              <div className="pt-8 px-8 pb-6 border-b border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => setSelectedArticle(null)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black transition-all">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full">{activeArticle.category}</span>
                  <span className="flex items-center gap-1 text-[10px] text-white/30 font-bold"><Clock size={10} /> {activeArticle.readTime}</span>
                </div>
                <h2 className="text-[22px] font-black text-white leading-tight">{activeArticle.title}</h2>
                <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest mt-2">{activeArticle.date}</p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
                {/* Hero Image */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image src={activeArticle.image} alt={activeArticle.title} fill className="object-cover" />
                </div>

                {/* Article Body */}
                <div className="space-y-6">
                  {activeArticle.content ? (
                    activeArticle.content.map((para: string, i: number) => (
                      <p key={i} className="text-[15px] text-white/60 leading-[1.9] font-medium">{para}</p>
                    ))
                  ) : (
                    <p className="text-[15px] text-white/60 leading-[1.9] font-medium">{activeArticle.excerpt}</p>
                  )}
                </div>

                {/* Key Points */}
                {activeArticle.keyPoints && (
                  <div className="p-6 bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-2xl space-y-4">
                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--accent)]">
                      <BookOpen size={14} /> Key Takeaways
                    </div>
                    <ul className="space-y-3">
                      {activeArticle.keyPoints.map((point: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mt-2 shrink-0" />
                          <span className="text-[14px] text-white/50 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


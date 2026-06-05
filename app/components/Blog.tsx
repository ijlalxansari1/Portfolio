"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Clock, BookOpen, ArrowLeft, Heart, Share2, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const articles = [
  {
    id: 1,
    author: "Ijlal ansari",
    image: "https://picsum.photos/400/240?random=10",
    date: "January 2025",
    category: "Platform Design",
    title: "Building the LOKI Protocol: Forging Free Will in Data Systems",
    excerpt: "How I approached building governance, bias detection, and explainability as structural features — not afterthoughts.",
    readTime: "8 min read",
    content: [
      "Most data systems follow a predetermined path—the sacred timeline. With the LOKI Protocol, I wanted to shatter that assumption fundamentally.",
      "The core insight was simple: if bias detection and explainability aren't structural features of your pipeline, they'll always be afterthoughts that get deprioritized when deadlines hit.",
      "I designed the LOKI Protocol around a multi-layered variance detection system where every dataset is stripped of predetermined bias, ensuring true free will in analytics before reaching the end of time.",
      "The RBAC system implements 24 granular permissions across 3 tiers — Viewer, Analyst, and Admin — ensuring that sensitive data access is always auditable.",
      "Every action in the system is logged to an append-only audit trail in PostgreSQL, creating an immutable record that satisfies most compliance frameworks.",
    ],
    keyPoints: ["Governance must be structural, not decorative", "Bias detection as a mandatory pipeline stage", "Append-only audit logs for compliance", "RBAC with 24 granular permissions"]
  },
  {
    id: 2,
    author: "Ijlal ansari",
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
      "For the LOKI Protocol, I implemented a temporal trigger system where every branch mutation generates an unbreakable audit log across all timelines.",
    ],
    keyPoints: ["Mutable logs are worthless for compliance", "INSERT-only functions prevent tampering", "BRIN indexes for time-series performance", "Trigger-based automatic audit generation"]
  },
  {
    id: 3,
    
    author: "Ijlal ansari",
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
    
    author: "Ijlal ansari",
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
  const { language } = useLanguage();
  const t = translations[language].blog;
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
    
    // Deep-linking: Open article from URL param
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("article");
    if (articleId) {
      setSelectedArticle(parseInt(articleId));
    }

    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  const activeArticle = posts.find(a => a.id === selectedArticle);

  const [likes, setLikes] = useState<Record<number, number>>({ 1: 24, 2: 18, 3: 42, 4: 56 });
  const [hasLiked, setHasLiked] = useState<Record<number, boolean>>({});
  const [commentText, setCommentText] = useState("");
  const [articleComments, setArticleComments] = useState<Record<number, any[]>>({
    1: [{ name: "Sarah K.", text: "This is exactly what the industry needs right now. Structural governance is key.", date: "2 days ago" }],
    2: [{ name: "Marcus L.", text: "Immutable logs are a lifesaver for audits. Great walkthrough.", date: "1 week ago" }]
  });

  const toggleLike = (id: number) => {
    setHasLiked(prev => ({ ...prev, [id]: !prev[id] }));
    setLikes(prev => ({ ...prev, [id]: prev[id] + (hasLiked[id] ? -1 : 1) }));
  };

  const handleShare = (article: any) => {
    const url = `${window.location.origin}${window.location.pathname}?article=${article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      // If toast is available in context, use it, otherwise alert
      alert(`Link to "${article.title}" copied to clipboard!`);
    });
  };

  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    if (selectedArticle !== null) {
      const adjs = ["Agile", "Distributed", "Parallel", "Atomic", "Recursive", "Encrypted", "Buffered", "Stateless", "Optimized", "Reactive"];
      const nouns = ["Node", "Pipeline", "Schema", "Query", "Cluster", "Stream", "Log", "Metric", "Bit", "Validator"];
      setCurrentUserName(`${adjs[Math.floor(Math.random() * adjs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`);
    }
  }, [selectedArticle]);

  const addComment = (id: number) => {
    if (!commentText.trim()) return;
    const newComment = { 
      name: currentUserName, 
      text: commentText, 
      date: "Just now" 
    };
    setArticleComments(prev => ({ ...prev, [id]: [newComment, ...(prev[id] || [])] }));
    setCommentText("");
    
    // Refresh name for next comment
    const adjs = ["Agile", "Distributed", "Parallel", "Atomic", "Recursive", "Encrypted", "Buffered", "Stateless", "Optimized", "Reactive"];
    const nouns = ["Node", "Pipeline", "Schema", "Query", "Cluster", "Stream", "Log", "Metric", "Bit", "Validator"];
    setCurrentUserName(`${adjs[Math.floor(Math.random() * adjs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`);
  };


  return (
    <div className="w-full">
      <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">{t.label}</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-4">{t.title}</h2>
      <p className="text-[14px] text-[var(--text-secondary)] opacity-50 mb-10">{t.desc}</p>

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
               <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-[var(--text-secondary)] opacity-30 uppercase tracking-widest">{article.date}</p>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] opacity-40">
                     <Heart size={10} className="text-[var(--accent)]" /> {likes[article.id] || 0}
                  </div>
               </div>
               <h3 className="text-[16px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-all leading-tight">
                  {article.title}
               </h3>
               <p className="text-[12px] text-[var(--text-secondary)] opacity-50 leading-relaxed line-clamp-2">
                  {article.excerpt}
               </p>
               <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--accent)]">
                    {t.read} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Page Article Reader */}
      <AnimatePresence>
        {selectedArticle !== null && activeArticle && (
          <div className="fixed inset-0 z-[4000] overflow-y-auto bg-[var(--bg-primary)]">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="min-h-screen flex flex-col"
            >
              {/* Top Navigation Bar */}
              <div className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[3px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all"
                  >
                    <ArrowLeft size={16} /> {t.back}
                  </button>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleShare(activeArticle)}
                      className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-full text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all"
                    >
                      <Share2 size={18} />
                    </button>
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-full text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 max-w-3xl mx-auto px-6 py-12 lg:py-20">
                <header className="mb-12 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full">
                      {activeArticle.category}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] font-bold opacity-40 uppercase tracking-widest">
                      <Clock size={12} /> {activeArticle.readTime}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-[1.1] tracking-tight">
                    {activeArticle.title}
                  </h1>
                  <p className="text-[11px] font-black text-[var(--accent)] uppercase tracking-[0.3em] opacity-60">
                    {activeArticle.author ? `BY ${activeArticle.author} • ` : ''} {t.published} {activeArticle.date}
                  </p>
                </header>

                <div className="relative w-full aspect-video rounded-[32px] overflow-hidden mb-16 shadow-2xl">
                  <Image src={activeArticle.image} alt={activeArticle.title} fill className="object-cover" />
                </div>

                <div className="prose prose-invert max-w-none space-y-8 mb-20">
                  {activeArticle.content ? (
                    activeArticle.content.map((para: string, i: number) => (
                      <p key={i} className="text-[18px] lg:text-[20px] text-[var(--text-primary)] opacity-80 leading-[1.8] font-medium font-serif">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="text-[18px] lg:text-[20px] text-[var(--text-primary)] opacity-80 leading-[1.8] font-medium font-serif">
                      {activeArticle.excerpt}
                    </p>
                  )}
                </div>

                {/* Key Points */}
                {activeArticle.keyPoints && (
                  <div className="p-8 md:p-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[32px] mb-20 relative overflow-hidden group">
                    <div className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-8">
                      <BookOpen size={16} /> {t.key_takeaways}
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {activeArticle.keyPoints.map((point: string, i: number) => (
                        <li key={i} className="space-y-2">
                          <span className="text-[10px] font-black text-[var(--accent)] opacity-40">0{i+1}</span>
                          <p className="text-[15px] text-[var(--text-primary)] font-bold leading-relaxed">{point}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 blur-[60px] rounded-full" />
                  </div>
                )}

                {/* Engagement Section */}
                <div className="border-t border-[var(--border-subtle)] pt-12">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-16">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={() => toggleLike(activeArticle.id)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
                          hasLiked[activeArticle.id] 
                            ? "bg-[var(--accent)] border-[var(--accent)] text-black" 
                            : "bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)]/50"
                        }`}
                      >
                        <Heart size={20} fill={hasLiked[activeArticle.id] ? "currentColor" : "none"} />
                        <span className="text-[14px] font-black">{likes[activeArticle.id]} {t.likes}</span>
                      </button>
                      <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                        <MessageSquare size={20} />
                        <span className="text-[14px] font-bold">{(articleComments[activeArticle.id] || []).length} {t.comments}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleShare(activeArticle)}
                      className="flex items-center gap-3 px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-full text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-all"
                    >
                      <Share2 size={20} />
                      <span className="text-[14px] font-bold">{t.share}</span>
                    </button>
                  </div>

                  {/* Comments Area */}
                  <div className="space-y-12">
                    <h3 className="text-[18px] font-black text-[var(--text-primary)] uppercase tracking-[0.1em]">{t.discussion}</h3>
                    
                    {/* Comment Input */}
                    <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl space-y-4">
                      <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={t.add_thought}
                        className="w-full bg-transparent border-none text-[var(--text-primary)] focus:ring-0 placeholder:text-[var(--text-secondary)]/30 resize-none min-h-[100px] text-[15px]"
                      />
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-40">
                          {t.posting_as} <span className="text-[var(--accent)]">{currentUserName}</span>
                        </div>
                        <button 
                          onClick={() => addComment(activeArticle.id)}
                          disabled={!commentText.trim()}
                          className="px-6 py-2 bg-[var(--accent)] text-black rounded-xl text-[12px] font-black uppercase tracking-widest disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
                        >
                          {t.post_comment}
                        </button>
                      </div>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-8">
                      {(articleComments[activeArticle.id] || []).map((comment, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-black text-[10px] shrink-0">
                            {comment.name.charAt(0)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[14px] font-black text-[var(--text-primary)]">{comment.name}</span>
                              <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-30 uppercase tracking-widest">{comment.date}</span>
                            </div>
                            <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                              {comment.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Spacer */}
              <div className="h-20" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


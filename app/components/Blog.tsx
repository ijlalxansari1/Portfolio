"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, X, Clock, BookOpen, ArrowLeft, Heart, Share2, MessageSquare, Volume2, VolumeX, Play, Square, Loader2 } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const articles = [
  {
    id: 1,
    author: "Ijlal ansari",
    image: "https://picsum.photos/800/400?random=10",
    date: "January 2025",
    category: "Platform Design",
    title: "Building TraceFlow: A Practical Framework for Trustworthy Data Systems",
    excerpt: "How I approached building governance, bias detection, and explainability as structural features — not afterthoughts.",
    readTime: "8 min read",
    content: [
      "Most data systems follow a predetermined path. I wanted to break that assumption by designing a framework that made governance and explainability part of the foundation.",
      "The core insight was simple: if bias detection and explainability aren't structural features of your pipeline, they'll always be afterthoughts that get deprioritized when deadlines hit.",
      "I designed the system around a layered approach where every dataset is checked for quality, lineage, and trust before it reaches downstream analytics.",
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
      "In the implementation, every change generates an immutable audit trail so that the data story remains clear and reviewable over time.",
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
    excerpt: "How I designed a 20-hour curriculum covering only the skills that appear in 80% of data engineering roles.",
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

// Helper to generate a deterministic random color/shape based on a name string
const generateAvatar = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const color1 = `hsl(${hue}, 80%, 60%)`;
  const color2 = `hsl(${(hue + 40) % 360}, 90%, 40%)`;
  const size = 40;
  const cx = 20;
  const cy = 20;
  const r = 10 + (Math.abs(hash) % 8);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-full shadow-lg">
      <defs>
        <linearGradient id={`grad-${hash}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <rect width={size} height={size} fill={`url(#grad-${hash})`} />
      <circle cx={cx} cy={cy} r={r} fill="#ffffff33" />
      <path d={`M 0 ${size} Q ${cx} ${size-r} ${size} ${size}`} fill="#ffffff22" />
    </svg>
  );
};

// 3D Tilt Card Component
function TiltCard({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0, 0.2, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className={`relative cursor-pointer overflow-hidden transform-gpu ${className}`}
    >
      {children}
      {/* Glare Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: `radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          opacity: glareOpacity,
          left: glareX,
          top: glareY,
          transform: "translate(-50%, -50%)",
          width: "200%",
          height: "200%",
        }}
      />
    </motion.div>
  );
}


export default function Blog() {
  const { language } = useLanguage();
  const t = translations[language].blog;
  const [posts, setPosts] = useState(articles);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  // Reader Scroll Tracking
  const readerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: readerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // TTS State
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

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
    
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("article");
    if (articleId) setSelectedArticle(parseInt(articleId));

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
      alert(`Link to "${article.title}" copied to clipboard!`);
    });
  };

  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    if (selectedArticle !== null) {
      const adjs = ["Agile", "Distributed", "Parallel", "Atomic", "Recursive", "Encrypted", "Buffered", "Stateless", "Optimized", "Reactive"];
      const nouns = ["Node", "Pipeline", "Schema", "Query", "Cluster", "Stream", "Log", "Metric", "Bit", "Validator"];
      setCurrentUserName(`${adjs[Math.floor(Math.random() * adjs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`);
    } else {
      // Cancel TTS if closed
      if (synth) synth.cancel();
      setIsReading(false);
      setIsPaused(false);
    }
  }, [selectedArticle, synth]);

  const addComment = (id: number) => {
    if (!commentText.trim()) return;
    const newComment = { name: currentUserName, text: commentText, date: "Just now" };
    setArticleComments(prev => ({ ...prev, [id]: [newComment, ...(prev[id] || [])] }));
    setCommentText("");
    
    const adjs = ["Agile", "Distributed", "Parallel", "Atomic", "Recursive", "Encrypted", "Buffered", "Stateless", "Optimized", "Reactive"];
    const nouns = ["Node", "Pipeline", "Schema", "Query", "Cluster", "Stream", "Log", "Metric", "Bit", "Validator"];
    setCurrentUserName(`${adjs[Math.floor(Math.random() * adjs.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`);
  };

  // TTS Logic
  const handleTTS = () => {
    if (!synth || !activeArticle) return;
    
    if (isReading) {
      if (isPaused) {
        synth.resume();
        setIsPaused(false);
      } else {
        synth.pause();
        setIsPaused(true);
      }
      return;
    }

    const fullText = `${activeArticle.title}. ${activeArticle.excerpt}. ${(activeArticle.content || []).join(". ")}`;
    const utterance = new SpeechSynthesisUtterance(fullText);
    
    // Choose a good English voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en-') && v.name.includes('Google')) || voices.find(v => v.lang.includes('en-'));
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 1.05;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsReading(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
    setIsReading(true);
    setIsPaused(false);
  };

  const stopTTS = () => {
    if (synth) {
      synth.cancel();
      setIsReading(false);
      setIsPaused(false);
    }
  };


  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="w-full">
      <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">{t.label}</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-4">{t.title}</h2>
      <p className="text-[14px] text-[var(--text-secondary)] opacity-50 mb-10">{t.desc}</p>

      {/* MAGAZINE LAYOUT */}
      <div className="flex flex-col gap-6">
        {/* Featured Post (Full Width) */}
        {featuredPost && (
          <TiltCard onClick={() => setSelectedArticle(featuredPost.id)} className="w-full group bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] overflow-hidden hover:border-[var(--accent)] transition-colors shadow-xl">
            <div className="relative aspect-[21/9] md:aspect-[21/7] overflow-hidden w-full">
               <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#000000e6] via-[#00000080] to-transparent" />
               <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {featuredPost.category}
                    </span>
                    <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">{featuredPost.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3 drop-shadow-lg max-w-3xl">
                    {featuredPost.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 line-clamp-2 max-w-2xl font-medium">
                    {featuredPost.excerpt}
                  </p>
               </div>
            </div>
          </TiltCard>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((article, i) => (
            <TiltCard key={article.id} onClick={() => setSelectedArticle(article.id)} className="group bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] transition-all shadow-lg flex flex-col h-full">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                 <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[var(--bg-card)]/80 backdrop-blur-md text-[var(--accent)] text-[9px] font-black uppercase tracking-widest rounded-full border border-[var(--border-subtle)]">
                      {article.category}
                    </span>
                 </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                 <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{article.date}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-secondary)] opacity-60">
                       <Heart size={10} className="text-[var(--accent)]" /> {likes[article.id] || 0}
                    </div>
                 </div>
                 <h3 className="text-[16px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-3 flex-1">
                    {article.title}
                 </h3>
                 <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                   {t.read} <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Full Page Article Reader */}
      <AnimatePresence>
        {selectedArticle !== null && activeArticle && (
          <div className="fixed inset-0 z-[5000] bg-[var(--bg-primary)] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full flex flex-col relative"
            >
              {/* Progress Bar */}
              <motion.div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--accent)] origin-left z-[5010]" style={{ scaleX }} />

              {/* Reader Header */}
              <div className="sticky top-0 z-[5005] bg-[var(--bg-primary)]/80 backdrop-blur-2xl border-b border-[var(--border-subtle)]">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                  <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[3px] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all">
                    <ArrowLeft size={16} /> {t.back}
                  </button>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleShare(activeArticle)} className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                      <Share2 size={16} />
                    </button>
                    <button onClick={() => setSelectedArticle(null)} className="p-2 bg-[var(--bg-secondary)] rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden" ref={readerRef}>
                <div className="max-w-3xl mx-auto px-6 py-12 lg:py-20 pb-40">
                  <header className="mb-12 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full">
                        {activeArticle.category}
                      </span>
                      <span className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] font-bold opacity-60 uppercase tracking-widest">
                        <Clock size={12} /> {activeArticle.readTime}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-[var(--text-primary)] leading-[1.1] tracking-tight">
                      {activeArticle.title}
                    </h1>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-black text-[var(--accent)] uppercase tracking-[0.3em] opacity-80">
                        {activeArticle.author ? `BY ${activeArticle.author} • ` : ''} {activeArticle.date}
                      </p>
                      
                      {/* TTS Controls Inside Header */}
                      <div className="flex items-center gap-2 bg-[var(--bg-secondary)] p-1 rounded-full border border-[var(--border-subtle)]">
                        <button onClick={handleTTS} className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isReading && !isPaused ? 'bg-[var(--accent)] text-black' : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'}`}>
                          {isReading && !isPaused ? <Volume2 size={12} className="animate-pulse" /> : <Play size={12} />}
                          {isReading && !isPaused ? "Playing" : isPaused ? "Resume" : "Listen"}
                        </button>
                        {(isReading || isPaused) && (
                          <button onClick={stopTTS} className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-full transition-colors mr-1">
                            <Square size={12} fill="currentColor" />
                          </button>
                        )}
                      </div>
                    </div>
                  </header>

                  <div className="relative w-full aspect-[21/10] rounded-[32px] overflow-hidden mb-16 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <Image src={activeArticle.image} alt={activeArticle.title} fill className="object-cover" />
                  </div>

                  <div className="prose prose-invert max-w-none space-y-8 mb-20">
                    {activeArticle.content ? (
                      activeArticle.content.map((para: string, i: number) => (
                        <p key={i} className="text-[18px] lg:text-[20px] text-[var(--text-primary)] opacity-[0.85] leading-[1.8] font-medium font-serif selection:bg-[var(--accent)] selection:text-black">
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="text-[18px] lg:text-[20px] text-[var(--text-primary)] opacity-[0.85] leading-[1.8] font-medium font-serif">
                        {activeArticle.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Key Points */}
                  {activeArticle.keyPoints && (
                    <div className="p-8 md:p-12 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-[32px] mb-20 relative overflow-hidden shadow-2xl">
                      <div className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-8">
                        <BookOpen size={16} /> {t.key_takeaways}
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {activeArticle.keyPoints.map((point: string, i: number) => (
                          <li key={i} className="space-y-3">
                            <span className="inline-block px-2 py-0.5 bg-[var(--accent)]/10 rounded text-[10px] font-black text-[var(--accent)] tracking-widest">0{i+1}</span>
                            <p className="text-[15px] text-[var(--text-primary)] font-bold leading-relaxed">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Discussion Section */}
                  <div id="discussion" className="border-t border-[var(--border-subtle)] pt-16">
                    <h3 className="text-[20px] font-black text-[var(--text-primary)] uppercase tracking-[0.1em] mb-12 flex items-center gap-3">
                      <MessageSquare size={20} className="text-[var(--accent)]" /> {t.discussion} ({(articleComments[activeArticle.id] || []).length})
                    </h3>
                    
                    {/* Comment Input */}
                    <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[24px] space-y-4 mb-12 shadow-inner focus-within:border-[var(--accent)]/50 transition-colors">
                      <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={t.add_thought}
                        className="w-full bg-transparent border-none text-[var(--text-primary)] focus:ring-0 placeholder:text-[var(--text-secondary)]/30 resize-none min-h-[100px] text-[16px] outline-none"
                      />
                      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 mt-2">
                        <div className="flex items-center gap-3">
                          {generateAvatar(currentUserName)}
                          <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-60">
                            {t.posting_as} <span className="text-[var(--text-primary)]">{currentUserName}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => addComment(activeArticle.id)}
                          disabled={!commentText.trim()}
                          className="px-6 py-2.5 bg-[var(--accent)] text-black rounded-xl text-[11px] font-black uppercase tracking-widest disabled:opacity-30 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
                        >
                          {t.post_comment}
                        </button>
                      </div>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-8">
                      {(articleComments[activeArticle.id] || []).map((comment, i) => (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} key={i} className="flex gap-5">
                          <div className="shrink-0 pt-1">
                            {generateAvatar(comment.name)}
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="text-[14px] font-black text-[var(--text-primary)]">{comment.name}</span>
                              <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">{comment.date}</span>
                            </div>
                            <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed bg-[var(--bg-card)] p-4 rounded-2xl rounded-tl-none border border-[var(--border-subtle)] inline-block mt-2">
                              {comment.text}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING ACTION DOCK */}
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5020] flex items-center gap-2 p-2 bg-[var(--bg-primary)]/80 backdrop-blur-2xl border border-[var(--border-subtle)] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              >
                <button 
                  onClick={() => toggleLike(activeArticle.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${
                    hasLiked[activeArticle.id] 
                      ? "bg-[var(--accent)] text-black font-black" 
                      : "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white font-bold"
                  }`}
                >
                  <Heart size={18} fill={hasLiked[activeArticle.id] ? "currentColor" : "none"} className={hasLiked[activeArticle.id] ? "scale-110" : ""} />
                  <span className="text-[12px]">{likes[activeArticle.id]}</span>
                </button>
                <div className="w-px h-6 bg-[var(--border-subtle)]" />
                <button 
                  onClick={() => {
                    const el = document.getElementById("discussion");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white font-bold transition-all"
                >
                  <MessageSquare size={18} />
                  <span className="text-[12px]">{(articleComments[activeArticle.id] || []).length}</span>
                </button>
                <div className="w-px h-6 bg-[var(--border-subtle)]" />
                <button 
                  onClick={() => handleShare(activeArticle)}
                  className="flex items-center gap-2 px-5 py-3 rounded-full hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white font-bold transition-all"
                >
                  <Share2 size={18} />
                </button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

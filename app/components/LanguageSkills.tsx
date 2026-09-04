"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { 
  Languages, 
  Film, 
  BookOpen, 
  Mountain, 
  Headphones, 
  Flame, 
  Sparkles, 
  Compass, 
  Clapperboard, 
  Music
} from "lucide-react";

type TabKey = "languages" | "cinema" | "books" | "outdoors" | "music";

export default function LanguageSkills() {
  const { language } = useLanguage();
  const t = translations[language].languageSkills;

  // Default active tab is Languages (first one)
  const [activeTab, setActiveTab] = useState<TabKey>("languages");
  const [adminLangs, setAdminLangs] = useState<any[]>([]);
  const [adminMovies, setAdminMovies] = useState<any[]>([]);
  const [adminBooks, setAdminBooks] = useState<any[]>([]);

  // Duolingo dynamic states
  const [duoStreak, setDuoStreak] = useState<number | null>(null);
  const [duoTotalXp, setDuoTotalXp] = useState<number>(0);
  const [duoLoading, setDuoLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateAdminData = async () => {
      try {
        const resLangs = await fetch("/api/data/admin?key=admin-languages");
        if (resLangs.ok) {
          const { data } = await resLangs.json();
          if (data && data.length > 0) setAdminLangs(data);
        }
        const resMovies = await fetch("/api/data/admin?key=admin-movies");
        if (resMovies.ok) {
          const { data } = await resMovies.json();
          if (data && data.length > 0) setAdminMovies(data);
        }
        const resBooks = await fetch("/api/data/admin?key=admin-books");
        if (resBooks.ok) {
          const { data } = await resBooks.json();
          if (data && data.length > 0) setAdminBooks(data);
        }
      } catch (err) {
        const storedLangs = localStorage.getItem("admin-languages");
        if (storedLangs) setAdminLangs(JSON.parse(storedLangs));
        const storedMovies = localStorage.getItem("admin-movies");
        if (storedMovies) setAdminMovies(JSON.parse(storedMovies));
        const storedBooks = localStorage.getItem("admin-books");
        if (storedBooks) setAdminBooks(JSON.parse(storedBooks));
      }
    };

    updateAdminData();
    window.addEventListener("admin-updated", updateAdminData);
    return () => window.removeEventListener("admin-updated", updateAdminData);
  }, []);

  // Fetch live Duolingo data
  useEffect(() => {
    const fetchDuolingo = async () => {
      try {
        const res = await fetch("/api/duolingo");
        if (res.ok) {
          const data = await res.json();
          setDuoStreak(data.streak);
          setDuoTotalXp(data.totalXp);
        }
      } catch (error) {
        console.error("Failed to fetch Duolingo stats:", error);
      } finally {
        setDuoLoading(false);
      }
    };

    fetchDuolingo();
  }, []);

  // Default languages
  const defaultLanguages = [
    { name: "English", flag: "us", level: 95, cefr: "C2 (Fluent / Professional)", note: "Primary working & writing medium" },
    { name: "German", flag: "de", level: 70, cefr: "B1 / B2 (Intermediate)", note: "Active daily practice & Duolingo focus" },
    { name: "Spanish", flag: "es", level: 50, cefr: "A2 (Elementary)", note: "Conversational exploration & reading" },
    { name: "French", flag: "fr", level: 60, cefr: "A2 / B1 (Learning)", note: "Grammar & vocabulary foundations" }
  ];

  const languages = adminLangs.length > 0 ? adminLangs : defaultLanguages;

  // Cinema: Favorite Nolan & Sci-Fi Masterpieces
  const favoriteMovies = [
    {
      title: "Interstellar",
      year: "2014",
      director: "Christopher Nolan",
      quote: "Love is the one thing that transcends time and space.",
      theme: "General Relativity • Gargantua • The Tesseract • Human Grit",
      badge: "Masterpiece",
      border: "hover:border-amber-500/40"
    },
    {
      title: "Tenet",
      year: "2020",
      director: "Christopher Nolan",
      quote: "Don't try to understand it. Feel it.",
      theme: "Inverted Entropy • Temporal Mechanics • Non-Linear Reality",
      badge: "Mind-Bending",
      border: "hover:border-cyan-500/40"
    },
    {
      title: "2001: A Space Odyssey",
      year: "1968",
      director: "Stanley Kubrick",
      quote: "The mystery of human evolution and conscious artificial intelligence.",
      theme: "Cosmic Scale • The Monolith • HAL 9000 • Transhumanism",
      badge: "Visionary",
      border: "hover:border-purple-500/40"
    },
    {
      title: "The Dark Knight Trilogy",
      year: "2005–2012",
      director: "Christopher Nolan",
      quote: "Why do we fall? So we can learn to pick ourselves up.",
      theme: "Moral Philosophy • Order vs Chaos • Incorruptible Resolve",
      badge: "Classic",
      border: "hover:border-emerald-500/40"
    }
  ];

  const movies = adminMovies.length > 0 ? adminMovies : favoriteMovies;

  // Books: Literature & Authors
  const influentialBooks = [
    {
      title: "Sapiens & Homo Deus",
      author: "Yuval Noah Harari",
      category: "Macro-History & Human Systems",
      takeaway: "Deep exploration of how shared fictions, cognitive revolutions, and algorithmic dataism shape human civilizations.",
      tag: "Foundational",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      category: "Financial Mindset & Assets",
      takeaway: "Transforming how one views capital, asset building, financial literacy, and escaping reactive financial loops.",
      tag: "Mindset Shift",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      title: "The Alchemist & Philosophical Works",
      author: "Paulo Coelho",
      category: "Philosophy & Personal Legends",
      takeaway: "The universal language of perseverance, listening to intuition, and the transformative power of pursuing one's true quest.",
      tag: "Philosophy",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    }
  ];

  const books = adminBooks.length > 0 ? adminBooks : influentialBooks;

  // Mountaineering & Outdoors
  const outdoorPillars = [
    {
      title: "High Altitude Summits",
      desc: "Trekking through demanding alpine elevations (4,000m+ passes) where grit, route discipline, and cold resilience are tested.",
      icon: <Mountain size={20} className="text-[var(--accent)]" />,
      metric: "4,000m+ Altitudes"
    },
    {
      title: "Endurance & Trail Mindset",
      desc: "Long-distance trekking translates directly to software engineering: pacing yourself through complexity, calculating risks, and persevering to the top.",
      icon: <Compass size={20} className="text-emerald-400" />,
      metric: "Calculated Grit"
    },
    {
      title: "Unplugged Problem Solving",
      desc: "Stepping away from screens into rugged terrain provides absolute mental clarity and novel perspectives for system architectures.",
      icon: <Sparkles size={20} className="text-amber-400" />,
      metric: "Deep Clarity"
    }
  ];

  // Soundscape / Music
  const soundscapeItems = [
    {
      title: "Cinematic Film Scores",
      artists: "Hans Zimmer & Ludwig Göransson",
      highlight: "Interstellar ('No Time for Caution'), Inception ('Time'), Oppenheimer",
      vibe: "High Stakes & Epic Focus",
      icon: <Clapperboard size={18} className="text-cyan-400" />
    },
    {
      title: "Deep Ambient & Lofi Frequencies",
      artists: "Synthwave / Dark Ambient / Chillhop",
      highlight: "Continuous flow state background beats without vocal distractions",
      vibe: "Zero Interruption Coding",
      icon: <Headphones size={18} className="text-purple-400" />
    }
  ];

  const tabs = [
    { key: "languages" as TabKey, label: "Languages", icon: <Languages size={15} /> },
    { key: "cinema" as TabKey, label: "Cinema (Nolan)", icon: <Film size={15} /> },
    { key: "books" as TabKey, label: "Bookshelf", icon: <BookOpen size={15} /> },
    { key: "outdoors" as TabKey, label: "Mountaineering", icon: <Mountain size={15} /> },
    { key: "music" as TabKey, label: "Soundscapes", icon: <Music size={15} /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center gap-4 py-2">
      
      {/* 1. TOP TITLE */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[var(--border-subtle)] text-[var(--accent)] font-bold text-[10px] uppercase tracking-widest bg-white/[0.01]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          Beyond The Code
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
          Languages, Passions & <span className="text-[var(--accent)]">Mental Models</span>
        </h3>
        <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] font-medium max-w-2xl mx-auto">
          The linguistic disciplines, cinematic philosophies, influential literature, and alpine trails that shape my perspective.
        </p>
      </div>

      {/* 2. CATEGORY TABS (Right below title, centered) */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] border border-white/10 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-bold tracking-wide transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[var(--accent)] text-black shadow-md font-black scale-[1.02]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.05]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CARDS BELOW TABS (Only active category displayed) */}
      <div className="min-h-[260px]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LANGUAGES (Default Open) */}
          {activeTab === "languages" && (
            <motion.div
              key="tab-languages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {languages.map((lang: any, idx: number) => {
                  const proficiency = Math.round((lang.level || 0) / 10);
                  const flagUrl = lang.flag?.includes("http") || lang.flag?.includes("data:image")
                    ? lang.flag
                    : `https://flagcdn.com/w40/${lang.flag || "us"}.png`;

                  return (
                    <motion.div
                      key={lang.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="flex flex-col justify-between p-3.5 bg-white/[0.02] border border-white/10 rounded-xl hover:border-[var(--accent)]/30 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-6 rounded overflow-hidden border border-white/10 shrink-0 flex items-center justify-center bg-black/40">
                            <img src={flagUrl} alt={lang.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-[13px] font-black text-[var(--text-primary)] leading-none">
                              {lang.name}
                            </h4>
                            <span className="text-[10px] text-[var(--text-muted)] font-medium">
                              {lang.cefr || (lang.level >= 80 ? "Advanced" : "Intermediate")}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-black text-[var(--accent)] px-2 py-0.5 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                          {lang.level || 0}%
                        </span>
                      </div>

                      {/* Progress Dots */}
                      <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-white/5">
                        <span className="text-[9px] text-[var(--text-muted)]">Fluency Scale</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                i < proficiency ? "bg-[#00e87a]" : "bg-white/15"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Duolingo Streak Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-[#ff9600]/10 via-white/[0.02] to-transparent border border-[#ff9600]/20 rounded-xl relative overflow-hidden group hover:border-[#ff9600]/40 transition-all">
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#ff9600]/15 text-[#ff9600] flex items-center justify-center border border-[#ff9600]/30 shadow-sm shrink-0">
                    {duoLoading ? (
                      <div className="w-4 h-4 border-2 border-[#ff9600]/30 border-t-[#ff9600] rounded-full animate-spin" />
                    ) : (
                      <Flame size={20} className="animate-pulse" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-black text-[var(--text-primary)] flex items-center gap-1.5">
                      {duoStreak !== null ? `${duoStreak} Days` : "600+ Days"} {t.duolingoStreak}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                      Continuous German & multi-language micro-learning journey
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#58cc02] bg-[#58cc02]/10 px-2.5 py-1 rounded-lg border border-[#58cc02]/20 flex items-center gap-1">
                    Duolingo Live
                  </span>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {duoStreak !== null ? `${duoTotalXp.toLocaleString()} Total XP` : t.nextMilestone}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: CINEMA & NOLAN */}
          {activeTab === "cinema" && (
            <motion.div
              key="tab-cinema"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {movies.map((movie, idx) => (
                <motion.div
                  key={movie.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group relative p-4 bg-white/[0.02] border border-white/10 rounded-xl ${movie.border} hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 border border-white/10 text-[var(--text-primary)]">
                        {movie.year} • {movie.director}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent)]">
                        {movie.badge}
                      </span>
                    </div>

                    <h4 className="text-[15px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {movie.title}
                    </h4>

                    <p className="text-[11px] text-[var(--text-secondary)] italic my-2 pl-2 border-l-2 border-[var(--accent)]/40 leading-relaxed font-serif">
                      "{movie.quote}"
                    </p>
                  </div>

                  <div className="pt-2 mt-1 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-[var(--text-muted)] font-medium">
                      {movie.theme}
                    </span>
                    <Clapperboard size={13} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors shrink-0" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 3: BOOKSHELF */}
          {activeTab === "books" && (
            <motion.div
              key="tab-books"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              {books.map((book, idx) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${book.color}`}>
                        {book.tag}
                      </span>
                      <BookOpen size={14} className="text-[var(--text-muted)]" />
                    </div>

                    <h4 className="text-[14px] font-black text-[var(--text-primary)] leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-[11px] text-[var(--accent)] font-bold mb-2">
                      {book.author}
                    </p>

                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                      {book.takeaway}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/5 text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {book.category}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 4: MOUNTAINEERING */}
          {activeTab === "outdoors" && (
            <motion.div
              key="tab-outdoors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              {outdoorPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {pillar.icon}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/20">
                        {pillar.metric}
                      </span>
                    </div>

                    <h4 className="text-[13px] font-black text-[var(--text-primary)] mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TAB 5: SOUNDSCAPES */}
          {activeTab === "music" && (
            <motion.div
              key="tab-music"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {soundscapeItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-wider">
                          {item.vibe}
                        </span>
                      </div>

                      {/* Animated Equalizer Wave */}
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-0.5 h-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-0.5 h-2/3 bg-[var(--accent)] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-0.5 h-full bg-[var(--accent)] animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="w-0.5 h-1/2 bg-[var(--accent)] animate-bounce" style={{ animationDelay: '450ms' }} />
                      </div>
                    </div>

                    <h4 className="text-[14px] font-black text-[var(--text-primary)] mt-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[var(--accent)] font-bold mb-1">
                      {item.artists}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed font-medium">
                      {item.highlight}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


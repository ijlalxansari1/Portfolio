"use client";

import { motion } from "framer-motion";
import { Globe, ListChecks } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { useState, useEffect } from "react";

const defaultLanguages = [
  { name: "English", level: 90, flag: "gb" },
  { name: "Deutsch", level: 20, flag: "de" },
];

const defaultPractices = [
  "DWH & DB Concepts",
  "Data Analytics Engineering",
  "Data Preparation",
  "Oracle SQL",
  "Data Integration",
  "Data Provisioning",
  "Data Solution Architecture",
  "ETL/ELT Solutions"
];

export default function LanguageSkills() {
  const { language } = useLanguage();
  const t = translations[language].languageSkills;
  const [languages, setLanguages] = useState(defaultLanguages);
  const [practices, setPractices] = useState(defaultPractices);
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      const savedLangs = localStorage.getItem("admin-languages");
      const savedPractices = localStorage.getItem("admin-practices");
      if (savedLangs) setLanguages(JSON.parse(savedLangs));
      if (savedPractices) setPractices(JSON.parse(savedPractices));
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  useEffect(() => {
    fetch("/api/duolingo")
      .then((res) => res.json())
      .then((data) => {
        if (data.streak) {
          setStreak(data.streak);
        }
      })
      .catch((err) => console.error("Error fetching Duolingo streak:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
      {/* Languages Column */}
      <div>
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]">
             <Globe size={18} />
           </div>
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] px-4 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-full">
             {t.title}
           </span>
        </div>

        <div className="space-y-3">
          {languages.map((lang, idx) => (
            <motion.div 
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex items-center gap-5 p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/30 transition-all"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden shadow-sm group-hover:border-[var(--accent)]/50 transition-colors">
                <Image 
                  src={`https://flagcdn.com/w80/${lang.flag}.png`} 
                  alt={lang.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] font-bold text-[var(--text-primary)] truncate flex items-center gap-2">
                    {lang.name}
                    {lang.name === "Deutsch" && (
                      <span className="inline-flex items-center gap-1 text-[8px] font-black px-2 py-0.5 rounded-full bg-[#58cc02]/10 text-[#58cc02] border border-[#58cc02]/20 uppercase tracking-wider animate-pulse">
                        Duolingo Active
                      </span>
                    )}
                  </span>
                  <span className="text-[12px] font-black text-[var(--text-secondary)] opacity-50">{lang.level}%</span>
                </div>
                <div className="flex gap-1 overflow-hidden">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 shrink-0 ${
                        i < lang.level / 10 
                        ? "bg-[var(--accent)] shadow-[0_0_8px_rgba(var(--accent-rgb),0.4)]" 
                        : "bg-[var(--text-secondary)]/10"
                      }`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Duolingo Streak Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 group relative overflow-hidden p-6 bg-[var(--bg-primary)]/80 backdrop-blur-xl border border-[var(--border-subtle)] rounded-3xl hover:border-[#58cc02]/40 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(88,204,2,0.06)]"
        >
          {/* Background accent glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#58cc02]/5 rounded-full blur-3xl group-hover:bg-[#58cc02]/10 transition-all pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Duolingo Mascot Icon Container */}
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#58cc02]/10 border border-[#58cc02]/20 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6 text-[#58cc02] group-hover:animate-bounce" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-black tracking-wide text-[var(--text-primary)] uppercase">Duolingo</h4>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#58cc02]/10 text-[#58cc02] border border-[#58cc02]/20 uppercase tracking-widest">
                      {t.learningJourney || "Learning Journey"}
                    </span>
                  </div>
                  <p className="text-[12px] font-bold text-[var(--text-secondary)] mt-0.5">@ijlal_ansari</p>
                </div>
              </div>

              {/* Streak Badge with Glowing Flame */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl shadow-sm">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M17.66 11.57c-.77-3.9-3.99-6.47-7.66-7.57a1 1 0 00-1.2 1.4c1.1 2.2 1.1 4.5-.4 6.7-1.2 1.8-2.6 3.6-2.6 6.3 0 4.43 3.58 8 8 8s8-3.57 8-8c0-2.45-1.57-4.9-4.14-6.83z" />
                    </svg>
                  </span>
                </span>
                <span id="streak-display" className="text-[14px] font-black text-orange-500 tracking-wide flex items-center gap-1">
                  🔥 {streak !== null ? `${streak}-${t.duolingoStreak || "day streak"}` : `602-${t.duolingoStreak || "day streak"}`}
                </span>
              </div>
            </div>

            {/* Premium Progress Bar towards Next Milestone */}
            <div className="mt-2 pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex justify-between items-center mb-1.5 text-[11px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
                <span>{t.nextMilestone || "Next Milestone: 700 Days"}</span>
                <span className="text-[#58cc02]">{Math.round(Math.min(100, Math.max(0, ((streak || 602) / 700) * 100)))}%</span>
              </div>
              <div className="h-2 w-full bg-[var(--text-secondary)]/10 rounded-full overflow-hidden p-[1px] border border-[var(--border-subtle)]">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.round(Math.min(100, Math.max(0, ((streak || 602) / 700) * 100)))}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#58cc02] to-[#8cff33] rounded-full shadow-[0_0_8px_rgba(88,204,2,0.4)]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Engineering Practices Column */}
      <div>
        <div className="flex items-center gap-3 mb-8">
           <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]">
             <ListChecks size={18} />
           </div>
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] px-4 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-full">
             {t.practices}
           </span>
        </div>

        <div className="space-y-3">
          {practices.map((practice, idx) => (
            <motion.div 
              key={practice}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between gap-4 group p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/30 transition-all"
            >
              <span className="text-[14px] font-bold text-[var(--text-primary)] truncate">
                {practice}
              </span>
              <div className="w-6 h-6 shrink-0 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 group-hover:bg-[var(--accent)] group-hover:text-[var(--bg-primary)] transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

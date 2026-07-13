"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { Languages, ListChecks } from "lucide-react";

export default function LanguageSkills() {
  const { language } = useLanguage();
  const t = translations[language].languageSkills;

  const [adminLangs, setAdminLangs] = useState<any[]>([]);
  const [practices, setPractices] = useState<string[]>([
    "DWH & DB Concepts", "Data Analytics Engineering", "Data Preparation",
    "Oracle SQL", "Data Integration", "Data Provisioning",
    "Data Solution Architecture", "ETL/ELT Solutions"
  ]);

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
      } catch (err) {
        const storedLangs = localStorage.getItem("admin-languages");
        if (storedLangs) setAdminLangs(JSON.parse(storedLangs));
      }

      try {
        const resPrac = await fetch("/api/data/admin?key=admin-practices");
        if (resPrac.ok) {
          const { data } = await resPrac.json();
          if (data && data.length > 0) setPractices(data);
        }
      } catch (err) {
        const storedPractices = localStorage.getItem("admin-practices");
        if (storedPractices) setPractices(JSON.parse(storedPractices));
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
    { name: "English", flag: "us", level: 90 },
    { name: "German", flag: "de", level: 70 },
    { name: "Spanish", flag: "es", level: 60 },
    { name: "French", flag: "fr", level: 70 }
  ];

  const languages = adminLangs.length > 0 ? adminLangs : defaultLanguages;

  return (
    <div className="w-full space-y-12">
      
      {/* Languages Section */}
      <div className="w-full space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20">
            <Languages size={18} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] px-4 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-full">
            Languages
          </span>
        </div>
        
        <div className="space-y-5">
          {languages.map((lang: any, idx: number) => {
            const proficiency = Math.round((lang.level || 0) / 10); // Convert to 0-10 scale for dots
            const flagUrl = lang.flag?.includes('http') || lang.flag?.includes('data:image') 
              ? lang.flag 
              : `https://flagcdn.com/w40/${lang.flag || 'us'}.png`;
            
            return (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between gap-6 p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/30 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-[var(--border-subtle)] shrink-0 flex items-center justify-center bg-[var(--bg-secondary)]">
                    <img src={flagUrl} alt={lang.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[14px] font-bold text-[var(--text-primary)] min-w-[80px]">
                    {lang.name}
                  </span>
                </div>

                {/* Progress Dots */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i < proficiency 
                          ? 'bg-[#00e87a]' 
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[13px] font-black text-[var(--accent)] min-w-[45px] text-right">
                  {lang.level || 0}%
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Duolingo Streak Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl relative overflow-hidden mt-6 hover:border-[#58cc02]/30 transition-colors group"
        >
          {/* Background Duolingo logo watermark */}
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
            <Image src="https://cdn.simpleicons.org/duolingo/white" alt="Duolingo" width={100} height={100} unoptimized />
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#58cc02]/10 text-[#58cc02] flex items-center justify-center border border-[#58cc02]/30 shadow-[0_0_15px_rgba(88,204,2,0.15)] group-hover:scale-105 transition-transform">
              {duoLoading ? (
                <div className="w-5 h-5 border-2 border-[#58cc02]/30 border-t-[#58cc02] rounded-full animate-spin"></div>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" fill="currentColor" fillOpacity="0.2"/>
                </svg>
              )}
            </div>
            <div>
              <h4 className="text-[14px] font-black text-[var(--text-primary)] flex items-center gap-2">
                {duoStreak !== null ? `${duoStreak}` : "600+"} {t.duolingoStreak}
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                {t.learningJourney}
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col sm:items-end gap-1.5 mt-2 sm:mt-0">
            <span className="w-fit text-[10px] font-black uppercase tracking-widest text-[#58cc02] bg-[#58cc02]/10 px-3 py-1 rounded-full border border-[#58cc02]/20 shadow-[0_0_10px_rgba(88,204,2,0.1)]">
              Duolingo
            </span>
            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              {duoStreak !== null ? `Total XP: ${duoTotalXp}` : t.nextMilestone}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Engineering Practices Section */}
      <div className="w-full space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20">
            <ListChecks size={18} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] px-4 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-full">
            Engineering Practices
          </span>
        </div>

        <div className="space-y-3">
          {practices.map((practice, idx) => (
            <motion.div 
              key={practice}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-center gap-3 p-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--accent)]/30 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e87a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span className="text-[13px] font-bold text-[var(--text-primary)]">
                {practice}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


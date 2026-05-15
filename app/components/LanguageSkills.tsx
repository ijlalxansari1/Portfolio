"use client";

import { motion } from "framer-motion";
import { Globe, ListChecks } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { useState, useEffect } from "react";

const defaultLanguages = [
  { name: "English", level: 90, flag: "gb" },
  { name: "Spanish", level: 60, flag: "es" },
  { name: "Italian", level: 30, flag: "it" },
  { name: "French", level: 70, flag: "fr" },
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
                  <span className="text-[14px] font-bold text-[var(--text-primary)] truncate">{lang.name}</span>
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

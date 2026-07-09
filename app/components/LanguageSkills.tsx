"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Languages, ListChecks } from "lucide-react";

export default function LanguageSkills() {
  const [adminLangs, setAdminLangs] = useState<any[]>([]);
  const [practices, setPractices] = useState<string[]>([
    "DWH & DB Concepts", "Data Analytics Engineering", "Data Preparation",
    "Oracle SQL", "Data Integration", "Data Provisioning",
    "Data Solution Architecture", "ETL/ELT Solutions"
  ]);

  useEffect(() => {
    const updateAdminData = () => {
      const storedLangs = localStorage.getItem("admin-languages");
      if (storedLangs) setAdminLangs(JSON.parse(storedLangs));

      const storedPractices = localStorage.getItem("admin-practices");
      if (storedPractices) setPractices(JSON.parse(storedPractices));
    };

    updateAdminData();
    window.addEventListener("admin-updated", updateAdminData);
    return () => window.removeEventListener("admin-updated", updateAdminData);
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


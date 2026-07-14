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
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl relative overflow-hidden mt-6 hover:border-[#58cc02]/40 transition-all group"
        >
          {/* Authentic Duolingo Owl Watermark */}
          <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none text-[#58cc02]">
            <svg viewBox="0 0 24 24" fill="currentColor" width="140" height="140">
              <path d="M12.005 0a8.04 8.04 0 0 0-4.048.975A6.096 6.096 0 0 0 6.64 0a6.046 6.046 0 0 0-6.042 6.047 6.075 6.075 0 0 0 1.252 3.693c-.496 1.4-.737 2.87-.737 4.364 0 3.738 1.765 6.837 4.475 8.441a5.617 5.617 0 0 0 1.984.77v.64c0 .888.646 1.624 1.503 1.76l2.916.488a1.76 1.76 0 0 0 2.03-1.737v-1.121a10.662 10.662 0 0 0 2.03.111 10.378 10.378 0 0 0 1.94-.108v1.121c0 1.05.908 1.868 1.948 1.732l3-.497c.866-.144 1.516-.885 1.516-1.78v-.643a5.6 5.6 0 0 0 1.964-.785C23.11 20.916 24 17.82 24 14.104c0-1.508-.246-2.983-.75-4.385a6.07 6.07 0 0 0 1.254-3.672 6.046 6.046 0 0 0-6.046-6.047 6.097 6.097 0 0 0-1.32.146 8.053 8.053 0 0 0-5.133-1.12zm-3.11 7.234a2.222 2.222 0 0 1 2.213 2.226 2.222 2.222 0 0 1-2.213 2.213 2.222 2.222 0 0 1-2.213-2.213 2.222 2.222 0 0 1 2.214-2.226zm6.22 0a2.222 2.222 0 0 1 2.214 2.226 2.222 2.222 0 0 1-2.214 2.213 2.222 2.222 0 0 1-2.213-2.213 2.222 2.222 0 0 1 2.214-2.226zM12 17.29c1.69 0 3.012-.662 4.148-1.517.29-.22.695-.145.894.167l.487.766a.653.653 0 0 1-.16.924C16.035 18.665 14.343 19.5 12 19.5c-2.342 0-4.035-.835-5.369-1.87a.655.655 0 0 1-.16-.924l.487-.766a.656.656 0 0 1 .894-.167C9.01 16.634 10.334 17.29 12 17.29z" />
            </svg>
          </div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-[52px] h-[52px] rounded-2xl bg-[#ff9600]/10 text-[#ff9600] flex items-center justify-center border border-[#ff9600]/30 shadow-[0_0_20px_rgba(255,150,0,0.15)] group-hover:scale-105 transition-transform">
              {duoLoading ? (
                <div className="w-5 h-5 border-2 border-[#ff9600]/30 border-t-[#ff9600] rounded-full animate-spin"></div>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.66 22.88c5.12 0 9.14-3.9 9.14-8.91 0-2.51-1.21-5.11-2.81-6.93-.66-.75-1.84-.57-2.07.41-.43 1.95-1.8 3.25-3.6 3.59-.84.22-1.63-.5-1.42-1.37.75-2.71.3-5.6-1.42-8.02-.51-.76-1.75-.75-2.22.04-2.48 3.8-4.09 6.94-4.09 10.08 0 1.28.32 2.53.86 3.6-1.5-.96-2.38-2.57-2.38-4.32 0-.85-.98-1.34-1.62-.77-3.08 2.66-3.51 4.74-3.51 6.69 0 3.9 3.14 7.02 7.18 7.02 1.63 0 3.03-.53 4.23-1.5 1.07-1 2.39-1.5 3.68-1.5z" />
                </svg>
              )}
            </div>
            <div>
              <h4 className="text-[16px] font-black text-[var(--text-primary)] flex items-center gap-2">
                {duoStreak !== null ? `${duoStreak}` : "600+"} {t.duolingoStreak}
              </h4>
              <p className="text-[12px] text-[var(--text-secondary)] font-medium mt-0.5">
                {t.learningJourney}
              </p>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col sm:items-end gap-2 mt-4 sm:mt-0">
            <span className="w-fit text-[11px] font-black uppercase tracking-[0.15em] text-[#58cc02] bg-[#58cc02]/10 px-4 py-1.5 rounded-xl border border-[#58cc02]/20 shadow-[0_0_15px_rgba(88,204,2,0.1)] flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M12.005 0a8.04 8.04 0 0 0-4.048.975A6.096 6.096 0 0 0 6.64 0a6.046 6.046 0 0 0-6.042 6.047 6.075 6.075 0 0 0 1.252 3.693c-.496 1.4-.737 2.87-.737 4.364 0 3.738 1.765 6.837 4.475 8.441a5.617 5.617 0 0 0 1.984.77v.64c0 .888.646 1.624 1.503 1.76l2.916.488a1.76 1.76 0 0 0 2.03-1.737v-1.121a10.662 10.662 0 0 0 2.03.111 10.378 10.378 0 0 0 1.94-.108v1.121c0 1.05.908 1.868 1.948 1.732l3-.497c.866-.144 1.516-.885 1.516-1.78v-.643a5.6 5.6 0 0 0 1.964-.785C23.11 20.916 24 17.82 24 14.104c0-1.508-.246-2.983-.75-4.385a6.07 6.07 0 0 0 1.254-3.672 6.046 6.046 0 0 0-6.046-6.047 6.097 6.097 0 0 0-1.32.146 8.053 8.053 0 0 0-5.133-1.12zm-3.11 7.234a2.222 2.222 0 0 1 2.213 2.226 2.222 2.222 0 0 1-2.213 2.213 2.222 2.222 0 0 1-2.213-2.213 2.222 2.222 0 0 1 2.214-2.226zm6.22 0a2.222 2.222 0 0 1 2.214 2.226 2.222 2.222 0 0 1-2.214 2.213 2.222 2.222 0 0 1-2.213-2.213 2.222 2.222 0 0 1 2.214-2.226zM12 17.29c1.69 0 3.012-.662 4.148-1.517.29-.22.695-.145.894.167l.487.766a.653.653 0 0 1-.16.924C16.035 18.665 14.343 19.5 12 19.5c-2.342 0-4.035-.835-5.369-1.87a.655.655 0 0 1-.16-.924l.487-.766a.656.656 0 0 1 .894-.167C9.01 16.634 10.334 17.29 12 17.29z" />
              </svg>
              Duolingo
            </span>
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
              {duoStreak !== null ? `Total XP: ${duoTotalXp}` : t.nextMilestone}
            </span>
          </div>
        </motion.div>
      </div>


    </div>
  );
}


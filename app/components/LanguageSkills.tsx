"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ListChecks } from "lucide-react";

export default function LanguageSkills() {
  const [duoData, setDuoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adminLangs, setAdminLangs] = useState<any[]>([]);
  const [practices, setPractices] = useState<string[]>([
    "DWH & DB Concepts", "Data Analytics Engineering", "Data Preparation",
    "Oracle SQL", "Data Integration", "Data Provisioning",
    "Data Solution Architecture", "ETL/ELT Solutions"
  ]);

  // Fallback data in case API fails
  const data = duoData || {
    streak: 0,
    username: "",
    name: "",
    picture: "https://github.com/ijlal-ansari.png",
    totalXp: 0,
    joinedDate: "",
    languages: []
  };

  useEffect(() => {
    fetch("/api/duolingo")
      .then((res) => res.json())
      .then((d) => {
        setDuoData(d);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Duolingo data:", err);
        setLoading(false);
      });

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

  const flagMap: Record<string, string> = {
    en: "us",
    de: "de",
    ko: "kr",
    ru: "ru"
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-20">
      
      {/* Exact Duolingo Clone Card */}
      <div className="w-full flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full max-w-[420px] bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#e5e5e5] flex flex-col font-sans mx-auto"
        >
          {/* Top Banner with Blue Background and Yellow Shape */}
          <div className="relative h-24 bg-[#3B5998] w-full overflow-hidden flex justify-center">
             <div className="absolute bottom-0 w-32 h-16 bg-[#FFC800]" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div>
          </div>

          <div className="px-6 py-4 flex flex-col relative">
            {/* Profile Info */}
            <h2 className="text-[#3c3c3c] text-[26px] font-bold tracking-tight leading-tight">{data.name}</h2>
            <p className="text-[#afafaf] text-[15px] font-medium">{data.username}</p>
            <p className="text-[#777777] text-[15px] mt-1 font-medium">Joined {data.joinedDate}</p>

            {/* Social & Flags */}
            <div className="flex items-center justify-end mt-4">
              <div className="flex items-center gap-1.5">
                {data.languages?.map((lang: any) => {
                  const adminMatch = adminLangs.find(a => a.name.toLowerCase() === lang.id.toLowerCase() || a.name.toLowerCase() === lang.title?.toLowerCase());
                  const flagUrl = adminMatch 
                    ? (adminMatch.flag.includes('http') || adminMatch.flag.includes('data:image') ? adminMatch.flag : `https://flagcdn.com/w40/${adminMatch.flag}.png`)
                    : `https://flagcdn.com/w40/${flagMap[lang.id] || lang.id}.png`;

                  return (
                    <Image 
                      key={lang.id} 
                      src={flagUrl} 
                      alt={lang.title} 
                      width={28} 
                      height={20} 
                      unoptimized={flagUrl.includes('http') || flagUrl.includes('data:image')}
                      className="rounded-[4px] border border-black/10 object-cover w-[28px] h-[20px]" 
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-full h-px bg-[#e5e5e5] my-6"></div>

            {/* Statistics */}
            <h3 className="text-[#3c3c3c] text-[22px] font-bold mb-4">Statistics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              
              {/* Streak Card */}
              <div className="relative bg-gradient-to-br from-[#FFC800] to-[#FF9600] rounded-2xl p-4 flex items-center justify-center gap-3 border-2 border-[#FFC800] shadow-[0_2px_0_#e59a00] hover:-translate-y-1 transition-transform cursor-pointer overflow-hidden group">
                <div className="absolute top-2 right-2 w-6 h-6 opacity-80 group-hover:rotate-90 transition-transform duration-500">
                  <svg viewBox="0 0 24 24" fill="white"><path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg>
                </div>
                <div className="absolute bottom-2 left-2 w-4 h-4 opacity-80 group-hover:-rotate-90 transition-transform duration-500">
                  <svg viewBox="0 0 24 24" fill="white"><path d="M12 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" /></svg>
                </div>
                <span className="text-[34px] filter drop-shadow-sm z-10 shrink-0">🔥</span>
                <div className="flex flex-col z-10 min-w-[70px]">
                  <span className="text-white text-[22px] font-bold leading-tight">{data.streak}</span>
                  <span className="text-white/90 text-[14px] font-medium whitespace-nowrap">Day streak</span>
                </div>
              </div>

              {/* Total XP Card */}
              <div className="bg-white rounded-2xl p-4 flex items-center justify-center gap-3 border-2 border-[#e5e5e5] shadow-[0_2px_0_#e5e5e5] hover:-translate-y-1 transition-transform cursor-pointer">
                <span className="text-[34px] filter drop-shadow-sm shrink-0">⚡</span>
                <div className="flex flex-col min-w-[70px]">
                  <span className="text-[#3c3c3c] text-[22px] font-bold leading-tight">{data.totalXp}</span>
                  <span className="text-[#afafaf] text-[14px] font-medium whitespace-nowrap">Total XP</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Engineering Practices Column */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]">
             <ListChecks size={18} />
           </div>
           <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] px-4 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-full">
             Engineering Practices
           </span>
        </div>

        <div className="space-y-4">
          {practices.map((practice, idx) => (
            <motion.div 
              key={practice}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between gap-4 group p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/30 transition-all shadow-sm hover:shadow-md"
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

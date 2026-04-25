"use client";

import { useState, useEffect } from "react";
import { Linkedin, Github, Twitter, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { trackEvent } from "./AnalyticsTracker";

interface LeftSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function LeftSidebar({ activeTab, onTabChange }: LeftSidebarProps) {
  const { language } = useLanguage();
  const t = translations[language].sidebar;
  
  const [streak, setStreak] = useState(602);
  const [titleIndex, setTitleIndex] = useState(0);
  const [availability, setAvailability] = useState<any>({
    status: language === 'en' ? "Available" : "Verfügbar",
    availableFrom: language === 'en' ? "Now" : "Jetzt"
  });

  useEffect(() => {
    fetch("/api/duolingo")
      .then(res => res.json())
      .then(data => {
        if (data.streak) setStreak(data.streak);
      })
      .catch(() => {});
  }, []);

  const titles = [
    language === 'en' ? "Data Engineer" : "Daten-Ingenieur",
    language === 'en' ? "AI Researcher" : "KI-Forscher",
    language === 'en' ? "Platform Architect" : "Plattform-Architekt",
    language === 'en' ? "Data Scientist" : "Datenwissenschaftler"
  ];

  useEffect(() => {
    const interval = setInterval(() => setTitleIndex((prev) => (prev + 1) % titles.length), 3000);
    const saved = localStorage.getItem("admin-availability");
    if (saved) setAvailability(JSON.parse(saved));

    const handleUpdate = () => {
      const updated = localStorage.getItem("admin-availability");
      if (updated) setAvailability(JSON.parse(updated));
    };
    window.addEventListener("admin-updated", handleUpdate);
    return () => {
      clearInterval(interval);
      window.removeEventListener("admin-updated", handleUpdate);
    };
  }, [titles.length]);

  const downloadResume = () => {
    trackEvent("cv_download");
    const link = document.createElement("a");
    link.href = "/ijlalansari.pdf";
    link.download = "Ijlal_Ansari_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const getStatusColor = () => {
    const status = availability.status.toLowerCase();
    if (status.includes("available") || status.includes("verfügbar")) return "var(--accent)";
    if (status.includes("busy") || status.includes("besetzt")) return "#ff5f56";
    return "#ffbd2e";
  };

  const getStatusLabel = () => {
    const status = availability.status.toLowerCase();
    if (status.includes("available") || status.includes("verfügbar")) return `${t.status_available} ${t.now}`;
    if (status.includes("busy") || status.includes("besetzt")) return `${t.status_busy}`;
    if (status.includes("away") || status.includes("abwesend")) return `${t.status_away}`;
    return availability.status;
  };

  return (
    <div className="sidebar w-full h-full flex flex-col bg-[var(--bg-card)] rounded-[28px] overflow-hidden shadow-2xl border border-[var(--border)] transition-all duration-400">
      
      <div 
        className="relative w-full overflow-hidden" 
        style={{ height: "55%", perspective: "1000px" }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
      >
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative h-full w-full">
          <Image
            src="/profile.png"
            alt="Ijlal Ansari" fill className="object-cover object-top" priority
          />
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-card)] to-transparent z-20" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-4 relative z-30">
        <div className="h-6 mb-3 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={titles[titleIndex]}
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-[0.25em]"
            >
              {titles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <h2 className="text-[30px] font-black text-white tracking-[-0.02em] mb-4 leading-none">Ijlal Ansari</h2>
        <div className="flex items-center gap-3 px-4 py-1.5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full mb-6 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full relative" style={{ backgroundColor: getStatusColor() }}>
            {(availability.status.toLowerCase().includes('available') || availability.status.toLowerCase().includes('verfügbar')) && (
              <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: getStatusColor() }} />
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">
            {getStatusLabel()}
          </span>
        </div>
        
        <div className="flex gap-3 mb-6">
          {[
            { Icon: Linkedin, href: "https://linkedin.com/in/ijlal-ansari-56b0371b0" },
            { Icon: Mail, href: "mailto:ansariijlal90@gmail.com" },
            { Icon: Twitter, href: "https://twitter.com/ijlalansari" },
            { Icon: Github, href: "https://github.com/ijlalxansari1" },
            { Icon: MessageSquare, href: "https://wa.me/93711880807" },
            { Icon: () => <span className="text-[16px] leading-none">🦉</span>, href: "https://www.duolingo.com/profile/ijlal_ansari" }
          ].map(({ Icon, href }: any, i: number) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-[#666] hover:text-[var(--accent)] hover:scale-110 transition-all shadow-lg">
              {typeof Icon === 'function' ? <Icon /> : <Icon size={16} />}
            </a>
          ))}
        </div>

        {/* Duolingo Streak Badge */}
        <a 
          href="https://www.duolingo.com/profile/ijlal_ansari" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 bg-orange-500/5 border border-orange-500/10 rounded-2xl mb-6 group hover:bg-orange-500/10 transition-all cursor-pointer"
        >
           <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:scale-110 transition-transform">
             <span className="text-sm">🔥</span>
           </div>
           <div className="text-left">
             <div className="text-[12px] font-black text-orange-500 leading-none">{streak}</div>
             <div className="text-[8px] font-black uppercase tracking-widest text-orange-500/50 leading-none mt-1">Day Streak</div>
           </div>
        </a>
      </div>

      <div className="w-full flex border-t border-[#222] h-[70px] bg-[#141414] mt-auto">
        <button 
          onClick={downloadResume}
          className="flex-1 flex items-center justify-center text-[10px] font-black text-[var(--accent)] hover:bg-[var(--accent)]/10 tracking-[0.15em] uppercase transition-all border-r border-[#222]"
        >
          {t.download_cv}
        </button>
        <button 
          onClick={() => {
            const panel = document.getElementById("content-scroll-panel");
            const target = document.getElementById("contact");
            if (panel && target) panel.scrollTo({ top: target.offsetTop, behavior: "smooth" });
          }}
          className="flex-1 flex items-center justify-center text-[10px] font-black text-[var(--accent)] hover:bg-[var(--accent)]/10 tracking-[0.15em] uppercase transition-all"
        >
          {t.contact_me}
        </button>
      </div>
    </div>
  );
}

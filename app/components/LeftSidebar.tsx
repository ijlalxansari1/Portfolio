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
  const [titleIndex, setTitleIndex] = useState(0);
  const [availability, setAvailability] = useState<any>({
    status: language === 'en' ? "Available" : "Verfügbar",
    availableFrom: language === 'en' ? "Now" : "Jetzt"
  });
  
  const titles = [
    language === 'en' ? "Data Engineer" : "Daten-Ingenieur",
    language === 'en' ? "AI Ethics Researcher" : "KI-Ethik-Forscher",
    language === 'en' ? "Pipeline Developer" : "Pipeline-Entwickler",
    language === 'en' ? "Platform Builder" : "Plattform-Entwickler"
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

  const getStatusColor = () => {
    const status = availability.status.toLowerCase();
    if (status.includes("available") || status.includes("verfügbar")) return "#00e87a";
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
    <div className="sidebar w-full h-auto lg:h-full flex flex-col bg-[var(--bg-card)] rounded-[28px] overflow-hidden shadow-2xl border border-[var(--border)] transition-all duration-400 pb-8 lg:pb-0">
      
      <div 
        className="relative w-full overflow-hidden px-5 pt-5" 
        style={{ height: 'auto', aspectRatio: '1/1.1' }}
      >
        <div className="relative h-full w-full rounded-2xl overflow-hidden border border-[var(--border)]">
          <Image
            src="/profile.png"
            alt="Ijlal Ansari - Junior Data Engineer & AI Ethics Researcher" fill className="object-cover object-center" priority
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-card)] to-transparent z-20" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center -mt-4 relative z-30">
        <div className="h-6 mb-3 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={titles[titleIndex]}
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="text-[11px] font-bold text-[#00e87a] uppercase tracking-[0.25em]"
            >
              {titles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <h2 className="text-[30px] font-black text-[var(--text-primary)] tracking-[-0.02em] mb-4 leading-none">Ijlal Ansari</h2>
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
            { Icon: Github, href: "https://github.com/ijlalxansari1" },
            { Icon: MessageSquare, href: "https://wa.me/93711880807" }
          ].map(({ Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:scale-110 transition-all shadow-lg">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <div className="w-full flex border-t border-[var(--border)] h-[70px] bg-[var(--bg-secondary)] mt-auto">
        <button 
          onClick={downloadResume}
          className="flex-1 flex items-center justify-center text-[10px] font-black text-[var(--accent)] hover:bg-[var(--accent)]/10 tracking-[0.15em] uppercase transition-all border-r border-[var(--border)]"
        >
          {t.download_cv}
        </button>
        <button 
          onClick={() => {
            const panel = document.getElementById("content-scroll-panel");
            const target = document.getElementById("contact");
            if (panel && target) panel.scrollTo({ top: target.offsetTop, behavior: "smooth" });
          }}
          className="flex-1 flex items-center justify-center text-[10px] font-black text-[#00e87a] hover:bg-[#00e87a]/10 tracking-[0.15em] uppercase transition-all"
        >
          {t.contact_me}
        </button>
      </div>
    </div>
  );
}

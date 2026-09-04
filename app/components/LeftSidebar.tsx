"use client";

import { useState, useEffect } from "react";
import { Linkedin, Github, Twitter, Mail, MessageSquare, Download } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { trackEvent } from "./AnalyticsTracker";
import { storage } from "../utils/storage";

import { WhatsappIcon, FiverrIcon, SpotifyIcon, SoundCloudIcon } from "./icons/SocialIcons";

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
    language === 'en' ? "Data Ops Engineer" : "Data-Ops-Ingenieur",
    language === 'en' ? "Pipeline Builder" : "Pipeline-Builder",
    language === 'en' ? "Platform Builder" : "Plattform-Builder"
  ];

  useEffect(() => {
    const interval = setInterval(() => setTitleIndex((prev) => (prev + 1) % titles.length), 3000);
    const saved = storage.get("admin-availability", availability);
    setAvailability(saved);

    const handleUpdate = () => {
      const updated = storage.get("admin-availability", availability);
      setAvailability(updated);
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
    link.download = "ijlalansari.pdf";
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
    <div className="sidebar w-full h-auto lg:h-full flex flex-col bg-[var(--bg-card)] rounded-[28px] overflow-hidden shadow-2xl border border-[var(--border-subtle)] transition-all duration-400 relative">
      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

      <div
        className="relative w-full overflow-hidden px-4 pt-4 lg:px-5 lg:pt-5"
        style={{ height: 'auto' }}
      >
        <div className="relative aspect-[1/1.1] lg:aspect-[1/1.1] w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-inner">
          <Image
            src="/profile.png"
            alt="Ijlal Ansari - Data Engineer" fill sizes="(max-width: 768px) 100vw, 300px" className="object-cover object-center scale-105" priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/40 to-transparent" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8 text-center mt-8 lg:mt-6 relative z-30">
        <div className="h-6 mb-4 lg:mb-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={titles[titleIndex]}
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
              className="text-[10px] lg:text-[11px] font-black text-[var(--accent)] uppercase tracking-[0.25em]"
            >
              {titles[titleIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <h2 className="text-[24px] lg:text-[30px] font-black text-[var(--text-primary)] tracking-tight mb-3 lg:mb-4 leading-none">Ijlal Ansari</h2>

        <div className="flex items-center gap-2.5 px-3.5 py-1 bg-[var(--bg-primary)]/50 backdrop-blur-md border border-[var(--border-subtle)] rounded-full mb-5 lg:mb-6 shadow-sm">
          <div className="w-2 h-2 rounded-full relative" style={{ backgroundColor: getStatusColor() }}>
            {(availability.status.toLowerCase().includes('available') || availability.status.toLowerCase().includes('verfügbar')) && (
              <div className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: getStatusColor() }} />
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
            {availability.status.toLowerCase().includes('available') ? "OPEN TO DATA ENGINEERING ROLES" : getStatusLabel()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 lg:gap-3 mb-6">
          {[
            { Icon: Linkedin, href: "https://linkedin.com/in/ijlal-ansari-56b0371b0", name: "LinkedIn" },
            { Icon: Mail, href: "mailto:ansariijlal90@gmail.com", name: "Email" },
            { Icon: Github, href: "https://github.com/ijlalxansari1", name: "GitHub" },
            { Icon: WhatsappIcon, href: "https://wa.me/923371880807", name: "WhatsApp" },
            { Icon: FiverrIcon, href: "https://www.fiverr.com/s/8xdmv6g", name: "Fiverr" },
            { Icon: SpotifyIcon, href: "https://open.spotify.com/user/317wnqu4ns3xrkhibk5djcuhfmq4?si=ba33e571a6044615", name: "Spotify" },
            { Icon: SoundCloudIcon, href: "https://on.soundcloud.com/mLoNh7A9s8me4liNZ8", name: "SoundCloud" }
          ].map(({ Icon, href, name }, i) => (
            <a key={i} href={href} aria-label={name} target="_blank" rel="noopener noreferrer" className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5 hover:scale-110 transition-all shadow-md">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <div className="w-full flex border-t border-[var(--border)] h-[70px] bg-[var(--bg-secondary)] mt-auto">
        <button
          onClick={downloadResume}
          className="flex-1 flex items-center justify-center gap-2 text-[10px] font-black text-[var(--accent)] hover:bg-[var(--accent)]/10 tracking-[0.15em] uppercase transition-all border-r border-[var(--border)]"
        >
          <Download size={14} />
          {t.download_cv}
        </button>
        <button
          onClick={() => {
            const panel = document.getElementById("content-scroll-panel");
            const target = document.getElementById("contact");
            if (window.innerWidth >= 1024 && panel && target) {
              panel.scrollTo({ top: target.offsetTop, behavior: "smooth" });
            } else if (target) {
              window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 text-[10px] font-black text-[var(--accent)] hover:bg-[var(--accent)]/10 tracking-[0.15em] uppercase transition-all"
        >
          <MessageSquare size={14} />
          {t.contact_me}
        </button>
      </div>
    </div>
  );
}

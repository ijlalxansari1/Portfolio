"use client";

import { useState, useEffect } from "react";
import { Linkedin, Github, Twitter, Mail, MessageSquare, Download } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { trackEvent } from "./AnalyticsTracker";
import { storage } from "../utils/storage";

const WhatsappIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.062-.301-.15-1.267-.464-2.411-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.202.049-.39-.029-.54-.075-.15-.673-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.246-.705.246-1.29.173-1.41-.074-.119-.273-.194-.571-.344z"/>
    <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.178-1.248-6.165-3.48-8.45zM12.046 21.756c-1.785 0-3.535-.48-5.064-1.383l-.36-.214-3.766.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.452-4.437 9.889-9.885 9.889z"/>
  </svg>
);

const FiverrIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 508.02 508.02" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="254.01" cy="254.01" r="254.01" fill="#1DBF73"/>
    <circle cx="315.97" cy="162.19" r="26.87" fill="#FFFFFF"/>
    <path d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" fill="#FFFFFF" transform="translate(-1.83 -0.98)"/>
  </svg>
);

const SpotifyIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.18-1.139-.66-.12-.48.18-1.02.66-1.139 4.32-1.32 9.78-.6 13.56 1.74.359.24.479.78.24 1.139zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.199-.12-1.379-.72-.18-.6.12-1.199.72-1.379 4.2-1.26 11.28-1.02 15.66 1.62.54.3 1.08.18 1.08.72 0 .6-.48 1.08-1.08 1.08z"/>
  </svg>
);

const SoundCloudIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.66.721c.27 2.453.308 4.606-.006 7.072a.274.274 0 0 1-.54 0c-.287-2.433-.245-4.57 0-7.072a.274.274 0 0 1 .546 0Zm-1.64.673c.278 2.278.293 4.256-.006 6.54a.274.274 0 0 1-.54 0c-.27-2.228-.21-4.22 0-6.54a.274.274 0 0 1 .546 0Zm-1.636.568c.224 2.128.27 3.992.006 6.136a.274.274 0 0 1-.54 0c-.233-2.096-.188-3.959 0-6.136a.274.274 0 0 1 .534 0Zm-1.64.717c.224 1.956.248 3.659.006 5.632a.27.27 0 0 1-.533 0c-.21-1.928-.157-3.626 0-5.632a.27.27 0 0 1 .527 0Zm-1.64.551c.21 1.838.225 3.393.006 5.25a.27.27 0 0 1-.533 0c-.187-1.808-.135-3.376 0-5.25a.27.27 0 0 1 .527 0Zm-1.64.526c.21 1.703.225 3.196.006 4.908a.267.267 0 0 1-.527 0c-.187-1.67-.142-3.158 0-4.908a.267.267 0 0 1-.521 0ZM.213 14.165a.267.267 0 0 1 .527 0c.165 1.543.142 2.91.006 4.453a.267.267 0 0 1-.527 0c-.113-1.501-.068-2.887-.006-4.453Z"/>
  </svg>
);

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
  }, [titles.length, availability]);

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
            { Icon: WhatsappIcon, href: "https://wa.me/93711880807", name: "WhatsApp" },
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

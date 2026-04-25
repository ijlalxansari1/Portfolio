"use client";

import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Check, Palette, Terminal as TerminalIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import BootOverlay from "./BootOverlay";
import { useLanguage } from "../context/LanguageContext";

const accents = [
  { name: "green", color: "#00e87a" },
  { name: "blue", color: "#3b82f6" },
  { name: "purple", color: "#a855f7" },
  { name: "orange", color: "#f97316" },
  { name: "pink", color: "#ec4899" },
  { name: "cyan", color: "#06b6d4" },
  { name: "yellow", color: "#f59e0b" },
];

export default function ThemeBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [accent, setAccent] = useState("green");
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [streak, setStreak] = useState(602);

  useEffect(() => {
    fetch("/api/duolingo")
      .then(res => res.json())
      .then(data => {
        if (data.streak) setStreak(data.streak);
      })
      .catch(() => {});
  }, []);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem("portfolio-accent") || "green";
    setAccent(savedAccent);
    document.documentElement.setAttribute("data-accent", savedAccent);

    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, [setTheme]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === 'cmd' && theme !== 'cmd') {
      setIsBooting(true);
      setIsOpen(false);
    } else {
      setTheme(newTheme);
      document.documentElement.className = newTheme;
      localStorage.setItem("portfolio-theme", newTheme);
    }
  };

  const finalizeCmd = () => {
    setTheme('cmd');
    document.documentElement.className = 'cmd';
    localStorage.setItem("portfolio-theme", 'cmd');
    setIsBooting(false);
  };

  const changeAccent = (newAccent: string) => {
    setAccent(newAccent);
    document.documentElement.setAttribute("data-accent", newAccent);
    localStorage.setItem("portfolio-accent", newAccent);
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Main Trigger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border
          ${isOpen 
            ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]" 
            : "bg-transparent border-[#222] text-[#666] hover:border-white/20 hover:text-white"
          }`}
      title="Theme & Colors"
      >
        <Palette size={20} className={isOpen ? "animate-spin-slow" : ""} />
      </button>

      {/* Glassmorphic Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            className="absolute left-[54px] top-[-100px] bg-[#0d0d0d] border border-[#222] rounded-2xl p-6 shadow-2xl w-64 z-[1001]"
          >
            <div className="space-y-6">
              {/* Modes Section */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 font-jakarta">Modes</p>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handleThemeChange('dark')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'dark' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                    <Moon size={14} />
                    <span className="text-[9px] font-bold uppercase">Dark</span>
                  </button>
                  <button onClick={() => handleThemeChange('light')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'light' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                    <Sun size={14} />
                    <span className="text-[9px] font-bold uppercase">Light</span>
                  </button>
                  <button onClick={() => handleThemeChange('cmd')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'cmd' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                    <TerminalIcon size={14} />
                    <span className="text-[9px] font-bold uppercase">CMD</span>
                  </button>
                  <button onClick={() => handleThemeChange('midnight')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'midnight' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                    <div className="w-3 h-3 rounded-full bg-[#0a0b1e]" />
                    <span className="text-[9px] font-bold uppercase">Midnight</span>
                  </button>
                  <button onClick={() => handleThemeChange('forest')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'forest' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                    <div className="w-3 h-3 rounded-full bg-[#0a1a0f]" />
                    <span className="text-[9px] font-bold uppercase">Forest</span>
                  </button>
                  <button onClick={() => handleThemeChange('slate')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'slate' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                    <div className="w-3 h-3 rounded-full bg-[#1a1d23]" />
                    <span className="text-[9px] font-bold uppercase">Slate</span>
                  </button>
                  <button onClick={() => handleThemeChange('bordeaux')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'bordeaux' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                    <div className="w-3 h-3 rounded-full bg-[#1a0a0a]" />
                    <span className="text-[9px] font-bold uppercase">Bordeaux</span>
                  </button>
                </div>
              </div>

              {/* Accents Section */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 font-jakarta">Accents</p>
                <div className="flex flex-wrap gap-2.5">
                  {accents.map((acc) => (
                    <button
                      key={acc.name}
                      onClick={() => changeAccent(acc.name)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-lg ${accent === acc.name ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'opacity-60 hover:opacity-100'}`}
                      style={{ backgroundColor: acc.color }}
                      title={acc.name}
                    >
                      {accent === acc.name && <Check size={14} className="text-black font-bold" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Section */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 font-jakarta">Language</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setLanguage('en')} 
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border transition-all ${language === 'en' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}
                  >
                    <span className="text-[10px] font-black uppercase">English</span>
                  </button>
                  <button 
                    onClick={() => setLanguage('de')} 
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border transition-all ${language === 'de' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}
                  >
                    <span className="text-[10px] font-black uppercase">Deutsch</span>
                  </button>
                </div>
              </div>

              {/* Duolingo Section */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 font-jakarta">Learning</p>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 rounded-full border border-orange-500/20">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-orange-500 uppercase tracking-tighter">Live Streak</span>
                  </div>
                </div>
                <a 
                  href="https://www.duolingo.com/profile/ijlal_ansari" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/[0.05] transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-2xl">🦉</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[16px] font-black text-white leading-none">{streak}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Days on Duolingo</span>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Popover Arrow */}
            <div className="absolute top-[114px] -left-1.5 w-3 h-3 bg-[#0d0d0d] border-l border-b border-[#222] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <BootOverlay isActive={isBooting} onComplete={finalizeCmd} />
    </div>
  );
}

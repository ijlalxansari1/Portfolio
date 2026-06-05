"use client";

import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Check, Palette, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
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
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const savedAccent = localStorage.getItem("portfolio-accent") || "green";
    setAccent(savedAccent);
    document.documentElement.setAttribute("data-accent", savedAccent);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // If mobile portal is active, let the backdrop handle closing to prevent portal click-outside bugs
      if (isMobile) return; 
      
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (isMobile) setIsOpen(false);
  };

  const changeAccent = (newAccent: string) => {
    setAccent(newAccent);
    document.documentElement.setAttribute("data-accent", newAccent);
    localStorage.setItem("portfolio-accent", newAccent);
    if (isMobile) setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={menuRef}>


      {/* Main Trigger Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-[38px] h-[38px] rounded-xl items-center justify-center transition-all duration-300 border
          ${isOpen 
            ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]" 
            : "bg-transparent border-[#222] text-[#666] hover:border-white/20 hover:text-white"
          }`}
      title="Theme & Colors"
      >
        <Palette size={18} className={isOpen ? "animate-spin-slow" : ""} />
      </button>

      {/* Glassmorphic Dropdown */}
      {isMobile && mounted ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Mobile Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100000] bg-black/40 backdrop-blur-sm" 
                onClick={() => setIsOpen(false)} 
              />
              
              <motion.div
                id="theme-buddy-portal"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed bottom-0 left-0 right-0 bg-[#0d0d0d] border-t border-[#222] rounded-t-3xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-[100001] max-h-[85vh] overflow-y-auto custom-scrollbar-hidden"
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
                      <button onClick={() => handleThemeChange('loki')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'loki' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                        <Sparkles size={14} className="text-emerald-500" />
                        <span className="text-[9px] font-bold uppercase text-emerald-500">Loki</span>
                      </button>
                      <button onClick={() => handleThemeChange('midnight')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'midnight' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                        <div className="w-3 h-3 rounded-full bg-[#0a0b1e]" />
                        <span className="text-[9px] font-bold uppercase">Midnight</span>
                      </button>
                      <button onClick={() => handleThemeChange('tva')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'tva' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                        <div className="w-3 h-3 rounded-full bg-[#1c140d] border border-[#ff8c00]/50" />
                        <span className="text-[9px] font-bold uppercase text-orange-400">TVA</span>
                      </button>
                      <button onClick={() => handleThemeChange('slate')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'slate' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                        <div className="w-3 h-3 rounded-full bg-[#1a1d23]" />
                        <span className="text-[9px] font-bold uppercase">Slate</span>
                      </button>
                      <button onClick={() => handleThemeChange('bordeaux')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'bordeaux' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                        <div className="w-3 h-3 rounded-full bg-[#1a0a0a]" />
                        <span className="text-[9px] font-bold uppercase">Bordeaux</span>
                      </button>
                      <button onClick={() => handleThemeChange('void')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'void' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                        <div className="w-3 h-3 rounded-full bg-[#0a0216] border border-[#9333ea]/50" />
                        <span className="text-[9px] font-bold uppercase text-purple-500">Void</span>
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
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      ) : (
        <AnimatePresence>
          {isOpen && mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-auto left-[54px] top-[-100px] bg-[#0d0d0d] border border-[#222] rounded-2xl p-6 pb-6 shadow-2xl w-64 z-[1001]"
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
                    <button onClick={() => handleThemeChange('loki')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'loki' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                      <Sparkles size={14} className="text-emerald-500" />
                      <span className="text-[9px] font-bold uppercase text-emerald-500">Loki</span>
                    </button>
                    <button onClick={() => handleThemeChange('midnight')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'midnight' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                      <div className="w-3 h-3 rounded-full bg-[#0a0b1e]" />
                      <span className="text-[9px] font-bold uppercase">Midnight</span>
                    </button>
                    <button onClick={() => handleThemeChange('tva')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'tva' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                      <div className="w-3 h-3 rounded-full bg-[#1c140d] border border-[#ff8c00]/50" />
                      <span className="text-[9px] font-bold uppercase text-orange-400">TVA</span>
                    </button>
                    <button onClick={() => handleThemeChange('slate')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'slate' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                      <div className="w-3 h-3 rounded-full bg-[#1a1d23]" />
                      <span className="text-[9px] font-bold uppercase">Slate</span>
                    </button>
                    <button onClick={() => handleThemeChange('bordeaux')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'bordeaux' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                      <div className="w-3 h-3 rounded-full bg-[#1a0a0a]" />
                      <span className="text-[9px] font-bold uppercase">Bordeaux</span>
                    </button>
                    <button onClick={() => handleThemeChange('void')} className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${theme === 'void' ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]' : 'border-[#222] text-white/40 hover:border-white/10'}`}>
                      <div className="w-3 h-3 rounded-full bg-[#0a0216] border border-[#9333ea]/50" />
                      <span className="text-[9px] font-bold uppercase text-purple-500">Void</span>
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
              </div>
              
              {/* Popover Arrow */}
              <div className="absolute top-[114px] -left-1.5 w-3 h-3 bg-[#0d0d0d] border-l border-b border-[#222] rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

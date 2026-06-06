"use client";

import { useState, useEffect, useRef } from "react";
import { Moon, Check, Palette, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useLanguage } from "../context/LanguageContext";

const accents = [
  { name: "green",  color: "#00e87a" },
  { name: "blue",   color: "#3b82f6" },
  { name: "purple", color: "#a855f7" },
  { name: "orange", color: "#f97316" },
  { name: "pink",   color: "#ec4899" },
  { name: "cyan",   color: "#06b6d4" },
  { name: "yellow", color: "#f59e0b" },
];

const themes = [
  { id: "dark",      label: "Dark",     icon: <Moon size={14} /> },
  { id: "loki",      label: "Loki",     icon: <Sparkles size={14} />, iconClass: "text-[#fbbf24]", labelClass: "text-[#fbbf24]" },
  { id: "midnight",  label: "Midnight", dot: "#0a0b1e" },
  { id: "tva",       label: "TVA",      dot: "#1c140d", dotBorder: "#ff8c00", labelClass: "text-orange-400" },
  { id: "slate",     label: "Slate",    dot: "#1a1d23" },
  { id: "bordeaux",  label: "Bordeaux", dot: "#1a0a0a" },
  { id: "void",      label: "Void",     dot: "#0a0216", dotBorder: "#9333ea", labelClass: "text-purple-400" },
];

function ThemeButton({ themeId, label, icon, iconClass, labelClass, dot, dotBorder, active, onClick }: {
  themeId: string; label: string; icon?: React.ReactNode;
  iconClass?: string; labelClass?: string;
  dot?: string; dotBorder?: string;
  active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
        active
          ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
          : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-subtle)] hover:text-[var(--text-secondary)]"
      }`}
    >
      {icon ? (
        <span className={active ? "" : (iconClass || "")}>{icon}</span>
      ) : (
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dot, ...(dotBorder ? { border: `1px solid ${dotBorder}50` } : {}) }} />
      )}
      <span className={`text-[9px] font-bold uppercase ${active ? "" : (labelClass || "")}`}>{label}</span>
    </button>
  );
}

function PanelContent({ theme, accent, language, onThemeChange, onAccentChange, onLanguageChange }: {
  theme: string | undefined; accent: string; language: string;
  onThemeChange: (t: string) => void;
  onAccentChange: (a: string) => void;
  onLanguageChange: (l: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Modes</p>
        <div className="grid grid-cols-3 gap-2">
          {themes.map((t) => (
            <ThemeButton key={t.id} themeId={t.id} label={t.label} icon={t.icon}
              iconClass={t.iconClass} labelClass={t.labelClass}
              dot={t.dot} dotBorder={t.dotBorder}
              active={theme === t.id} onClick={() => onThemeChange(t.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Accents</p>
        <div className="flex flex-wrap gap-2.5">
          {accents.map((acc) => (
            <button
              key={acc.name}
              onClick={() => onAccentChange(acc.name)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-lg ${
                accent === acc.name
                  ? "ring-2 ring-[var(--text-primary)] ring-offset-2 ring-offset-[var(--bg-primary)]"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: acc.color }}
              title={acc.name}
            >
              {accent === acc.name && <Check size={14} className="text-black" />}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--border-subtle)]">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">Language</p>
        <div className="grid grid-cols-2 gap-2">
          {[{ id: "en", label: "English" }, { id: "de", label: "Deutsch" }].map((lang) => (
            <button
              key={lang.id}
              onClick={() => onLanguageChange(lang.id)}
              className={`flex items-center justify-center p-2.5 rounded-xl border transition-all ${
                language === lang.id
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-subtle)]"
              }`}
            >
              <span className="text-[10px] font-black uppercase">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

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
      if (isMobile) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile]);

  const handleThemeChange = (t: string) => { setTheme(t); if (isMobile) setIsOpen(false); };
  const changeAccent = (a: string) => {
    setAccent(a);
    document.documentElement.setAttribute("data-accent", a);
    localStorage.setItem("portfolio-accent", a);
    if (isMobile) setIsOpen(false);
  };

  if (!mounted) return null;

  const panelProps = {
    theme, accent, language,
    onThemeChange: handleThemeChange,
    onAccentChange: changeAccent,
    onLanguageChange: (l: string) => { setLanguage(l); if (isMobile) setIsOpen(false); },
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-[38px] h-[38px] rounded-xl items-center justify-center transition-all duration-300 border ${
          isOpen
            ? "bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
            : "bg-transparent border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
        }`}
        title="Theme & Colors"
      >
        <Palette size={18} className={isOpen ? "animate-spin-slow" : ""} />
      </button>

      {/* ── MOBILE: bottom sheet ── */}
      {isMobile && mounted ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100000] bg-black/60 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="fixed bottom-0 left-0 right-0 z-[100001] max-h-[85vh] overflow-y-auto custom-scrollbar-hidden rounded-t-3xl p-6 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                style={{
                  backgroundColor: "var(--bg-card)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  borderTop: "1px solid var(--border-subtle)",
                }}
              >
                <div className="w-10 h-1 rounded-full bg-[var(--border)] mx-auto mb-6 opacity-60" />
                <PanelContent {...panelProps} />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      ) : (
        /* ── DESKTOP: inline popover ── */
        <AnimatePresence>
          {isOpen && mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-auto left-[54px] top-[-100px] rounded-2xl p-6 shadow-2xl w-64 z-[1001]"
              style={{
                backgroundColor: "var(--bg-card)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <PanelContent {...panelProps} />
              <div
                className="absolute top-[114px] -left-1.5 w-3 h-3 rotate-45"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderLeft: "1px solid var(--border-subtle)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
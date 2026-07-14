"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  User, Dumbbell, Wrench, Briefcase, Landmark, Award,
  Newspaper, Send, ArrowUp, FlaskConical, Github, Linkedin, Terminal as TerminalIcon,
  Quote, Mail, MessageSquare, Menu, X, Volume2, VolumeX, Code, SkipForward, Globe2, MonitorPlay, Download
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "./context/LanguageContext";
import { translations } from "./context/translations";
import { useAudio } from "./context/AudioContext";
import dynamic from "next/dynamic";
import ProfileSidebar from "./components/LeftSidebar";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import LanguageSkills from "./components/LanguageSkills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import LoginModal from "./components/LoginModal";
import Certifications from "./components/Certifications";
import ThemeBuddy from "./components/ThemeBuddy";

const Terminal = dynamic(() => import("./components/Terminal"), { ssr: false });
const DemosHub = dynamic(() => import("./components/DemosHub"), { ssr: false });
const DataOps = dynamic(() => import("./components/DataOps"), { ssr: false });
const AmbientBackground = dynamic(() => import("./components/AmbientBackground"), { ssr: false });
const LokiMultiverseBackground = dynamic(() => import("./components/LokiMultiverseBackground"), { ssr: false });
const TvaBackground = dynamic(() => import("./components/TvaBackground"), { ssr: false });
const VoidBackground = dynamic(() => import("./components/VoidBackground"), { ssr: false });

import AnalyticsTracker, { trackEvent } from "./components/AnalyticsTracker";
import LoadingScreen from "./components/LoadingScreen";
import MaintenanceScreen from "./components/MaintenanceScreen";

export default function Home() {
  const { isPlaying, togglePlay, nextTrack, currentTrack, tracks, volume, setVolume } = useAudio();
  const [activeSection, setActiveSection] = useState("about");
  const [isMounted, setIsMounted] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].sidebar;
  const [scrollProgress, setScrollProgress] = useState(0);

  const nav = translations[language].nav;
  const navItems = useMemo(() => [
    { id: "about",         icon: <User size={18} />,         label: nav.about         },
    { id: "demo",          icon: <MonitorPlay size={18} />,  label: "Demos"           },
    { id: "skills",        icon: <Dumbbell size={18} />,     label: nav.skills        },
    { id: "projects",      icon: <Briefcase size={18} />,    label: nav.projects      },
    { id: "services",      icon: <Wrench size={18} />,       label: nav.services      },
    { id: "languages",     icon: <Globe2 size={18} />,       label: nav.languages || "Languages" },
    { id: "certifications",icon: <Award size={18} />,        label: nav.certifications},
    { id: "blog",          icon: <Newspaper size={18} />,    label: nav.blog || "Blog" },
    { id: "contact",       icon: <Send size={18} />,         label: nav.contact       },
  ], [language, nav]);

  const [isTimeSlipping, setIsTimeSlipping] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const check = () => setIsMobileView(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isNarrativeTheme = theme === "loki" || theme === "tva" || theme === "void";

  // Force-disable animations on mobile via Tailwind override class to prevent Framer Motion hydration bugs
  const mobileNoAnimClass = "max-lg:!opacity-100 max-lg:!transform-none";

  const scrollAnim = isMobileView 
    ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px" } }
    : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" } };

  const activeSectionRef = useRef("about");
  const scrollPanelRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => { 
    setIsMounted(true); 
    const loadConfig = async () => {
      try {
        // Fast local check
        const configStr = localStorage.getItem("admin-config");
        if (configStr) {
          const config = JSON.parse(configStr);
          setIsMaintenanceMode(!!config.maintenanceMode);
        }
        
        // Accurate server check
        const res = await fetch("/api/data/admin");
        if (res.ok) {
          const { data } = await res.json();
          if (data && data["admin-config"]) {
            setIsMaintenanceMode(!!data["admin-config"].maintenanceMode);
            localStorage.setItem("admin-config", JSON.stringify(data["admin-config"]));
          }
        }
      } catch (e) { console.error(e); }
    };
    loadConfig();
    window.addEventListener("admin-updated", loadConfig);
    return () => window.removeEventListener("admin-updated", loadConfig);
  }, []);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/ijlalansari.pdf";
    link.download = "ijlalansari.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    if (theme === "loki" || theme === "tva") {
      setIsTimeSlipping(true);
      setTimeout(() => setIsTimeSlipping(false), 600);
    }
    const target = document.getElementById(id);
    if (target) {
      isScrollingRef.current = true; // Lock intersection observer
      setActiveSection(id);
      activeSectionRef.current = id;
      
      if (window.innerWidth >= 1024 && scrollPanelRef.current) {
        scrollPanelRef.current.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      
      // Unlock after scrolling animation (approx 800ms)
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  useEffect(() => {
    const TARGET = "ijlal";
    let keyBuffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") { e.preventDefault(); setShowLogin(true); return; }
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") { keyBuffer = ""; return; }
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > TARGET.length) keyBuffer = keyBuffer.slice(-TARGET.length);
      if (keyBuffer === TARGET) { keyBuffer = ""; setShowTerminal(true); trackEvent("terminal_open"); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const isMobile = window.innerWidth < 1024;
    const scrollPanel = scrollPanelRef.current;
    const options = {
      root: isMobile ? null : scrollPanel,
      rootMargin: isMobile ? "-20% 0px -60% 0px" : "-20% 0px -70% 0px",
      threshold: [0, 0.05, 0.1, 0.2]
    };
    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current) return; // Skip if currently smooth scrolling
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          const id = entry.target.id;
          let activeId = id;
          if (id === "bio") activeId = "about";
          if (navItems.some(item => item.id === activeId)) { setActiveSection(activeId); activeSectionRef.current = activeId; }
        }
      });
    }, options);
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isMounted, navItems]);

  useEffect(() => {
    const handleScroll = () => {
      const panel = scrollPanelRef.current;
      if (window.innerWidth >= 1024 && panel) {
        setShowScrollTop(panel.scrollTop > 300);
        const progress = panel.scrollTop / (panel.scrollHeight - panel.clientHeight);
        setScrollProgress(Number.isNaN(progress) ? 0 : progress);
      } else {
        setShowScrollTop(window.scrollY > 300);
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        setScrollProgress(Number.isNaN(progress) ? 0 : progress);
      }
    };
    
    const panel = scrollPanelRef.current;
    if (panel) panel.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      if (panel) panel.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

  if (!isMounted) return null;

  return (
    <>
      <LoadingScreen onComplete={() => setBootDone(true)} />

      {isMaintenanceMode && !showAdmin ? (
        <MaintenanceScreen />
      ) : (
        <>
          {/* ── Dynamic Background Layer ── */}
          {isMounted && (
            <div className="fixed inset-0 z-0 pointer-events-none">
              {(!isNarrativeTheme || !isMobileView) && <AmbientBackground />}
              <AnimatePresence>
                {theme === "loki" && <LokiMultiverseBackground />}
                {theme === "tva" && <TvaBackground />}
                {theme === "void" && <VoidBackground />}
              </AnimatePresence>
            </div>
          )}

          <div
            className="relative lg:fixed lg:inset-0 bg-transparent transition-all duration-400 min-h-screen lg:min-h-0 w-full max-w-full transition-opacity duration-1000"
            style={{ 
              opacity: bootDone ? 1 : 0, 
              visibility: bootDone ? "visible" : "hidden", 
              perspective: (!isMobileView) ? "1500px" : "none" 
            }}
          >
        <AnalyticsTracker />
        
        {/* Scroll Progress Bar */}
        <div
          className="fixed top-0 left-0 h-[2px] lg:h-[3px] bg-[var(--accent)] z-[10001] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%`, willChange: 'width' }}
        />

        {/* ── Mobile Header ── */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-[70px] bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] z-[10000] flex items-center justify-between px-6 shadow-lg">
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-[var(--text-primary)] tracking-tight">Ijlal Ansari</span>
            <span className="text-[9px] font-bold text-[var(--accent)] uppercase tracking-[0.2em]">{translations[language].mobileHeader.role}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Next Track button moved to mobile menu */}
            <button onClick={togglePlay} className="w-11 h-11 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all shadow-sm" aria-label="Toggle background music">
              {isPlaying ? <Volume2 size={20} className="text-[var(--accent)] animate-pulse" /> : <VolumeX size={20} className="opacity-55" />}
            </button>
            <div className="ml-1.5"><ThemeBuddy /></div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-11 h-11 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shadow-sm">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* ── Mobile Side Menu ── */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10001] lg:hidden" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--bg-card)] border-l border-[var(--border-subtle)] z-[10002] lg:hidden p-8 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">{translations[language].mobileHeader.nav}</span>
                  <button onClick={() => setIsMenuOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--accent)]"><X size={20} /></button>
                </div>
                <div className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <button key={item.id} onClick={() => { scrollToSection(item.id); setIsMenuOpen(false); }} className={`flex items-center gap-4 text-[14px] font-black uppercase tracking-widest transition-all ${activeSection === item.id ? "text-[var(--accent)] translate-x-2" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-[var(--accent)] transition-all ${activeSection === item.id ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
                      <span className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="w-full relative z-10 px-2 py-4 mb-2 mt-4 bg-[var(--bg-primary)]/50 rounded-2xl border border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2">
                      <Volume2 size={12} className="text-[var(--accent)]" />
                      Music Control
                    </label>
                    <span className="text-[10px] font-bold text-[var(--text-muted)]">{Math.round(volume * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {tracks?.length > 1 && (
                      <button onClick={nextTrack} className="w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all shrink-0" aria-label="Next background track">
                        <SkipForward size={14} />
                      </button>
                    )}
                    <input 
                      type="range" 
                      min="0" max="1" step="0.01" 
                      value={volume} 
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                    />
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]"><ThemeBuddy /></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Desktop/Tablet Navigation ── */}
        <nav className="hidden md:flex fixed left-4 top-4 bottom-4 lg:w-[62px] lg:min-h-[calc(100dvh-2rem)] bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border-subtle)] p-2 lg:py-4 rounded-[24px] flex-row md:flex-col items-center justify-between gap-4 md:gap-6 lg:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[9999]">
          <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-6 lg:gap-3 overflow-x-auto md:overflow-x-visible custom-scrollbar-hidden w-full md:w-auto px-1 md:px-0">
            <div className="block lg:mb-2"><ThemeBuddy /></div>
            {/* Next Track button moved inside music popover */}
            <div className="group relative flex items-center">
              <button onClick={togglePlay} className={`w-[38px] h-[38px] flex items-center justify-center rounded-xl transition-all duration-300 ${isPlaying ? "bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)]" : "text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:bg-[var(--border-subtle)]"}`} aria-label="Toggle background music">
                {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
              </button>
              <div className="hidden lg:flex pointer-events-none absolute left-[calc(100%+16px)] flex-row items-center gap-3 px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all -translate-x-2 group-hover:translate-x-0 z-[9999] shadow-2xl before:content-[''] before:absolute before:-left-4 before:top-0 before:w-4 before:h-full">
                {tracks?.length > 1 && (
                  <button onClick={nextTrack} className="w-7 h-7 flex items-center justify-center rounded-lg text-[var(--text-secondary)] bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all shrink-0" aria-label="Next track">
                    <SkipForward size={12} />
                  </button>
                )}
                <span className="text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap min-w-[100px] truncate max-w-[150px]">
                  {isPlaying && currentTrack ? currentTrack.title : "Volume"}
                </span>
                <input 
                  type="range" 
                  min="0" max="1" step="0.01" 
                  value={volume} 
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-24 h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
                />
              </div>
            </div>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className={`group relative min-w-[38px] h-[38px] flex items-center justify-center rounded-xl transition-all duration-300 ${activeSection === item.id ? "bg-[var(--accent)]/15 text-[var(--accent)]" : "text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:bg-[var(--border-subtle)]"}`}>
                {item.icon}
                <span className="hidden lg:block pointer-events-none absolute left-full ml-4 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all -translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* ── Main Layout ── */}
        <div className="relative lg:absolute lg:inset-0 flex justify-center p-4 md:p-6 lg:pr-[24px] lg:pl-[96px] min-h-screen lg:min-h-0 pt-[90px] lg:pt-0 w-full max-w-full lg:items-center pointer-events-none">
          <motion.div
            className="w-full lg:h-full max-w-[1380px] flex flex-col lg:flex-row gap-[14px] pointer-events-auto"
            style={!isMobileView ? { rotateX, rotateY, transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" } : {}}
          >
            <div className="w-full lg:w-[300px] shrink-0 lg:h-full max-w-full lg:overflow-hidden" style={{ transform: "translateZ(30px)" }}>
              <ProfileSidebar activeTab={activeSection} onTabChange={() => {}} />
            </div>

            <div className="flex-1 lg:h-full bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-subtle)] shadow-2xl flex flex-col transition-all duration-400 relative top-glow lg:overflow-hidden" style={!isMobileView ? { transform: "translateZ(20px)" } : {}}>
              <main ref={scrollPanelRef} id="content-scroll-panel" className="flex-1 lg:overflow-y-auto custom-scrollbar-hidden relative" style={{ scrollbarWidth: "none" }}>
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes time-slip {
                    0%   { transform: scaleX(1) skewX(0); filter: hue-rotate(0deg) contrast(1); }
                    15%  { transform: scaleX(1.1) skewX(10deg) translateX(-10px); filter: hue-rotate(90deg) contrast(1.5) saturate(2); }
                    30%  { transform: scaleX(0.8) skewX(-10deg) translateX(10px); filter: hue-rotate(-90deg) contrast(2) saturate(3); opacity: 0.8; }
                    45%  { transform: scaleX(1.1) skewX(5deg) translateX(-5px); filter: hue-rotate(180deg) contrast(1.2); }
                    100% { transform: scaleX(1) skewX(0) translateX(0); filter: hue-rotate(0deg) contrast(1) saturate(1); opacity: 1; }
                  }
                  .time-slip-anim { animation: time-slip 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
                `}} />
                <div id="sections-container" className={`p-3 md:p-6 lg:p-8 space-y-3 lg:space-y-6 relative origin-center ${isTimeSlipping ? 'time-slip-anim pointer-events-none' : ''}`}>

                  {/* 1. Hero / About */}
                  <motion.section {...scrollAnim} className={`${mobileNoAnimClass} !pt-0`} id="about"><About /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 1.5 Demos */}
                  <motion.section {...scrollAnim} className={`py-8 md:py-10 ${mobileNoAnimClass}`} id="demo"><DemosHub /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 1.75 DataOps */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="dataops"><DataOps /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 2. Skills */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="skills"><Skills /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 3. Featured Projects */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="projects"><Projects /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 4. Services */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="services"><Services /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 5. Languages */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="languages"><LanguageSkills /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 7. Certifications */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="certifications"><Certifications /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 8. Blog */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="blog"><Blog /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* CTA Banner */}
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-8 md:p-10 bg-gradient-to-r from-[var(--accent)]/10 to-transparent border border-[var(--accent)]/20 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                      <h3 className="text-[24px] font-black text-[var(--text-primary)] mb-2">{translations[language].footer.cta_title}</h3>
                      <p className="text-[14px] text-[var(--text-muted)]">{translations[language].footer.cta_desc}</p>
                    </div>
                    <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-[var(--accent)] text-black font-black uppercase tracking-widest text-[12px] rounded-xl hover:scale-105 transition-all">
                      {translations[language].footer.cta_button}
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    id="contact"
                    className="w-full"
                  >
                    <Contact />
                  </motion.div>

                  {/* Footer */}
                  <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-8 justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">{translations[language].footer.copy}</span>
                      <button onClick={() => setShowTerminal(true)} className="group flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all">
                        <TerminalIcon size={14} className="text-[var(--accent)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-all">{translations[language].footer.launch}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      {[
                        { name: "GitHub",   icon: <Github size={18} />,      href: "https://github.com/ijlalxansari1",                      color: "text-white hover:bg-white/10"       },
                        { name: "LinkedIn", icon: <Linkedin size={18} />,    href: "https://linkedin.com/in/ijlal-ansari-56b0371b0",         color: "text-[#0077B5] hover:bg-[#0077B5]/10"},
                        { name: "WhatsApp", icon: <MessageSquare size={18}/>,href: "https://wa.me/923371880807",                             color: "text-[#25D366] hover:bg-[#25D366]/10"},
                        { name: "Email",    icon: <Mail size={18} />,        href: "mailto:ansariijlal90@gmail.com",                         color: "text-[#EA4335] hover:bg-[#EA4335]/10"},
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={`group w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 ${s.color} hover:scale-110 hover:border-white/10`}>
                          <div className="opacity-50 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </main>
            </div>
          </motion.div>
        </div>
      </div>
        </>
      )}

      <Terminal isOpen={showTerminal} onClose={() => setShowTerminal(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={() => { setShowLogin(false); setShowAdmin(true); }} />
      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }} 
            onClick={() => {
              if (window.innerWidth >= 1024 && scrollPanelRef.current) {
                scrollPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }} 
            className="fixed bottom-[28px] right-[28px] w-[44px] h-[44px] bg-[var(--accent)] text-black rounded-full flex items-center justify-center shadow-lg z-[999] hover:scale-110 transition-all border-none"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
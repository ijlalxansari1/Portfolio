"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  User, Dumbbell, Wrench, Briefcase, Landmark, Award,
  Newspaper, Send, ArrowUp, FlaskConical, Github, Linkedin, Terminal as TerminalIcon,
  Quote, Mail, MessageSquare, Menu, X, Volume2, VolumeX, Code, SkipForward
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "./context/LanguageContext";
import { translations } from "./context/translations";
import { useAudio } from "./context/AudioContext";
import dynamic from "next/dynamic";
import ProfileSidebar from "./components/LeftSidebar";
import About from "./components/About";
import Bio from "./components/Bio";
import Technologies from "./components/Technologies";
import ToolStack from "./components/ToolStack";
import GeneralSkills from "./components/GeneralSkills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import LoginModal from "./components/LoginModal";
import Certifications from "./components/Certifications";
import ThemeBuddy from "./components/ThemeBuddy";

const Terminal = dynamic(() => import("./components/Terminal"), { ssr: false });
const GitHubFeed = dynamic(() => import("./components/GitHubFeed"), { ssr: false });
const EthicsPledge = dynamic(() => import("./components/EthicsPledge"), { ssr: false });
const DemosHub = dynamic(() => import("./components/DemosHub"), { ssr: false });
const AmbientBackground = dynamic(() => import("./components/AmbientBackground"), { ssr: false });
const LokiMultiverseBackground = dynamic(() => import("./components/LokiMultiverseBackground"), { ssr: false });
const TvaBackground = dynamic(() => import("./components/TvaBackground"), { ssr: false });
const VoidBackground = dynamic(() => import("./components/VoidBackground"), { ssr: false });

function MobileNarrativeBackground({ theme }: { theme: string }) {
  if (theme === "loki") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="loki-glow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
            </radialGradient>
            <filter id="loki-blur"><feGaussianBlur stdDeviation="3" /></filter>
          </defs>
          <rect width="390" height="844" fill="url(#loki-glow)" />
          <path d="M195 844 L195 500 Q195 440 160 400 L100 320 Q70 280 90 240 L130 200" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeOpacity="0.6" filter="url(#loki-blur)" />
          <path d="M195 650 Q230 600 260 550 Q290 500 280 440 L270 380" stroke="#fbbf24" strokeWidth="1" fill="none" strokeOpacity="0.4" />
          <path d="M195 550 Q150 500 120 460 Q90 420 95 370" stroke="#fbbf24" strokeWidth="0.8" fill="none" strokeOpacity="0.3" />
          <path d="M195 500 Q250 460 290 420 L330 380" stroke="#f59e0b" strokeWidth="0.7" fill="none" strokeOpacity="0.35" />
          {[[195,650],[260,550],[120,460],[290,420],[130,200]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="#fbbf24" fillOpacity="0.7" />
          ))}
          <circle cx="195" cy="180" r="50" stroke="#fbbf24" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />
          <circle cx="195" cy="180" r="38" stroke="#fbbf24" strokeWidth="0.3" strokeOpacity="0.12" fill="none" />
        </svg>
        <div className="absolute inset-0" style={{ background: "radial-gradient(1px 1px at 15% 10%, rgba(251,191,36,0.6) 0%, transparent 100%),radial-gradient(1px 1px at 75% 18%, rgba(251,191,36,0.4) 0%, transparent 100%),radial-gradient(1px 1px at 40% 32%, rgba(251,191,36,0.5) 0%, transparent 100%),radial-gradient(1px 1px at 88% 45%, rgba(251,191,36,0.3) 0%, transparent 100%),radial-gradient(1px 1px at 22% 60%, rgba(251,191,36,0.45) 0%, transparent 100%),radial-gradient(1px 1px at 60% 75%, rgba(251,191,36,0.35) 0%, transparent 100%),radial-gradient(1px 1px at 10% 88%, rgba(251,191,36,0.5) 0%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(251,191,36,0.06) 0%, transparent 70%)" }} />
      </div>
    );
  }

  if (theme === "tva") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="tva-glow" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff8c00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1c140d" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="390" height="844" fill="url(#tva-glow)" />
          {[160,130,100,72,46].map((r,i) => (
            <circle key={i} cx="195" cy="200" r={r} stroke="#ff8c00" strokeWidth="0.6" strokeOpacity={0.15+i*0.06} fill="none" strokeDasharray={i%2===0?"4 8":"2 12"} />
          ))}
          {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle,i) => {
            const rad = (angle*Math.PI)/180;
            return <line key={i} x1="195" y1="200" x2={195+Math.cos(rad)*380} y2={200+Math.sin(rad)*380} stroke="#ff8c00" strokeWidth="0.4" strokeOpacity="0.08" />;
          })}
          {Array.from({length:12}).map((_,i) => {
            const a = (i*30*Math.PI)/180;
            return <line key={i} x1={195+Math.cos(a)*58} y1={200+Math.sin(a)*58} x2={195+Math.cos(a)*50} y2={200+Math.sin(a)*50} stroke="#ff8c00" strokeWidth="1.5" strokeOpacity="0.4" />;
          })}
          {Array.from({length:30}).map((_,i) => (
            <line key={i} x1="0" y1={i*30+400} x2="390" y2={i*30+400} stroke="#ff8c00" strokeWidth="0.3" strokeOpacity="0.04" />
          ))}
        </svg>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255,140,0,0.12) 0%, transparent 70%),radial-gradient(ellipse 60% 40% at 50% 100%, rgba(28,20,13,0.8) 0%, transparent 80%)" }} />
      </div>
    );
  }

  if (theme === "void") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="void-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#9333ea" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#121212" stopOpacity="0" />
            </radialGradient>
            <filter id="void-blur"><feGaussianBlur stdDeviation="4" /></filter>
          </defs>
          <rect width="390" height="844" fill="url(#void-core)" />
          <path d="M0 422 Q80 380 140 400 Q200 420 260 390 Q320 360 390 400" stroke="#d4af37" strokeWidth="1.5" fill="none" strokeOpacity="0.25" filter="url(#void-blur)" />
          <path d="M0 480 Q100 440 180 470 Q260 500 390 450" stroke="#9333ea" strokeWidth="1.2" fill="none" strokeOpacity="0.2" filter="url(#void-blur)" />
          <path d="M0 350 Q120 320 200 350 Q280 380 390 340" stroke="#d4af37" strokeWidth="0.8" fill="none" strokeOpacity="0.15" filter="url(#void-blur)" />
          {[[30,200,2],[90,350,1.5],[180,150,2.5],[280,280,1.8],[340,180,2],[60,600,1.5],[220,680,2],[350,620,1.2],[130,750,1.8],[290,730,2.2]].map(([cx,cy,r],i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="#d4af37" fillOpacity={0.3+(i%3)*0.1} />
          ))}
          <ellipse cx="195" cy="422" rx="120" ry="40" stroke="#9333ea" strokeWidth="0.5" strokeOpacity="0.2" fill="none" filter="url(#void-blur)" />
          <ellipse cx="195" cy="422" rx="80" ry="25" stroke="#d4af37" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
        </svg>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(147,51,234,0.08) 0%, transparent 70%),radial-gradient(ellipse 50% 40% at 20% 30%, rgba(212,175,55,0.06) 0%, transparent 60%),radial-gradient(ellipse 50% 40% at 80% 70%, rgba(212,175,55,0.05) 0%, transparent 60%)" }} />
      </div>
    );
  }

  return null;
}

import AnalyticsTracker, { trackEvent } from "./components/AnalyticsTracker";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const { isPlaying, togglePlay, nextTrack, currentTrack, tracks } = useAudio();
  const [activeSection, setActiveSection] = useState("about");
  const [isMounted, setIsMounted] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].sidebar;

  const nav = translations[language].nav;
  const navItems = useMemo(() => [
    { id: "about",         icon: <User size={18} />,         label: nav.about         },
    { id: "skills",        icon: <Dumbbell size={18} />,     label: nav.skills        },
    { id: "services",      icon: <Wrench size={18} />,       label: nav.services      },
    { id: "demo",          icon: <FlaskConical size={18} />, label: nav.demo          },
    { id: "projects",      icon: <Briefcase size={18} />,    label: nav.projects      },
    { id: "resume",        icon: <Landmark size={18} />,     label: nav.resume        },
    { id: "certifications",icon: <Award size={18} />,        label: nav.certifications},
    { id: "github",        icon: <Github size={18} />,       label: nav.github        },
    { id: "blog",          icon: <Newspaper size={18} />,    label: nav.blog          },
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

  const scrollToSection = (id: string) => {
    if (theme === "loki" || theme === "tva") {
      setIsTimeSlipping(true);
      setTimeout(() => setIsTimeSlipping(false), 600);
    }
    const target = document.getElementById(id);
    if (target) {
      if (window.innerWidth >= 1024 && scrollPanelRef.current) {
        scrollPanelRef.current.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
      } else {
        const y = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setActiveSection(id);
      activeSectionRef.current = id;
    }
  };

  const activeSectionRef = useRef("about");
  const scrollPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsMounted(true); }, []);

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
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          const id = entry.target.id;
          let activeId = id;
          if (id === "pledge" || id === "bio") activeId = "about";
          if (navItems.some(item => item.id === activeId)) { setActiveSection(activeId); activeSectionRef.current = activeId; }
        }
      });
    }, options);
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isMounted, navItems]);

  useEffect(() => {
    const panel = scrollPanelRef.current;
    if (!panel) return;
    const handleScroll = () => setShowScrollTop(panel.scrollTop > 300);
    panel.addEventListener("scroll", handleScroll, { passive: true });
    return () => panel.removeEventListener("scroll", handleScroll);
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

      {/* ── BACKGROUND — always fixed, always full-screen, never clipped ── */}
      {isMounted && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {!isMobileView && (
            <>
              {!isNarrativeTheme && <AmbientBackground />}
              {theme === "loki" && <LokiMultiverseBackground />}
              {theme === "tva"  && <TvaBackground />}
              {theme === "void" && <VoidBackground />}
            </>
          )}
          {isMobileView && isNarrativeTheme  && <MobileNarrativeBackground theme={theme ?? "loki"} />}
          {isMobileView && !isNarrativeTheme && <AmbientBackground />}
        </div>
      )}

      <div
        className="relative lg:fixed lg:inset-0 bg-transparent transition-all duration-400 min-h-screen lg:min-h-0 w-full max-w-full transition-opacity duration-1000"
        style={{ opacity: bootDone ? 1 : 0, visibility: bootDone ? "visible" : "hidden", perspective: "1500px" }}
      >
        <AnalyticsTracker />

        {/* ── Mobile Header ── */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-[70px] bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] z-[10000] flex items-center justify-between px-6 shadow-lg">
          <div className="flex flex-col">
            <span className="text-[15px] font-black text-[var(--text-primary)] tracking-tight">Ijlal Ansari</span>
            <span className="text-[9px] font-bold text-[var(--accent)] uppercase tracking-[0.2em]">{translations[language].mobileHeader.role}</span>
          </div>
          <div className="flex items-center gap-3">
            {tracks?.length > 1 && (
              <button onClick={nextTrack} className="w-11 h-11 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all shadow-sm" aria-label="Next background track">
                <SkipForward size={18} />
              </button>
            )}
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
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="mt-auto pt-8 border-t border-[var(--border-subtle)]"><ThemeBuddy /></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Desktop/Tablet Navigation ── */}
        <nav className="hidden md:flex fixed bottom-5 left-5 right-5 lg:left-5 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:right-auto lg:w-[56px] lg:h-auto bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border-subtle)] p-2 lg:py-6 rounded-[20px] lg:rounded-[28px] flex-row lg:flex-col items-center justify-center gap-4 md:gap-6 lg:gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[9999]">
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 md:gap-6 lg:gap-2 overflow-x-auto lg:overflow-x-visible custom-scrollbar-hidden w-full lg:w-auto px-1 lg:px-0">
            <div className="block lg:mb-2"><ThemeBuddy /></div>
            {tracks?.length > 1 && (
              <button onClick={nextTrack} className="w-[38px] h-[38px] flex items-center justify-center rounded-xl transition-all duration-300 text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:bg-[var(--border-subtle)] hover:text-[var(--accent)]" aria-label="Next track">
                <SkipForward size={16} />
              </button>
            )}
            <button onClick={togglePlay} className={`group relative w-[38px] h-[38px] flex items-center justify-center rounded-xl transition-all duration-300 ${isPlaying ? "bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)]" : "text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:bg-[var(--border-subtle)]"}`} aria-label="Toggle background music">
              {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
              <span className="hidden lg:block pointer-events-none absolute left-full ml-4 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all -translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl">
                {isPlaying && currentTrack ? `${currentTrack.title} - ${currentTrack.artist}` : "Background Music"}
              </span>
            </button>
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
        <div className="relative lg:absolute lg:inset-0 flex justify-center p-4 md:p-6 lg:pl-[85px] lg:pr-6 min-h-screen lg:min-h-0 pt-[90px] lg:pt-0 w-full max-w-full lg:items-center pointer-events-none">
          <motion.div
            className="w-full lg:h-full max-w-[1300px] flex flex-col lg:flex-row gap-[14px] pointer-events-auto"
            style={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { rotateX, rotateY, transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" } : {}}
          >
            <div className="w-full lg:w-[340px] shrink-0 lg:h-full max-w-full lg:overflow-hidden" style={{ transform: "translateZ(30px)" }}>
              <ProfileSidebar activeTab={activeSection} onTabChange={() => {}} />
            </div>

            <div className="flex-1 lg:h-full bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-subtle)] shadow-2xl flex flex-col transition-all duration-400 relative top-glow lg:overflow-hidden" style={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { transform: "translateZ(20px)" } : {}}>
              <div ref={scrollPanelRef} id="content-scroll-panel" className="flex-1 lg:overflow-y-auto custom-scrollbar-hidden relative" style={{ scrollbarWidth: "none" }}>
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
                <div id="sections-container" className={`p-4 pt-4 md:p-10 md:pt-4 lg:p-14 lg:pt-0 space-y-4 lg:space-y-16 relative origin-center ${isTimeSlipping ? 'time-slip-anim pointer-events-none' : ''}`}>

                  <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} id="about"><About /></motion.section>
                  <Bio />
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="skills" className="space-y-20 lg:space-y-32">
                    <div className="space-y-20">
                      <Technologies />
                      <div className="h-px w-full bg-[var(--border-subtle)] opacity-50" />
                      <ToolStack />
                      <div className="h-px w-full bg-[var(--border-subtle)] opacity-50" />
                      <GeneralSkills />
                    </div>
                  </motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="services"><Services /></motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="pledge"><EthicsPledge /></motion.section>
                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="demo" className="py-20"><DemosHub /></motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="projects"><Projects /></motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="resume"><Resume /></motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="certifications"><Certifications /></motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="github"><GitHubFeed /></motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="blog"><Blog /></motion.section>
                  <div className="h-px w-full bg-white/[0.05]" />

                  <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} id="contact"><Contact /></motion.section>

                  {/* CTA Banner */}
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="p-12 bg-gradient-to-r from-[var(--accent)]/10 to-transparent border border-[var(--accent)]/20 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                      <h3 className="text-[24px] font-black text-[var(--text-primary)] mb-2">{translations[language].footer.cta_title}</h3>
                      <p className="text-[14px] text-[var(--text-muted)]">{translations[language].footer.cta_desc}</p>
                    </div>
                    <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-[var(--accent)] text-black font-black uppercase tracking-widest text-[12px] rounded-xl hover:scale-105 transition-all">
                      {translations[language].footer.cta_button}
                    </button>
                  </motion.div>

                  {/* Footer */}
                  <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row gap-8 justify-between items-center">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">{translations[language].footer.copy}</span>
                      <button onClick={() => setShowTerminal(true)} className="group flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all">
                        <TerminalIcon size={14} className="text-[var(--accent)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-all">{translations[language].footer.launch}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      {[
                        { icon: <Github size={18} />,      href: "https://github.com/ijlalxansari1",                      color: "text-white hover:bg-white/10"       },
                        { icon: <Linkedin size={18} />,    href: "https://linkedin.com/in/ijlal-ansari-56b0371b0",         color: "text-[#0077B5] hover:bg-[#0077B5]/10"},
                        { icon: <MessageSquare size={18}/>,href: "https://wa.me/923371880807",                             color: "text-[#25D366] hover:bg-[#25D366]/10"},
                        { icon: <Mail size={18} />,        href: "mailto:ansariijlal90@gmail.com",                         color: "text-[#EA4335] hover:bg-[#EA4335]/10"},
                      ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className={`group w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 ${s.color} hover:scale-110 hover:border-white/10`}>
                          <div className="opacity-50 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                        </a>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Terminal isOpen={showTerminal} onClose={() => setShowTerminal(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={() => { setShowLogin(false); setShowAdmin(true); }} />
      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-[28px] right-[28px] w-[44px] h-[44px] bg-[var(--accent)] text-black rounded-full flex items-center justify-center shadow-lg z-[999] hover:scale-110 transition-all border-none">
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
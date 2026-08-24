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
import dynamic from "next/dynamic";
import ProfileSidebar from "./components/LeftSidebar";
import About from "./components/About";
import WhyHireMe from "./components/WhyHireMe";
import { Target } from "lucide-react";
const Skills = dynamic(() => import("./components/Skills"));
const Services = dynamic(() => import("./components/Services"));
const LanguageSkills = dynamic(() => import("./components/LanguageSkills"));
const Projects = dynamic(() => import("./components/Projects"));
const Blog = dynamic(() => import("./components/Blog"));
const Contact = dynamic(() => import("./components/Contact"));
const AdminPanel = dynamic(() => import("./components/AdminPanel"), { ssr: false });
const LoginModal = dynamic(() => import("./components/LoginModal"), { ssr: false });
const Certifications = dynamic(() => import("./components/Certifications"));
const ThemeBuddy = dynamic(() => import("./components/ThemeBuddy"), { ssr: false });

const Terminal = dynamic(() => import("./components/Terminal"), { ssr: false });
const DemosHub = dynamic(() => import("./components/DemosHub"), { ssr: false });

const AmbientBackground = dynamic(() => import("./components/AmbientBackground"), { ssr: false });

import AnalyticsTracker, { trackEvent } from "./components/AnalyticsTracker";
import MaintenanceScreen from "./components/MaintenanceScreen";

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

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMounted, setIsMounted] = useState(false);
  const [bootDone, setBootDone] = useState(true);
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
    { id: "whyhireme",     icon: <Target size={18} />,       label: "Why Hire Me"     },
    { id: "services",      icon: <Wrench size={18} />,       label: nav.services      },
    { id: "demo",          icon: <MonitorPlay size={18} />,  label: "Demos"           },
    { id: "skills",        icon: <Dumbbell size={18} />,     label: nav.skills        },
    { id: "projects",      icon: <Briefcase size={18} />,    label: nav.projects      },
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

  const isNarrativeTheme = false;

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
        const res = await fetch("/api/data/admin?key=admin-config");
        if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
          const { data } = await res.json();
          if (data) {
            setIsMaintenanceMode(!!data.maintenanceMode);
            localStorage.setItem("admin-config", JSON.stringify(data));
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

      {isMaintenanceMode && !showAdmin ? (
        <MaintenanceScreen />
      ) : (
        <>
          {/* ── Dynamic Background Layer ── */}
          {isMounted && (
            <div className="fixed inset-0 z-0 pointer-events-none">
              {(!isNarrativeTheme || !isMobileView) && <AmbientBackground />}
              <AnimatePresence>
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
                <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]"><ThemeBuddy /></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Desktop/Tablet Navigation ── */}
        <nav className="hidden md:flex fixed left-4 top-4 bottom-4 lg:w-[62px] lg:min-h-[calc(100dvh-2rem)] bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border-subtle)] p-2 lg:py-4 rounded-[24px] flex-row md:flex-col items-center justify-between gap-4 md:gap-6 lg:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[9999]">
          <div className="flex flex-row md:flex-col items-center justify-center gap-4 md:gap-6 lg:gap-3 overflow-x-auto md:overflow-x-visible custom-scrollbar-hidden w-full md:w-auto px-1 md:px-0">
            <div className="block lg:mb-2"><ThemeBuddy /></div>
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
                <div id="sections-container" className={`p-3 md:p-6 lg:p-8 space-y-3 lg:space-y-6 relative origin-center`}>

                  {/* 1. Hero / About */}
                  <motion.section {...scrollAnim} className={`${mobileNoAnimClass} !pt-0`} id="about"><About /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 1.2 Why Hire Me */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="whyhireme"><WhyHireMe /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 4. Services */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="services"><Services /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 1.5 Demos */}
                  <motion.section {...scrollAnim} className={`py-8 md:py-10 ${mobileNoAnimClass}`} id="demo"><DemosHub /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 2. Skills */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="skills"><Skills /></motion.section>
                  <div className="h-px w-full bg-white/[0.04]" />

                  {/* 3. Featured Projects */}
                  <motion.section {...scrollAnim} className={mobileNoAnimClass} id="projects"><Projects /></motion.section>
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
                        { name: "Fiverr",   icon: <FiverrIcon size={18} />,  href: "https://www.fiverr.com/s/8xdmv6g",                      color: "text-[#1DBF73] hover:bg-[#1DBF73]/10"},
                        { name: "Spotify",  icon: <SpotifyIcon size={18} />, href: "https://open.spotify.com/user/317wnqu4ns3xrkhibk5djcuhfmq4?si=ba33e571a6044615", color: "text-[#1DB954] hover:bg-[#1DB954]/10"},
                        { name: "SoundCloud", icon: <SoundCloudIcon size={18} />, href: "https://on.soundcloud.com/mLoNh7A9s8me4liNZ8", color: "text-[#FF5500] hover:bg-[#FF5500]/10"},
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


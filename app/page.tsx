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

import { FiverrIcon, SpotifyIcon, SoundCloudIcon } from "./components/icons/SocialIcons";

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
    { id: "languages",     icon: <Globe2 size={18} />,       label: "Beyond Code" },
    { id: "certifications",icon: <Award size={18} />,        label: nav.certifications},
    { id: "blog",          icon: <Newspaper size={18} />,    label: nav.blog || "Blog" },
    { id: "contact",       icon: <Send size={18} />,         label: nav.contact       },
  ], [language, nav]);

  const SECTION_IDS = useMemo(() => [
    "about",
    "whyhireme",
    "services",
    "demo",
    "skills",
    "projects",
    "languages",
    "certifications",
    "blog",
    "contact",
  ], []);

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
  const currentIndexRef = useRef(0);
  const scrollPanelRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const isAnimatingRef = useRef(false);

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

  const getTargetScrollTop = (target: HTMLElement, panel: HTMLElement | null, isMobile: boolean) => {
    if (!isMobile && panel) {
      const panelRect = panel.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      return panel.scrollTop + (targetRect.top - panelRect.top);
    } else {
      return target.getBoundingClientRect().top + window.scrollY - 76;
    }
  };

  const scrollToSectionIndex = (index: number) => {
    if (index < 0 || index >= SECTION_IDS.length) return;
    const targetId = SECTION_IDS[index];
    const target = document.getElementById(targetId);
    const isMobile = window.innerWidth < 1024;
    const panel = scrollPanelRef.current;

    if (target) {
      isAnimatingRef.current = true;
      isScrollingRef.current = true;
      currentIndexRef.current = index;
      setActiveSection(targetId);
      activeSectionRef.current = targetId;

      if (!isMobile && panel) {
        const top = getTargetScrollTop(target, panel, false);
        panel.scrollTo({ top, behavior: "smooth" });
      } else {
        const top = getTargetScrollTop(target, null, true);
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }

      setTimeout(() => {
        isAnimatingRef.current = false;
        isScrollingRef.current = false;
      }, 650);
    }
  };

  const scrollToSection = (id: string) => {
    let index = SECTION_IDS.indexOf(id);
    if (index === -1) {
      if (id === "bio") index = 0;
      else index = 0;
    }
    scrollToSectionIndex(index);
  };

  /* ── FULL-PAGE SCROLL-SNAP GESTURE CONTROLLER ── */
  useEffect(() => {
    if (!isMounted) return;

    const isExcluded = (target: EventTarget | null) => {
      if (!target || !(target instanceof HTMLElement)) return false;
      return !!target.closest(
        '[role="dialog"], .modal-container, input, textarea, select, pre, code, .terminal-window, #admin-panel, #login-modal, [data-prevent-scroll-snap="true"]'
      );
    };

    let wheelAccumulator = 0;
    let wheelResetTimer: ReturnType<typeof setTimeout> | null = null;

    // Window-level Wheel gesture listener (1 deliberate scroll = 1 section jump)
    const handleWheel = (e: WheelEvent) => {
      if (showLogin || showAdmin || showTerminal) return;
      if (isExcluded(e.target)) return;

      // Always prevent default free-scrolling so it locks directly into crisp section jumps
      e.preventDefault();

      if (isAnimatingRef.current) return;

      wheelAccumulator += e.deltaY;
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => {
        wheelAccumulator = 0;
      }, 180);

      const THRESHOLD = 16;
      if (wheelAccumulator > THRESHOLD) {
        wheelAccumulator = 0;
        if (currentIndexRef.current < SECTION_IDS.length - 1) {
          scrollToSectionIndex(currentIndexRef.current + 1);
        }
      } else if (wheelAccumulator < -THRESHOLD) {
        wheelAccumulator = 0;
        if (currentIndexRef.current > 0) {
          scrollToSectionIndex(currentIndexRef.current - 1);
        }
      }
    };

    // Attach to window so anywhere the user scrolls (card, sidebar, background), it jumps cleanly
    if (!isMobileView) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
    };
  }, [isMounted, showLogin, showAdmin, showTerminal, SECTION_IDS, isMobileView]);

  useEffect(() => {
    const TARGET = "ijlal";
    let keyBuffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") { e.preventDefault(); setShowLogin(true); return; }
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") { keyBuffer = ""; return; }
      
      // Keyboard section navigation (ArrowDown / ArrowUp / PageDown / PageUp)
      if (!showLogin && !showAdmin && !showTerminal) {
        if (e.key === "ArrowDown" || e.key === "PageDown") {
          if (currentIndexRef.current < SECTION_IDS.length - 1) {
            e.preventDefault();
            scrollToSectionIndex(currentIndexRef.current + 1);
            return;
          }
        } else if (e.key === "ArrowUp" || e.key === "PageUp") {
          if (currentIndexRef.current > 0) {
            e.preventDefault();
            scrollToSectionIndex(currentIndexRef.current - 1);
            return;
          }
        }
      }

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > TARGET.length) keyBuffer = keyBuffer.slice(-TARGET.length);
      if (keyBuffer === TARGET) { keyBuffer = ""; setShowTerminal(true); trackEvent("terminal_open"); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showLogin, showAdmin, showTerminal, SECTION_IDS]);

  // Listen for navigateTo events dispatched by child components (e.g. WhyHireMe Hire Me button)
  useEffect(() => {
    const handleNavigateTo = (e: Event) => {
      const id = (e as CustomEvent<{ id: string }>).detail?.id;
      if (id) scrollToSection(id);
    };
    window.addEventListener("navigateTo", handleNavigateTo);
    return () => window.removeEventListener("navigateTo", handleNavigateTo);
  }, [SECTION_IDS]);

  useEffect(() => {
    if (!isMounted) return;
    const isMobile = window.innerWidth < 1024;
    const scrollPanel = scrollPanelRef.current;
    const options = {
      root: isMobile ? null : scrollPanel,
      threshold: [0.35, 0.6]
    };
    const observer = new IntersectionObserver((entries) => {
      if (isScrollingRef.current || isAnimatingRef.current) return;
      
      let bestEntry: IntersectionObserverEntry | null = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      });

      if (bestEntry) {
        const id = (bestEntry as IntersectionObserverEntry).target.id;
        let activeId = id;
        if (id === "bio") activeId = "about";
        const index = SECTION_IDS.indexOf(activeId);
        if (index !== -1) {
          setActiveSection(activeId);
          activeSectionRef.current = activeId;
          currentIndexRef.current = index;
        }
      }
    }, options);
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isMounted, SECTION_IDS]);

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
              <main ref={scrollPanelRef} id="content-scroll-panel" className="flex-1 lg:overflow-y-auto custom-scrollbar-hidden relative scroll-snap-container" style={{ scrollbarWidth: "none" }}>
                <div id="sections-container" className="px-3 md:px-6 lg:px-8 py-0 relative origin-center">

                  {/* 1. Hero / About */}
                  <section className="scroll-snap-section" id="about"><About /></section>

                  {/* 1.2 Why Hire Me */}
                  <section className="scroll-snap-section" id="whyhireme"><WhyHireMe /></section>

                  {/* 4. Services */}
                  <section className="scroll-snap-section" id="services"><Services /></section>

                  {/* 1.5 Demos */}
                  <section className="scroll-snap-section" id="demo"><DemosHub /></section>

                  {/* 2. Skills */}
                  <section className="scroll-snap-section" id="skills"><Skills /></section>

                  {/* 3. Featured Projects */}
                  <section className="scroll-snap-section" id="projects"><Projects /></section>

                  {/* 5. Languages */}
                  <section className="scroll-snap-section" id="languages"><LanguageSkills /></section>

                  {/* 7. Certifications */}
                  <section className="scroll-snap-section" id="certifications"><Certifications /></section>

                  {/* 8. Blog */}
                  <section className="scroll-snap-section" id="blog"><Blog /></section>

                  {/* 9. Contact & Footer */}
                  <section className="scroll-snap-section flex flex-col justify-between" id="contact">
                    <div className="w-full flex-1 flex flex-col justify-center">
                      <Contact />
                    </div>

                    {/* Compact Integrated Footer */}
                    <div className="pt-3 mt-2 border-t border-white/5 flex flex-col sm:flex-row gap-3 justify-between items-center shrink-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--text-muted)]">{translations[language].footer.copy}</span>
                        <button onClick={() => setShowTerminal(true)} className="group flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-lg hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all">
                          <TerminalIcon size={11} className="text-[var(--accent)]" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-all">{translations[language].footer.launch}</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {[
                          { name: "GitHub",   icon: <Github size={14} />,      href: "https://github.com/ijlalxansari1",                      color: "text-white hover:bg-white/10"       },
                          { name: "LinkedIn", icon: <Linkedin size={14} />,    href: "https://linkedin.com/in/ijlal-ansari-56b0371b0",         color: "text-[#0077B5] hover:bg-[#0077B5]/10"},
                          { name: "WhatsApp", icon: <MessageSquare size={14}/>,href: "https://wa.me/923371880807",                             color: "text-[#25D366] hover:bg-[#25D366]/10"},
                          { name: "Email",    icon: <Mail size={14} />,        href: "mailto:ansariijlal90@gmail.com",                         color: "text-[#EA4335] hover:bg-[#EA4335]/10"},
                          { name: "Fiverr",   icon: <FiverrIcon size={14} />,  href: "https://www.fiverr.com/s/8xdmv6g",                      color: "text-[#1DBF73] hover:bg-[#1DBF73]/10"},
                          { name: "Spotify",  icon: <SpotifyIcon size={14} />, href: "https://open.spotify.com/user/317wnqu4ns3xrkhibk5djcuhfmq4?si=ba33e571a6044615", color: "text-[#1DB954] hover:bg-[#1DB954]/10"},
                          { name: "SoundCloud", icon: <SoundCloudIcon size={14} />, href: "https://on.soundcloud.com/mLoNh7A9s8me4liNZ8", color: "text-[#FF5500] hover:bg-[#FF5500]/10"},
                        ].map((s, i) => (
                          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className={`group w-7 h-7 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-300 ${s.color} hover:scale-110 hover:border-white/10`}>
                            <div className="opacity-50 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </section>

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


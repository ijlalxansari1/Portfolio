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

// Dynamically import heavy features for performance and scalability
const Terminal = dynamic(() => import("./components/Terminal"), { ssr: false });
const GitHubFeed = dynamic(() => import("./components/GitHubFeed"), { ssr: false });
const EthicsPledge = dynamic(() => import("./components/EthicsPledge"), { ssr: false });
const DemosHub = dynamic(() => import("./components/DemosHub"), { ssr: false });
const AmbientBackground = dynamic(() => import("./components/AmbientBackground"), { ssr: false });
const LokiMultiverseBackground = dynamic(() => import("./components/LokiMultiverseBackground"), { ssr: false });
const TvaBackground = dynamic(() => import("./components/TvaBackground"), { ssr: false });

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
    { id: "about",    icon: <User size={18} />,       label: nav.about    },
    { id: "skills",   icon: <Dumbbell size={18} />,   label: nav.skills   },
    { id: "services", icon: <Wrench size={18} />,     label: nav.services },
    { id: "demo",     icon: <FlaskConical size={18} />, label: nav.demo     },
    { id: "projects", icon: <Briefcase size={18} />,  label: nav.projects },
    { id: "resume",   icon: <Landmark size={18} />,   label: nav.resume   },
    { id: "certifications", icon: <Award size={18} />, label: nav.certifications },
    { id: "github",   icon: <Github size={18} />,     label: nav.github   },
    { id: "blog",     icon: <Newspaper size={18} />,  label: nav.blog     },
    { id: "contact",  icon: <Send size={18} />,       label: nav.contact  },
  ], [language, nav]);

  const [isTimeSlipping, setIsTimeSlipping] = useState(false);

  const scrollToSection = (id: string) => {
    // Only trigger Time-Slip Animation for narrative themes
    if (theme === "loki" || theme === "tva") {
      setIsTimeSlipping(true);
      setTimeout(() => setIsTimeSlipping(false), 600); // match animation duration
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Bulletproof Terminal Trigger ──
  useEffect(() => {
    const TARGET = "ijlal";
    let keyBuffer = "";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Admin trigger
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        setShowLogin(true);
        return;
      }

      // Ignore if typing in inputs
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        keyBuffer = "";
        return;
      }
      
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > TARGET.length) {
        keyBuffer = keyBuffer.slice(-TARGET.length);
      }

      if (keyBuffer === TARGET) {
        keyBuffer = "";
        setShowTerminal(true);
        trackEvent("terminal_open");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── FEATURE: Rock-Solid Scroll Spy (IntersectionObserver) ──
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
        // We only care about entries that are intersecting
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          const id = entry.target.id;
          
          // Map sub-sections to their parent nav items if necessary
          let activeId = id;
          if (id === "pledge" || id === "bio") activeId = "about";
          
          // Only update if it's a valid nav item
          if (navItems.some(item => item.id === activeId)) {
            setActiveSection(activeId);
            activeSectionRef.current = activeId;
          }
        }
      });
    }, options);
    
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, [isMounted, navItems]);

  // Show Scroll Top Button logic
  useEffect(() => {
    const panel = scrollPanelRef.current;
    if (!panel) return;
    const handleScroll = () => {
      setShowScrollTop(panel.scrollTop > 300);
    };
    panel.addEventListener("scroll", handleScroll, { passive: true });
    return () => panel.removeEventListener("scroll", handleScroll);
  }, []);


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform values for a subtle 3D tilt
  const rotateX = useTransform(mouseY, [-1, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

  if (!isMounted) return null;

  return (
    <>
      <LoadingScreen onComplete={() => setBootDone(true)} />
      
      <div 
        className="relative lg:fixed lg:inset-0 bg-transparent transition-all duration-400 min-h-screen lg:min-h-0 overflow-x-hidden w-full max-w-full transition-opacity duration-1000"
        style={{ opacity: bootDone ? 1 : 0, visibility: bootDone ? "visible" : "hidden", perspective: "1500px" }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {theme !== "loki" && theme !== "tva" && <AmbientBackground />}
          {theme === "loki" && <LokiMultiverseBackground />}
          {theme === "tva" && <TvaBackground />}
        </div>

      <AnalyticsTracker />
      
      {/* ── Mobile Header (Ryan CV Style) ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-[70px] bg-[var(--bg-card)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] z-[10000] flex items-center justify-between px-6 shadow-lg">
        <div className="flex flex-col">
          <span className="text-[15px] font-black text-[var(--text-primary)] tracking-tight">Ijlal Ansari</span>
          <span className="text-[9px] font-bold text-[var(--accent)] uppercase tracking-[0.2em]">{translations[language].mobileHeader.role}</span>
        </div>
        <div className="flex items-center gap-3">
          {tracks?.length > 1 && (
            <button
              onClick={nextTrack}
              className="w-11 h-11 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all shadow-sm"
              aria-label="Next background track"
            >
              <SkipForward size={18} />
            </button>
          )}
          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all shadow-sm"
            aria-label="Toggle background music"
          >
            {isPlaying ? (
              <Volume2 size={20} className="text-[var(--accent)] animate-pulse" />
            ) : (
              <VolumeX size={20} className="opacity-55" />
            )}
          </button>
          <div className="ml-1.5">
            <ThemeBuddy />
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shadow-sm"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile Side Menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10001] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[var(--bg-card)] border-l border-[var(--border-subtle)] z-[10002] lg:hidden p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]">{translations[language].mobileHeader.nav}</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--accent)]">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 text-[14px] font-black uppercase tracking-widest transition-all ${
                      activeSection === item.id ? "text-[var(--accent)] translate-x-2" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-[var(--accent)] transition-all ${activeSection === item.id ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} />
                    {item.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-auto pt-8 border-t border-[var(--border-subtle)]">
                 <ThemeBuddy />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop/Tablet Navigation (Hidden on small mobile) ── */}
      <nav className="hidden md:flex fixed bottom-5 left-5 right-5 lg:left-5 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:right-auto lg:w-[56px] lg:h-auto bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border-subtle)] p-2 lg:py-6 rounded-[20px] lg:rounded-[28px] flex-row lg:flex-col items-center justify-center gap-4 md:gap-6 lg:gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[9999]">
        <div className="flex flex-row lg:flex-col items-center justify-center gap-4 md:gap-6 lg:gap-2 overflow-x-auto lg:overflow-x-visible custom-scrollbar-hidden w-full lg:w-auto px-1 lg:px-0">
          <div className="block lg:mb-2">
            <ThemeBuddy />
          </div>
          
          {tracks?.length > 1 && (
            <button
              onClick={nextTrack}
              className="w-[38px] h-[38px] flex items-center justify-center rounded-xl transition-all duration-300 text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:bg-[var(--border-subtle)] hover:text-[var(--accent)]"
              aria-label="Next track"
            >
              <SkipForward size={16} />
            </button>
          )}

          <button
            onClick={togglePlay}
            className={`group relative w-[38px] h-[38px] flex items-center justify-center rounded-xl transition-all duration-300 ${
              isPlaying ? "bg-[var(--accent)]/15 text-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)]" : "text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:bg-[var(--border-subtle)]"
            }`}
            aria-label="Toggle background music"
          >
            {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
            {/* Dynamic Hover Tooltip for Desktop */}
            <span className="hidden lg:block pointer-events-none absolute left-full ml-4 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all -translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl">
              {isPlaying && currentTrack ? `${currentTrack.title} - ${currentTrack.artist}` : "Background Music"}
            </span>
          </button>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative min-w-[38px] h-[38px] flex items-center justify-center rounded-xl transition-all duration-300 ${
                activeSection === item.id ? "bg-[var(--accent)]/15 text-[var(--accent)]" : "text-[var(--text-secondary)] opacity-50 hover:opacity-100 hover:bg-[var(--border-subtle)]"
              }`}
            >
              {item.icon}
              <span className="hidden lg:block pointer-events-none absolute left-full ml-4 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all -translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── Main Layout ── */}
      <div className="relative lg:absolute lg:inset-0 flex items-center justify-center p-4 md:p-6 lg:pl-[85px] lg:pr-6 min-h-screen lg:min-h-0 pt-[90px] lg:pt-0 w-full max-w-full overflow-x-hidden pointer-events-none">
        <motion.div 
          className="w-full h-full max-w-[1300px] flex flex-col lg:flex-row gap-[14px] pointer-events-auto"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
        >
          <div className="w-full lg:w-[340px] shrink-0 lg:h-full max-w-full overflow-hidden" style={{ transform: "translateZ(30px)" }}>
            <ProfileSidebar activeTab={activeSection} onTabChange={() => {}} />
          </div>

          <div className="flex-1 lg:h-full bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col transition-all duration-400 relative top-glow" style={{ transform: "translateZ(20px)" }}>
            <div ref={scrollPanelRef} id="content-scroll-panel" className="flex-1 overflow-y-auto custom-scrollbar-hidden relative" style={{ scrollbarWidth: "none" }}>
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes time-slip {
                  0% { transform: scaleX(1) skewX(0); filter: hue-rotate(0deg) contrast(1); }
                  15% { transform: scaleX(1.1) skewX(10deg) translateX(-10px); filter: hue-rotate(90deg) contrast(1.5) saturate(2); }
                  30% { transform: scaleX(0.8) skewX(-10deg) translateX(10px); filter: hue-rotate(-90deg) contrast(2) saturate(3); opacity: 0.8; }
                  45% { transform: scaleX(1.1) skewX(5deg) translateX(-5px); filter: hue-rotate(180deg) contrast(1.2); }
                  100% { transform: scaleX(1) skewX(0) translateX(0); filter: hue-rotate(0deg) contrast(1) saturate(1); opacity: 1; }
                }
                .time-slip-anim {
                  animation: time-slip 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                }
              `}} />
              <div id="sections-container" className={`p-4 pt-4 md:p-10 md:pt-4 lg:p-14 lg:pt-0 space-y-4 lg:space-y-16 relative origin-center ${isTimeSlipping ? 'time-slip-anim pointer-events-none' : ''}`}>
                <motion.section 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  id="about"
                >
                  <About />
                </motion.section>

                <Bio />
                <div className="h-px w-full bg-white/[0.05]" />
                
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="skills" 
                  className="space-y-20 lg:space-y-32"
                >
                  <div className="space-y-20">
                    <Technologies />
                    <div className="h-px w-full bg-[var(--border-subtle)] opacity-50" />
                    <ToolStack />
                    <div className="h-px w-full bg-[var(--border-subtle)] opacity-50" />
                    <GeneralSkills />
                  </div>
                </motion.section>
                <div className="h-px w-full bg-white/[0.05]" />

                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="services"
                >
                  <Services />
                </motion.section>
                
                <div className="h-px w-full bg-white/[0.05]" />
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="pledge"
                >
                  <EthicsPledge />
                </motion.section>

                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="demo" 
                  className="py-20"
                >
                  <DemosHub />
                </motion.section>

                <div className="h-px w-full bg-white/[0.05]" />
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="projects"
                >
                  <Projects />
                </motion.section>
                
                <div className="h-px w-full bg-white/[0.05]" />
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="resume"
                >
                  <Resume />
                </motion.section>

                <div className="h-px w-full bg-white/[0.05]" />
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="certifications"
                >
                  <Certifications />
                </motion.section>

                <div className="h-px w-full bg-white/[0.05]" />
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="github"
                >
                  <GitHubFeed />
                </motion.section>

                <div className="h-px w-full bg-white/[0.05]" />
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="blog"
                >
                  <Blog />
                </motion.section>

                <div className="h-px w-full bg-white/[0.05]" />
                <motion.section 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  id="contact"
                >
                  <Contact />
                </motion.section>

                {/* CTA Banner */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="p-12 bg-gradient-to-r from-[#00e87a]/10 to-transparent border border-[#00e87a]/20 rounded-[32px] flex flex-col md:flex-row justify-between items-center gap-8"
                >
                  <div>
                    <h3 className="text-[24px] font-black text-white mb-2">{translations[language].footer.cta_title}</h3>
                    <p className="text-[14px] text-white/50">{translations[language].footer.cta_desc}</p>
                  </div>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 bg-[#00e87a] text-black font-black uppercase tracking-widest text-[12px] rounded-xl hover:scale-105 transition-all"
                  >
                    {translations[language].footer.cta_button}
                  </button>
                </motion.div>

                {/* Footer Zone */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row gap-8 justify-between items-center">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20">{translations[language].footer.copy}</span>
                    <button 
                      onClick={() => setShowTerminal(true)}
                      className="group flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all"
                    >
                      <TerminalIcon size={14} className="text-[#00e87a]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-all">{translations[language].footer.launch}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {[
                      { icon: <Github size={18} />, href: "https://github.com/ijlalxansari1", color: "text-white hover:bg-white/10" },
                      { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/ijlal-ansari-56b0371b0", color: "text-[#0077B5] hover:bg-[#0077B5]/10" },
                      { icon: <MessageSquare size={18} />, href: "https://wa.me/923371880807", color: "text-[#25D366] hover:bg-[#25D366]/10" },
                      { icon: <Mail size={18} />, href: "mailto:ansariijlal90@gmail.com", color: "text-[#EA4335] hover:bg-[#EA4335]/10" }
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`group w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center transition-all duration-500 ${social.color} hover:scale-110 hover:border-white/10`}
                      >
                        <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                          {social.icon}
                        </div>
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

      {/* Overlays */}
      <Terminal isOpen={showTerminal} onClose={() => setShowTerminal(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={() => { setShowLogin(false); setShowAdmin(true); }} />
      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-[28px] right-[28px] w-[44px] h-[44px] bg-[var(--accent)] text-black rounded-full flex items-center justify-center shadow-lg z-[999] hover:scale-110 transition-all border-none"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import {
  User, Dumbbell, Wrench, Briefcase, Landmark,
  Newspaper, Send, ArrowUp, FlaskConical, Github, Linkedin, Terminal as TerminalIcon,
  Quote
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

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
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import LoginModal from "./components/LoginModal";

import ThemeBuddy from "./components/ThemeBuddy";

// New Feature Imports
import Terminal from "./components/Terminal";
import GitHubFeed from "./components/GitHubFeed";
import EthicsPledge from "./components/EthicsPledge";
import DemosHub from "./components/DemosHub";

import AnalyticsTracker, { trackEvent } from "./components/AnalyticsTracker";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const { theme } = useTheme();
  
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
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);
    
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    
    return () => observer.disconnect();
  }, []);

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

  const navItems = [
    { id: "about",    icon: <User size={18} />,       label: "About"    },
    { id: "skills",   icon: <Dumbbell size={18} />,   label: "Skills"   },
    { id: "services", icon: <Wrench size={18} />,     label: "Services" },
    { id: "demo",     icon: <FlaskConical size={18} />, label: "Demo"     },
    { id: "projects", icon: <Briefcase size={18} />,  label: "Projects" },
    { id: "resume",   icon: <Landmark size={18} />,   label: "Resume"   },
    { id: "github",   icon: <Github size={18} />,     label: "GitHub"   },
    { id: "testimonials", icon: <Quote size={18} />,  label: "Reviews"  },
    { id: "blog",     icon: <Newspaper size={18} />,  label: "Blog"     },
    { id: "contact",  icon: <Send size={18} />,       label: "Contact"  },
  ];

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (scrollPanelRef.current && target) {
      scrollPanelRef.current.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
      setActiveSection(id);
      activeSectionRef.current = id;
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className="relative lg:fixed lg:inset-0 lg:overflow-hidden bg-[var(--bg-primary)] transition-all duration-400 min-h-screen lg:min-h-0"
    >
      {/* Cinematic Background Video (dark themes only) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {theme === 'light' ? (
          /* RyanCV-style lavender gradient for light mode */
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #e8e4f0 0%, #d6daf0 25%, #e0d8ee 50%, #dce4f5 75%, #e8e4f0 100%)'
          }} />
        ) : (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-50 scale-105"
            >
              <source src="/bg.mp4" type="video/mp4" />
              <source src="https://ryancv.bslthemes.com/dataops/wp-content/uploads/sites/20/2024/06/r-video-01-1.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#080808]/50 backdrop-blur-[1px]" />
            
            {/* Animated Cyber Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ 
                   backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)',
                   backgroundSize: '50px 50px',
                   maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                 }} 
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />
          </>
        )}
      </div>

      <AnalyticsTracker />
      
      {/* ── Responsive Navigation ── */}
      <nav className="fixed bottom-5 left-5 right-5 lg:left-5 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto lg:right-auto lg:w-[56px] lg:h-auto bg-[var(--bg-card)]/80 backdrop-blur-xl border border-[var(--border-subtle)] p-2 lg:py-6 rounded-[20px] lg:rounded-[28px] flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 lg:gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[9999]">
        <div className="hidden lg:block mb-3 pb-3 border-b border-[var(--border-subtle)]">
          <ThemeBuddy />
        </div>
        <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-3 overflow-x-auto lg:overflow-x-visible custom-scrollbar-hidden w-full lg:w-auto px-1 lg:px-0">
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
      <div className="relative lg:absolute lg:inset-0 flex items-center justify-center p-4 md:p-6 lg:pl-[85px] lg:pr-6 min-h-screen lg:min-h-0">
        <div className="w-full h-full max-w-[1300px] flex flex-col lg:flex-row gap-[14px] lg:overflow-hidden">
          <div className="w-full lg:w-[340px] shrink-0 lg:h-full">
            <ProfileSidebar activeTab={activeSection} onTabChange={() => {}} />
          </div>

          <div className="flex-1 lg:h-full bg-[var(--bg-card)] rounded-[28px] border border-[var(--border-subtle)] shadow-2xl overflow-hidden flex flex-col transition-all duration-400 relative top-glow">
            <div ref={scrollPanelRef} id="content-scroll-panel" className="flex-1 overflow-y-auto custom-scrollbar-hidden relative" style={{ scrollbarWidth: "none" }}>
              <div id="sections-container" className="p-10 lg:p-14 space-y-16 relative">
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
                  className="space-y-16"
                >
                  <Technologies />
                  <ToolStack />
                  <GeneralSkills />
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
                  id="testimonials"
                >
                  <Testimonials />
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
                    <h3 className="text-[24px] font-black text-white mb-2">Ready to build something ethical?</h3>
                    <p className="text-[14px] text-white/50">Let&apos;s discuss your next data architecture or research project.</p>
                  </div>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 bg-[#00e87a] text-black font-black uppercase tracking-widest text-[12px] rounded-xl hover:scale-105 transition-all"
                  >
                    Hire Me Today
                  </button>
                </motion.div>

                {/* Footer Zone */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row gap-8 justify-between items-center">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20">© 2026 Ijlal Ansari. Designed for Impact.</span>
                    <button 
                      onClick={() => setShowTerminal(true)}
                      className="group flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all"
                    >
                      <TerminalIcon size={14} className="text-[#00e87a]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-all">Launch ijlal.sh</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {[
                      { icon: <Github size={18} />, href: "https://github.com/ijlalxansari1", color: "text-white hover:bg-white/10" },
                      { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/ijlal-ansari-56b0371b0", color: "text-[#0077B5] hover:bg-[#0077B5]/10" },
                      { icon: <Send size={18} />, href: "https://wa.me/923371880807", color: "text-[#25D366] hover:bg-[#25D366]/10" },
                      { icon: <Newspaper size={18} />, href: "mailto:ansariijlal90@gmail.com", color: "text-[#EA4335] hover:bg-[#EA4335]/10" }
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
    </div>
  );
}

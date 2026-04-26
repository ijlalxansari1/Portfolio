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
      className="fixed inset-0 overflow-hidden bg-[var(--bg-primary)] transition-all duration-400"
    >
      {/* Cinematic Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
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
        <div className="absolute inset-0 bg-[#080808]/60 backdrop-blur-[1px]" />
        
        {/* Animated Cyber Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)',
               backgroundSize: '50px 50px',
               maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
             }} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />
      </div>

      <AnalyticsTracker />
      
      {/* ── Sidebar Navigation ── */}
      <nav className="sidebar absolute left-5 top-[24px] hidden md:flex flex-col w-[64px] bg-[var(--bg-card)] border border-[var(--border)] py-6 rounded-[32px] items-center gap-2 shadow-2xl z-50">
        <div className="mb-4 pb-4 border-b border-white/5">
          <ThemeBuddy />
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`group relative w-10 h-10 flex items-center justify-center rounded-[8px] transition-all duration-300 ${
              activeSection === item.id ? "nav-active" : ""
            }`}
          >
            <div className={activeSection === item.id ? "text-[var(--accent)]" : "text-[#666666] group-hover:text-white"}>
              {item.icon}
            </div>
            <span className="pointer-events-none absolute left-full ml-4 px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all -translate-x-2 group-hover:translate-x-0 z-50 shadow-2xl">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* ── Main Layout ── */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6 md:pl-[100px]">
        <div className="w-full h-full max-w-[1200px] flex flex-col md:flex-row gap-[18px] overflow-y-auto md:overflow-hidden">
          <div className="w-full md:w-[340px] shrink-0 md:h-full">
            <ProfileSidebar activeTab={activeSection} onTabChange={() => {}} />
          </div>

          <div className="flex-1 h-full bg-[var(--bg-card)] rounded-[28px] border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col transition-all duration-400">
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
                    <p className="text-[14px] text-white/50">Let's discuss your next data architecture or research project.</p>
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

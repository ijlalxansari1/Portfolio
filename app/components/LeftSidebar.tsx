"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Mail, Sun, Moon, User, Briefcase, FolderOpen, FileText, BookOpen, MessageSquare, Send, Code, DollarSign } from "lucide-react";
import Image from "next/image";

export default function LeftSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<string>("dark");

  const themes = ["dark", "light", "blue", "purple", "green"] as const;

  const titles = [
    "Data Engineer",
    "Data Analyst",
    "BI Engineer",
    "ETL Developer",
    "Data Architect",
    "Software Engineer",
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const sections = ["about", "technologies", "skills", "services", "pricing", "projects", "experience", "blog", "contact"];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') || 'dark') as typeof themes[number];
    if (themes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme as typeof themes[number]);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setCurrentTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden glass p-3 rounded-lg text-neon-mint hover:neon-glow"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar Container - Icon Column + Profile Card */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile ? (isMobileMenuOpen ? 0 : -400) : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full z-30 flex md:translate-x-0"
      >
        {/* Narrow Vertical Icon Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center gap-2 p-2 glass rounded-full my-2 ml-2 border border-white/10 bg-black/30 backdrop-blur-xl"
        >
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${currentTheme !== 'dark' ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <Sun size={18} />
          </motion.button>

          <motion.a
            href="#about"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "about" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <User size={18} />
          </motion.a>

          <motion.a
            href="#technologies"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "technologies" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <Code size={18} />
          </motion.a>

          <motion.a
            href="#skills"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "skills" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <Briefcase size={18} />
          </motion.a>

          <motion.a
            href="#services"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "services" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <FolderOpen size={18} />
          </motion.a>

          <motion.a
            href="#pricing"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "pricing" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <DollarSign size={18} />
          </motion.a>

          <motion.a
            href="#projects"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "projects" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <FileText size={18} />
          </motion.a>

          <motion.a
            href="#experience"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "experience" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <BookOpen size={18} />
          </motion.a>

          <motion.a
            href="#blog"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "blog" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <MessageSquare size={18} />
          </motion.a>

          <motion.a
            href="#contact"

            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center transition-all ${activeSection === "contact" ? "text-neon-mint bg-neon-mint/20" : "text-white hover:text-neon-mint"
              }`}
          >
            <Send size={18} />
          </motion.a>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-72 glass rounded-2xl p-5 border border-white/10 relative overflow-hidden my-2 ml-1 flex flex-col bg-black/30 backdrop-blur-xl"
        >
          {/* Top Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800" />

          {/* Profile Picture Frame */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative w-full aspect-square mb-3 rounded-xl overflow-hidden mx-auto"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
            }}
          >
            <Image
              src="/profile.png"
              alt="Ijlal Ansari"
              fill
              className="object-cover rounded-xl"
              priority
            />
            {/* Online Status Indicator */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-neon-mint rounded-full border-2 border-gray-900 z-10" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl font-bold text-white text-center mb-1"
          >
            Ijlal Ansari
          </motion.h1>

          {/* Dynamic Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-center mb-2"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-xs text-white uppercase tracking-wider font-semibold"
              >
                {titles[currentTitle]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-gray-500 mb-4 text-center"
          >
            Gilgit-Baltistan, Pakistan
          </motion.p>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-2 mb-3"
          >
            <motion.a
              href="https://linkedin.com/in/ijlal-ansari-56b0371b0"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-neon-mint transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </motion.a>
            <motion.a
              href="https://github.com/ijlalxansari1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-neon-mint transition-all"
              aria-label="GitHub"
            >
              <Github size={16} />
            </motion.a>
            <motion.a
              href="https://wa.me/923161881076"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-green-400 transition-all"
              aria-label="WhatsApp"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:ansariijlal90@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-neon-mint transition-all"
              aria-label="Email"
            >
              <Mail size={16} />
            </motion.a>
          </motion.div>

          {/* Action Buttons - Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-2"
          >
            <motion.a
              href="/Poono-Resume.pdf"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 px-3 text-center glass border border-white/10 text-white rounded-lg hover:bg-white/5 transition-all font-medium text-xs bg-black/20"
            >
              Download CV
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 px-3 text-center bg-neon-mint text-black rounded-lg hover:bg-neon-mint/90 transition-all font-medium text-xs"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Mail, Menu, X, Home, User, Briefcase, FolderOpen, FileText, BookOpen, MessageSquare, Sun, Moon } from "lucide-react";
import Image from "next/image";

export default function LeftSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<string>("dark");

  const themes = ["dark", "light", "blue", "purple", "green"] as const;
  const themeNames = ["Dark", "Light", "Blue", "Purple", "Green"] as const;

  const titles = [
    "DATA ENGINEER",
    "DATA ANALYST",
    "BI ENGINEER",
    "ETL DEVELOPER",
    "DATA ARCHITECT",
    "SOFTWARE ENGINEER",
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

    // Update active section on scroll
    const handleScroll = () => {
      const sections = ["about", "skills", "services", "projects", "experience", "blog", "contact"];
      const scrollPosition = window.scrollY + 200;

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

  // Rotate titles dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);
    setIsDarkMode(savedTheme === 'dark');
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    setCurrentTheme(nextTheme);
    setIsDarkMode(nextTheme === 'dark');
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store theme preference
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 md:hidden glass p-3 rounded-lg text-neon-mint hover:neon-glow"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile ? (isMobileMenuOpen ? 0 : -300) : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-80 z-30 glass border-r border-white/10 p-8 flex flex-col items-center md:translate-x-0"
      >
        {/* Profile Card - Top Frame */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full mb-6 glass rounded-2xl p-6 border border-white/10 relative overflow-hidden"
        >
          {/* Top Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800" />
          
          {/* Profile Picture */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative w-full aspect-square mb-6 rounded-xl overflow-hidden border-2 border-neon-mint/30"
          >
            <Image
              src="/profile.png"
              alt="Ijlal Ansari"
              fill
              className="object-cover"
              priority
            />
            {/* Online Status Indicator */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-neon-mint rounded-full border-2 border-gray-900 z-10" />
          </motion.div>

          {/* Title Below Picture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTitle}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2"
              >
                {titles[currentTitle]}
              </motion.p>
            </AnimatePresence>
            <h1 className="text-2xl font-bold text-white">Ijlal Ansari</h1>
          </motion.div>

          {/* Social Media Icons - Bottom of Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-3"
          >
            <motion.a
              href="https://www.linkedin.com/in/ijlal-ansari"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0, 255, 179, 0.5)" }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-neon-mint hover:border-neon-mint transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href="https://github.com/ijlalansari"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0, 255, 179, 0.5)" }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-neon-mint hover:border-neon-mint transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="mailto:poono.data@gmail.com"
              whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(0, 255, 179, 0.5)" }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:text-neon-mint hover:border-neon-mint transition-all"
            >
              <Mail size={18} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Theme Toggle Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:border-neon-mint/50 transition-all shadow-lg mb-2 relative"
          title={`Current Theme: ${themeNames[themes.indexOf(currentTheme)] || "Dark"} - Click to change`}
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          {/* Theme Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-mint rounded-full border-2 border-gray-900" />
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-xs text-gray-500 mb-4"
        >
          {(() => {
            const themeIndex = themes.indexOf(currentTheme);
            return themeIndex >= 0 ? themeNames[themeIndex] : "Dark";
          })()} Theme
        </motion.p>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full mb-6 px-4"
        >
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
            Languages
          </p>
          <div className="space-y-1">
            <p className="text-xs text-gray-400">English — Professional proficiency</p>
            <p className="text-xs text-gray-400">German — Learning (Beginner)</p>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full mb-6"
        >
          <ul className="space-y-1">
            {[
              { icon: Home, label: "About", href: "#about", id: "about" },
              { icon: User, label: "Skills", href: "#skills", id: "skills" },
              { icon: Briefcase, label: "Services", href: "#services", id: "services" },
              { icon: FolderOpen, label: "Projects", href: "#projects", id: "projects" },
              { icon: FileText, label: "Resume", href: "#experience", id: "experience" },
              { icon: BookOpen, label: "Articles", href: "#blog", id: "blog" },
              { icon: MessageSquare, label: "Contact", href: "#contact", id: "contact" },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.label}>
                  <motion.a
                    href={item.href}
                    onClick={() => setActiveSection(item.id)}
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group ${
                      isActive
                        ? "bg-neon-mint/20 text-neon-mint border border-neon-mint/50"
                        : "text-gray-400 hover:text-neon-mint hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isActive ? "text-neon-mint" : "group-hover:text-neon-mint"
                      }`}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </motion.nav>

        {/* Social Icons - Additional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4 mb-6"
        >
          <motion.a
            href="https://www.linkedin.com/in/ijlal-ansari"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 179, 0.5)" }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-neon-mint hover:text-neon-mint hover:border-neon-mint border border-transparent transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </motion.a>
          <motion.a
            href="https://github.com/ijlalansari"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 179, 0.5)" }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-neon-mint hover:text-neon-mint hover:border-neon-mint border border-transparent transition-all"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href="mailto:poono.data@gmail.com"
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 179, 0.5)" }}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-neon-mint hover:text-neon-mint hover:border-neon-mint border border-transparent transition-all"
          >
            <Mail size={18} />
          </motion.a>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="w-full space-y-3 mt-auto"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block w-full py-3 px-6 text-center glass border border-neon-mint/50 text-neon-mint rounded-lg hover:bg-neon-mint/10 hover:border-neon-mint transition-all font-medium"
          >
            Contact Me
          </motion.a>
          <motion.a
            href="/Ijlal-Ansari-Resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block w-full py-3 px-6 text-center glass border border-neon-mint/50 text-neon-mint rounded-lg hover:bg-neon-mint/10 hover:border-neon-mint transition-all font-medium"
          >
            Download CV
          </motion.a>
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

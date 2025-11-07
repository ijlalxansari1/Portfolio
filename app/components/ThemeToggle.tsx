"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get saved theme or detect system preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("system");
      applyTheme("system");
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    let effectiveTheme: "light" | "dark";

    if (selectedTheme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
      effectiveTheme = selectedTheme;
    }

    if (effectiveTheme === "light") {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    } else {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-6 right-6 z-50 glass rounded-full p-2 border border-white/10 backdrop-blur-xl bg-black/40"
    >
      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleThemeChange("light")}
          className={`p-2 rounded-full transition-all ${
            theme === "light" ? "bg-neon-mint/20 text-neon-mint" : "text-gray-400 hover:text-white"
          }`}
          aria-label="Light theme"
        >
          <Sun size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleThemeChange("dark")}
          className={`p-2 rounded-full transition-all ${
            theme === "dark" ? "bg-neon-mint/20 text-neon-mint" : "text-gray-400 hover:text-white"
          }`}
          aria-label="Dark theme"
        >
          <Moon size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleThemeChange("system")}
          className={`p-2 rounded-full transition-all ${
            theme === "system" ? "bg-neon-mint/20 text-neon-mint" : "text-gray-400 hover:text-white"
          }`}
          aria-label="System theme"
        >
          <Monitor size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}


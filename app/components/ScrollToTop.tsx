"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ScrollToTop() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      let scrollY = 0;
      let windowHeight = 1;
      let documentHeight = 1;

      const scrollPanel = document.getElementById('content-scroll-panel');
      if (window.innerWidth >= 1024 && scrollPanel) {
        scrollY = scrollPanel.scrollTop;
        windowHeight = scrollPanel.clientHeight;
        documentHeight = scrollPanel.scrollHeight;
      } else {
        scrollY = window.scrollY;
        windowHeight = window.innerHeight;
        documentHeight = document.documentElement.scrollHeight;
      }

      // Show top button when scrolled down more than 300px
      setShowTopButton(scrollY > 300);

      // Show bottom button when not near the bottom (within 100px of bottom)
      setShowBottomButton(scrollY < documentHeight - windowHeight - 100);
    };

    // Check on mount
    toggleVisibility();

    const scrollPanel = document.getElementById('content-scroll-panel');
    if (scrollPanel) scrollPanel.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility);
    
    return () => {
      if (scrollPanel) scrollPanel.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    const scrollPanel = document.getElementById('content-scroll-panel');
    if (window.innerWidth >= 1024 && scrollPanel) {
      scrollPanel.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    const scrollPanel = document.getElementById('content-scroll-panel');
    if (window.innerWidth >= 1024 && scrollPanel) {
      scrollPanel.scrollTo({ top: scrollPanel.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 z-50 glass p-3 rounded-full border border-neon-mint/50 text-neon-mint hover:bg-neon-mint/10 transition-all shadow-lg"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showBottomButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToBottom}
            className="fixed bottom-6 right-6 z-50 glass p-3 rounded-full border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 transition-all shadow-lg"
            aria-label="Scroll to bottom"
          >
            <ArrowDown size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}


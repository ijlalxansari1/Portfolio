"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Download, ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

const titles = [
  "Data Engineer",
  "AI Researcher", 
  "Platform Architect",
  "Data Scientist"
];

export default function About() {
  const [displayText, setDisplayText] = useState("");
  const titleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function type() {
      const current = titles[titleIndexRef.current];
      
      if (isDeletingRef.current) {
        setDisplayText(current.substring(0, charIndexRef.current - 1));
        charIndexRef.current--;
      } else {
        setDisplayText(current.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
      }

      if (!isDeletingRef.current && charIndexRef.current === current.length) {
        timerRef.current = setTimeout(() => {
          isDeletingRef.current = true;
          type();
        }, 1800);
        return;
      }

      if (isDeletingRef.current && charIndexRef.current === 0) {
        isDeletingRef.current = false;
        titleIndexRef.current = (titleIndexRef.current + 1) % titles.length;
      }

      const speed = isDeletingRef.current ? 60 : 100;
      timerRef.current = setTimeout(type, speed);
    }

    timerRef.current = setTimeout(type, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full relative min-h-[80vh] flex flex-col justify-center">
      {/* Cinematic Background Watermark */}
      <div className="absolute -top-20 -left-20 text-[200px] font-black text-white/[0.02] pointer-events-none select-none z-0 uppercase tracking-tighter font-jakarta">
        DataOps
      </div>

      <div className="relative z-10 space-y-6 mb-12">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[var(--text-secondary)] opacity-50 text-[18px] lg:text-[22px] font-bold"
        >
          Hello, I&apos;m <span className="text-[var(--accent)] opacity-100">Ijlal Ansari</span>
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hero-name text-[42px] md:text-[64px] lg:text-[92px] font-black text-[var(--text-primary)] leading-[0.95] tracking-tight"
        >
          Ijlal <span className="text-[var(--accent)]">Ansari.</span>
        </motion.h1>

        <div className="flex items-center gap-4 flex-wrap text-[18px] md:text-[24px] lg:text-[32px] font-black">
          <span className="text-[var(--text-secondary)] opacity-30">Expert in</span>
          <span className="text-[var(--accent)] relative">
            <span className="typewriter-text">{displayText}</span>
            <span className="cursor">|</span>
          </span>
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[14px] md:text-[17px] lg:text-[20px] text-[var(--text-secondary)] opacity-60 leading-[1.8] max-w-[700px] mb-12 font-medium"
      >
        Architecting truth through technology. I build scalable data infrastructure, 
        govern ethical AI pipelines, and design high-fidelity analytical platforms 
        where data integrity is the primary constraint.
      </motion.p>

      {/* Hero Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-6 mb-16"
      >
        <Magnetic>
          <button 
            onClick={() => {
              const panel = document.getElementById("content-scroll-panel");
              const target = document.getElementById("contact");
              if (panel && target) panel.scrollTo({ top: target.offsetTop, behavior: "smooth" });
            }}
            className="group px-8 py-5 bg-[var(--accent)] text-black text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-4 hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_15px_35px_rgba(var(--accent-rgb),0.25)]"
          >
            Start a Conversation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Magnetic>

        <Magnetic>
          <button 
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/ijlalansari.pdf";
              link.download = "Ijlal_Ansari_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-8 py-5 bg-white/5 border border-white/10 text-white text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all"
          >
            <Download size={18} /> Get Technical CV
          </button>
        </Magnetic>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 pt-12 border-t border-[var(--border)]"
      >
        {[
          { num: "15+", label: "Scalable", sub: "Projects" },
          { num: "3+", label: "Years", sub: "of Experience" },
          { num: "5+", label: "Core", sub: "Certifications" },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -4 }}
            className="flex items-baseline gap-4"
          >
            <span className="text-[42px] md:text-[56px] font-black leading-none tracking-tighter text-[var(--text-primary)]">
              {stat.num}
            </span>
            <div className="space-y-0">
              <span className="block text-[13px] font-bold text-[var(--text-secondary)]">
                {stat.label}
              </span>
              <span className="block text-[13px] font-bold text-[var(--text-secondary)]">
                {stat.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll Hint */}
      <div className="absolute bottom-0 right-0 flex items-center gap-4 opacity-20 hidden lg:flex">
         <span className="text-[10px] font-black uppercase tracking-[0.4em] rotate-90 origin-right translate-y-10">Scroll</span>
         <div className="w-px h-24 bg-white/30" />
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Download, Send, Zap, Clock, Award } from "lucide-react";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

export default function About() {
  const { language } = useLanguage();
  const t = translations[language].hero;
  
  const [displayText, setDisplayText] = useState("");
  const titleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const titles = t.titles;

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
  }, [language, titles]);

  return (
    <div className="w-full relative min-h-[80vh] flex flex-col justify-center">
      {/* Cinematic Background Watermark */}
      <div className="absolute -top-20 -left-20 text-[200px] font-black text-white/[0.02] pointer-events-none select-none z-0 uppercase tracking-tighter font-jakarta">
        DataOps
      </div>

      <div className="relative z-10 space-y-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="section-label inline-flex items-center gap-3 px-4 py-1.5 bg-[#00e87a]/10 border border-[#00e87a]/30 text-[#00e87a] text-[10px] font-black uppercase tracking-[0.25em] rounded-full"
        >
          {t.greeting}
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-name text-[64px] lg:text-[92px] font-black text-white leading-[0.95] tracking-tight"
          >
            Ijlal <span className="text-[#00e87a]">Ansari.</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex px-4 py-1.5 bg-[#00e87a]/10 border border-[#00e87a]/20 rounded-full"
          >
            <span className="text-[#00e87a] text-[10px] font-black uppercase tracking-widest">{t.label}</span>
          </motion.div>
        </div>

        <div className="flex items-center gap-4 flex-wrap text-[24px] lg:text-[32px] font-black">
          <span className="text-[var(--text-secondary)] opacity-30">{t.expertIn}</span>
          <span className="text-[#00e87a] relative">
            <span className="typewriter-text">{displayText}</span>
            <span className="cursor">|</span>
          </span>
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[17px] lg:text-[20px] text-[var(--text-secondary)] opacity-60 leading-[1.8] max-w-[700px] mb-12 font-medium"
      >
        {t.bio}
      </motion.p>

      {/* Hero Buttons */}
      <div className="space-y-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-6"
        >
          <Magnetic>
            <button 
              onClick={() => {
                const panel = document.getElementById("content-scroll-panel");
                const target = document.getElementById("contact");
                if (panel && target) panel.scrollTo({ top: target.offsetTop, behavior: "smooth" });
              }}
              className="px-8 py-5 bg-[#00e87a] text-black text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-4 hover:scale-[1.05] active:scale-[0.95] transition-all shadow-[0_15px_35px_rgba(0,232,122,0.25)]"
            >
              {t.cta_talk} <Send size={18} />
            </button>
          </Magnetic>

          <Magnetic>
            <button 
              onClick={() => {
                const panel = document.getElementById("content-scroll-panel");
                const target = document.getElementById("projects");
                if (panel && target) panel.scrollTo({ top: target.offsetTop, behavior: "smooth" });
              }}
              className="px-8 py-5 bg-transparent border border-white/20 text-white text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all"
            >
              {t.cta_work}
            </button>
          </Magnetic>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl w-fit"
        >
          <span className="w-2 h-2 bg-[#00e87a] rounded-full animate-pulse shadow-[0_0_10px_#00e87a]" />
          <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">
            🟢 {t.availability}
          </span>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 pt-12 border-t border-white/5"
      >
        {[
          { num: t.stats.projects, label: t.stats.projects_sub, icon: <Zap className="text-yellow-400" size={24} />, color: "from-yellow-400 to-orange-500" },
          { num: t.stats.hours, label: t.stats.hours_sub, icon: <Clock className="text-blue-400" size={24} />, color: "from-blue-400 to-cyan-500" },
          { num: t.stats.taught, label: t.stats.taught_sub, icon: <Award className="text-[#00e87a]" size={24} />, color: "from-[#00e87a] to-emerald-500" },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }}
            className="flex flex-col group relative"
          >
            <div className="flex items-center gap-4 mb-3">
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-[#00e87a]/30 transition-all duration-500 shadow-xl">
                  {stat.icon}
               </div>
               <span className={`text-[44px] font-black leading-none tracking-tighter bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                 {stat.num}
               </span>
            </div>
            <div className="space-y-1">
              <span className="block text-[11px] font-black text-white uppercase tracking-[0.1em]">
                {stat.label}
              </span>
            </div>
            <div className={`absolute -inset-4 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] blur-2xl transition-all pointer-events-none`} />
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


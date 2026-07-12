"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { storage } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Bio() {
  const { language } = useLanguage();
  const t = translations[language].story;

  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const storyParagraphs = paragraphs.length > 0 ? paragraphs : t.paragraphs;

  useEffect(() => {
    const loadData = () => {
      const data = storage.get("admin-manifesto", { paragraphs: t.paragraphs });
      setParagraphs(data.paragraphs || t.paragraphs);
    };
    loadData();
    window.addEventListener("admin-updated", loadData);
    return () => window.removeEventListener("admin-updated", loadData);
  }, [t.paragraphs]);

  return (
    <section id="bio" className="w-full py-16 lg:py-24 border-t border-white/5 relative overflow-hidden">
      <div className="w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        
        {/* Left: Text & CTAs */}
        <div className="space-y-8 relative z-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Data Engineering Consultant
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[56px] font-black text-[var(--text-primary)] leading-[1.1] tracking-tight"
            >
              {t.heading} <br/>
              <span className="text-[var(--accent)]">{t.headingAccent}</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium max-w-[480px]"
          >
            {storyParagraphs.slice(0, 2).map((para: string, i: number) => (
              <p key={i} className="opacity-80">
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button 
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] text-black rounded-xl text-[12px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)]"
            >
              Explore Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 px-6 py-3.5 bg-transparent border border-white/20 text-white rounded-xl text-[12px] font-black uppercase tracking-widest hover:bg-white/5 hover:border-white/40 active:scale-95 transition-all"
            >
              <Terminal size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Right: Illustration / Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square lg:max-h-[500px] xl:max-h-[600px] rounded-3xl overflow-hidden bg-black/40 border border-white/10 group shadow-2xl"
        >
          {/* Subtle gradient overlay to blend into the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-card)] via-transparent to-transparent z-10 pointer-events-none" />
          
          <Image
            src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200"
            alt="Data Engineering Architecture"
            fill
            className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal"
          />
          
          {/* Decorative SaaS elements overlay */}
          <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Pipeline Active</span>
             </div>
             <div className="text-xl font-black text-white tracking-tight">1.2M <span className="text-[12px] text-white/50 uppercase tracking-widest font-bold">Rows / sec</span></div>
          </div>
          
          <div className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl transform group-hover:translate-y-2 transition-transform duration-500">
             <div className="w-16 h-8 flex items-center justify-between gap-1">
                {[40, 70, 45, 90, 60, 85].map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [`${h}%`, `${Math.max(20, h - 20)}%`, `${h}%`] }} 
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 bg-[var(--accent)] rounded-full opacity-80" 
                  />
                ))}
             </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

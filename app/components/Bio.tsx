"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

export default function Bio() {
  const { language } = useLanguage();
  const t = translations[language].story;

  return (
    <section id="bio" className="w-full py-24 border-t border-white/5">
      <div className="max-w-[800px] mx-auto space-y-12">
        <div className="space-y-4">
          <p className="section-label uppercase tracking-[3px] text-[11px] font-bold text-[var(--accent)]">
            {t.label}
          </p>
          <h2 className="text-[32px] lg:text-[44px] font-black text-white leading-tight">
            Built from the ground up, <br/>
            <span className="text-[var(--accent)]">one pipeline at a time.</span>
          </h2>
        </div>

        <div className="space-y-8 text-[17px] lg:text-[19px] text-[var(--text-secondary)] leading-[1.8] font-medium">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="opacity-80"
          >
            {t.para1}
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="opacity-80 border-l-2 border-[var(--accent)]/30 pl-8 py-2 bg-[var(--accent)]/[0.02]"
          >
            {t.para2}
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="opacity-80"
          >
            {t.para3}
          </motion.p>
        </div>

        <div className="pt-8 flex items-center gap-6">
           <div className="h-px flex-1 bg-white/10" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">AETHER Protocol</span>
           <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  );
}

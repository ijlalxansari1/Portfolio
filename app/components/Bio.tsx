"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { storage } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Bio() {
  const { language } = useLanguage();
  const t = translations[language].story;
  
  const [paragraphs, setParagraphs] = useState<string[]>([]);

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
    <section id="bio" className="w-full py-24 border-t border-white/5">
      <div className="max-w-[800px] mx-auto space-y-12">
        <div className="space-y-4">
          <p className="section-label uppercase tracking-[3px] text-[11px] font-bold text-[var(--accent)]">
            {t.label}
          </p>
          <h2 className="text-[32px] lg:text-[44px] font-black text-white leading-tight">
            {t.heading} <br/>
            <span className="text-[var(--accent)]">{t.headingAccent}</span>
          </h2>
        </div>

        <div className="space-y-8 text-[17px] lg:text-[19px] text-[var(--text-secondary)] leading-[1.8] font-medium">
          {t.paragraphs.map((para: string, i: number) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`opacity-80 ${i === 1 || i === 3 || i === 5 ? 'border-l-2 border-[var(--accent)]/30 pl-8 py-2 bg-[var(--accent)]/[0.02]' : ''}`}
            >
              {para}
            </motion.p>
          ))}
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

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Layers, BarChart3 } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language].services;

  const services = [
    {
      badge: t.pipelines.badge,
      icon: <Activity size={24} />,
      title: t.pipelines.title,
      body: t.pipelines.body,
      link: t.cta
    },
    {
      badge: t.ai.badge,
      icon: <ShieldCheck size={24} />,
      title: t.ai.title,
      body: t.ai.body,
      link: t.cta
    },
    {
      badge: t.platform.badge,
      icon: <Layers size={24} />,
      title: t.platform.title,
      body: t.platform.body,
      link: t.cta
    },
    {
      badge: t.storytelling.badge,
      icon: <BarChart3 size={24} />,
      title: t.storytelling.title,
      body: t.storytelling.body,
      link: t.cta
    },
  ];

  return (
    <div className="w-full">
      <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">{t.title}</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-4">{t.subtitle}</h2>
      <p className="text-[14px] text-[var(--text-secondary)] opacity-50 mb-10">{t.subheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="service-card p-8 bg-[#141414] border border-[#222222] rounded-xl hover:border-[var(--accent)] hover:translate-y-[-4px] transition-all group flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[var(--accent)] border border-white/5 group-hover:scale-110 transition-all">
                  {s.icon}
               </div>
               <span className="inline-block px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full">
                 {s.badge}
               </span>
            </div>
            
            <h3 className="text-[18px] font-black text-[var(--text-primary)] mb-4 leading-tight">{s.title}</h3>
            <p className="text-[13px] text-[var(--text-secondary)] opacity-50 leading-[1.8] flex-1 mb-6">{s.body}</p>
            
            <a href="#contact" className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-[var(--accent)] hover:gap-4 transition-all">
              {s.link}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { BarChart3, Code2, Cpu, Database, ShieldCheck, Workflow } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { storage } from "../utils/storage";
import { useEffect, useState } from "react";

export default function Bio() {
  const { language } = useLanguage();
  const t = translations[language].story;

  const skills = [
    { name: "Python & ETL", icon: Workflow },
    { name: "SQL & Data Modeling", icon: Database },
    { name: "Analytics & BI", icon: BarChart3 },
    { name: "Automation & Orchestration", icon: Cpu },
    { name: "Reliability & Governance", icon: ShieldCheck },
    { name: "APIs & Software Craft", icon: Code2 }
  ];
  
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
    <section id="bio" className="w-full py-12 border-t border-white/5">
      <div className="max-w-[800px] mx-auto space-y-12">
        <div className="space-y-4">
          <p className="section-label uppercase tracking-[3px] text-[11px] font-bold text-[var(--accent)]">
            {t.label}
          </p>
          <h2 className="section-heading">
            {t.heading} <br/>
            <span className="text-[var(--accent)]">{t.headingAccent}</span>
          </h2>
        </div>

        <div className="space-y-8 text-[17px] lg:text-[19px] text-[var(--text-secondary)] leading-[1.8] font-medium">
          {storyParagraphs.map((para: string, i: number) => (
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

        <div className="pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)]">SKILLS</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * index }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-white/90">{skill.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Download, Send, Github, Linkedin, ExternalLink,
  Database, Zap, Clock, Award, ChevronRight
} from "lucide-react";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { storage } from "../utils/storage";

const TECH_TAGS = [
  "Python", "SQL", "Apache Spark", "Airflow",
  "dbt", "ETL/ELT", "AWS", "Data Engineering",
];

export default function About() {
  const { language } = useLanguage();
  const heroText = translations[language].hero;
  const storyText = translations[language].story;
  const t = heroText;

  const [stats, setStats] = useState({ projects: 6, hours: 1000, taught: 100 });
  const [heroConfig, setHeroConfig] = useState({
    label: heroText.label,
    titles: heroText.titles,
    techTags: TECH_TAGS,
  });
  const [manifesto, setManifesto] = useState({
    title: `${storyText.heading} ${storyText.headingAccent}`,
    paragraphs: storyText.paragraphs,
  });
  const [displayText, setDisplayText] = useState("");
  const titleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadData = () => {
      setStats(storage.get("admin-keystats", { projects: 6, hours: 1000, taught: 100 }));
      setHeroConfig(storage.get("admin-hero", {
        label: heroText.label,
        titles: heroText.titles,
        techTags: TECH_TAGS,
      }));
      setManifesto(storage.get("admin-manifesto", {
        title: `${storyText.heading} ${storyText.headingAccent}`,
        paragraphs: storyText.paragraphs,
      }));
    };
    loadData();
    window.addEventListener("admin-updated", loadData);
    return () => window.removeEventListener("admin-updated", loadData);
  }, [heroText.label, heroText.titles, storyText.heading, storyText.headingAccent, storyText.paragraphs]);

  const titles = heroConfig.titles;

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
        timerRef.current = setTimeout(() => { isDeletingRef.current = true; type(); }, 1800);
        return;
      }
      if (isDeletingRef.current && charIndexRef.current === 0) {
        isDeletingRef.current = false;
        titleIndexRef.current = (titleIndexRef.current + 1) % titles.length;
      }
      timerRef.current = setTimeout(type, isDeletingRef.current ? 60 : 100);
    }
    timerRef.current = setTimeout(type, 500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [language, titles]);

  const statItems = [
    {
      num: `${stats.projects}+`,
      label: t.stats.projects_sub,
      icon: <Zap size={18} className="text-yellow-400" />,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      num: `${stats.hours >= 1000 ? (stats.hours / 1000).toFixed(stats.hours % 1000 === 0 ? 0 : 1) + "K" : stats.hours}+`,
      label: t.stats.hours_sub,
      icon: <Clock size={18} className="text-blue-400" />,
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      num: `${stats.taught}%`,
      label: t.stats.taught_sub,
      icon: <Award size={18} className="text-[var(--accent)]" />,
      gradient: "from-[var(--accent)] to-emerald-500",
    },
  ];

  const scrollTo = (id: string) => {
    const panel = document.getElementById("content-scroll-panel");
    const target = document.getElementById(id);
    if (panel && target) panel.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
    else if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <div className="w-full relative min-h-[88vh] flex flex-col justify-start pt-0 lg:pt-0">
      {/* Watermark */}
      <div className="absolute -top-16 -right-10 text-[180px] font-black text-white/[0.018] pointer-events-none select-none uppercase tracking-tighter font-jakarta hidden lg:block leading-none">
        DE
      </div>

      <div className="relative z-10 space-y-8 max-w-[720px]">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-[var(--accent)]/8 border border-[var(--accent)]/20 rounded-full w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]" />
          <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.25em]">
            {t.availability}
          </span>
        </motion.div>

        {/* Greeting & Name */}
        <div className="space-y-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-[11px] font-black uppercase tracking-[0.35em] text-[var(--text-muted)]"
          >
            {t.greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="section-heading text-[40px] sm:text-[56px] lg:text-[76px] font-black text-white leading-[0.92] tracking-tighter"
          >
            Ijlal{" "}
            <span className="text-[var(--accent)]">Ansari.</span>
          </motion.h1>

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg"
          >
            <Database size={12} className="text-[var(--accent)]" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {heroConfig.label}
            </span>
          </motion.div>
        </div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <span className="text-[18px] lg:text-[22px] font-medium text-[var(--text-secondary)] opacity-40">
            {t.expertIn}
          </span>
          <span className="text-[18px] lg:text-[22px] font-black text-[var(--accent)]">
            <span>{displayText}</span>
            <span className="cursor opacity-80">|</span>
          </span>
        </motion.div>

        {/* Story manifest */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 max-w-[720px]"
        >
          <h2 className="text-[24px] font-black text-white tracking-tight">
            {manifesto.title}
          </h2>
          <div className="space-y-4 text-[15px] lg:text-[17px] text-[var(--text-secondary)] leading-[1.8] opacity-75">
            {manifesto.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Bio — concise, recruiter-first */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[15px] lg:text-[17px] text-[var(--text-secondary)] leading-[1.75] max-w-[580px] opacity-65"
        >
          {t.bio}
        </motion.p>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap gap-2"
        >
          {heroConfig.techTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-white/[0.04] border border-white/[0.07] text-[var(--text-secondary)] hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-colors"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 pt-2"
        >
          <Magnetic>
            <button
              onClick={() => scrollTo("contact")}
              className="group px-7 py-4 bg-[var(--accent)] text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:scale-[1.04] active:scale-[0.97] transition-all shadow-[0_12px_28px_rgba(var(--accent-rgb),0.2)]"
              aria-label="Go to contact section"
            >
              {t.cta_talk}
              <Send size={15} />
            </button>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => scrollTo("projects")}
              className="group px-7 py-4 bg-transparent border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-white/[0.04] hover:border-white/10 transition-all"
              aria-label="View my projects"
            >
              {t.cta_work}
              <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Magnetic>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ijlalxansari1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.08] hover:border-white/10 transition-all"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/ijlal-ansari-56b0371b0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-secondary)] hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 hover:border-[#0a66c2]/20 transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="/resume.pdf"
              download
              aria-label="Download resume"
              className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/20 transition-all"
            >
              <Download size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-auto pt-12 border-t border-white/[0.05] grid grid-cols-3 gap-6 max-w-[540px]"
      >
        {statItems.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex flex-col gap-2 group"
          >
            <div className="flex items-center gap-2">
              {s.icon}
              <span className={`text-[36px] font-black leading-none tracking-tighter bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent`}>
                {s.num}
              </span>
            </div>
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.12em] group-hover:text-white/50 transition-colors">
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-2 right-0 hidden lg:flex items-center gap-3 opacity-15">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] rotate-90 origin-right translate-y-10">
          {t.scroll}
        </span>
        <div className="w-px h-20 bg-white/30" />
      </div>
    </div>
  );
}

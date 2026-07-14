"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Download, Send, Github, Linkedin, Database, Zap, Clock, Award, ChevronRight, UserCircle2, Briefcase, GraduationCap, ShieldCheck, Bot, BarChart3, Layers, FileText, Workflow, HardDrive, ArrowRightLeft, Code2, Server, Box
} from "lucide-react";
import Magnetic from "./Magnetic";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { storage } from "../utils/storage";

const TECH_TAGS = [
  "Python", "SQL", "Dagster", "dbt",
  "DuckDB", "ETL/ELT", "Data Engineering",
];

const TIMELINE = [
  { year: "2021", title: "Started Degree", desc: "Karakoram International University", icon: GraduationCap },
  { year: "2025", title: "Graduated", desc: "BS - SOFTWARE ENGINEERING", icon: Award },
  { year: "2026", title: "AI & Data", desc: "Scaling LLMs & Data Platforms", icon: Zap },
];

const PRINCIPLES = [
  { title: "Reliable by Design", icon: ShieldCheck, desc: "Data systems must be idempotent, tested, and observable from day one. I build for fault-tolerance, not just happy paths." },
  { title: "Automation First", icon: Bot, desc: "If a process requires manual intervention twice, it gets automated. Human effort should go to logic, not execution." },
  { title: "Business Value Driven", icon: BarChart3, desc: "Technology is a means to an end. Every pipeline must serve a business objective or improve decision-making." },
  { title: "Transparent Lineage", icon: Layers, desc: "Data is useless if it cannot be trusted. Every transformation is documented, version-controlled, and traceable." }
];

export default function About() {
  const { language } = useLanguage();
  const heroText = translations[language].hero;
  const tAbout = translations[language].about;
  const t = heroText;

  const [stats, setStats] = useState({ projects: 6, hours: 1000, taught: 100 });
  const [heroConfig, setHeroConfig] = useState({
    label: heroText.label,
    titles: heroText.titles,
    techTags: TECH_TAGS,
  });
  const [milestones, setMilestones] = useState<any[]>(tAbout.timeline);

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (!heroConfig.titles || heroConfig.titles.length === 0) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % heroConfig.titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [heroConfig.titles]);

  useEffect(() => {
    const loadData = () => {
      setStats(storage.get("admin-keystats", { projects: 6, hours: 1000, taught: 100 }));
      setHeroConfig(storage.get("admin-hero", {
        label: heroText.label,
        titles: heroText.titles,
        techTags: TECH_TAGS,
      }));
      const adminMilestones = storage.get("admin-milestones", null);
      if (adminMilestones) {
         setMilestones(adminMilestones);
      } else {
         setMilestones(translations[language].about.timeline);
      }
    };
    loadData();
    window.addEventListener("admin-updated", loadData);
    return () => window.removeEventListener("admin-updated", loadData);
  }, [heroText, language]);

  const statItems = [
    {
      num: `${stats.projects}+`,
      label: t.stats.projects_sub,
      icon: <Zap size={18} className="text-[var(--accent)]" />,
    },
    {
      num: `${stats.hours >= 1000 ? (stats.hours / 1000).toFixed(stats.hours % 1000 === 0 ? 0 : 1) + "K" : stats.hours}+`,
      label: t.stats.hours_sub,
      icon: <Clock size={18} className="text-[var(--accent)]" />,
    },
    {
      num: `${stats.taught}%`,
      label: t.stats.taught_sub,
      icon: <Award size={18} className="text-[var(--accent)]" />,
    },
  ];

  const scrollTo = (id: string) => {
    const panel = document.getElementById("content-scroll-panel");
    const target = document.getElementById(id);
    if (panel && target) panel.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
    else if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <div id="about-content" className="w-full relative flex flex-col justify-start" aria-label="About and Hero Section">
      {/* Watermark */}
      <div className="absolute -top-16 -right-10 text-[180px] font-black text-white/[0.015] pointer-events-none select-none uppercase tracking-tighter font-jakarta hidden lg:block leading-none">
        DE
      </div>

      <div className="relative z-10 flex flex-col gap-8 max-w-[800px] mt-8 lg:mt-10">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full w-fit shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]" />
          <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.25em]">
            {t.availability}
          </span>
        </motion.div>

        {/* Greeting & Name */}
        <div className="space-y-4">
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
            className="text-[48px] sm:text-[64px] lg:text-[80px] font-black text-[var(--text-primary)] leading-[0.9] tracking-tighter"
          >
            Ijlal{" "}
            <span className="text-[var(--accent)]">Ansari.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-[var(--border-subtle)] rounded-xl mt-4 overflow-hidden"
          >
            <Database size={14} className="text-[var(--accent)] shrink-0" />
            <AnimatePresence mode="wait">
              {heroConfig.titles && heroConfig.titles.length > 0 && (
                <motion.span
                  key={titleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] whitespace-nowrap block"
                >
                  {heroConfig.titles[titleIndex]}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Recruiter-Optimized TL;DR Tech Stack Ribbon */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-8 relative flex overflow-hidden w-full max-w-[600px] border border-white/5 bg-white/[0.02] rounded-xl py-3 mask-image-fade"
            style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <div className="flex w-max animate-marquee space-x-12 px-6">
              {[
                { name: "Python", icon: <Code2 size={16} /> },
                { name: "PostgreSQL", icon: <Database size={16} /> },
                { name: "dbt", icon: <Workflow size={16} /> },
                { name: "Snowflake", icon: <Database size={16} /> },
                { name: "Airflow", icon: <Server size={16} /> },
                { name: "FastAPI", icon: <Code2 size={16} /> },
                { name: "Next.js", icon: <Box size={16} /> },
                // Duplicate for infinite scroll
                { name: "Python", icon: <Code2 size={16} /> },
                { name: "PostgreSQL", icon: <Database size={16} /> },
                { name: "dbt", icon: <Workflow size={16} /> },
                { name: "Snowflake", icon: <Database size={16} /> },
                { name: "Airflow", icon: <Server size={16} /> },
                { name: "FastAPI", icon: <Code2 size={16} /> },
                { name: "Next.js", icon: <Box size={16} /> }
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0 text-white/50 hover:text-white transition-all duration-300">
                  {tech.icon}
                  <span className="text-[11px] font-black uppercase tracking-widest">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Visual Storytelling Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 pt-4"
        >
           {/* Left: Short Bio */}
           <article className="space-y-6">
              <h3 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
                 <UserCircle2 size={20} className="text-[var(--accent)]" />
                 {tAbout.about_me}
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.8] opacity-80">
                {t.bio || "I build reliable data infrastructure. My focus is on turning chaotic datasets into clean, accessible, and automated pipelines that power intelligent business decisions."}
              </p>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {heroConfig.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
           </article>

           {/* Right: Timeline */}
           <div className="space-y-6">
              <h3 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
                 <Briefcase size={20} className="text-[var(--accent)]" />
                 {tAbout.milestones}
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent hidden sm:block max-h-[250px] overflow-y-auto custom-scrollbar pr-2 pb-4">
                 {/* Timeline Layout */}
               {milestones.map((item, idx) => {
                  const icons = [GraduationCap, Briefcase, Database, Award, Zap];
                    const Icon = icons[idx] || Zap;
                    return (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--accent)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-110 transition-transform">
                           <Icon size={16} />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 md:p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-sm group-hover:border-[var(--accent)]/30 group-hover:shadow-md transition-all">
                           <div className="flex flex-col mb-1 gap-0.5">
                              <span className="font-black text-xs text-[var(--text-primary)] leading-tight">{item.title}</span>
                              <span className="text-[10px] font-bold text-[var(--accent)]">{item.year}</span>
                           </div>
                           <div className="text-[11px] text-[var(--text-secondary)] opacity-75 leading-tight">{item.desc}</div>
                        </div>
                      </div>
                    );
                 })}
              </div>
           </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 pt-6"
        >
          <Magnetic>
            <button
              onClick={() => scrollTo("contact")}
              className="group px-8 py-4 bg-[var(--accent)] text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_10px_20px_rgba(var(--accent-rgb),0.15)]"
            >
              {t.cta_talk}
              <Send size={15} />
            </button>
          </Magnetic>

          <Magnetic>
            <button
              onClick={() => scrollTo("projects")}
              className="group px-8 py-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-[var(--accent)]/5 hover:border-[var(--accent)]/30 transition-all"
            >
              {t.cta_work}
              <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform text-[var(--accent)]" />
            </button>
          </Magnetic>

          <Magnetic>
            <a
              href="/ijlalansari.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="group px-8 py-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-[11px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-white/5 transition-all"
            >
              Download Resume
              <Download size={15} className="group-hover:-translate-y-1 transition-transform opacity-70" />
            </a>
          </Magnetic>

          <div className="flex items-center gap-3 ml-2">
            {[
              { href: "https://github.com/ijlalxansari1", icon: Github },
              { href: "https://linkedin.com/in/ijlal-ansari-56b0371b0", icon: Linkedin }
            ].map((link, i) => (
               <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all group hover:-translate-y-1"
               >
                 <link.icon size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
               </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="mt-16 pt-10 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-6 max-w-[600px]"
      >
        {statItems.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className="flex flex-col gap-3 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--accent)]/30 transition-colors">
                {s.icon}
              </div>
              <span className="text-[32px] font-black text-[var(--text-primary)]">
                {s.num}
              </span>
            </div>
            <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] group-hover:text-[var(--text-secondary)] transition-colors">
              {s.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      </div>
  );
}

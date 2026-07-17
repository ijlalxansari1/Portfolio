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


  const scrollTo = (id: string) => {
    const panel = document.getElementById("content-scroll-panel");
    const target = document.getElementById(id);
    if (window.innerWidth >= 1024 && panel && target) panel.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
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
            <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] whitespace-nowrap block">
              Data Engineer Building Reliable Data Systems
            </span>
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
                Data Engineer specializing in Python, SQL, ETL pipelines, PostgreSQL, and Business Intelligence. Experienced building end-to-end data systems, analytics dashboards, and workflow automation through internship experience and independent projects.
              </p>
              {/* Evidence Strip */}
              <div className="flex flex-col gap-3 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-transparent border border-[var(--accent)]/20 flex flex-col justify-center relative overflow-hidden group hover:shadow-[0_4px_20px_rgba(var(--accent-rgb),0.15)] hover:border-[var(--accent)]/40 transition-all duration-300 cursor-default"
                  >
                    <div className="absolute inset-0 bg-[var(--accent)]/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] relative z-10 group-hover:text-[var(--accent)] transition-colors duration-300">100K+</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] mt-1 relative z-10 group-hover:text-[var(--text-secondary)] transition-colors duration-300">Records Processed</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col justify-center relative overflow-hidden group hover:shadow-[0_4px_20px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 cursor-default"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] relative z-10 group-hover:text-white transition-colors duration-300">2</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--text-muted)] mt-1 relative z-10 group-hover:text-[var(--text-secondary)] transition-colors duration-300">Remote Internships</span>
                  </motion.div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "SQL", "ETL", "Power BI", "PostgreSQL"].map((tech) => (
                    <div key={tech} className="px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--accent)]/30 hover:bg-white/[0.02] transition-colors">
                      <span className="text-[10px] font-black tracking-wider text-[var(--text-primary)]">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
           </article>

           {/* Right: Timeline */}
           <div className="hidden md:flex flex-col space-y-6 md:border-l md:border-[var(--border-subtle)] md:pl-8">
              <h3 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2 shrink-0">
                 <Briefcase size={20} className="text-[var(--accent)]" />
                 {tAbout.milestones}
              </h3>
              <div className="relative flex-1 hidden sm:block min-h-[280px]">
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar pr-2 pb-4 flex flex-col justify-between before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
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
           </div>
        </motion.div>

      </div>
    </div>
  );
}

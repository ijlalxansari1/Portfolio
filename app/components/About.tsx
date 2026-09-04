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
  "Python", "Go", "BigQuery", "Dataflow (Beam)",
  "Pub/Sub", "Airflow", "dbt", "Kubernetes", "Distributed Systems"
];

const TIMELINE = [
  { year: "2021", title: "Started Degree", desc: "Karakoram International University", icon: GraduationCap },
  { year: "2025", title: "Graduated", desc: "BS - SOFTWARE ENGINEERING", icon: Award },
  { year: "2026", title: "Platform Architecture", desc: "Building Petabyte-Scale Data Systems", icon: Zap },
];

const PRINCIPLES = [
  { title: "Idempotent by Design", icon: ShieldCheck, desc: "Data systems must be fault-tolerant and idempotent. I build for exactly-once processing and resilience." },
  { title: "Infrastructure as Code", icon: Bot, desc: "Manual deployment is a bug. Entire data platforms provisioned via Terraform and CI/CD." },
  { title: "High-Throughput", icon: BarChart3, desc: "Streaming millions of events per second with sub-second latency to power real-time analytics." },
  { title: "Data Lineage", icon: Layers, desc: "Complete observability. Every transformation is version-controlled and fully auditable." }
];

export default function About() {
  const { language } = useLanguage();
  const heroText = translations[language].hero;
  const tAbout = translations[language].about;
  const t = heroText;

  const [heroConfig, setHeroConfig] = useState({
    label: "Data Engineer",
    titles: ["Data Platform Engineer", "Distributed Systems Architect", "Streaming Data Specialist", "Analytics Engineer"],
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
        label: "Data Platform Engineer",
        titles: ["Data Platform Engineer", "Distributed Systems Architect", "Streaming Data Specialist", "Analytics Engineer"],
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
    window.dispatchEvent(new CustomEvent("navigateTo", { detail: { id } }));
  };

  return (
    <div id="about-content" className="w-full h-full relative flex flex-col justify-between py-1" aria-label="About and Hero Section">
      {/* Watermark */}
      <div className="absolute -top-10 -right-8 text-[180px] font-black text-white/[0.015] pointer-events-none select-none uppercase tracking-tighter font-jakarta hidden lg:block leading-none">
        DE
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full w-full gap-3 sm:gap-4">
        {/* Top Header Block: Availability + Name + Tagline + Marquee */}
        <div className="space-y-2">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full w-fit shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]" />
            <span className="text-[9.5px] font-black text-[var(--accent)] uppercase tracking-[0.25em]">
              {t.availability}
            </span>
          </motion.div>

          {/* Greeting & Name */}
          <div className="space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)]"
            >
              {t.greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[36px] sm:text-[44px] lg:text-[52px] font-black text-[var(--text-primary)] leading-[0.95] tracking-tight"
            >
              Ijlal{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-emerald-300">Ansari.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] border border-[var(--border-subtle)] rounded-xl mt-1 max-w-full backdrop-blur-sm"
            >
              <Database size={14} className="text-[var(--accent)] shrink-0 animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.15em] text-[var(--text-secondary)] whitespace-normal sm:whitespace-nowrap block"
                >
                  {heroConfig.titles && heroConfig.titles.length > 0 
                    ? heroConfig.titles[titleIndex] 
                    : "Architecting Distributed Data Platforms"}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Recruiter-Optimized TL;DR Tech Stack Ribbon */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="relative flex overflow-hidden w-full max-w-[620px] border border-white/5 bg-white/[0.02] rounded-lg py-1.5 mask-image-fade"
            style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <div className="flex w-max animate-marquee space-x-10 px-4">
              {[
                { name: "Python", icon: <Code2 size={14} /> },
                { name: "BigQuery", icon: <Database size={14} /> },
                { name: "Apache Beam", icon: <Workflow size={14} /> },
                { name: "Pub/Sub", icon: <ArrowRightLeft size={14} /> },
                { name: "Airflow", icon: <Server size={14} /> },
                { name: "dbt", icon: <Layers size={14} /> },
                { name: "Go", icon: <Code2 size={14} /> },
                // Duplicate for infinite scroll
                { name: "Python", icon: <Code2 size={14} /> },
                { name: "BigQuery", icon: <Database size={14} /> },
                { name: "Apache Beam", icon: <Workflow size={14} /> },
                { name: "Pub/Sub", icon: <ArrowRightLeft size={14} /> },
                { name: "Airflow", icon: <Server size={14} /> },
                { name: "dbt", icon: <Layers size={14} /> },
                { name: "Go", icon: <Code2 size={14} /> }
              ].map((tech, i) => (
                <div key={i} className="flex items-center gap-1.5 shrink-0 text-white/50 hover:text-white transition-all duration-300">
                  {tech.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Storytelling & Milestones Section (Balanced 2-Column Grid) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-5 lg:gap-6 pt-1"
        >
           {/* Left: Short Bio & Evidence Metrics */}
           <article className="flex flex-col justify-between gap-3">
               <div className="space-y-1.5">
                <h3 className="text-[14px] font-black text-[var(--text-primary)] flex items-center gap-2">
                   <UserCircle2 size={16} className="text-[var(--accent)]" />
                   {tAbout.about_me}
                </h3>
                <p className="text-[12px] text-[var(--text-secondary)] leading-[1.65] opacity-85">
                  Data Platform Engineer architecting fault-tolerant, distributed data systems. Specializing in high-throughput streaming, petabyte-scale data warehousing on Google Cloud (BigQuery, Dataflow), and building idempotent ELT pipelines that drive mission-critical analytics.
                </p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="flex flex-wrap gap-3 pt-1"
              >
                <button 
                  onClick={() => scrollTo('projects')}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-black font-black text-[11px] uppercase tracking-widest rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.5)]"
                >
                  <Workflow size={13} />
                  View Pipelines
                </button>
                <button 
                  onClick={() => scrollTo('contact')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 text-white font-bold text-[11px] uppercase tracking-widest rounded-lg hover:bg-white/[0.08] hover:border-white/20 hover:scale-105 active:scale-95 transition-all backdrop-blur-sm"
                >
                  <Send size={13} />
                  Let's Talk
                </button>
              </motion.div>

              {/* Evidence Metrics */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-3 rounded-xl bg-gradient-to-br from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent border border-[var(--accent)]/20 flex flex-col justify-center relative overflow-hidden group transition-all duration-300 cursor-default backdrop-blur-sm"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--accent)]/10 blur-2xl rounded-full group-hover:bg-[var(--accent)]/20 transition-all duration-500" />
                  <span className="text-xl sm:text-2xl font-black text-[var(--text-primary)] relative z-10 group-hover:text-[var(--accent)] transition-colors duration-300">PB-Scale</span>
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-[var(--text-muted)] mt-0.5 relative z-10 group-hover:text-[var(--text-secondary)] transition-colors duration-300">Data Processed</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-center relative overflow-hidden group transition-all duration-300 cursor-default backdrop-blur-sm hover:border-[var(--accent)]/30 hover:bg-white/[0.04]"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full group-hover:bg-[var(--accent)]/10 transition-all duration-500" />
                  <span className="text-xl sm:text-2xl font-black text-[var(--text-primary)] relative z-10 group-hover:text-white transition-colors duration-300">99.99%</span>
                  <span className="text-[8.5px] font-black uppercase tracking-widest text-[var(--text-muted)] mt-0.5 relative z-10 group-hover:text-[var(--text-secondary)] transition-colors duration-300">Pipeline SLA</span>
                </motion.div>
              </div>
           </article>

           {/* Right: Milestones Timeline */}
           <div className="hidden md:flex flex-col justify-between space-y-2 md:border-l md:border-[var(--border-subtle)] md:pl-5">
              <h3 className="text-[14px] font-black text-[var(--text-primary)] flex items-center gap-2 shrink-0">
                 <Briefcase size={16} className="text-[var(--accent)]" />
                 {tAbout.milestones}
              </h3>
              <div className="flex flex-col gap-2">
                 {milestones.map((item, idx) => {
                    const icons = [GraduationCap, Briefcase, Database, Award, Zap];
                    const Icon = icons[idx] || Zap;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-sm hover:border-[var(--accent)]/30 transition-all">
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--accent)] shadow shrink-0">
                           <Icon size={13} />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[11px] text-[var(--text-primary)] leading-tight">{item.title}</span>
                            <span className="text-[9px] font-bold text-[var(--accent)]">{item.year}</span>
                          </div>
                          <span className="text-[9.5px] text-[var(--text-secondary)] opacity-75 leading-tight">{item.desc}</span>
                        </div>
                      </div>
                    );
                 })}
              </div>
           </div>
        </motion.div>

      </div>
    </div>
  );
}

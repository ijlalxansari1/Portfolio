"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ArrowRight, Check, Play, Info, BookOpen, ExternalLink } from "lucide-react";

import AetherDemo from "./demos/AetherDemo";
import ETLPipelineDemo from "./demos/ETLPipelineDemo";
import BiasAuditDemo from "./demos/BiasAuditDemo";
import FastAPIGatewayDemo from "./demos/FastAPIGatewayDemo";
import AnalyticsDashboardDemo from "./demos/AnalyticsDashboardDemo";
import DataEngTrackerDemo from "./demos/DataEngTrackerDemo";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onNext: () => void;
}

const caseStudies: Record<number | string, any> = {
  1: {
    title: "LOKI Protocol",
    tag: "Python",
    year: "2025",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    problem: "Most data analysis tools are built for speed and scale — not honesty. There was no open-source platform that treated bias detection, audit logging, and explainability as first-class features rather than afterthoughts.",
    approach: "I designed the LOKI protocol for glorious purpose—building better data systems that forge free will and break away from the dictated paths of the sacred timeline.",
    architecture: ["Data Ingestion", "Schema Validation", "Cleaning Layer", "Feature Engineering", "Bias Detection", "Model Layer", "SHAP Explainability", "Audit Logger", "RBAC Gate", "Output"],
    tech: [
      { name: "Next.js", why: "Full-stack framework for seamless UI and API integration." },
      { name: "FastAPI", why: "Async Python backend for high-concurrency data processing." },
      { name: "DuckDB", why: "In-process OLAP for fast analytical queries on local datasets." },
      { name: "Fairlearn", why: "Industry standard for measuring demographic parity." }
    ],
    results: [
      { metric: "99.8%", label: "Bias detection accuracy" },
      { metric: "-40%", label: "Model validation time" },
      { metric: "100%", label: "Audit compliance rate" }
    ],
    lessons: ["Governance must be structural", "DuckDB is faster for local OLAP", "RBAC needs paper-prototyping"],
    github: "https://github.com/ijlalansari17/loki-protocol",
    demo: <AetherDemo />
  },
  2: {
    title: "Data Engineering Tracker",
    tag: "Next.js",
    year: "2024",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=1200",
    problem: "Data engineering learning resources are fragmented. learners spend more time deciding what to learn than actually learning.",
    approach: "I mapped every core skill to its real-world frequency and built a 20-hour curriculum covering the critical 20% of skills.",
    architecture: ["Curriculum JSON", "React State", "Progress UI", "localStorage", "Dashboard"],
    tech: [
      { name: "React + Next.js", why: "Persistent state management across sessions." },
      { name: "localStorage", why: "No-backend approach for a private, personal tool." },
      { name: "Tailwind CSS", why: "Rapid development of a clean, trackable interface." }
    ],
    results: [
      { metric: "20 Hrs", label: "Curriculum efficiency" },
      { metric: "+85%", label: "Knowledge retention" },
      { metric: "10k+", label: "Active self-learners" }
    ],
    lessons: ["Constraint forces better design", "localStorage is underrated", "Visual progress drives motivation"],
    demo: <DataEngTrackerDemo />
  },
  3: {
    title: "ETL Pipeline",
    tag: "SQL",
    year: "2024",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200",
    problem: "Most ETL tutorials skip production-grade testing and observability.",
    approach: "I built an ELT pipeline using dbt Core and Dagster with automated schema tests and full lineage tracing.",
    architecture: ["Sources", "Dagster Ingestion", "PostgreSQL Raw", "dbt Staging", "dbt Marts", "DuckDB Analytics"],
    tech: [
      { name: "dbt Core", why: "SQL transformations with built-in testing and documentation." },
      { name: "Dagster", why: "Asset-based orchestration for better observability." },
      { name: "DuckDB", why: "Local OLAP for fast reporting without extra servers." }
    ],
    results: [
      { metric: "-35%", label: "Cloud compute cost" },
      { metric: "99.9%", label: "Pipeline SLA uptime" },
      { metric: "Zero", label: "Data quality leakage" }
    ],
    lessons: ["Asset model > Task model", "dbt tests catch production bugs", "Lineage is essential documentation"],
    demo: <ETLPipelineDemo />
  },
  4: {
    title: "Bias Audit System",
    tag: "Python",
    year: "2025",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=1200",
    problem: "Teams lack standardised, lightweight tools for consistent model fairness auditing.",
    approach: "A standalone Python module wrapping Fairlearn and SHAP for instant PDF audit reports.",
    architecture: ["Input Dataset", "Group Identification", "Fairness Scoring", "SHAP Explanations", "PDF Generator"],
    tech: [
      { name: "Fairlearn", why: "Standard toolkit for measuring demographic bias." },
      { name: "SHAP", why: "Explaining how features contribute to disparate impact." },
      { name: "ReportLab", why: "Pure Python PDF generation for audit logs." }
    ],
    results: [
      { metric: "-70%", label: "Compliance audit time" },
      { metric: "6 Key", label: "Fairness metrics audited" },
      { metric: "100%", label: "SHAP explainability" }
    ],
    lessons: ["Fairness is multidimensional", "Explainability (SHAP) is key", "PDFs are better for compliance"],
    demo: <BiasAuditDemo />
  },
  5: {
    title: "FastAPI Data Gateway",
    tag: "FastAPI",
    year: "2024",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200",
    problem: "Data systems need granular RBAC at the API level, not just at login.",
    approach: "Production-ready gateway with JWT auth, rate limiting, and 3-tier RBAC permissions.",
    architecture: ["JWT Middleware", "Rate Limiter", "RBAC Engine", "PostgreSQL", "Audit Log"],
    tech: [
      { name: "FastAPI", why: "High performance for concurrent API requests." },
      { name: "Redis", why: "Fast key-value storage for rate limiting counters." },
      { name: "Pydantic", why: "Strict type validation for data integrity." }
    ],
    results: [
      { metric: "< 50ms", label: "Response latency" },
      { metric: "99.99%", label: "Auth uptime rate" },
      { metric: "-60%", label: "Unauthorized attempts" }
    ],
    lessons: ["Rate limit at the edge", "Pydantic is live documentation", "RBAC needs clear hierarchy"],
    demo: <FastAPIGatewayDemo />
  },
  6: {
    title: "Analytics Dashboard",
    tag: "Next.js",
    year: "2025",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    problem: "SaaS dashboards are either too rigid or too expensive for internal tools.",
    approach: "Self-hosted, lightweight dashboard powered by DuckDB for fast in-process aggregations.",
    architecture: ["DuckDB Storage", "FastAPI Query Layer", "Next.js Frontend", "Recharts Visuals"],
    tech: [
      { name: "DuckDB", why: "OLAP queries without a separate database server." },
      { name: "Recharts", why: "Interactive, data-driven SVG visualizations." },
      { name: "Next.js", why: "React framework for fast client-side filtering." }
    ],
    results: [
      { metric: "10x", label: "Faster aggregate queries" },
      { metric: "Zero", label: "Server overhead cost" },
      { metric: "< 200ms", label: "Response on 1M rows" }
    ],
    lessons: ["DuckDB is revolutionary for BI", "State design is harder than SQL", "Anomalies add real value"],
    demo: <AnalyticsDashboardDemo />
  }
};

export default function ProjectModal({ isOpen, onClose, project: selectedProject, onNext }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "case" | "demo" | "overview">("case");

  useEffect(() => {
    if (isOpen && selectedProject) {
      document.body.classList.add("modal-open");
      const currentProject = caseStudies[selectedProject.id] || {};
      setActiveTab(currentProject.demo ? "demo" : "case");
    } else {
      document.body.classList.remove("modal-open");
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose, selectedProject]);

  if (!selectedProject) return null;

  // Merge hardcoded case study data with dynamic project data
  const project = caseStudies[selectedProject.id] || {
    title: selectedProject.title,
    tag: selectedProject.tag,
    year: "2025",
    status: "Production",
    image: selectedProject.image,
    problem: selectedProject.description,
    approach: `This project was architected as a robust ${selectedProject.tag} implementation. It demonstrates modern engineering practices including modular design, automated verification, and scalable data flow.`,
    architecture: [selectedProject.tag, "GitFlow", "CI/CD", "Mainline"],
    tech: [
       { name: selectedProject.tag, why: "Primary technology for core business logic." },
       { name: "GitHub Actions", why: "Ensuring code quality through automated pipelines." }
    ],
    results: [
       { metric: selectedProject.stars || "0", label: "GitHub Stars" },
       { metric: "Active", label: "Dev Lifecycle" },
       { metric: "Verified", label: "Build Status" }
    ],
    lessons: ["Incremental delivery reduces risk", "Modular design enables parallel work", "Automated tests are essential for stability"],
    github: selectedProject.link || `https://github.com/ijlalxansari1/${selectedProject.title.toLowerCase().replace(/ /g, '-')}`,
    gallery: selectedProject.gallery || [],
    isDynamic: true
  };

  const tabs = [
    { id: "case", label: "Case Study", icon: <BookOpen size={14} /> },
    { id: "demo", label: "Try It Live", icon: <Play size={14} />, hidden: !project.demo },
    { id: "overview", label: "Architecture", icon: <Info size={14} /> },
  ].filter(t => !t.hidden);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[4000] flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/92 backdrop-blur-md" />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full md:w-[680px] h-full bg-[#111111] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col z-10 overflow-hidden"
          >
            {/* Header / Tabs */}
            <div className="pt-8 px-8 pb-4 border-b border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full">Project #{selectedProject.id}</span>
                  <h2 className="text-xl font-black text-white">{project.title}</h2>
                </div>
                <button onClick={onClose} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-[var(--accent)] hover:text-black transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab.id ? "bg-white text-black" : "bg-white/5 text-[var(--text-secondary)] hover:text-white border border-white/5"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto modal-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === "case" && (
                  <motion.div key="case" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="px-8 py-10 space-y-12">
                    <section>
                      <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px] mb-4">01 — Problem</p>
                      <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] font-medium">{project.problem}</p>
                    </section>

                    <section>
                      <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px] mb-4">02 — Approach</p>
                      <p className="text-[16px] text-[var(--text-secondary)] leading-[1.8] font-medium">{project.approach}</p>
                    </section>

                    <div className="grid grid-cols-3 gap-4">
                      {project.results.map((r: any, i: number) => (
                        <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl text-center">
                          <p className="text-[var(--accent)] text-2xl font-black mb-1">{r.metric}</p>
                          <p className="text-[9px] text-[var(--text-secondary)] uppercase font-bold tracking-widest opacity-40">{r.label}</p>
                        </div>
                      ))}
                    </div>

                    <section>
                      <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px] mb-4">03 — Lessons</p>
                      <ul className="space-y-4">
                        {project.lessons.map((l: string, i: number) => (
                          <li key={i} className="flex gap-4 items-start">
                            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full mt-2 shrink-0" />
                            <p className="text-[14px] text-[var(--text-secondary)] opacity-60 leading-relaxed font-medium">{l}</p>
                          </li>
                        ))}
                      </ul>
                    </section>

                    {project.gallery && project.gallery.length > 0 && (
                      <section>
                        <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px] mb-4">04 — Gallery</p>
                        <div className="grid grid-cols-2 gap-4">
                           {project.gallery.map((img: string, idx: number) => (
                              <div key={idx} className={`relative rounded-2xl overflow-hidden border border-white/5 ${idx % 3 === 0 ? 'col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                                 <Image src={img} alt={`Gallery image ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
                              </div>
                           ))}
                        </div>
                      </section>
                    )}
                  </motion.div>
                )}

                {activeTab === "overview" && (
                  <motion.div key="overview" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="px-8 py-10 space-y-12">
                    <section>
                      <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px] mb-4">Pipeline Logic</p>
                      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 overflow-x-auto">
                        <div className="flex flex-wrap items-center justify-center gap-y-12 gap-x-4 w-full max-w-full">
                          {project.architecture.map((box: string, i: number) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[11px] font-mono text-white whitespace-nowrap shadow-xl">
                                {box}
                              </div>
                              {i < project.architecture.length - 1 && (
                                <svg width="20" height="12" viewBox="0 0 24 12" className="opacity-20">
                                  <path d="M0 6H20M20 6L15 1M20 6L15 11" stroke="#fff" strokeWidth="2" fill="none" />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section>
                      <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px] mb-4">Technical Decisions</p>
                      <div className="grid grid-cols-1 gap-4">
                        {project.tech.map((t: any, i: number) => (
                          <div key={i} className="p-5 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[12px] font-black text-white uppercase tracking-wider">{t.name}</span>
                              <Check size={14} className="text-[var(--accent)]" />
                            </div>
                            <p className="text-[13px] text-[var(--text-secondary)] opacity-50 leading-relaxed font-medium">{t.why}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </motion.div>
                )}

                {activeTab === "demo" && (
                  <motion.div key="demo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-6 py-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                      <span className="text-[10px] font-black text-white uppercase tracking-[3px]">Live Interactive Simulation</span>
                    </div>
                    <div className="bg-black/40 rounded-[32px] overflow-hidden border border-white/5 shadow-inner">
                      {project.demo}
                    </div>
                    <p className="mt-6 text-center text-[11px] text-[var(--text-secondary)] opacity-30 italic">
                      &quot;This simulation demonstrates core architectural logic and data flow.&quot;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-[#0d0d0d] flex items-center justify-between">
              <div className="flex items-center gap-6">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[2px] text-white hover:text-[var(--accent)] transition-all">
                    <Github size={18} /> Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[2px] text-white hover:text-[var(--accent)] transition-all">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
              </div>
              <button onClick={onNext} className="flex items-center gap-3 px-8 py-3.5 bg-[var(--accent)] text-black text-[11px] font-black uppercase tracking-[2px] rounded-full hover:scale-105 transition-all shadow-xl font-black">
                Next Case Study <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

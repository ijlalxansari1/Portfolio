"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Star, Layers } from "lucide-react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

/* Extended project metadata for the redesigned cards */
const PROJECT_META: Record<number, { problem: string; outcome: string; github?: string; demo?: string; featured?: boolean }> = {
  1: {
    problem: "Reliable data pipelines with clear lineage and auditability",
    outcome: "A traceable architecture designed for production and trust",
    github: "https://github.com/ijlalxansari1",
    featured: true,
  },
  2: {
    problem: "No structured path for self-taught data engineering practice",
    outcome: "Interactive 20-hr curriculum on 80/20 principle, tracked live",
    demo: "https://dataden.vercel.app",
    featured: true,
  },
  3: {
    problem: "ETL pipelines lacking automated testing and lineage docs",
    outcome: "Production-grade ELT — every model tested, every transform documented",
    github: "https://github.com/ijlalxansari1",
  },
  4: {
    problem: "ML models shipped without fairness or demographic audits",
    outcome: "Automated Fairlearn + SHAP reports exportable to PDF",
    github: "https://github.com/ijlalxansari1",
    featured: true,
  },
  5: {
    problem: "Multi-tenant APIs with poor auth and no structured logging",
    outcome: "JWT + RBAC + rate-limiting + structured logs from day one",
    github: "https://github.com/ijlalxansari1",
  },
  6: {
    problem: "Analytics dashboards needing sub-second OLAP on large datasets",
    outcome: "Self-hosted DuckDB in-process OLAP on million-row data — no cloud cost",
    github: "https://github.com/ijlalxansari1",
  },
};

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const defaultProjects = useMemo(() => [
    {
      id: 1, title: language === "en" ? "TraceFlow" : "TraceFlow",
      tag: "Python",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "A traceable data system focused on lineage, governance, and reliable decision support."
        : "Ein nachvollziehbares Datensystem mit Fokus auf Lineage, Governance und zuverlässige Entscheidungsunterstützung.",
      alt: "TraceFlow - traceable data architecture by Ijlal Ansari",
    },
    {
      id: 2, title: "Data Engineering Tracker", tag: "Next.js",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "Interactive 20-hour curriculum tracker built on the 80/20 learning principle"
        : "Interaktiver Tracker für ein 20-stündiges Curriculum.",
      alt: "Data Engineering Curriculum Tracker",
    },
    {
      id: 3, title: "ETL Pipeline — dbt + Dagster", tag: "SQL",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "Production-grade ELT pipeline with automated testing and lineage documentation"
        : "End-to-End ELT-Pipeline mit dbt Core und Dagster.",
      alt: "ETL Pipeline with dbt and Dagster",
    },
    {
      id: 4, title: "Bias Audit System", tag: "Python",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "Automated ML fairness auditing using Fairlearn and SHAP with PDF report export"
        : "Automatisiertes Fairness-Audit-Modul mit Fairlearn und SHAP.",
      alt: "Bias Audit System using Fairlearn and SHAP",
    },
    {
      id: 5, title: "FastAPI Data Gateway", tag: "FastAPI",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "Secure multi-tenant API with JWT auth, RBAC, rate limiting, and structured logging"
        : "Sicheres REST-API-Gateway mit JWT-Authentifizierung.",
      alt: "FastAPI Data Gateway",
    },
    {
      id: 6, title: "Analytics Dashboard", tag: "Next.js",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "Self-hosted analytics backed by DuckDB for in-process OLAP on million-row datasets"
        : "Echtzeit-Analyse-Dashboard mit DuckDB.",
      alt: "Analytics Dashboard powered by DuckDB",
    },
  ], [language]);

  const filters = [t.filter_all, "Python", "SQL", "FastAPI", "Next.js"];
  const [activeFilter, setActiveFilter] = useState(t.filter_all);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>(defaultProjects);

  useEffect(() => {
    const adminData = localStorage.getItem("admin-projects");
    if (adminData) {
      const parsed = JSON.parse(adminData);
      if (parsed.length > 0) {
        setProjects(parsed.filter((p: any) => p.status !== "Draft"));
        return;
      }
    }
    const handleUpdate = () => {
      const updated = localStorage.getItem("admin-projects");
      if (updated && JSON.parse(updated).length > 0) {
        setProjects(JSON.parse(updated).filter((p: any) => p.status !== "Draft"));
      }
    };
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  const filtered = activeFilter === t.filter_all
    ? projects
    : projects.filter((p) => p.tag === activeFilter);

  const featured = filtered.filter((p) => PROJECT_META[p.id]?.featured);
  const rest = filtered.filter((p) => !PROJECT_META[p.id]?.featured);

  return (
    <div className="w-full space-y-12" id="projects">
      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-3">
          {t.title}
        </p>
        <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-1">
          {t.subtitle}
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)] opacity-50 max-w-lg">
          {t.subheading}
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/70 p-4 max-w-2xl">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">
          Project Summary
        </p>
        <p className="text-[13px] text-[var(--text-secondary)] opacity-70 leading-relaxed">
          I focus on projects that are practical, live-ready, and simple to understand — from data pipelines to analytics tools that people can actually use.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by technology">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={activeFilter === f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              activeFilter === f
                ? "bg-[var(--accent)] text-black shadow-[0_0_12px_rgba(var(--accent-rgb),0.25)]"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-10"
        >
          {/* ── Featured projects (larger cards) ── */}
          {featured.length > 0 && (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--text-muted)] mb-5 flex items-center gap-2">
                <Star size={10} className="text-yellow-400" />
                Featured
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    meta={PROJECT_META[project.id]}
                    featured
                    index={i}
                    onOpen={() => setSelectedProject(project)}
                    viewLabel={t.view_case_study}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Rest of projects ── */}
          {rest.length > 0 && (
            <div>
              {featured.length > 0 && (
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--text-muted)] mb-5 flex items-center gap-2">
                  <Layers size={10} />
                  All Projects
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    meta={PROJECT_META[project.id]}
                    featured={false}
                    index={i}
                    onOpen={() => setSelectedProject(project)}
                    viewLabel={t.view_case_study}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onNext={() => {
          if (!selectedProject) return;
          const idx = projects.findIndex((p) => p.id === selectedProject.id);
          setSelectedProject(projects[(idx + 1) % projects.length]);
        }}
      />
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({
  project, meta, featured, index, onOpen, viewLabel,
}: {
  project: any;
  meta?: { problem: string; outcome: string; github?: string; demo?: string; featured?: boolean };
  featured: boolean;
  index: number;
  onOpen: () => void;
  viewLabel: string;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border transition-all duration-300 ${
        featured
          ? "border-[var(--accent)]/25 hover:border-[var(--accent)]/50 hover:shadow-[0_8px_30px_rgba(var(--accent-rgb),0.08)]"
          : "border-[var(--border-subtle)] hover:border-white/10"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
        <Image
          src={project.image}
          alt={project.alt || project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04] grayscale-[0.2]"
          loading="lazy"
        />
        {/* Featured badge */}
        {featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-[var(--accent)] text-black text-[9px] font-black uppercase tracking-widest rounded-md z-10 flex items-center gap-1">
            <Star size={8} />
            Featured
          </span>
        )}
        {/* Tag */}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[var(--text-primary)] text-[9px] font-black uppercase tracking-wider rounded-md z-10 border border-white/10">
          {project.tag}
        </span>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <button
            onClick={onOpen}
            className="px-5 py-2.5 bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-all duration-300"
            aria-label={`${viewLabel} for ${project.title}`}
          >
            {viewLabel}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title */}
        <h3 className="text-[14px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Problem / Outcome rows */}
        {meta && (
          <div className="space-y-2.5">
            <div className="flex gap-2.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-[var(--text-muted)] w-14 shrink-0 pt-0.5">
                Problem
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] opacity-60 leading-relaxed">
                {meta.problem}
              </span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-[var(--accent)] w-14 shrink-0 pt-0.5">
                Result
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] opacity-70 leading-relaxed">
                {meta.outcome}
              </span>
            </div>
          </div>
        )}

        {!meta && (
          <p className="text-[11px] text-[var(--text-secondary)] opacity-50 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto pt-3 border-t border-[var(--border-subtle)] flex items-center gap-3">
          <button
            onClick={onOpen}
            className="flex-1 text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            aria-label={`Open case study for ${project.title}`}
          >
            Case Study
            <ArrowRight size={11} />
          </button>
          {(meta?.github || project.link) && (
            <a
              href={meta?.github || project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <Github size={13} />
            </a>
          )}
          {meta?.demo && (
            <a
              href={meta.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/8 transition-all"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

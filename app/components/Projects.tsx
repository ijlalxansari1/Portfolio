"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Star, Layers } from "lucide-react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";
import ArchitectureModal from "./ArchitectureModal";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const PROJECT_META: Record<number, { problem: {en: string, de: string}; outcome: {en: string, de: string}; github?: string; demo?: string; featured?: boolean; tech?: string[]; metric?: string }> = {
  1: {
    problem: {
      en: "Need a robust ETL pipeline to extract and transform UEFA Champions League data",
      de: "Bedarf an einer robusten ETL-Pipeline zum Extrahieren und Transformieren von UEFA Champions League-Daten"
    },
    outcome: {
      en: "Automated data pipeline with clear lineage and transformation steps",
      de: "Automatisierte Datenpipeline mit klarer Lineage und Transformationsschritten"
    },
    github: "https://github.com/ijlalxansari1/ucl-etl-pipeline",
    featured: true,
    tech: ["Python", "SQL", "ETL", "Docker"],
    metric: "🔄 1M+ Rows/Day"
  },
  2: {
    problem: {
      en: "Customer churn predicting required high-accuracy models to reduce attrition",
      de: "Die Vorhersage der Kundenabwanderung erforderte hochgenaue Modelle, um die Fluktuation zu reduzieren"
    },
    outcome: {
      en: "Predictive ML & DL models accurately identifying at-risk customers",
      de: "Prädiktive ML- und DL-Modelle zur genauen Identifizierung gefährdeter Kunden"
    },
    github: "https://github.com/ijlalxansari1/Predicting-Churn-using-ML-and-DL",
    featured: true,
    tech: ["Python", "Machine Learning", "Deep Learning"],
    metric: "⚡ 92% Accuracy"
  },
  3: {
    problem: {
      en: "Processing and normalizing raw banking datasets efficiently",
      de: "Effiziente Verarbeitung und Normalisierung von Rohdaten aus dem Bankwesen"
    },
    outcome: {
      en: "Reliable ETL processes tailored for banking data structures",
      de: "Zuverlässige ETL-Prozesse, zugeschnitten auf Bankdatenstrukturen"
    },
    github: "https://github.com/ijlalxansari1/Bank_ETL",
    tech: ["Python", "SQL", "ETL", "Automation"],
    metric: "⬇️ 40% Query Time"
  },
  4: {
    problem: {
      en: "Lack of structured, open-domain JSON data for World Cup matches",
      de: "Mangel an strukturierten, quelloffenen JSON-Daten für WM-Spiele"
    },
    outcome: {
      en: "Free, open public domain football data covering multiple world cups in JSON",
      de: "Kostenlose, öffentliche Fußballdaten für mehrere Weltmeisterschaften als JSON"
    },
    github: "https://github.com/ijlalxansari1/worldcup.json",
    featured: true,
    tech: ["JSON", "Open Data", "API"]
  },
  5: {
    problem: {
      en: "Tracking and organizing a comprehensive data engineering learning path",
      de: "Verfolgung und Organisation eines umfassenden Lernpfads für Data Engineering"
    },
    outcome: {
      en: "A structured journey focusing on core data engineering principles",
      de: "Eine strukturierte Reise mit Fokus auf zentrale Data-Engineering-Prinzipien"
    },
    github: "https://github.com/ijlalxansari1/Data-engineering-journey",
    tech: ["Data Engineering", "Roadmap", "Python"]
  },
};

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const defaultProjects = useMemo(() => [
    {
      id: 1, title: "ucl-etl-pipeline",
      tag: "ETL",
      tech: ["Python", "SQL", "Docker", "ETL"],
      image: "/data_pipeline_arch.png",
      description: language === "en"
        ? "ETL Pipeline to process UEFA Champions League data."
        : "ETL-Pipeline zur Verarbeitung von UEFA Champions League-Daten.",
      alt: "ucl-etl-pipeline",
    },
    {
      id: 2, title: "Predicting Churn using ML and DL", 
      tag: "Machine Learning",
      tech: ["Python", "Machine Learning", "Deep Learning"],
      image: "/ml_system_arch.png",
      description: language === "en"
        ? "Predicting customer churn using Machine Learning and Deep Learning techniques."
        : "Vorhersage der Kundenabwanderung mit maschinellem Lernen und Deep Learning.",
      alt: "Predicting Churn using ML and DL",
    },
    {
      id: 3, title: "Bank ETL", 
      tag: "ETL",
      tech: ["Python", "SQL", "ETL"],
      image: "/cloud_analytics_arch.png",
      description: language === "en"
        ? "Data pipeline for extracting and loading banking data."
        : "Datenpipeline zum Extrahieren und Laden von Bankdaten.",
      alt: "Bank ETL",
    },
    {
      id: 4, title: "worldcup.json", 
      tag: "Open Data",
      tech: ["JSON", "Open Data", "API"],
      image: "https://images.unsplash.com/photo-1518605368461-1e125222048e?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "Free open public domain football data for the world cups in JSON."
        : "Kostenlose öffentliche Fußballdaten für die Weltmeisterschaften als JSON.",
      alt: "worldcup.json",
    },
    {
      id: 5, title: "Data Engineering Journey", 
      tag: "Education",
      tech: ["Data Engineering", "Roadmap", "Python"],
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
      description: language === "en"
        ? "Repo focusing on data engineering learning path."
        : "Repository mit Fokus auf den Data-Engineering-Lernpfad.",
      alt: "Data Engineering Journey",
    }
  ], [language]);

  const filters = [t.filter_all, "ETL", "Automation", "Dashboards", "APIs", "Python", "SQL", "Docker"];
  const [activeFilter, setActiveFilter] = useState(t.filter_all);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [archProject, setArchProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>(defaultProjects);

  useEffect(() => {
    const loadLocalProjects = () => {
      const adminData = localStorage.getItem("admin-projects");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          return parsed.filter((p: any) => p.status !== "Draft");
        }
      }
      return defaultProjects;
    };

    setProjects(loadLocalProjects());

    const handleUpdate = () => {
      setProjects(loadLocalProjects());
    };
    
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, [defaultProjects]);

  // Use Admin projects exclusively
  const allProjects = projects;

  const filtered = activeFilter === t.filter_all
    ? allProjects
    : allProjects.filter((p) => {
        const metaTech = p.tech || p.technologies || PROJECT_META[p.id]?.tech || [];
        
        // Extract tags from string fields that might be comma or space separated
        const extractTags = (str: any) => typeof str === 'string' ? str.split(/[\s,]+/).filter(Boolean) : [];
        const extractedTags = [...extractTags(p.tag), ...extractTags(p.category)];
        
        const tags = [...extractedTags, ...metaTech].filter(Boolean);
        const pTagLower = typeof p.tag === 'string' ? p.tag.toLowerCase() : '';
        const pCatLower = typeof p.category === 'string' ? p.category.toLowerCase() : '';
        
        // Provide implicit mapping to make the new filters work gracefully
        if (pTagLower.includes("python") || metaTech.includes("Python")) tags.push("Automation", "ETL");
        if (pTagLower.includes("sql") || metaTech.includes("SQL")) tags.push("ETL", "Dashboards");
        if (pTagLower.includes("fastapi") || metaTech.includes("FastAPI")) tags.push("APIs");
        if (pTagLower.includes("next") || metaTech.includes("Next.js")) tags.push("Dashboards");
        
        // Make matching extremely robust
        const activeLower = activeFilter.toLowerCase().replace(/[^a-z0-9]/g, '');
        const lowerTags = tags.map(t => typeof t === 'string' ? t.toLowerCase().replace(/[^a-z0-9]/g, '') : '');
        
        return lowerTags.includes(activeLower) || 
               pTagLower.replace(/[^a-z0-9]/g, '').includes(activeLower) || 
               pCatLower.replace(/[^a-z0-9]/g, '').includes(activeLower);
      });

  const featured = filtered.filter((p) => PROJECT_META[p.id]?.featured);
  const rest = filtered.filter((p) => !PROJECT_META[p.id]?.featured);

  return (
    <section className="w-full space-y-12" id="projects" aria-label="Projects Portfolio">
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
          className="space-y-12"
        >
          {/* ── Top Hero Featured Project ── */}
          {featured.length > 0 && (
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--text-muted)] mb-5 flex items-center gap-2">
                <Star size={10} className="text-yellow-400" />
                Featured Project
              </p>
              
              <div className="flex flex-col mb-8">
                <HeroProjectCard
                  project={featured[0]}
                  meta={PROJECT_META[featured[0].id]}
                  onOpen={() => setSelectedProject(featured[0])}
                  onOpenArch={() => setArchProject(featured[0])}
                  viewLabel={t.view_case_study}
                />
              </div>

              {featured.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-5">
                  {featured.slice(1).map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      meta={PROJECT_META[project.id]}
                      featured
                      index={i}
                      onOpen={() => setSelectedProject(project)}
                      onOpenArch={() => setArchProject(project)}
                      viewLabel={t.view_case_study}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Rest of projects ── */}
          {rest.length > 0 && (
            <div>
              {featured.length > 0 && (
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-[var(--text-muted)] mb-5 flex items-center gap-2">
                  <Layers size={10} />
                  Other Projects
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
                    onOpenArch={() => setArchProject(project)}
                    viewLabel={t.view_case_study}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
        onNext={() => {
          if (!selectedProject) return;
          const idx = allProjects.findIndex((p) => p.id === selectedProject.id);
          setSelectedProject(allProjects[(idx + 1) % allProjects.length]);
        }}
      />
      
      {/* Architecture Modal */}
      <ArchitectureModal 
        isOpen={archProject !== null}
        onClose={() => setArchProject(null)}
        project={archProject}
      />
    </section>
  );
}

function ProjectCard({
  project, meta, featured, index, onOpen, onOpenArch, viewLabel,
}: {
  project: any;
  meta?: { problem: {en: string, de: string}; outcome: {en: string, de: string}; github?: string; demo?: string; featured?: boolean; metric?: string };
  featured: boolean;
  index: number;
  onOpen: () => void;
  onOpenArch: () => void;
  viewLabel: string;
}) {
  const { language } = useLanguage();
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured
          ? "border-[var(--accent)]/25 hover:border-[var(--accent)]/60 hover:shadow-[0_10px_30px_rgba(var(--accent-rgb),0.1)]"
          : "border-[var(--border-subtle)] hover:border-[var(--border)]"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
        <Image
          src={project.image || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800"}
          alt={project.alt || project.title || "Project"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
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
        
        {/* Type Badge */}
        {!featured && (
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[var(--text-primary)] text-[9px] font-black uppercase tracking-widest rounded-md z-10 border border-white/10">
            {project.tag === 'FastAPI' ? 'API' : project.tag === 'Next.js' ? 'Frontend' : 'Data App'}
          </span>
        )}
        
        {/* Metric Badge */}
        {meta?.metric && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500/90 backdrop-blur-sm text-black text-[10px] font-black tracking-widest rounded-md z-10 shadow-lg border border-emerald-400">
            {meta.metric}
          </span>
        )}

        {/* Tag */}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[var(--text-primary)] text-[9px] font-black uppercase tracking-wider rounded-md z-10 border border-white/10">
          {project.tag}
        </span>
        {/* Architecture Thumbnail Trigger */}
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenArch(); }}
          className="absolute bottom-3 left-3 w-7 h-7 bg-black/60 backdrop-blur-sm text-[var(--text-secondary)] hover:text-[var(--accent)] border border-white/10 rounded-md z-10 flex items-center justify-center transition-colors"
          aria-label="View Architecture"
          title="View Architecture"
        >
          <Layers size={12} />
        </button>
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
                {language === "de" ? "Problem" : "Problem"}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] opacity-60 leading-relaxed">
                {meta.problem[language as 'en'|'de'] || meta.problem.en}
              </span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-[var(--accent)] w-14 shrink-0 pt-0.5">
                {language === "de" ? "Resultat" : "Result"}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] opacity-70 leading-relaxed">
                {meta.outcome[language as 'en'|'de'] || meta.outcome.en}
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
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all hover:scale-105"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Hero Project Card (Featured Top) ── */
function HeroProjectCard({
  project, meta, onOpen, onOpenArch, viewLabel,
}: {
  project: any;
  meta?: { problem: {en: string, de: string}; outcome: {en: string, de: string}; github?: string; demo?: string; featured?: boolean; metric?: string };
  onOpen: () => void;
  onOpenArch: () => void;
  viewLabel: string;
}) {
  const { language } = useLanguage();
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col lg:flex-row rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--accent)]/30 hover:border-[var(--accent)]/70 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(var(--accent-rgb),0.15)] hover:-translate-y-1"
    >
      {/* Thumbnail (Left side on large screens) */}
      <div className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden shrink-0">
        <Image
          src={project.image || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800"}
          alt={project.alt || project.title || "Project"}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          quality={80}
          className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity hover:mix-blend-normal"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-secondary)] hidden lg:block pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent lg:hidden pointer-events-none" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5 shadow-lg">
            <Star size={10} />
            Flagship Project
          </span>
          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-[var(--text-primary)] text-[10px] font-black uppercase tracking-wider rounded-lg border border-white/10 shadow-lg">
            {project.tag}
          </span>
          {meta?.metric && (
            <span className="px-3 py-1 bg-emerald-500/90 backdrop-blur-sm text-black text-[10px] font-black tracking-widest rounded-lg shadow-lg border border-emerald-400">
              {meta.metric}
            </span>
          )}
        </div>
        
        {/* Architecture Thumbnail Trigger */}
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenArch(); }}
          className="absolute bottom-4 left-4 px-3 py-2 bg-black/60 backdrop-blur-sm text-[var(--text-secondary)] hover:text-[var(--accent)] border border-white/10 rounded-xl z-10 flex items-center gap-2 transition-colors hover:bg-black/80 shadow-lg"
          aria-label="View Architecture"
        >
          <Layers size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Architecture Preview</span>
        </button>
      </div>

      {/* Content (Right side on large screens) */}
      <div className="flex flex-col flex-1 p-6 lg:p-8 justify-center z-10 bg-[var(--bg-secondary)] lg:bg-transparent">
        <h3 className="text-2xl lg:text-3xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-6 leading-tight">
          {project.title}
        </h3>

        {meta && (
          <div className="space-y-5 mb-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)] mb-1">
                {language === "de" ? "Die Herausforderung" : "The Challenge"}
              </h4>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {meta.problem[language as 'en'|'de'] || meta.problem.en}
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">
                {language === "de" ? "Das Ergebnis" : "The Outcome"}
              </h4>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {meta.outcome[language as 'en'|'de'] || meta.outcome.en}
              </p>
            </div>
            
            {/* Tech Stack Tags for Hero */}
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2 mt-4">
                Core Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {["Python", "Airflow", "dbt", "Docker", "SQL"].map(tech => (
                  <span key={tech} className="px-2.5 py-1 bg-[var(--bg-primary)] border border-white/5 text-[var(--text-secondary)] text-[10px] font-bold tracking-wider rounded-md">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {!meta && (
          <p className="text-[14px] text-[var(--text-secondary)] opacity-80 leading-relaxed mb-8">
            {project.description}
          </p>
        )}

        {/* Actions */}
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-4">
          <button
            onClick={onOpen}
            className="flex-1 lg:flex-none px-6 py-3.5 bg-[var(--accent)] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]"
            aria-label={`${viewLabel} for ${project.title}`}
          >
            {viewLabel}
            <ArrowRight size={14} />
          </button>
          {(meta?.github || project.link) && (
            <a
              href={meta?.github || project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:scale-110"
            >
              <Github size={18} />
            </a>
          )}
          {meta?.demo && (
            <a
              href={meta.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/30 transition-all hover:scale-110"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

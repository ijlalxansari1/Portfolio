"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
  const mainHero = featured.length > 0 ? featured[0] : filtered[0];
  const repoProjects = filtered.filter((p) => p.id !== mainHero?.id);

  const repoScrollRef = useRef<HTMLDivElement>(null);

  const scrollRepos = (direction: "left" | "right") => {
    if (repoScrollRef.current) {
      const scrollAmount = 260;
      repoScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-1" aria-label="Projects Portfolio">
      {/* Header & Filter tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 shrink-0">
        <div>
          <p className="text-[9.5px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-0.5">
            {t.title}
          </p>
          <h2 className="section-heading text-[22px] md:text-[26px] font-black text-[var(--text-primary)] leading-tight">
            {t.subtitle}
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-1" role="tablist" aria-label="Filter projects by technology">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${
                activeFilter === f
                  ? "bg-[var(--accent)] text-black shadow-sm font-black"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between flex-1 gap-2.5 my-1"
        >
          {/* 1. Flagship Hero Project */}
          {mainHero && (
            <div className="w-full">
              <HeroProjectCard
                project={mainHero}
                meta={PROJECT_META[mainHero.id]}
                onOpen={() => setSelectedProject(mainHero)}
                onOpenArch={() => setArchProject(mainHero)}
                viewLabel={t.view_case_study}
              />
            </div>
          )}

          {/* 2. GitHub Repositories (All Other Projects) */}
          {repoProjects.length > 0 && (
            <div className="space-y-1.5 shrink-0">
              <div className="flex items-center justify-between px-0.5">
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[var(--text-muted)] flex items-center gap-1.5">
                  <Github size={12} className="text-[var(--accent)]" />
                  GitHub Repositories ({repoProjects.length})
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => scrollRepos("left")}
                    className="w-5 h-5 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all text-[10px]"
                    aria-label="Scroll repos left"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scrollRepos("right")}
                    className="w-5 h-5 rounded bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] transition-all text-[10px]"
                    aria-label="Scroll repos right"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Horizontal Scrollable Strip of GitHub Repos */}
              <div
                ref={repoScrollRef}
                className="flex gap-2.5 overflow-x-auto pb-0.5 scrollbar-none snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {repoProjects.map((project, i) => (
                  <div key={project.id} className="min-w-[240px] max-w-[270px] flex-shrink-0 snap-start">
                    <ProjectCard
                      project={project}
                      meta={PROJECT_META[project.id]}
                      featured={!!PROJECT_META[project.id]?.featured}
                      index={i}
                      onOpen={() => setSelectedProject(project)}
                      onOpenArch={() => setArchProject(project)}
                      viewLabel={t.view_case_study}
                    />
                  </div>
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
    </div>
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      className={`group relative flex flex-col rounded-xl overflow-hidden bg-[var(--bg-secondary)] border transition-all duration-300 hover:shadow-md ${
        featured
          ? "border-[var(--accent)]/25 hover:border-[var(--accent)]/60"
          : "border-[var(--border-subtle)] hover:border-[var(--border)]"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[76px] overflow-hidden shrink-0">
        <Image
          src={project.image || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800"}
          alt={project.alt || project.title || "Project"}
          fill
          sizes="(max-width: 640px) 100vw, 260px"
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] grayscale-[0.2]"
          loading="lazy"
        />
        {/* Featured badge */}
        {featured && (
          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[var(--accent)] text-black text-[7.5px] font-black uppercase tracking-wider rounded z-10 flex items-center gap-0.5">
            <Star size={6} />
            Featured
          </span>
        )}
        
        {/* Metric Badge */}
        {meta?.metric && (
          <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-emerald-500/90 backdrop-blur-sm text-black text-[8px] font-black tracking-wider rounded z-10">
            {meta.metric}
          </span>
        )}

        {/* Tag */}
        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm text-[var(--text-primary)] text-[7.5px] font-black uppercase tracking-wider rounded border border-white/10">
          {project.tag}
        </span>
        {/* Architecture Thumbnail Trigger */}
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenArch(); }}
          className="absolute bottom-1.5 left-1.5 w-5 h-5 bg-black/60 backdrop-blur-sm text-[var(--text-secondary)] hover:text-[var(--accent)] border border-white/10 rounded z-10 flex items-center justify-center transition-colors"
          aria-label="View Architecture"
          title="View Architecture"
        >
          <Layers size={9} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 gap-1.5 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-[11px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight truncate">
            {project.title}
          </h3>

          {/* Outcome / Problem */}
          {meta ? (
            <p className="text-[9.5px] text-[var(--text-secondary)] opacity-70 line-clamp-1 leading-tight mt-1">
              {meta.outcome[language as 'en'|'de'] || meta.outcome.en}
            </p>
          ) : (
            <p className="text-[9.5px] text-[var(--text-secondary)] opacity-70 line-clamp-1 leading-tight mt-1">
              {project.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="pt-1.5 border-t border-[var(--border-subtle)] flex items-center justify-between gap-1.5">
          <button
            onClick={onOpen}
            className="text-[8.5px] font-black uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
            aria-label={`Open case study for ${project.title}`}
          >
            Case Study
            <ArrowRight size={8} />
          </button>
          {(meta?.github || project.link) && (
            <a
              href={meta?.github || project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 rounded bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[var(--text-secondary)] hover:text-white"
            >
              <Github size={10} />
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col sm:flex-row rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--accent)]/30 hover:border-[var(--accent)]/60 transition-all duration-300 shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-[36%] min-h-[120px] sm:min-h-[140px] overflow-hidden shrink-0">
        <Image
          src={project.image || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800"}
          alt={project.alt || project.title || "Project"}
          fill
          sizes="(max-width: 640px) 100vw, 36vw"
          quality={80}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-secondary)] hidden sm:block pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent sm:hidden pointer-events-none" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          <span className="px-1.5 py-0.5 bg-[var(--accent)] text-black text-[8px] font-black uppercase tracking-wider rounded flex items-center gap-0.5 shadow">
            <Star size={7} />
            Flagship
          </span>
          <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-sm text-[var(--text-primary)] text-[8px] font-black uppercase tracking-wider rounded border border-white/10">
            {project.tag}
          </span>
        </div>
        
        {/* Architecture Thumbnail Trigger */}
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenArch(); }}
          className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-[var(--text-secondary)] hover:text-[var(--accent)] border border-white/10 rounded z-10 flex items-center gap-1 transition-colors"
          aria-label="View Architecture"
        >
          <Layers size={9} />
          <span className="text-[8px] font-bold uppercase tracking-wider">Arch</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-3.5 justify-between z-10 bg-[var(--bg-secondary)] sm:bg-transparent gap-2">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-tight">
              {project.title}
            </h3>
            {meta?.metric && (
              <span className="px-1.5 py-0.5 bg-emerald-500/90 text-black text-[8px] font-black tracking-wider rounded shadow shrink-0">
                {meta.metric}
              </span>
            )}
          </div>

          {meta && (
            <div className="space-y-1 mb-1.5">
              <div>
                <span className="text-[8px] font-black uppercase tracking-wider text-[var(--accent)] mr-1">
                  {language === "de" ? "Problem:" : "Challenge:"}
                </span>
                <span className="text-[10px] text-[var(--text-secondary)] opacity-85 leading-tight">
                  {meta.problem[language as 'en'|'de'] || meta.problem.en}
                </span>
              </div>
              <div>
                <span className="text-[8px] font-black uppercase tracking-wider text-emerald-400 mr-1">
                  {language === "de" ? "Ergebnis:" : "Outcome:"}
                </span>
                <span className="text-[10px] text-[var(--text-secondary)] opacity-85 leading-tight">
                  {meta.outcome[language as 'en'|'de'] || meta.outcome.en}
                </span>
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1 mt-1">
            {["Python", "Airflow", "dbt", "Docker", "SQL"].map(tech => (
              <span key={tech} className="px-1.5 py-0.5 bg-[var(--bg-primary)] border border-white/5 text-[var(--text-secondary)] text-[8px] font-bold tracking-wider rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-white/5 flex items-center gap-2">
          <button
            onClick={onOpen}
            className="px-3 py-1.5 bg-[var(--accent)] text-black text-[9px] font-black uppercase tracking-widest rounded-md hover:scale-105 transition-transform flex items-center justify-center gap-1 shadow"
            aria-label={`${viewLabel} for ${project.title}`}
          >
            {viewLabel}
            <ArrowRight size={10} />
          </button>
          {(meta?.github || project.link) && (
            <a
              href={meta?.github || project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white transition-all"
            >
              <Github size={12} />
            </a>
          )}
          {meta?.demo && (
            <a
              href={meta.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-md bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

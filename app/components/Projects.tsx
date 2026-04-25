"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const defaultProjects = [
    {
      id: 1, title: language === 'en' ? "AETHER Platform" : "AETHER Plattform", tag: "Python", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      description: language === 'en' ? "Open-source ethical data analysis platform with a 10-stage analytical pipeline, bias detection using Fairlearn and SHAP." : "Open-Source-Plattform für ethische Datenanalyse mit einer 10-stufigen Analyse-Pipeline, Bias-Erkennung mit Fairlearn und SHAP.",
    },
    {
      id: 2, title: "Data Engineering Tracker", tag: "Next.js", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
      description: language === 'en' ? "Interactive 20-hour data engineering curriculum tracker built on the 80/20 principle." : "Interaktiver Tracker für ein 20-stündiges Data-Engineering-Curriculum, basierend auf dem 80/20-Prinzip.",
    },
    {
      id: 3, title: "ETL Pipeline — dbt + Dagster", tag: "SQL", image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
      description: language === 'en' ? "End-to-end ELT pipeline using dbt Core and Dagster for orchestration, with automated data quality tests." : "End-to-End ELT-Pipeline mit dbt Core und Dagster für die Orchestrierung, inklusive automatisierter Datenqualitätstests.",
    },
    {
      id: 4, title: "Bias Audit System", tag: "Python", image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=800",
      description: language === 'en' ? "Automated fairness auditing module using Fairlearn and SHAP to detect demographic bias in ML model outputs." : "Automatisiertes Fairness-Audit-Modul mit Fairlearn und SHAP zur Erkennung demografischer Verzerrungen in ML-Modellergebnissen.",
    },
    {
      id: 5, title: "FastAPI Data Gateway", tag: "FastAPI", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
      description: language === 'en' ? "Secure REST API gateway with JWT authentication, role-based access control, and rate limiting." : "Sicheres REST-API-Gateway mit JWT-Authentifizierung, rollenbasierter Zugriffskontrolle und Ratenbegrenzung.",
    },
    {
      id: 6, title: "Analytics Dashboard", tag: "Next.js", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: language === 'en' ? "Real-time analytics dashboard backed by DuckDB for in-process OLAP queries on large datasets." : "Echtzeit-Analyse-Dashboard mit DuckDB für In-Process-OLAP-Abfragen auf großen Datensätzen.",
    },
  ];

  const filters = [t.filter_all, "Python", "SQL", "FastAPI", "Next.js"];

  const [activeFilter, setActiveFilter] = useState(t.filter_all);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    setProjects(defaultProjects);
  }, [language, defaultProjects]);

  useEffect(() => {
    const adminData = localStorage.getItem("admin-projects");
    if (adminData) {
      const parsed = JSON.parse(adminData);
      if (parsed.length > 0) {
        setProjects(parsed.filter((p: any) => p.status !== 'Draft'));
      }
    }
    
    const handleStorage = () => {
      const updated = localStorage.getItem("admin-projects");
      if (updated) {
        setProjects(JSON.parse(updated).filter((p: any) => p.status !== 'Draft'));
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("admin-updated", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("admin-updated", handleStorage);
    };
  }, []);

  const filtered = activeFilter === t.filter_all ? projects : projects.filter(p => p.tag === activeFilter);

  const handleNext = () => {
    if (!selectedId) return;
    const currentIndex = projects.findIndex(p => p.id === selectedId);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedId(projects[nextIndex].id);
  };

  return (
    <div className="w-full">
      <p className="section-label uppercase tracking-[3px] text-[11px] font-bold mb-2 text-[var(--accent)]">{t.title}</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-8">{t.subtitle}</h2>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
              activeFilter === f ? "bg-[var(--accent)] text-black shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map(project => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedId(project.id)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" />
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-[var(--accent)] text-black text-[10px] font-black uppercase tracking-widest rounded-full z-20">
                  {project.tag}
                </span>
                
                {/* View Case Study Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-white text-[10px] font-black uppercase tracking-[3px]">{t.view_case_study}</span>
                    <div className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-black">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[15px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-all mb-2">{project.title}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] opacity-50 line-clamp-2 leading-relaxed">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Case Study Modal */}
      <ProjectModal 
        isOpen={selectedId !== null} 
        onClose={() => setSelectedId(null)} 
        projectId={selectedId} 
        onNext={handleNext}
      />
    </div>
  );
}

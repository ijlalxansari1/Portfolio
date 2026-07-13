"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Wrench, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";


const defaultTools_EN = [
  { name: "dbt Core", level: "Production", desc: "SQL transformations & lineage", icon: null, badge: "dbt", color: "text-[#FF694B]", mockup: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800", link: "https://www.getdbt.com/" },
  { name: "Dagster", level: "Professional", desc: "Asset-based orchestration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", mockup: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800", link: "https://dagster.io/" },
  { name: "Apache Airflow", level: "Advanced", desc: "Workflow automation (DAGs)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg", mockup: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800", link: "https://airflow.apache.org/" },
  { name: "DuckDB", level: "Expert", desc: "Fast analytical SQL processing", icon: null, badge: "🦆", color: "text-[#FFF000]", mockup: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", link: "https://duckdb.org/" },
  { name: "FastAPI", level: "Professional", desc: "High-performance Python APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", mockup: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", link: "https://fastapi.tiangolo.com/" },
  { name: "Docker", level: "Intermediate", desc: "Containerized environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", mockup: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800", link: "https://www.docker.com/" },
];

const defaultTools_DE = [
  { name: "dbt Core", level: "Produktion", desc: "SQL-Transformationen & Lineage", icon: null, badge: "dbt", color: "text-[#FF694B]", mockup: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800", link: "https://www.getdbt.com/" },
  { name: "Dagster", level: "Professionell", desc: "Asset-basierte Orchestrierung", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", mockup: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800", link: "https://dagster.io/" },
  { name: "Apache Airflow", level: "Fortgeschritten", desc: "Workflow-Automatisierung (DAGs)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg", mockup: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800", link: "https://airflow.apache.org/" },
  { name: "DuckDB", level: "Experte", desc: "Schnelle analytische SQL-Verarbeitung", icon: null, badge: "🦆", color: "text-[#FFF000]", mockup: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", link: "https://duckdb.org/" },
  { name: "FastAPI", level: "Professionell", desc: "Hochleistungs-Python-APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", mockup: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", link: "https://fastapi.tiangolo.com/" },
  { name: "Docker", level: "Mittel", desc: "Containerisierte Umgebungen", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", mockup: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800", link: "https://www.docker.com/" },
];


export default function ToolStack() {
  const { language } = useLanguage();
  const [tools, setTools] = useState(language === "de" ? defaultTools_DE : defaultTools_EN);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-skills");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.tools && parsed.tools.length > 0) {
          const mapped = parsed.tools.map((t: any) => {
             const fallbackMockups = [
               "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
               "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
             ];
             return {
               ...t,
               level: t.progress > 90 ? "Expert" : t.progress > 80 ? "Professional" : "Advanced",
               desc: t.desc || "Custom tool entry from admin",
               mockup: t.mockup || fallbackMockups[Math.floor(Math.random()*fallbackMockups.length)],
               link: t.link || "#"
             };
          });
          setTools(mapped);
        }
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-3">{language === "de" ? "Tool-Stack" : "Tool Stack"}</p>
        <h2 className="section-heading text-[32px] md:text-[40px] font-black text-[var(--text-primary)] mb-4">{language === "de" ? "Software-Ökosystem" : "Software Ecosystem"}</h2>
        <p className="text-[14px] text-[var(--text-secondary)] opacity-60 leading-relaxed">
          {language === "de" ? "Die spezialisierten Tools und Plattformen, die ich verwende, um skalierbare, produktionsreife Infrastrukturen aufzubauen." : "The specialized tools and platforms I use to build scalable, production-grade infrastructure."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {tools.map((tool: any, i: number) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="group relative flex flex-col rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden hover:border-[var(--accent)]/40 hover:shadow-[0_15px_40px_rgba(var(--accent-rgb),0.1)] hover:-translate-y-2 transition-all duration-500 h-full"
          >
            {/* Top Mockup Section */}
            <div className="relative w-full aspect-video overflow-hidden border-b border-[var(--border-subtle)]">
              <Image
                src={tool.mockup}
                alt={`${tool.name} interface`}
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />
              
              {/* Floating Icon Over Mockup */}
              <div className="absolute bottom-4 left-6 w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)] transition-all duration-500">
                {tool.icon ? (
                  <Image 
                    src={tool.icon} 
                    alt={tool.name} 
                    width={24} 
                    height={24}
                    unoptimized
                    className="shrink-0 transition-all filter grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <span className={`shrink-0 text-[18px] font-black ${tool.color || 'text-[var(--accent)]'}`}>
                    {tool.badge || tool.name[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-6">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h4 className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {tool.name}
                  </h4>
                  <span className="px-2 py-0.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[9px] font-black uppercase tracking-widest text-[var(--accent)] rounded-md shrink-0">
                    {tool.level}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] opacity-70 leading-relaxed min-h-[40px]">
                  {tool.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-auto pt-5 border-t border-[var(--border-subtle)]">
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/30 transition-all duration-300 group-hover:shadow-inner"
                >
                  <span className="group-hover:text-[var(--accent)] transition-colors">Launch App</span>
                  <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

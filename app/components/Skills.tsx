"use client";

import { motion } from "framer-motion";
import {
  Layers, Database, Workflow, BarChart3, Code2, Server, Bot, ShieldCheck, Cloud, Check, Compass
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";

const CORE_STACK = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", role: "Core Language", desc: "Data processing, API development, and automation scripts.", tags: ["ETL", "Automation", "APIs"] },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", role: "Primary Database", desc: "Relational data modeling, indexing, and robust ACID storage.", tags: ["ACID", "Relational", "JSONB"] },
  { name: "Dagster", icon: "https://cdn.simpleicons.org/dagster/white", role: "Orchestration", desc: "Asset-based data pipeline orchestration and scheduling.", tags: ["DataOps", "Pipelines", "Assets"] },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", role: "Containerization", desc: "Consistent environments and reproducible builds.", tags: ["DevOps", "Microservices", "Deployment"] },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", role: "API Framework", desc: "High-performance data delivery and REST API development.", tags: ["Async", "REST", "Endpoints"] },
  { name: "dbt", icon: "https://cdn.simpleicons.org/dbt/white", role: "Transformation", desc: "SQL-first data modeling and testing in the warehouse.", tags: ["ELT", "Testing", "Lineage"] },
  { name: "Power BI", icon: "https://cdn.simpleicons.org/powerbi/white", role: "Visualization", desc: "Interactive dashboards and business intelligence reporting.", tags: ["Analytics", "Dashboards", "DAX"] },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", role: "Frontend", desc: "React framework for building fast data applications.", tags: ["React", "SSR", "UI"] },
];

const CLOUD_PLATFORMS = [
  {
    name: "Amazon Web Services",
    shortName: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    desc: "Cloud infrastructure for scalable data pipelines and storage.",
    status: "used" as const,
    services: [
      { name: "S3", desc: "Object storage for data lakes" },
      { name: "Glue", desc: "Managed ETL service" },
      { name: "RDS", desc: "Managed relational databases" },
      { name: "Lambda", desc: "Serverless compute" },
    ],
  },
  {
    name: "Microsoft Azure",
    shortName: "Azure",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    desc: "Enterprise cloud platform for data integration and analytics.",
    status: "exploring" as const,
    services: [
      { name: "Data Factory", desc: "Orchestration & integration" },
      { name: "Blob Storage", desc: "Scalable object storage" },
      { name: "Azure SQL", desc: "Managed SQL databases" },
      { name: "Synapse", desc: "Unified analytics workspace" },
    ],
  },
  {
    name: "Google Cloud Platform",
    shortName: "GCP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    desc: "Data-first cloud with powerful analytics and ML capabilities.",
    status: "exploring" as const,
    services: [
      { name: "BigQuery", desc: "Serverless data warehouse" },
      { name: "Cloud Storage", desc: "Unified object storage" },
      { name: "Cloud Functions", desc: "Event-driven compute" },
      { name: "Dataflow", desc: "Stream & batch processing" },
    ],
  },
];

const CORE_STACK_DE = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", role: "Kernsprache", desc: "Datenverarbeitung, API-Entwicklung und Automatisierungsskripte.", tags: ["ETL", "Automatisierung", "APIs"] },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", role: "Primäre Datenbank", desc: "Relationale Datenmodellierung, Indizierung und robuster ACID-Speicher.", tags: ["ACID", "Relational", "JSONB"] },
  { name: "Dagster", icon: "https://cdn.simpleicons.org/dagster/white", role: "Orchestrierung", desc: "Asset-basierte Datenpipeline-Orchestrierung und -Planung.", tags: ["DataOps", "Pipelines", "Assets"] },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", role: "Containerisierung", desc: "Konsistente Umgebungen und reproduzierbare Builds.", tags: ["DevOps", "Microservices", "Deployment"] },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", role: "API-Framework", desc: "Hochleistungs-Datenbereitstellung und REST-API-Entwicklung.", tags: ["Async", "REST", "Endpoints"] },
  { name: "dbt", icon: "https://cdn.simpleicons.org/dbt/white", role: "Transformation", desc: "SQL-first Datenmodellierung und -tests im Data Warehouse.", tags: ["ELT", "Testing", "Lineage"] },
  { name: "Power BI", icon: "https://cdn.simpleicons.org/powerbi/white", role: "Visualisierung", desc: "Interaktive Dashboards und Business-Intelligence-Reporting.", tags: ["Analytics", "Dashboards", "DAX"] },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", role: "Frontend", desc: "React-Framework für den Bau schneller Datenanwendungen.", tags: ["React", "SSR", "UI"] },
];

const CLOUD_PLATFORMS_DE = [
  {
    name: "Amazon Web Services",
    shortName: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    desc: "Cloud-Infrastruktur für skalierbare Datenpipelines und -speicher.",
    status: "used" as const,
    services: [
      { name: "S3", desc: "Objektspeicher für Data Lakes" },
      { name: "Glue", desc: "Verwalteter ETL-Dienst" },
      { name: "RDS", desc: "Verwaltete relationale Datenbanken" },
      { name: "Lambda", desc: "Serverloses Computing" },
    ],
  },
  {
    name: "Microsoft Azure",
    shortName: "Azure",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    desc: "Enterprise-Cloud-Plattform für Datenintegration und Analyse.",
    status: "exploring" as const,
    services: [
      { name: "Data Factory", desc: "Orchestrierung & Integration" },
      { name: "Blob Storage", desc: "Skalierbarer Objektspeicher" },
      { name: "Azure SQL", desc: "Verwaltete SQL-Datenbanken" },
      { name: "Synapse", desc: "Vereinheitlichter Analyse-Arbeitsbereich" },
    ],
  },
  {
    name: "Google Cloud Platform",
    shortName: "GCP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    desc: "Daten-zentrierte Cloud mit leistungsstarken Analyse- und ML-Funktionen.",
    status: "exploring" as const,
    services: [
      { name: "BigQuery", desc: "Serverloses Data Warehouse" },
      { name: "Cloud Storage", desc: "Einheitlicher Objektspeicher" },
      { name: "Cloud Functions", desc: "Ereignisgesteuertes Computing" },
      { name: "Dataflow", desc: "Stream- & Batch-Verarbeitung" },
    ],
  },
];

export default function Skills() {
  const { language } = useLanguage();
  
  const [dynamicCoreStack, setDynamicCoreStack] = useState<any[] | null>(null);
  const [dynamicCloudPlatforms, setDynamicCloudPlatforms] = useState<any[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Engineering' | 'Infrastructure'>('All');

  useEffect(() => {
    const loadDynamic = async () => {
      try {
        const res = await fetch('/api/data/admin?key=admin-core-stack');
        if (res.ok) {
          const { data } = await res.json();
          if (data && data.length > 0) setDynamicCoreStack(data);
        }
      } catch (e) {
        const stored = localStorage.getItem('admin-core-stack');
        if (stored) setDynamicCoreStack(JSON.parse(stored));
      }

      try {
        const res = await fetch('/api/data/admin?key=admin-cloud-platforms');
        if (res.ok) {
          const { data } = await res.json();
          if (data && data.length > 0) setDynamicCloudPlatforms(data);
        }
      } catch (e) {
        const stored = localStorage.getItem('admin-cloud-platforms');
        if (stored) setDynamicCloudPlatforms(JSON.parse(stored));
      }
    };
    loadDynamic();
    window.addEventListener("admin-updated", loadDynamic);
    return () => window.removeEventListener("admin-updated", loadDynamic);
  }, []);

  const getServiceIcon = (name: string) => {
    switch (name) {
      case "S3":
      case "Blob Storage":
      case "Cloud Storage": return <Database size={14} />;
      case "Glue":
      case "Data Factory":
      case "Dataflow": return <Workflow size={14} />;
      case "RDS":
      case "Azure SQL":
      case "BigQuery": return <Server size={14} />;
      case "Lambda":
      case "Cloud Functions": return <Code2 size={14} />;
      case "Synapse": return <Layers size={14} />;
      default: return <Cloud size={14} />;
    }
  };

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "etl":
      case "elt":
      case "pipelines":
      case "dataops": return <Workflow size={10} />;
      case "acid":
      case "relational":
      case "jsonb":
      case "assets": return <Database size={10} />;
      case "apis":
      case "async":
      case "rest":
      case "endpoints":
      case "react":
      case "ssr":
      case "ui": return <Code2 size={10} />;
      case "devops":
      case "microservices":
      case "deployment": return <Layers size={10} />;
      case "testing":
      case "lineage": return <ShieldCheck size={10} />;
      case "analytics":
      case "dashboards":
      case "dax": return <BarChart3 size={10} />;
      case "automation":
      case "automatisierung": return <Bot size={10} />;
      default: return <Check size={10} />;
    }
  };

  return (
    <div className="w-full space-y-4" aria-label="Tools and Infrastructure">
      
      {/* 🚀 Section Header 🚀 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-1">
            {language === "de" ? "Von der Datenaufnahme bis zur Erkenntnis" : "From Ingestion to Insight"}
          </p>
          <h2 className="section-heading text-[26px] md:text-[34px] font-black text-[var(--text-primary)] leading-tight">
            Tools of the Trade
          </h2>
        </div>
        <p className="text-[12px] text-[var(--text-secondary)] opacity-60 max-w-md leading-relaxed hidden sm:block">
          {language === "de" ? "Die Sprachen, Frameworks und Infrastrukturen, nach denen ich täglich greife – keine Wunschliste, sondern ein Arbeitsset." : "The languages, frameworks, and infrastructure I reach for daily — not a wishlist, a working set."}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', 'Engineering', 'Infrastructure'].map((filterItem) => (
          <button
            key={filterItem}
            onClick={() => setActiveFilter(filterItem as any)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
              activeFilter === filterItem
                ? "bg-[var(--accent)] text-black shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)]"
            }`}
          >
            {filterItem === 'All' && (language === "de" ? 'Alle' : 'All')}
            {filterItem === 'Engineering' && (language === "de" ? 'Technik-Stack' : 'Engineering Stack')}
            {filterItem === 'Infrastructure' && (language === "de" ? 'Infrastruktur' : 'Infrastructure Layer')}
          </button>
        ))}
      </div>

      {/* 🚀 Core Stack (Bento Grid) 🚀 */}
      {(activeFilter === 'All' || activeFilter === 'Engineering') && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(dynamicCoreStack || (language === "de" ? CORE_STACK_DE : CORE_STACK)).map((tech: any, i: number) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="group relative p-3.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/40 hover:bg-[var(--bg-secondary)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-md text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                {tech.isLucide ? (
                  <tech.icon size={18} />
                ) : (
                  <Image 
                    src={tech.icon || "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"} 
                    alt={tech.name} 
                    width={18} 
                    height={18}
                    className="opacity-75 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
              <span className="px-2 py-0.5 bg-white/[0.03] border border-[var(--border-subtle)] text-[8px] font-black uppercase tracking-wider text-[var(--text-muted)] rounded">
                {tech.role}
              </span>
            </div>

            <h4 className="text-[13px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {tech.name}
            </h4>
          </motion.div>
        ))}
        </div>
      </motion.div>
      )}

      {/* ☁️ Cloud & Platform Engineering ☁️ */}
      {(activeFilter === 'All' || activeFilter === 'Infrastructure') && (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="pt-4"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-1 flex items-center gap-1.5">
              <Cloud size={11} />
              Cloud & Platform Engineering
            </p>
            <h3 className="text-[18px] md:text-[20px] font-black text-[var(--text-primary)] leading-tight">
              Infrastructure Layer
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)]">{language === "de" ? "In Projekten verwendet" : "Used in Projects"}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)]">{language === "de" ? "Erkunden" : "Exploring"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {(dynamicCloudPlatforms || (language === "de" ? CLOUD_PLATFORMS_DE : CLOUD_PLATFORMS)).map((platform: any, i: number) => (
            <motion.div
              key={platform.shortName}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="group relative p-3.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/40 hover:bg-[var(--bg-secondary)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-md">
                  <Image
                    src={platform.icon || "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"}
                    alt={platform.shortName}
                    width={20}
                    height={20}
                    unoptimized
                    className="opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider flex items-center gap-1 border ${
                  platform.status === "used"
                    ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                    : "bg-blue-400/10 border-blue-400/20 text-blue-400"
                }`}>
                  {platform.status === "used" ? <Check size={8} /> : <Compass size={8} />}
                  {platform.status === "used" ? (language === "de" ? "Verwendet" : "Used") : (language === "de" ? "Erkunden" : "Exploring")}
                </span>
              </div>

              <h4 className="text-[13px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {platform.shortName}
              </h4>
            </motion.div>
          ))}
        </div>
      </motion.div>
      )}
    </div>
  );
}

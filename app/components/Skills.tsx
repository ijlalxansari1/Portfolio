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
  { name: "Dagster", icon: Workflow, isLucide: true, role: "Orchestration", desc: "Asset-based data pipeline orchestration and scheduling.", tags: ["DataOps", "Pipelines", "Assets"] },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", role: "Containerization", desc: "Consistent environments and reproducible builds.", tags: ["DevOps", "Microservices", "Deployment"] },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", role: "API Framework", desc: "High-performance data delivery and REST API development.", tags: ["Async", "REST", "Endpoints"] },
  { name: "dbt", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg", role: "Transformation", desc: "SQL-first data modeling and testing in the warehouse.", tags: ["ELT", "Testing", "Lineage"] },
  { name: "Power BI", icon: BarChart3, isLucide: true, role: "Visualization", desc: "Interactive dashboards and business intelligence reporting.", tags: ["Analytics", "Dashboards", "DAX"] },
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
  { name: "Dagster", icon: Workflow, isLucide: true, role: "Orchestrierung", desc: "Asset-basierte Datenpipeline-Orchestrierung und -Planung.", tags: ["DataOps", "Pipelines", "Assets"] },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", role: "Containerisierung", desc: "Konsistente Umgebungen und reproduzierbare Builds.", tags: ["DevOps", "Microservices", "Deployment"] },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", role: "API-Framework", desc: "Hochleistungs-Datenbereitstellung und REST-API-Entwicklung.", tags: ["Async", "REST", "Endpoints"] },
  { name: "dbt", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg", role: "Transformation", desc: "SQL-first Datenmodellierung und -tests im Data Warehouse.", tags: ["ELT", "Testing", "Lineage"] },
  { name: "Power BI", icon: BarChart3, isLucide: true, role: "Visualisierung", desc: "Interaktive Dashboards und Business-Intelligence-Reporting.", tags: ["Analytics", "Dashboards", "DAX"] },
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

  return (
    <section id="skills" className="w-full space-y-8" aria-label="Engineering Stack">
      
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-3">
            {language === "de" ? "Mein empfohlener End-Stack" : "My Recommended Final Stack"}
          </p>
          <h2 className="section-heading text-[32px] md:text-[42px] font-black text-[var(--text-primary)] leading-tight">
            Engineering Stack
          </h2>
        </div>
        <p className="text-[14px] text-[var(--text-secondary)] opacity-60 max-w-md leading-relaxed">
          {language === "de" ? "Ein kohärentes, produktionsreifes Ökosystem von Tools, das den gesamten Datenlebenszyklus umfasst." : "A cohesive, production-ready ecosystem of tools spanning the entire data lifecycle."}
        </p>
      </div>

      {/* ⚡ Core Stack (Bento Grid) ⚡ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(dynamicCoreStack || (language === "de" ? CORE_STACK_DE : CORE_STACK)).map((tech: any, i: number) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl hover:border-[var(--accent)]/40 hover:bg-[var(--bg-secondary)] transition-all duration-500 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(var(--accent-rgb),0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
            
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[var(--accent)]/20 transition-all duration-500 text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                {tech.isLucide ? (
                  <tech.icon size={28} className="transition-all duration-500" />
                ) : (
                  <Image 
                    src={tech.icon} 
                    alt={tech.name} 
                    width={28} 
                    height={28}
                    unoptimized
                    className="transition-all duration-500 opacity-80 group-hover:opacity-100"
                  />
                )}
              </div>
              <span className="px-2.5 py-1 bg-white/[0.03] border border-[var(--border-subtle)] text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)] rounded-lg group-hover:text-[var(--text-primary)] transition-colors">
                {tech.role}
              </span>
            </div>

            <h3 className="text-xl font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
              {tech.name}
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed opacity-70 mb-6 min-h-[40px]">
              {tech.desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {tech.tags.map((tag: string) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] font-bold text-[var(--text-secondary)] rounded-md group-hover:border-[var(--accent)]/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Cloud & Platform Engineering ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="pt-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-3 flex items-center gap-2">
              <Cloud size={12} />
              Cloud & Platform Engineering
            </p>
            <h3 className="text-[24px] md:text-[28px] font-black text-[var(--text-primary)] leading-tight">
              Infrastructure Layer
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">{language === "de" ? "In Projekten verwendet" : "Used in Projects"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">{language === "de" ? "Erkunden" : "Exploring"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(dynamicCloudPlatforms || (language === "de" ? CLOUD_PLATFORMS_DE : CLOUD_PLATFORMS)).map((platform: any, i: number) => (
            <motion.div
              key={platform.shortName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="group relative p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl hover:border-[var(--accent)]/40 hover:bg-[var(--bg-secondary)] transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(var(--accent-rgb),0.05)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-[var(--accent)]/20 transition-all duration-500">
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    width={28}
                    height={28}
                    unoptimized
                    className="transition-all duration-500 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border ${
                  platform.status === "used"
                    ? "bg-[var(--accent)]/10 border-[var(--accent)]/20 text-[var(--accent)]"
                    : "bg-blue-400/10 border-blue-400/20 text-blue-400"
                }`}>
                  {platform.status === "used" ? <Check size={10} /> : <Compass size={10} />}
                  {platform.status === "used" ? (language === "de" ? "Verwendet" : "Used") : (language === "de" ? "Erkunden" : "Exploring")}
                </span>
              </div>

              {/* Name & Description */}
              <h4 className="text-lg font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                {platform.shortName}
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] font-bold mb-1">{platform.name}</p>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed opacity-70 mb-5">
                {platform.desc}
              </p>

              {/* Services */}
              <div className="mt-auto space-y-2.5 pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                  Core Services
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {platform.services.map((svc: any) => (
                    <div
                      key={svc.name}
                      className="px-2.5 py-2 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg group-hover:border-[var(--accent)]/15 transition-colors"
                    >
                      <span className="text-[11px] font-black text-[var(--text-primary)] block leading-tight">
                        {svc.name}
                      </span>
                      <span className="text-[9px] text-[var(--text-muted)] leading-tight">
                        {svc.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

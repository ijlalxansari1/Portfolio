"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { CheckCircle2 } from "lucide-react";

const WHAT_I_BUILD = [
  { name: "Data Pipelines & Integration", desc: "End-to-end ETL/ELT pipelines, data integration from APIs/databases/files, transformation, and workflow automation using Python, SQL, and orchestration tools." },
  { name: "Database Architecture", desc: "Design scalable relational databases with star schemas, dimensional modeling, warehousing, efficient indexing, and query optimization." },
  { name: "Data Quality & Validation", desc: "Implement validation rules, schema checks, duplicate detection, missing value handling, and comprehensive data quality monitoring." },
  { name: "Data Governance", desc: "Design data systems with documentation, audit trails, access control, metadata management, and governance best practices." },
  { name: "Analytics Engineering", desc: "Prepare clean, well-structured datasets for dashboards, business intelligence, analytical reporting, and data-driven insights." },
  { name: "Pipeline Reliability & Monitoring", desc: "Build observable, reliable pipelines with logging, error handling, retry mechanisms, alerts, DataOps practices, testing, and CI/CD deployment." },
  { name: "API Development", desc: "Build RESTful APIs with FastAPI for data ingestion, processing, integration, and secure data access layers." },
  { name: "Web Scraping & Data Collection", desc: "Collect structured data from websites, public datasets, APIs, CSV, JSON, XML sources, and third-party services for downstream processing." },
  { name: "Performance Optimization", desc: "Optimize SQL queries, pipeline execution, storage efficiency, data processing speed, and system scalability for production performance." },
  { name: "Technical Documentation", desc: "Produce clear technical documentation, architecture diagrams, data dictionaries, and pipeline documentation for maintainability and knowledge sharing." }
];

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language].services;
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);

  useEffect(() => {
    const handleStorage = () => {
      const data = localStorage.getItem("admin-services");
      if (data) {
        setDynamicServices(JSON.parse(data));
      }
    };
    handleStorage();
    window.addEventListener("admin-updated", handleStorage);
    return () => window.removeEventListener("admin-updated", handleStorage);
  }, []);

  return (
    <div className="w-full space-y-8">
      <div>
        <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">{t?.title || "Services"}</p>
        <h2 className="section-heading text-[32px] md:text-[42px] font-black text-[var(--text-primary)] mb-4">What I Build</h2>
        <p className="text-[14px] text-[var(--text-secondary)] opacity-50 max-w-2xl leading-relaxed">
          End-to-end data solutions spanning pipeline design, quality assurance, governance, and production deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WHAT_I_BUILD.map((service, idx) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04 }}
            className="group p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/40 hover:bg-[var(--accent)]/5 transition-all flex flex-col"
          >
            <div className="flex gap-4 flex-1">
              <div className="flex items-start justify-center">
                <div className="w-6 h-6 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/30 shrink-0 mt-0.5">
                  <CheckCircle2 size={16} className="opacity-70" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-[14px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {service.name}
                </h3>
                <p className="text-[12px] text-[var(--text-secondary)] opacity-50 leading-[1.6] group-hover:opacity-70 transition-opacity">
                  {service.desc}
                </p>
              </div>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-black uppercase tracking-widest rounded-lg border border-[var(--accent)]/30 hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] transition-all self-start group-hover:gap-3">
              Let's Connect
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

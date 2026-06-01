"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, Database, Globe, Zap, Cpu, ShieldCheck, Search, 
  FileCode, Terminal, Layout, MessageSquare, Layers, Server, 
  Code, Activity, Lock, Share2, Package
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

const skillGroups = (language: string) => [
  {
    title: "ORCHESTRATION & PIPELINES",
    icon: <Zap size={18} className="text-yellow-400" />,
    skills: [
      { name: "dbt Core", level: "82%", desc: language === 'en' ? "Analytical transformation & validation" : "Analytische Transformation & Validierung", icon: <Layers size={14} className="text-emerald-400" /> },
      { name: "Dagster", level: "75%", desc: language === 'en' ? "Asset-based data orchestrator" : "Asset-basierter Datenorchestrator", icon: <Activity size={14} className="text-purple-400" /> },
      { name: "Apache Airflow", level: "78%", desc: language === 'en' ? "DAG workflows scheduling" : "DAG-Workflow-Planung & -Ausführung", icon: <Terminal size={14} className="text-cyan-400" /> },
      { name: "Apache Kafka", level: "65%", desc: language === 'en' ? "Real-time event streams ingestion" : "Echtzeit-Event-Streams Ingestion", icon: <Cpu size={14} className="text-orange-400" /> },
    ]
  },
  {
    title: "DATABASE & STORAGE",
    icon: <Database size={18} className="text-blue-400" />,
    skills: [
      { name: "DuckDB", level: "82%", desc: language === 'en' ? "In-process OLAP & analytical logic" : "In-Process-OLAP & Analyse-Logik", icon: <Layers size={14} className="text-cyan-400" /> },
      { name: "PostgreSQL", level: "78%", desc: language === 'en' ? "Relational modeling & ACID compliance" : "Relationale Modellierung & ACID-Konformität", icon: <Database size={14} className="text-blue-500" /> },
      { name: "MongoDB", level: "62%", desc: language === 'en' ? "Document storage & flexible schemas" : "Dokumentspeicherung & flexible Schemas", icon: <FileCode size={14} className="text-green-500" /> },
      { name: "Redis", level: "58%", desc: language === 'en' ? "High-speed caching & rate limiting" : "Hochgeschwindigkeits-Caching & Ratenbegrenzung", icon: <Zap size={14} className="text-red-500" /> },
    ]
  },
  {
    title: "CLOUD & INFRA",
    icon: <Server size={18} className="text-purple-400" />,
    skills: [
      { name: "AWS", level: "60%", desc: language === 'en' ? "S3, Lambda, IAM & basic networking" : "S3, Lambda, IAM & Cloud-Grundlagen", icon: <Server size={14} className="text-orange-400" /> },
      { name: "Docker", level: "68%", desc: language === 'en' ? "Containerization & dev environments" : "Containerisierung & Umgebungen", icon: <Package size={14} className="text-blue-400" /> },
    ]
  }
];

const practices = (language: string) => [
  { title: language === 'en' ? "Data Pipeline Architecture" : "Datenpipeline-Architektur", icon: <Zap size={16} className="text-yellow-400" />, desc: language === 'en' ? "Modular ETL/ELT architecture" : "Modulare ETL/ELT-Architektur" },
  { title: language === 'en' ? "ETL/ELT Design & Implementation" : "ETL/ELT Design & Implementierung", icon: <Layers size={16} className="text-blue-400" />, desc: language === 'en' ? "End-to-end data processing" : "End-to-End Datenverarbeitung" },
  { title: language === 'en' ? "Bias Detection & Fairness Auditing" : "Bias-Erkennung & Fairness-Prüfung", icon: <ShieldCheck size={16} className="text-emerald-400" />, desc: language === 'en' ? "Fairlearn-based governance" : "Fairlearn-basierte Governance" },
  { title: language === 'en' ? "Data Governance & RBAC Design" : "Data Governance & RBAC Design", icon: <Lock size={16} className="text-red-400" />, desc: language === 'en' ? "Secure access control systems" : "Sichere Zugriffskontrollsysteme" },
  { title: language === 'en' ? "Append-Only Audit Log Systems" : "Append-Only Audit-Log-Systeme", icon: <Activity size={16} className="text-cyan-400" />, desc: language === 'en' ? "Immutable system tracking" : "Unveränderliches System-Tracking" },
  { title: language === 'en' ? "SHAP / Explainable AI (XAI)" : "SHAP / Explainable AI (XAI)", icon: <Search size={16} className="text-purple-400" />, desc: language === 'en' ? "Model-agnostic explainability" : "Modellunabhängige Erklärbarkeit" },
  { title: language === 'en' ? "REST API Design with FastAPI" : "REST API Design mit FastAPI", icon: <Server size={16} className="text-orange-400" />, desc: language === 'en' ? "High-performance interfaces" : "Hochleistungsschnittstellen" },
  { title: language === 'en' ? "CI/CD for Data Pipelines" : "CI/CD für Datenpipelines", icon: <Package size={16} className="text-pink-400" />, desc: language === 'en' ? "Automated deployment workflows" : "Automatisierte Bereitstellung" },
  { title: language === 'en' ? "Data Quality Testing with dbt" : "Datenqualitätstests mit dbt", icon: <CheckCircle2 size={16} className="text-[var(--accent)]" />, desc: language === 'en' ? "dbt testing & validation" : "dbt Tests & Validierung" },
];

import { translations } from "../context/translations";

export default function GeneralSkills() {
  const { language } = useLanguage();
  const t = translations[language].generalSkills;
  const [groups, setGroups] = useState(skillGroups(language));
  const [practiceList, setPracticeList] = useState(practices(language));

  useEffect(() => {
    setGroups(skillGroups(language));
    setPracticeList(practices(language));
  }, [language]);

  useEffect(() => {
    const handleUpdate = () => {
      const adminGroups = localStorage.getItem("admin-skills-groups");
      if (adminGroups) {
          const parsed = JSON.parse(adminGroups);
          parsed.forEach((group: any) => {
              if (group.title === "Data Core") group.icon = <Database size={18} className="text-blue-400" />;
              if (group.title === "Linguistic") group.icon = <Globe size={18} className="text-[var(--accent)]" />;
          });
          setGroups(parsed);
      }
      
      const adminPractices = localStorage.getItem("admin-skills-practices");
      if (adminPractices) {
          const parsed = JSON.parse(adminPractices);
          parsed.forEach((p: any) => {
              if (p.title === "Pipeline Design") p.icon = <Zap size={16} className="text-yellow-400" />;
              if (p.title === "Bias Auditing") p.icon = <ShieldCheck size={16} className="text-blue-400" />;
              if (p.title === "Audit Logging") p.icon = <Activity size={16} className="text-red-400" />;
              if (p.title === "XAI / SHAP") p.icon = <Search size={16} className="text-emerald-400" />;
              if (p.title === "API Gateway") p.icon = <Lock size={16} className="text-purple-400" />;
              if (p.title === "Data Quality") p.icon = <CheckCircle2 size={16} className="text-[var(--accent)]" />;
          });
          setPracticeList(parsed);
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">
            {t.label}
          </p>
          <h2 className="text-[32px] font-black text-white">
            {t.title}
          </h2>
        </div>
      </div>

      <div className="space-y-20">
        {groups.map((group) => (
          <div key={group.title} className="space-y-8">
            <div className="flex items-center gap-3 text-[11px] font-black text-white uppercase tracking-[0.25em] text-[var(--text-muted)]">
              {group.icon} {group.title}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {group.skills.map((skill: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 bg-white/[0.03] border border-white/5 rounded-[24px] hover:border-[var(--accent)]/30 hover:bg-white/[0.05] transition-all flex flex-col justify-between h-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-all border border-white/5 shadow-xl">
                      {skill.icon || <Code size={18} className="text-white/20" />}
                    </div>
                    <span className="px-2 py-1 bg-[var(--accent)]/10 text-[9px] font-black uppercase tracking-widest text-[var(--accent)] rounded-lg border border-[var(--accent)]/20 shadow-sm">
                      {skill.level}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[15px] font-black text-white group-hover:text-[var(--accent)] transition-all mb-2">{skill.name}</h4>
                    <p className="text-[12px] text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-secondary)] transition-all">{skill.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* PRACTICES Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-[11px] font-black text-white uppercase tracking-[0.25em] text-[var(--text-muted)]">
            <CheckCircle2 size={18} className="text-[var(--accent)]" /> {t.practices_title}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {practiceList.map((practice: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 bg-white/[0.03] border border-white/5 rounded-[24px] hover:border-[var(--accent)]/30 hover:bg-white/[0.05] transition-all flex flex-col justify-between h-full"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--accent)]/10 transition-all border border-white/5 shadow-xl">
                  {practice.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-white mb-2 group-hover:text-[var(--accent)] transition-all">{practice.title}</h4>
                  <p className="text-[12px] text-[var(--text-muted)] leading-relaxed group-hover:text-[var(--text-secondary)] transition-all">{practice.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Decorative Info Box - Now full width to anchor the section */}
          <div className="mt-12 p-8 bg-[var(--accent)]/[0.03] border border-dashed border-[var(--accent)]/20 rounded-[32px] text-center">
             <p className="text-[12px] text-[var(--accent)] font-bold uppercase tracking-[0.3em] leading-relaxed opacity-60 max-w-3xl mx-auto">
               {t.banner}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

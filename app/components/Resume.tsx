"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const experience = [
  {
    period: "2021 – Present",
    title: "Data Platform Architect",
    place: "AETHER — Open Source Research Lead",
    body: "Architecting and leading the development of a production-grade ethical data analysis platform. Directing the implementation of a 10-stage analytical pipeline, enterprise-tier RBAC system, and immutable audit logs. Spearheading research into bias detection and SHAP-based explainability in large-scale data systems. Stack: Next.js, FastAPI, DuckDB, PostgreSQL, dbt Core, Dagster, Kafka.",
    tag: "Research Lead"
  },
  {
    period: "2018 – 2021",
    title: "Data Engineer",
    place: "Enterprise Data Solutions (Contract)",
    body: "Designed scalable ETL/ELT architectures for high-volume datasets (100M+ records). Focused on pipeline reliability, data quality testing, and infrastructure automation using Airflow and dbt. Led cross-functional efforts in building a data gateway for financial analytics.",
    tag: "Contract"
  },
  {
    period: "2015 – 2018",
    title: "Data Pipeline Developer",
    place: "Analytical Systems Group",
    body: "Developed core data ingestion modules and preprocessing layers. Specialized in Python-based automation and PostgreSQL optimization. Contributed to the design of early-stage bias auditing frameworks for internal ML models.",
    tag: "Core Team"
  },
];

const education = [
  {
    period: "2022 – Present",
    title: "BSc — Data Science & Computing",
    place: "Current University Studies",
    body: "Studying data science, software engineering, and AI fundamentals. Applying academic theory directly to real-world projects — AETHER being the primary research focus. Maintaining strong academic performance alongside independent project development.",
    link: "Learn More",
  },
];

const defaultCourses = [
  { title: "dbt Fundamentals",              provider: "dbt Labs", link: "#" },
  { title: "Data Engineering Zoomcamp",    provider: "DataTalks.Club", link: "#" },
  { title: "Apache Airflow Fundamentals",  provider: "Astronomer", link: "#" },
];

function TimelineItem({ period, title, place, body, link, tag }: { period: string; title: string; place: string; body: string; link?: string; tag?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 border-l border-[var(--border)]"
    >
      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-block px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--border)] opacity-50">
          {period}
        </span>
        {tag && (
          <span className="inline-block px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[8px] font-black uppercase tracking-widest rounded-md border border-[var(--accent)]/20">
            [{tag}]
          </span>
        )}
      </div>
      <h4 className="text-[17px] font-black text-[var(--text-primary)] mb-1">{title}</h4>
      <p className="text-[var(--accent)] text-[11px] font-bold uppercase tracking-widest mb-3">{place}</p>
      <p className="text-[13px] text-[var(--text-secondary)] opacity-50 leading-[1.8]">{body}</p>
      {link && (
        <a href="#" className="inline-flex items-center gap-2 mt-3 text-[11px] font-black uppercase tracking-widest text-[var(--accent)] hover:underline">
          {link} <ExternalLink size={11} />
        </a>
      )}
    </motion.div>
  );
}

export default function Resume() {
  const { language } = useLanguage();
  const t = translations[language].experience;
  const [courses, setCourses] = useState(defaultCourses);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-certs");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          setCourses(parsed.filter((c: any) => c.status !== 'Draft'));
        }
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  return (
    <div className="w-full">
<<<<<<< HEAD
      <div className="section-pill"><ExternalLink size={14} /> Resume</div>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-12">Work Experience &amp; Education</h2>
=======
      <p className="section-label uppercase tracking-[3px] text-[11px] font-bold mb-2 text-[var(--accent)]">{t.label}</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-12">{t.title}</h2>
>>>>>>> be68d009683ef17e78a0ca9b4668278cb581c24b

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
        <div>
          <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-10">{t.exp_title}</h3>
          <div className="space-y-12">
            {experience.map((e, i) => <TimelineItem key={i} {...e} />)}
          </div>
        </div>
        <div>
          <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-10">{t.edu_title}</h3>
          <div className="space-y-12">
            {education.map((e, i) => <TimelineItem key={i} {...e} />)}
          </div>
        </div>
      </div>

      <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-8">{t.certs_title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {courses.map((c: any, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl hover:border-[var(--accent)]/30 transition-all group"
          >
            <h4 className="text-[15px] font-black text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-all">{c.title}</h4>
            <p className="text-[11px] text-[var(--text-secondary)] opacity-40 font-bold uppercase tracking-widest mb-5">{c.provider}</p>
            <a href={c.link || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all">
              Certificate <ExternalLink size={11} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


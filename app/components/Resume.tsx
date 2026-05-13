"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const experience = [
  {
    period: "2024 – Present",
    title: "Lead Platform Architect",
    place: "AETHER Project — Academic Research",
    body: "Architecting a full open-source ethical data platform. Designed a 10-stage analytical pipeline, two-tier RBAC system with 24 permissions, append-only audit infrastructure, and AES-256 encryption layer. Stack: Next.js, FastAPI, DuckDB, PostgreSQL, dbt Core, Dagster, SHAP, Fairlearn.",
  },
  {
    period: "2023 – 2024",
    title: "Data Engineering Student Researcher",
    place: "Self-Directed Research",
    body: "Built end-to-end data pipelines covering SQL, Python, dbt, Airflow, Kafka, and cloud storage as part of a structured 80/20 curriculum. Applied data governance principles and ethical AI frameworks throughout.",
  },
  {
    period: "2022 – 2023",
    title: "Data Analyst & Pipeline Developer",
    place: "Independent Projects",
    body: "Delivered ETL pipelines, bias auditing modules, and FastAPI data gateways across research projects focused on truthful data storytelling and interpretable analytics.",
  },
];

const education = [
  {
    period: "2022 – Present",
    title: "BSc / MSc — Data Science & AI",
    place: "Current Studies",
    body: "Focus on ethical AI, data engineering, and platform architecture. Active researcher in responsible data systems and bias-aware analytical frameworks.",
    link: "learn more",
  },
];

const defaultCourses = [
  { title: "dbt Fundamentals",              provider: "dbt Labs" },
  { title: "Data Engineering Zoomcamp",    provider: "DataTalks.Club" },
  { title: "Apache Airflow Fundamentals",  provider: "Astronomer" },
];

function TimelineItem({ period, title, place, body, link }: { period: string; title: string; place: string; body: string; link?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 border-l border-[var(--border)]"
    >
      <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
      <span className="inline-block px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-[var(--border)] opacity-50">
        {period}
      </span>
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
      <div className="section-pill"><ExternalLink size={14} /> Resume</div>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-12">Work Experience &amp; Education</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
        <div>
          <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-10">Work Experience</h3>
          <div className="space-y-12">
            {experience.map((e, i) => <TimelineItem key={i} {...e} />)}
          </div>
        </div>
        <div>
          <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-10">Education</h3>
          <div className="space-y-12">
            {education.map((e, i) => <TimelineItem key={i} {...e} />)}
          </div>
        </div>
      </div>

      <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-8">Specialised Courses</h3>
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

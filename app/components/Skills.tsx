"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2, Database, Cloud, Zap, BarChart3,
  GitBranch, Wrench, Server
} from "lucide-react";

/* ── Default skill categories ── */
const DEFAULT_CATEGORIES = [
  {
    icon: <Code2 size={16} />,
    label: "Programming",
    color: "text-sky-400",
    border: "border-sky-400/20 hover:border-sky-400/40",
    bg: "bg-sky-400/5",
    techs: ["Python", "SQL", "TypeScript", "Bash"],
  },
  {
    icon: <Zap size={16} />,
    label: "Data Engineering",
    color: "text-[var(--accent)]",
    border: "border-[var(--accent)]/20 hover:border-[var(--accent)]/40",
    bg: "bg-[var(--accent)]/5",
    techs: ["ETL / ELT", "dbt Core", "Apache Airflow", "Data Lineage"],
  },
  {
    icon: <Database size={16} />,
    label: "Databases",
    color: "text-violet-400",
    border: "border-violet-400/20 hover:border-violet-400/40",
    bg: "bg-violet-400/5",
    techs: ["PostgreSQL", "DuckDB", "Snowflake", "Redis"],
  },
  {
    icon: <Cloud size={16} />,
    label: "Cloud",
    color: "text-orange-400",
    border: "border-orange-400/20 hover:border-orange-400/40",
    bg: "bg-orange-400/5",
    techs: ["AWS S3 / Lambda", "GCP BigQuery", "Vercel", "Docker"],
  },
  {
    icon: <Server size={16} />,
    label: "Big Data",
    color: "text-rose-400",
    border: "border-rose-400/20 hover:border-rose-400/40",
    bg: "bg-rose-400/5",
    techs: ["Apache Spark", "Kafka", "Parquet", "Delta Lake"],
  },
  {
    icon: <GitBranch size={16} />,
    label: "Orchestration",
    color: "text-teal-400",
    border: "border-teal-400/20 hover:border-teal-400/40",
    bg: "bg-teal-400/5",
    techs: ["Dagster", "Apache Airflow", "Prefect", "cron"],
  },
  {
    icon: <BarChart3 size={16} />,
    label: "Analytics",
    color: "text-amber-400",
    border: "border-amber-400/20 hover:border-amber-400/40",
    bg: "bg-amber-400/5",
    techs: ["Pandas", "Matplotlib", "Fairlearn", "SHAP"],
  },
  {
    icon: <Wrench size={16} />,
    label: "Dev Tools",
    color: "text-pink-400",
    border: "border-pink-400/20 hover:border-pink-400/40",
    bg: "bg-pink-400/5",
    techs: ["Git", "VS Code", "FastAPI", "Jupyter"],
  },
];

/* Core proficiencies with animated bars */
const CORE_SKILLS = [
  { name: "Python",         pct: 90 },
  { name: "SQL",            pct: 92 },
  { name: "Apache Spark",   pct: 80 },
  { name: "Apache Airflow", pct: 78 },
  { name: "dbt Core",       pct: 82 },
  { name: "Snowflake",      pct: 80 },
];

export default function Skills() {
  const [coreSkills, setCoreSkills] = useState(CORE_SKILLS);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-skills-radar");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          setCoreSkills(parsed.map((s: any) => ({ name: s.name, pct: s.value })));
        }
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  return (
    <section id="skills" className="w-full space-y-14" aria-label="Technical Skills">
      {/* Section header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-3">
          Core Proficiencies
        </p>
        <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-1">
          Technical Skills
        </h2>
        <p className="text-[13px] text-[var(--text-secondary)] opacity-50 max-w-md">
          Technologies I actively use to design and deliver data systems end-to-end.
        </p>
      </div>

      {/* ── Category grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEFAULT_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -4 }}
            className={`group p-5 rounded-2xl border ${cat.border} ${cat.bg} bg-[var(--bg-secondary)] transition-all duration-300 cursor-default`}
          >
            {/* Category header */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className={cat.color}>{cat.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-[0.18em] ${cat.color}`}>
                {cat.label}
              </span>
            </div>
            {/* Tech list */}
            <ul className="space-y-1.5">
              {cat.techs.map((tech) => (
                <li
                  key={tech}
                  className="text-[12px] text-[var(--text-secondary)] opacity-60 group-hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <span className={`w-1 h-1 rounded-full ${cat.color.replace("text-", "bg-")} opacity-60`} />
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* ── Core skill bars ── */}
      <div className="pt-4">
        <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--text-muted)] mb-8 flex items-center gap-3">
          <span className="w-6 h-px bg-[var(--accent)]" />
          Proficiency Index
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8">
          {coreSkills.map((s) => (
            <div key={s.name} className="group space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--text-secondary)] opacity-50 group-hover:opacity-100 transition-opacity">
                  {s.name}
                </span>
                <span className="text-[10px] font-black text-[var(--accent)]">{s.pct}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "circOut" }}
                  className="h-full bg-[var(--accent)] rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

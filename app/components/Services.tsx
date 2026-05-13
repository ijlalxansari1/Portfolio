"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Layers, BarChart3, Wrench } from "lucide-react";

const services = [
  {
    badge: "End-to-End",
    icon: <Activity size={24} />,
    title: "Data Pipeline Engineering",
    body: "Design and build scalable ETL/ELT pipelines using Python, dbt, Dagster, and Airflow. From raw ingestion to clean, tested, documented data models ready for analytics.",
    link: "Get Started →"
  },
  {
    badge: "Governance",
    icon: <ShieldCheck size={24} />,
    title: "Ethical AI Auditing",
    body: "Bias detection, fairness evaluation, and SHAP-based explainability audits for ML models and analytical systems using Fairlearn and custom audit metrics.",
    link: "Get Started →"
  },
  {
    badge: "Full Stack",
    icon: <Layers size={24} />,
    title: "Platform Architecture",
    body: "Full-stack data platform design: Next.js frontends, FastAPI backends, PostgreSQL + DuckDB storage, JWT auth, RBAC systems, and AES-256 encryption.",
    link: "Get Started →"
  },
  {
    badge: "Analytics",
    icon: <BarChart3 size={24} />,
    title: "Data Storytelling & Reporting",
    body: "Transform raw data into honest, interpretable narratives. Dashboard design, data validation, and analytical workflows documented for non-technical stakeholders.",
    link: "Get Started →"
  },
];

export default function Services() {
  return (
    <div className="w-full">
      <div className="section-pill"><Wrench size={14} /> Services</div>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-10">What Services I Provide?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="service-card p-8 bg-[#141414] border border-[#222222] rounded-xl hover:border-[var(--accent)] hover:translate-y-[-4px] transition-all group flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[var(--accent)] border border-white/5 group-hover:scale-110 transition-all">
                  {s.icon}
               </div>
               <span className="inline-block px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full">
                 {s.badge}
               </span>
            </div>
            
            <h3 className="text-[18px] font-black text-[var(--text-primary)] mb-4 leading-tight">{s.title}</h3>
            <p className="text-[13px] text-[var(--text-secondary)] opacity-50 leading-[1.8] flex-1 mb-6">{s.body}</p>
            
            <a href="#contact" className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-[var(--accent)] hover:gap-4 transition-all">
              {s.link}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

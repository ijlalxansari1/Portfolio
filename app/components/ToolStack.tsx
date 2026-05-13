"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Terminal, Database, ShieldCheck, Zap, Globe, Package, Cpu } from "lucide-react";

const defaultTools = [
  { name: "dbt Core", progress: 95, level: "Production", desc: "SQL transformations & lineage", icon: null, badge: "dbt", color: "text-[#CFFF1C]" },
  { name: "Dagster", progress: 85, level: "Professional", desc: "Asset-based orchestration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Apache Airflow", progress: 88, level: "Advanced", desc: "Workflow automation (DAGs)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apacheairflow/apacheairflow-original.svg" },
  { name: "DuckDB", progress: 92, level: "Expert", desc: "Fast analytical SQL processing", icon: null, badge: "🦆" },
  { name: "FastAPI", progress: 87, level: "Professional", desc: "High-performance Python APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Next.js", progress: 88, level: "Advanced", desc: "Full-stack React intelligence", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Docker", progress: 75, level: "Intermediate", desc: "Containerized environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "GitHub Actions", progress: 85, level: "Advanced", desc: "CI/CD & automation pipelines", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

export default function ToolStack() {
  const [tools, setTools] = useState(defaultTools);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-skills");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.tools && parsed.tools.length > 0) {
          const mapped = parsed.tools.map((t: any) => ({
            ...t,
            level: t.progress > 90 ? "Expert" : t.progress > 80 ? "Professional" : "Advanced",
            desc: t.desc || "Custom tool entry from admin"
          }));
          setTools(mapped);
        }
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  function asciiBar(percent: number) {
    const filled = Math.round(percent / 5);
    const empty = 20 - filled;
    return '█'.repeat(filled) + '░'.repeat(empty);
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="section-pill"><Wrench size={14} /> Tool Skills</div>
          <h2 className="section-heading text-[32px] md:text-[42px] font-black text-white leading-tight">Tool Stack</h2>
        </div>
        <p className="text-[14px] text-[var(--text-secondary)] opacity-50 max-w-sm leading-relaxed">
          A carefully curated selection of tools for building production-grade data infrastructure and governing intelligent pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tools.map((tool, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="card group relative p-8 bg-[#181818]/40 border border-white/5 rounded-[32px] hover:border-[var(--accent)]/30 hover:bg-[#181818]/60 transition-all duration-500 flex flex-col h-full"
          >
            {/* Glassmorphism Icon */}
            <div className="w-16 h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 group-hover:border-[var(--accent)]/20 transition-all duration-500 shadow-2xl">
              {tool.icon ? (
                <img src={tool.icon} alt={tool.name} width={32} height={32}
                  className="shrink-0 opacity-80 group-hover:opacity-100 transition-all filter grayscale group-hover:grayscale-0"
                />
              ) : (
                <span className={`shrink-0 text-[20px] font-black ${tool.color || 'text-[var(--accent)]'}`}>
                  {tool.badge || tool.name[0]}
                </span>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h4 className="text-[18px] font-black text-white group-hover:text-[var(--accent)] transition-all leading-none">{tool.name}</h4>
                <span className="inline-block px-2 py-0.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[8px] font-black uppercase tracking-widest text-[var(--accent)] rounded-md">
                  {tool.level}
                </span>
              </div>
              <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed font-medium opacity-60 group-hover:opacity-100 transition-all">{tool.desc}</p>
            </div>

            {/* Bottom Progress/Status Line */}
            <div className="mt-8 pt-6 border-t border-white/5">
              {/* Normal Bar */}
              <div className="progress-bar w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "100%" }}
                   transition={{ delay: i * 0.1 + 0.5, duration: 1.5 }}
                   className="h-full bg-gradient-to-r from-[var(--accent)]/0 to-[var(--accent)] opacity-30"
                 />
              </div>
              {/* ASCII Bar for CMD Mode */}
              <div className="progress-ascii font-mono text-[10px] whitespace-pre">
                {asciiBar(tool.progress || 80)} {tool.progress || 80}%
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--accent-rgb),0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none rounded-[32px]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, Database, Globe, Zap, Cpu, ShieldCheck, Search, 
  FileCode, Terminal, Layout, MessageSquare, Layers, Server, 
  Code, Activity, Lock, Share2
} from "lucide-react";

const skillGroups = [
  {
    title: "Data Core",
    icon: <Database size={18} className="text-blue-400" />,
    skills: [
      { name: "DuckDB", level: "Expert", desc: "In-process OLAP & analytical logic", icon: <Layers size={14} className="text-cyan-400" /> },
      { name: "PostgreSQL", level: "Advanced", desc: "Relational modeling & ACID compliance", icon: <Database size={14} className="text-blue-500" /> },
      { name: "MongoDB", level: "Intermediate", desc: "Document storage & flexible schemas", icon: <FileCode size={14} className="text-green-500" /> },
      { name: "Redis", level: "Intermediate", desc: "High-speed caching & rate limiting", icon: <Zap size={14} className="text-red-500" /> },
    ]
  },
  {
    title: "Linguistic",
    icon: <Globe size={18} className="text-[var(--accent)]" />,
    skills: [
      { name: "English", level: "Professional", desc: "Technical documentation & collaboration", icon: <MessageSquare size={14} className="text-emerald-400" /> },
      { name: "Urdu", level: "Native", desc: "Primary language proficiency", icon: <Globe size={14} className="text-[var(--accent)]" /> },
      { name: "Arabic", level: "Conversational", desc: "Basic professional interaction", icon: <Layout size={14} className="text-amber-400" /> },
    ]
  }
];

const practices = [
  { title: "Pipeline Design", icon: <Zap size={16} className="text-yellow-400" />, desc: "Modular ETL/ELT architecture" },
  { title: "Bias Auditing", icon: <ShieldCheck size={16} className="text-blue-400" />, desc: "Fairlearn-based governance" },
  { title: "Audit Logging", icon: <Activity size={16} className="text-red-400" />, desc: "Immutable append-only systems" },
  { title: "XAI / SHAP", icon: <Search size={16} className="text-emerald-400" />, desc: "Model-agnostic explainability" },
  { title: "API Gateway", icon: <Lock size={16} className="text-purple-400" />, desc: "FastAPI + RBAC security" },
  { title: "Data Quality", icon: <CheckCircle2 size={16} className="text-[var(--accent)]" />, desc: "dbt testing & validation" },
];

export default function GeneralSkills() {
  const [groups, setGroups] = useState(skillGroups);
  const [practiceList, setPracticeList] = useState(practices);

  useEffect(() => {
    const handleUpdate = () => {
      const adminGroups = localStorage.getItem("admin-skills-groups");
      if (adminGroups) {
          const parsed = JSON.parse(adminGroups);
          // Restore icons for parsed data since icons don't survive stringify
          parsed.forEach(group => {
              if (group.title === "Data Core") group.icon = <Database size={18} className="text-blue-400" />;
              if (group.title === "Linguistic") group.icon = <Globe size={18} className="text-[var(--accent)]" />;
          });
          setGroups(parsed);
      }
      
      const adminPractices = localStorage.getItem("admin-skills-practices");
      if (adminPractices) {
          const parsed = JSON.parse(adminPractices);
          parsed.forEach(p => {
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
          <p className="text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">Capabilities</p>
          <h2 className="text-[32px] font-black text-white">General Expertise</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Proficiency Deck */}
        <div className="space-y-12">
          {groups.map((group: any, idx: number) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 text-[11px] font-black text-white uppercase tracking-[0.25em] text-[var(--text-muted)]">
                {group.icon} {group.title}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {group.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-[var(--accent)]/30 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-all">
                            {skill.icon || <Code size={14} className="text-white/20" />}
                         </div>
                         <h4 className="text-[15px] font-black text-white group-hover:text-[var(--accent)] transition-all">{skill.name}</h4>
                      </div>
                      <span className="px-2 py-0.5 bg-white/5 text-[9px] font-black uppercase tracking-widest text-[var(--accent)] rounded-md border border-[var(--accent)]/20">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[12px] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-all ml-11">{skill.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Practices Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-[11px] font-black text-white uppercase tracking-[0.25em] text-[var(--text-muted)] mb-6">
            <CheckCircle2 size={18} className="text-[var(--accent)]" /> Professional Practices
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {practiceList.map((practice: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-[24px] hover:border-[var(--accent)]/20 transition-all group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[var(--accent)]/10 transition-all border border-white/5">
                  {practice.icon}
                </div>
                <h4 className="text-[14px] font-black text-white mb-1 group-hover:text-[var(--accent)] transition-all">{practice.title}</h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{practice.desc}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Decorative Info Box */}
          <div className="mt-8 p-6 bg-[var(--accent)]/[0.03] border border-dashed border-[var(--accent)]/20 rounded-[24px]">
             <p className="text-[11px] text-[var(--accent)] font-bold uppercase tracking-widest leading-relaxed opacity-60">
               Focused on building systems that are not just technically efficient, but ethically governed and fully documented.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

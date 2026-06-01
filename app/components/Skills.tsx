"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "Python", percentage: 90 },
  { name: "SQL", percentage: 92 },
  { name: "Apache Spark", percentage: 80 },
  { name: "Apache Airflow", percentage: 78 },
  { name: "dbt", percentage: 82 },
  { name: "Snowflake", percentage: 80 },
];

const knowledge = [
  "Distributed Systems", "Cloud Data Warehousing", "Machine Learning Ops",
  "Real-time Data Streaming", "ETL/ELT Architecture", "Data Governance",
  "API Design & Integration", "Infrastructure as Code"
];

export default function Skills() {
  const [coreSkills, setCoreSkills] = useState(skills);
  const [knowledgeList, setKnowledgeList] = useState(knowledge);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-skills-radar");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          setCoreSkills(parsed.map((s: any) => ({
            name: s.name,
            percentage: s.value
          })));
        }
      }
      
      const knowledgeData = localStorage.getItem("admin-knowledge");
      if (knowledgeData) {
        setKnowledgeList(JSON.parse(knowledgeData));
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  return (
    <section id="resume" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Core Proficiencies</p>
        <h2 className="text-4xl font-black text-white">
          Technical <span className="text-neon-mint">Stack</span>
        </h2>
        <div className="w-16 h-1 mt-4 bg-neon-mint rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Progress Bars - RyanCV Design/Programming Style */}
        <div className="space-y-12">
          <h3 className="text-[18px] font-black text-white tracking-tight flex items-center gap-4 mb-12">
            <div className="w-8 h-[2px] bg-neon-mint" />
            Engineering Skills
          </h3>
          <div className="space-y-10">
            {coreSkills.map((s) => (
              <div key={s.name} className="space-y-4 group">
                <div className="flex justify-between items-end">
                  <span className="text-[12px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">{s.name}</span>
                  <span className="text-[10px] font-black text-neon-mint">{s.percentage}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-neon-mint"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge List - RyanCV Checkmark Style */}
        <div className="space-y-12">
          <h3 className="text-[18px] font-black text-white tracking-tight flex items-center gap-4 mb-12">
            <div className="w-8 h-[2px] bg-neon-mint" />
            Knowledge Base
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
            {knowledgeList.map((k) => (
              <div key={k} className="flex items-start gap-4 group">
                <div className="mt-1 w-5 h-5 rounded-full border border-neon-mint/20 flex items-center justify-center group-hover:bg-neon-mint group-hover:border-neon-mint transition-all duration-300">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="text-neon-mint group-hover:text-black transition-colors"><path d="M1 4L4 7L9 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-[14px] font-medium text-white/30 group-hover:text-white transition-colors">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

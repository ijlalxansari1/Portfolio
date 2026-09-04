"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Cpu, Database, ShieldCheck } from "lucide-react";

const valuePillars = [
  {
    icon: <GraduationCap size={22} />,
    title: "Software Engineering Core",
    desc: "A formal software engineering degree focusing on design patterns, algorithms, and clean system architecture. I write maintainable pipelines, not just temporary scripts."
  },
  {
    icon: <Cpu size={22} />,
    title: "Reliable Pipeline Design",
    desc: "Strong focus on idempotence, fault tolerance, and comprehensive testing (dbt test) to ensure raw ingestions transform into trustable datasets without manual intervention."
  },
  {
    icon: <Database size={22} />,
    title: "SQL & Query Optimization",
    desc: "Expertise in designing logical schemas, optimization indexes, and fine-tuning SQL executions to drastically reduce cloud warehouse compute bills."
  }
];

export default function WhyHireMe() {
  const scrollToContact = () => {
    // Dispatch custom event so page.tsx scroll system stays in sync
    window.dispatchEvent(new CustomEvent("navigateTo", { detail: { id: "contact" } }));
    // Fallback: direct scroll if event not handled
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center gap-6 lg:gap-7 py-2">
      {/* Top Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-block px-3.5 py-1.5 rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-[10px] uppercase tracking-widest bg-white/[0.01]">
          Value Proposition
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black text-[var(--text-primary)] leading-tight tracking-tight">
          I design reliable data systems so you can make <span className="text-[var(--accent)]">confident decisions.</span>
        </h3>
        <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed font-medium max-w-2xl mx-auto">
          Most data engineering portfolios show snippets of code. I focus on the entire operational lifecycle — ensuring your data ingestion, cleaning, schema design, and pipelines are built to grow, scale, and save compute costs.
        </p>
      </div>

      {/* 3-Column Value Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {valuePillars.map((pillar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative flex flex-col justify-between p-5 lg:p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[var(--accent)]/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md"
          >
            <div>
              {/* Icon Container */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform mb-3.5">
                {pillar.icon}
              </div>
              
              {/* Text Content */}
              <div className="space-y-2">
                <h4 className="text-base sm:text-[17px] font-black text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] leading-relaxed font-medium opacity-85">
                  {pillar.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25 }}
        className="text-center pt-1"
      >
        <button 
          onClick={scrollToContact}
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-black rounded-full font-bold uppercase tracking-widest text-[11px] transition-all shadow-md hover:scale-105 active:scale-95"
        >
          Hire Me <ArrowRight size={13} />
        </button>
      </motion.div>
    </div>
  );
}

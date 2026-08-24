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
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="whyhireme" className="py-20 relative">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Top Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-2 rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest bg-white/[0.01]">
            Value Proposition
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-tight tracking-tight">
            I design reliable data systems so you can make <span className="text-[var(--accent)]">confident decisions.</span>
          </h3>
          <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-medium">
            Most data engineering portfolios show snippets of code. I focus on the entire operational lifecycle — ensuring your data ingestion, cleaning, schema design, and pipelines are built to grow, scale, and save compute costs.
          </p>
        </div>

        {/* 3-Column Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valuePillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative flex flex-col gap-5 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[var(--accent)]/30 hover:bg-white/[0.04] transition-all duration-300 shadow-lg"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              
              {/* Text Content */}
              <div className="space-y-2">
                <h4 className="text-lg font-black text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center pt-4"
        >
          <button 
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-black rounded-full font-bold uppercase tracking-widest text-xs transition-colors shadow-lg active:scale-95"
          >
            Hire Me <ArrowRight size={14} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

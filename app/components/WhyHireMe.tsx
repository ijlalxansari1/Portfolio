"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const highlights = [
  { icon: "🎓", text: "Software Engineering Graduate" },
  { icon: "⚙️", text: "ETL & Data Pipeline Development" },
  { icon: "📊", text: "Business Intelligence & Analytics" },
  { icon: "🐍", text: "Python + SQL Focused" }
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
      <div className="max-w-4xl mx-auto text-center space-y-16">
        
        {/* Value Driven Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-[var(--border-subtle)] text-[var(--text-secondary)] font-bold text-xs uppercase tracking-widest">
            Value Proposition
          </div>
          
          <h3 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-tight">
            I build reliable data systems so you can make <span className="text-[var(--accent)]">confident decisions.</span>
          </h3>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed font-medium max-w-3xl mx-auto">
            Beyond individual projects, I focus on understanding the complete data lifecycle — from raw ingestion and cleaning to modeling, analysis, and visualization. I don't just write scripts; I build robust pipelines that are technically sound and directly useful for the business.
          </p>
        </motion.div>

        {/* Highlights Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-2xl">{h.icon}</span>
              <span className="text-sm md:text-base font-bold text-[var(--text-primary)] tracking-wide">{h.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Simple CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-4"
        >
          <button 
            onClick={scrollToContact}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-black rounded-full font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Hire Me <ArrowRight size={16} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}

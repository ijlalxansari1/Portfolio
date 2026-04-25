"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    period: "July 2025 – August 2025",
    title: "Data Engineering Intern",
    company: "LivingPath",
    description: "Designed and implemented automated data pipelines for real-time analytics. Optimized cloud infrastructure on AWS, reducing costs by 30% while improving data processing speed. Worked with Apache Airflow, Python, and PostgreSQL to build scalable ETL solutions.",
    technologies: ["Python", "AWS", "PostgreSQL", "Airflow"],
  },
  {
    period: "2024 – 2025",
    title: "Research Lead",
    company: "Ethical Attention Modeling",
    description: "Led interdisciplinary research on ethical AI systems and attention-aware analytics frameworks. Published research on fairness metrics in machine learning models. Developed open-source tools for bias detection and model interpretability.",
    technologies: ["Python", "PyTorch", "Research", "Open Source"],
  },
];

const education = [
  {
    period: "2021 – 2025",
    title: "BS Software Engineering",
    institution: "Karakorum International University",
    description: "Specialized in data engineering, machine learning, and ethical AI systems. Coursework: Database Systems, Machine Learning, Cloud Computing, Software Engineering.",
    achievements: ["Dean's List", "Research Publications", "Open Source Contributions"],
  },
  {
    period: "2024 – 2025",
    title: "Thesis: Ethical Churn Prediction using SLAM Dataset",
    institution: "Research Project",
    description: "Developed ethical ML models for customer churn prediction with transparency and fairness metrics. Achieved 85% accuracy while maintaining demographic parity.",
    achievements: ["Published Research", "Open Source Tool", "Conference Presentation"],
  },
];

function TimelineItem({ period, title, subtitle, description, tags, index }: {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-10 pb-12 last:pb-0"
    >
      {/* Timeline line connecting items */}
      <div className="absolute left-[5px] top-4 bottom-0 w-[1px] bg-[var(--border-color)] last:hidden" />
      
      {/* Timeline node */}
      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-[var(--bg-card)] border-2 border-neon-mint z-10" />

      {/* Period badge */}
      <div className="inline-flex px-3 py-1 rounded-full bg-neon-mint/10 border border-neon-mint/20 text-[10px] text-neon-mint font-black uppercase tracking-widest mb-4">
        {period}
      </div>

      <h4 className="text-[var(--text-primary)] font-bold text-lg mb-1">{title}</h4>
      <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest mb-4">{subtitle}</p>
      
      <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed mb-6">
        {description}
      </p>

      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-[var(--border-color)] text-[var(--text-primary)] transition-colors hover:bg-neon-mint hover:text-black">
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="resume" className="w-full">
      <div className="mb-12">
        <p className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">My Journey</p>
        <h2 className="text-4xl font-bold text-[var(--text-primary)]">Resume <span>& Experience</span></h2>
        <div className="w-16 h-1 mt-4 bg-neon-mint rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Work Experience */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-neon-mint/10 flex items-center justify-center">
              <Briefcase size={22} className="text-neon-mint" />
            </div>
            <h3 className="text-[var(--text-primary)] font-bold text-xl">Experience</h3>
          </div>

          <div className="relative">
            {experience.map((exp, i) => (
              <TimelineItem
                key={i}
                index={i}
                period={exp.period}
                title={exp.title}
                subtitle={exp.company}
                description={exp.description}
                tags={exp.technologies}
              />
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-neon-mint/10 flex items-center justify-center">
              <GraduationCap size={22} className="text-neon-mint" />
            </div>
            <h3 className="text-[var(--text-primary)] font-bold text-xl">Education</h3>
          </div>

          <div className="relative">
            {education.map((edu, i) => (
              <TimelineItem
                key={i}
                index={i}
                period={edu.period}
                title={edu.title}
                subtitle={edu.institution}
                description={edu.description}
                tags={edu.achievements}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

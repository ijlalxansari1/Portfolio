"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    period: "2025 - Present",
    title: "Data Engineering Intern",
    company: "LivingPath",
    description: "Designing and implementing automated data pipelines for real-time analytics. Optimizing cloud infrastructure on AWS, reducing costs by 30% while improving data processing speed. Working with Apache Airflow, Python, and PostgreSQL to build scalable ETL solutions.",
    technologies: ["Python", "AWS", "PostgreSQL", "Airflow"],
  },
  {
    period: "2024 – 2025",
    title: "Research Lead",
    company: "Ethical Attention Modeling",
    description: "Leading interdisciplinary research on ethical AI systems and attention-aware analytics frameworks. Published research on fairness metrics in machine learning models. Developed open-source tools for bias detection and model interpretability.",
    technologies: ["Python", "PyTorch", "Research", "Open Source"],
  },
];

const education = [
  {
    period: "2021 – 2025",
    title: "BS Software Engineering",
    institution: "University",
    description: "Specialized in data engineering, machine learning, and ethical AI systems. Relevant coursework includes Database Systems, Machine Learning, Cloud Computing, and Software Engineering. Maintained strong academic performance while working on research projects.",
    achievements: ["Dean's List", "Research Publications", "Open Source Contributions"],
  },
  {
    period: "2024 – 2025",
    title: "Thesis: Ethical Churn Prediction using SLAM Dataset",
    institution: "Research Project",
    description: "Developed ethical machine learning models for customer churn prediction with transparency and fairness metrics. Implemented bias detection algorithms and fairness constraints. Achieved 85% accuracy while maintaining demographic parity across different customer segments.",
    achievements: ["Published Research", "Open Source Tool", "Conference Presentation"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          >
            Resume
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="text-neon-mint" size={28} />
                <h3 className="text-xl font-semibold text-white">Experience</h3>
              </div>
              <div className="space-y-6 relative pl-6 border-l-2 border-neon-mint/30">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-9 top-0 w-3 h-3 bg-neon-mint rounded-full border-2 border-gray-900" />
                    <div className="glass rounded-lg p-4 border border-white/10">
                      <span className="text-neon-mint text-xs font-medium">
                        {exp.period}
                      </span>
                      <h4 className="text-lg font-semibold text-white mt-1 mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-neon-cyan mb-2 text-sm font-medium">{exp.company}</p>
                      <p className="text-secondary text-xs leading-relaxed mb-2">
                        {exp.description}
                      </p>
                      {exp.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 glass border border-white/10 rounded-full text-xs text-tertiary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-neon-mint" size={28} />
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-6 relative pl-6 border-l-2 border-neon-mint/30">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-9 top-0 w-3 h-3 bg-neon-mint rounded-full border-2 border-gray-900" />
                    <div className="glass rounded-lg p-4 border border-white/10">
                      <span className="text-neon-mint text-xs font-medium">
                        {edu.period}
                      </span>
                      <h4 className="text-lg font-semibold text-white mt-1 mb-1">
                        {edu.title}
                      </h4>
                      <p className="text-neon-cyan mb-2 text-sm font-medium">{edu.institution}</p>
                      <p className="text-secondary text-xs leading-relaxed mb-2">
                        {edu.description}
                      </p>
                      {edu.achievements && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {edu.achievements.map((achievement, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-neon-mint/10 border border-neon-mint/30 rounded-full text-xs text-neon-mint"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

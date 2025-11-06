"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experience = [
  {
    type: "experience",
    period: "2025",
    title: "Data Engineering Intern",
    company: "LivingPath",
    description:
      "Working on data pipeline automation and cloud infrastructure optimization.",
  },
  {
    type: "experience",
    period: "2024–2025",
    title: "Research Lead",
    company: "Ethical Attention Modeling",
    description:
      "Leading research on ethical AI systems and attention-aware analytics frameworks.",
  },
];

const education = [
  {
    type: "education",
    period: "2025",
    title: "BS Computer Science",
    institution: "University",
    description:
      "Focused on data engineering, machine learning, and ethical AI systems.",
  },
  {
    type: "education",
    period: "2024–2025",
    title: "Thesis: Ethical Churn Prediction using SLAM Dataset",
    institution: "Research Project",
    description:
      "Developed ethical machine learning models for customer churn prediction with transparency and fairness metrics.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Work Experience & Education
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-neon-mint" size={32} />
              <h3 className="text-2xl font-semibold text-white">Experience</h3>
            </div>
            <div className="space-y-6 relative pl-8 border-l-2 border-neon-mint/30">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-12 top-0 w-4 h-4 bg-neon-mint rounded-full border-4 border-gray-900" />
                  <div className="glass rounded-lg p-6 border border-white/10">
                    <span className="text-neon-mint text-sm font-medium">
                      {exp.period}
                    </span>
                    <h4 className="text-xl font-semibold text-white mt-2 mb-1">
                      {exp.title}
                    </h4>
                    <p className="text-neon-cyan mb-2">{exp.company}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
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
          >
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="text-neon-mint" size={32} />
              <h3 className="text-2xl font-semibold text-white">Education</h3>
            </div>
            <div className="space-y-6 relative pl-8 border-l-2 border-neon-mint/30">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-12 top-0 w-4 h-4 bg-neon-mint rounded-full border-4 border-gray-900" />
                  <div className="glass rounded-lg p-6 border border-white/10">
                    <span className="text-neon-mint text-sm font-medium">
                      {edu.period}
                    </span>
                    <h4 className="text-xl font-semibold text-white mt-2 mb-1">
                      {edu.title}
                    </h4>
                    <p className="text-neon-cyan mb-2">{edu.institution}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

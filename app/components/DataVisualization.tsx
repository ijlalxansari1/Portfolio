"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

interface SkillData {
  name: string;
  proficiency: number;
  category: string;
}

const skillsData: SkillData[] = [
  { name: "Python", proficiency: 90, category: "Programming" },
  { name: "PostgreSQL", proficiency: 85, category: "Database" },
  { name: "AWS", proficiency: 80, category: "Cloud" },
  { name: "Azure", proficiency: 75, category: "Cloud" },
  { name: "Tableau", proficiency: 85, category: "BI" },
  { name: "Power BI", proficiency: 80, category: "BI" },
  { name: "Apache Spark", proficiency: 75, category: "Big Data" },
  { name: "Airflow", proficiency: 80, category: "Orchestration" },
  { name: "dbt", proficiency: 70, category: "ETL" },
  { name: "Snowflake", proficiency: 75, category: "Data Warehouse" },
];

export default function DataVisualization() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <section id="visualization" className="min-h-screen flex items-center justify-center py-4 px-8 md:px-16 relative z-20">
      <div className="w-full max-w-6xl">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="text-neon-mint" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Skills Proficiency</h2>
          </div>

          <div className="space-y-6">
            {skillsData.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-800 rounded">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-neon-mint font-bold">{skill.proficiency}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-neon-mint to-neon-cyan rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-4 glass rounded-lg border border-neon-mint/20 flex items-center gap-3"
          >
            <TrendingUp className="text-neon-mint" size={24} />
            <div>
              <p className="text-white font-semibold">Continuous Learning</p>
              <p className="text-gray-400 text-sm">Skills are constantly evolving with new technologies</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


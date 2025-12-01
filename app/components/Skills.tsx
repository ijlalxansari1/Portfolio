"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const generalSkills = [
  { name: "ETL Pipelines", category: "Data Engineering", icon: "⚙️" },
  { name: "Data Modeling", category: "Data Engineering", icon: "📊" },
  { name: "Cloud Architecture", category: "Infrastructure", icon: "☁️" },
  { name: "Machine Learning Fundamentals", category: "AI/ML", icon: "🤖" },
  { name: "Data Visualization", category: "BI & Analytics", icon: "📈" },
  { name: "Data Governance", category: "Data Management", icon: "🛡️" },
  { name: "Responsible AI", category: "AI Ethics", icon: "⚖️" },
  { name: "Attention Engineering", category: "AI/ML", icon: "🎯" },
  { name: "API Integration", category: "Development", icon: "🔌" },
  { name: "Version Control", category: "Development", icon: "📝" },
  // BI & Analytics Tools
  { name: "Tableau Dashboard Design", category: "BI & Analytics", icon: "📊" },
  { name: "Power BI Development", category: "BI & Analytics", icon: "💼" },
  { name: "SQL Query Optimization", category: "Database", icon: "🗄️" },
  { name: "Data Warehousing", category: "Data Engineering", icon: "🏗️" },
  { name: "Real-time Analytics", category: "BI & Analytics", icon: "⚡" },
  { name: "Predictive Analytics", category: "BI & Analytics", icon: "🔮" },
  { name: "Business Intelligence", category: "BI & Analytics", icon: "💡" },
  { name: "Data Storytelling", category: "BI & Analytics", icon: "📖" },
];

export default function Skills() {
  const categories = Array.from(new Set(generalSkills.map(s => s.category)));
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = activeCategory === "All" 
    ? generalSkills 
    : generalSkills.filter(s => s.category === activeCategory);

  return (
      <section id="skills" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
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
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
          >
            General Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-center mb-8 max-w-2xl mx-auto"
          >
            Core competencies spanning data engineering, BI & analytics, AI ethics, and cloud technologies
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {["All", ...categories].map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === category
                    ? "bg-neon-mint text-black border-2 border-neon-mint"
                    : "glass text-gray-300 border border-white/10 hover:border-neon-mint/50 hover:text-neon-mint"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.05 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "#00FFB3", 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 255, 179, 0.2)"
                }}
                className="flex items-center gap-3 glass rounded-lg p-4 border border-white/10 hover:border-neon-mint/50 transition-all cursor-default group"
              >
                <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </span>
                <div className="flex-1">
                  <span className="text-white text-sm font-semibold block">{skill.name}</span>
                  <span className="text-tertiary text-xs">{skill.category}</span>
                </div>
                <span className="text-neon-mint text-lg font-bold flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">✓</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

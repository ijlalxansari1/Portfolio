"use client";

import { motion } from "framer-motion";
import { Languages, List } from "lucide-react";

const database = [
  { name: "Databricks", percentage: 90 },
  { name: "Oracle 12c", percentage: 75 },
  { name: "AWS Redshift", percentage: 85 },
  { name: "PostgreSQL", percentage: 95 },
];

const languages = [
  { name: "English", proficiency: 90, flag: "🇬🇧" },
  { name: "Spanish", proficiency: 60, flag: "🇪🇸" },
  { name: "Italian", proficiency: 30, flag: "🇮🇹" },
  { name: "French", proficiency: 70, flag: "🇫🇷" },
];

const engineeringPractices = [
  "DWH & DB Concepts",
  "Data Analytics Engineering",
  "Data Preparation",
  "Oracle SQL",
  "Data Integration",
  "Data Provisioning",
  "Data Solution Architecture",
  "ETL/ELT Solutions",
];

function DotProgress({ percentage }: { percentage: number }) {
  const totalDots = 10;
  const filledDots = Math.round((percentage / 100) * totalDots);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index < filledDots ? "bg-neon-mint" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          General Skills
        </motion.h2>

        {/* Database Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Database</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {database.map((db, index) => (
              <motion.div
                key={db.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg p-4 border border-white/10"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{db.name}</span>
                  <span className="text-neon-mint text-sm font-semibold">{db.percentage}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${db.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    className="h-full bg-gradient-to-r from-neon-mint to-neon-cyan rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout: Languages and Engineering Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Languages Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Languages Header Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/10 hover:border-neon-mint/50 transition-all mb-6"
            >
              <Languages size={18} className="text-neon-mint" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                Languages
              </span>
            </motion.button>

            {/* Languages List */}
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  {/* Flag Icon */}
                  <div className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {lang.flag}
                  </div>

                  {/* Language Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{lang.name}</span>
                      <span className="text-neon-mint text-sm font-semibold">{lang.proficiency}%</span>
                    </div>
                    <DotProgress percentage={lang.proficiency} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Engineering Practices Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Engineering Practices Header Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/10 hover:border-neon-mint/50 transition-all mb-6"
            >
              <List size={18} className="text-neon-mint" />
              <span className="text-sm font-semibold text-white uppercase tracking-wider">
                Engineering Practices
              </span>
            </motion.button>

            {/* Engineering Practices List */}
            <div className="space-y-2">
              {engineeringPractices.map((practice, index) => (
                <motion.div
                  key={practice}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 glass rounded-lg p-3 border border-white/10 hover:border-neon-mint/30 transition-all"
                >
                  <span className="text-neon-mint text-lg">✓</span>
                  <span className="text-gray-300 text-sm">{practice}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

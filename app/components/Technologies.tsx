"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface SkillRingProps {
  name: string;
  percentage: number;
  index: number;
  icon?: string;
}

function SkillRing({ name, percentage, index, icon }: SkillRingProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [imgError, setImgError] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setAnimatedPercentage(Math.floor(progress * percentage));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    }
  }, [isInView, percentage]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col items-center glass rounded-xl p-6 border border-white/10 hover:border-neon-mint/50 transition-all"
    >
      <div className="relative w-32 h-32 mb-4">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FFB3" />
              <stop offset="100%" stopColor="#4BE1EC" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={`url(#gradient-${index})`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {icon && !imgError ? (
            <div className="w-12 h-12 relative">
              <Image
                src={icon}
                alt={name}
                fill
                className="object-contain"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <span className="text-2xl font-bold text-neon-mint">{animatedPercentage}%</span>
          )}
        </div>
      </div>
      <h3 className="text-white font-semibold text-center">{name}</h3>
    </motion.div>
  );
}

const technologies = [
  { name: "Python", percentage: 95, icon: "/icons/python.svg", category: "Programming" },
  { name: "PostgreSQL", percentage: 90, icon: "/icons/postgresql.svg", category: "Database" },
  { name: "AWS", percentage: 85, icon: "/icons/aws.svg", category: "Cloud" },
  { name: "Azure", percentage: 80, icon: "/icons/azure.svg", category: "Cloud" },
  { name: "GitHub", percentage: 90, icon: "/icons/github.svg", category: "DevOps" },
  { name: "Ansible", percentage: 75, icon: "/icons/ansible.svg", category: "DevOps" },
  { name: "DBeaver", percentage: 85, icon: "/icons/dbeaver.svg", category: "Database" },
  { name: "VS Code", percentage: 90, icon: "/icons/visual-studio.svg", category: "IDE" },
  { name: "Jira", percentage: 80, icon: "/icons/jira.svg", category: "Collaboration" },
  { name: "Confluence", percentage: 75, icon: "/icons/confluence.svg", category: "Collaboration" },
  // BI & Analytics Tools
  { name: "Tableau", percentage: 88, icon: "/icons/tableau.svg", category: "BI" },
  { name: "Power BI", percentage: 85, icon: "/icons/powerbi.svg", category: "BI" },
  { name: "Apache Spark", percentage: 82, icon: "/icons/spark.svg", category: "Big Data" },
  { name: "Kafka", percentage: 80, icon: "/icons/kafka.svg", category: "Streaming" },
  { name: "Airflow", percentage: 85, icon: "/icons/airflow.svg", category: "Orchestration" },
  { name: "dbt", percentage: 83, icon: "/icons/dbt.svg", category: "ETL" },
  { name: "Snowflake", percentage: 78, icon: "/icons/snowflake.svg", category: "Data Warehouse" },
  { name: "Databricks", percentage: 80, icon: "/icons/databricks.svg", category: "Big Data" },
];

export default function Technologies() {
  const categories = Array.from(new Set(technologies.map(t => t.category)));
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredTechs = activeCategory === "All" 
    ? technologies 
    : technologies.filter(t => t.category === activeCategory);

  return (
      <section id="technologies" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
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
            Technical Skills
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-center mb-8 max-w-2xl mx-auto"
          >
            Comprehensive expertise across programming languages, cloud platforms, BI tools, and data analytics technologies
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {filteredTechs.map((tech, index) => (
              <SkillRing
                key={tech.name}
                name={tech.name}
                percentage={tech.percentage}
                index={index}
                icon={tech.icon}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

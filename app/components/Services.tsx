"use client";

import { motion } from "framer-motion";
import { Database, Cloud, Shield, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Database,
    title: "Data Engineering & ETL",
    description: "Design and implementation of robust ETL pipelines, data modeling, and data warehouse solutions using modern cloud technologies. Expertise in Apache Airflow, dbt, and cloud-native data platforms.",
    features: ["ETL Pipeline Design", "Data Warehousing", "Data Modeling", "Pipeline Optimization"],
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "Scalable cloud-based data infrastructure on AWS, Azure, and GCP with focus on cost optimization, reliability, and security. Experience with serverless architectures and containerization.",
    features: ["AWS/Azure/GCP", "Serverless Architecture", "Cost Optimization", "Security Best Practices"],
  },
  {
    icon: Shield,
    title: "AI Ethics & Governance",
    description: "Ethical AI system design, responsible data practices, and governance frameworks for transparent machine learning. Specialized in fairness metrics and bias detection.",
    features: ["Fairness Auditing", "Bias Detection", "Model Interpretability", "Ethical Guidelines"],
  },
  {
    icon: BarChart3,
    title: "BI & Analytics Dashboards",
    description: "Interactive business intelligence dashboards and data visualization solutions using Tableau, Power BI, and custom tools. Transforming raw data into actionable insights.",
    features: ["Tableau & Power BI", "Custom Dashboards", "Real-time Analytics", "Data Storytelling"],
  },
];

export default function Services() {
  return (
      <section id="services" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
          >
            SERVICES
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-gray-300 mb-12 text-center"
          >
            What Services I Provide ?
          </motion.h3>

          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "#00FFB3",
                  boxShadow: "0 0 30px rgba(0, 255, 179, 0.2)",
                }}
                className="glass rounded-xl p-8 border border-white/10 hover:border-neon-mint/50 transition-all"
              >
                <div className="mb-6">
                  <Icon
                    size={48}
                    className="text-neon-mint mb-4"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary leading-relaxed mb-4 text-sm">
                  {service.description}
                </p>
                {service.features && (
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-tertiary">
                        <span className="text-neon-mint">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-neon-mint/10 border border-neon-mint text-neon-mint rounded-lg hover:bg-neon-mint/20 transition-all font-medium text-sm inline-block text-center"
                >
                  Get Started
                </motion.a>
              </motion.div>
            );
          })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

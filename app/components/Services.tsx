"use client";

import { motion } from "framer-motion";
import { Database, Cloud, Shield, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Database,
    developers: "2 Developers",
    title: "ETL Design",
    description:
      "Data models in SAP PowerDesigner ETL process design & implementation: Apache Airflow / AWS / Python.",
  },
  {
    icon: Cloud,
    developers: "5 Developers",
    title: "ETL Development",
    description:
      "ETL pipelines according to the DWH design and architecture (Azure Synapse, Databricks, Azure DevOps).",
  },
  {
    icon: Shield,
    developers: "3 Developers",
    title: "Azure Cloud",
    description:
      "Rebuild of legacy on-premise Oracle-based data warehouse to a data lake based on Azure Cloud.",
  },
  {
    icon: BarChart3,
    developers: "1 Developer",
    title: "Technical Preparation",
    description:
      "Detailed data workflow description, solution design and architecture, technical requirements specification.",
  },
];

export default function Services() {
  return (
    <section id="services" className="min-h-screen py-20 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          What Services I Provide?
        </motion.h2>

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
                <div className="mb-4">
                  <span className="text-sm text-neon-mint font-medium">{service.developers}</span>
                </div>
                <div className="mb-6">
                  <Icon
                    size={48}
                    className="text-neon-mint mb-4"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-neon-mint/10 border border-neon-mint text-neon-mint rounded-lg hover:bg-neon-mint/20 transition-all font-medium"
                >
                  Get Started
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

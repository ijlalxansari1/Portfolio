"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const technologies = [
  { 
    name: "Python", 
    percentage: 95,
    icon: "/icons/python.svg",
    fallback: "🐍"
  },
  { 
    name: "PostgreSQL", 
    percentage: 85,
    icon: "/icons/postgresql.svg",
    fallback: "🐘"
  },
  { 
    name: "Microsoft Azure", 
    percentage: 80,
    icon: "/icons/azure.svg",
    fallback: "☁️"
  },
  { 
    name: "Cloud: AWS", 
    percentage: 75,
    icon: "/icons/aws.svg",
    fallback: "☁️"
  },
];

const toolStack = [
  { name: "Confluence", percentage: 75, logo: "/icons/confluence.svg" },
  { name: "JIRA", percentage: 75, logo: "/icons/jira.svg" },
  { name: "DBeaver", percentage: 85, logo: "/icons/dbeaver.svg" },
  { name: "GitHub", percentage: 90, logo: "/icons/github.svg" },
  { name: "ChatGPT", percentage: 80, logo: "/icons/chatgpt.svg" },
  { name: "Ansible", percentage: 95, logo: "/icons/ansible.svg" },
  { name: "Visual Studio", percentage: 95, logo: "/icons/visual-studio.svg" },
];

function TechIcon({ icon, fallback, name }: { icon: string; fallback: string; name: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
      {!imgError ? (
        <Image
          src={icon}
          alt={name}
          width={48}
          height={48}
          className="object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-3xl">{fallback}</span>
      )}
    </div>
  );
}

function ToolStackItem({ tool, index }: { tool: { name: string; percentage: number; logo: string }; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-lg p-4 border border-white/10 hover:border-neon-mint/30 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {tool.logo && !imgError ? (
            <Image
              src={tool.logo}
              alt={tool.name}
              width={24}
              height={24}
              className="object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-6 h-6 rounded bg-neon-mint/20 flex items-center justify-center">
              <span className="text-xs text-neon-mint font-bold">{tool.name[0]}</span>
            </div>
          )}
          <span className="text-white font-medium text-sm">{tool.name}</span>
        </div>
        <span className="text-neon-mint text-sm font-semibold">{tool.percentage}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${tool.percentage}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.1, duration: 0.8 }}
          className="h-full bg-gradient-to-r from-neon-mint to-neon-cyan rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function Technologies() {
  return (
    <section id="technologies" className="min-h-screen py-20 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Technical Skills
        </motion.h2>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "#00FFB3",
                  boxShadow: "0 0 20px rgba(0, 255, 179, 0.2)",
                }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-neon-mint/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <TechIcon icon={tech.icon} fallback={tech.fallback} name={tech.name} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate">{tech.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-neon-mint text-sm font-semibold">{tech.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 1 }}
                        className="h-full bg-gradient-to-r from-neon-mint to-neon-cyan rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tool Stack Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Tool Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {toolStack.map((tool, index) => (
              <ToolStackItem key={tool.name} tool={tool} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

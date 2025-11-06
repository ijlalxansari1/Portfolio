"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  date: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filters, setFilters] = useState<string[]>(["All"]);

  useEffect(() => {
    // Load projects from API route
    fetch("/api/data/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((p: Project) => p.category))];
        setFilters(uniqueCategories);
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="min-h-screen py-20 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Explore Portfolio By Technology
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-neon-mint text-black border-2 border-neon-mint"
                  : "glass text-gray-300 border border-white/10 hover:border-neon-mint/50 hover:text-neon-mint"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedProject(project.id)}
                className="glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-mint/50 transition-all cursor-pointer group"
              >
                <div className="relative h-48 bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/20" />
                  {!project.image && <div className="text-6xl opacity-30">📊</div>}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-neon-mint font-semibold text-lg">View Details</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-neon-mint uppercase tracking-wider font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-2 mb-2">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass rounded-xl p-8 max-w-2xl w-full border border-neon-mint/50 relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-white hover:text-neon-mint transition-colors z-10"
                >
                  <X size={24} />
                </button>

                {(() => {
                  const project = projects.find((p) => p.id === selectedProject);
                  if (!project) return null;
                  return (
                    <>
                      <div className="relative h-64 bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="text-8xl opacity-30">📊</div>
                        )}
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-neon-mint/10 border border-neon-mint/50 rounded-full text-neon-mint text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

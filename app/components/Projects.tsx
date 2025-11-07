"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Github, Play } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  date?: string;
  status?: string;
  year?: string;
  demoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/data/projects");
        if (response.ok) {
          const data = await response.json();
          // Add status and year from date if not present
          const projectsWithStatus = data.map((project: any) => ({
            ...project,
            status: project.status || (project.date ? "Completed" : "Active"),
            year: project.year || (project.date ? new Date(project.date).getFullYear().toString() : "2024"),
          }));
          setProjects(projectsWithStatus);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Get unique categories from projects
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filters = categories.length > 1 ? categories : ["All", "Machine Learning", "AI Ethics", "Data Engineering", "Data Visualization"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  if (loading) {
    return (
      <section id="projects" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="text-center text-secondary">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
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
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          >
            Explore Portfolio By Technology
          </motion.h2>

          {/* Filter Buttons */}
          {projects.length > 0 && (
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
          )}

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center text-secondary py-12">
              <p className="text-lg mb-2">No projects found</p>
              <p className="text-sm text-tertiary">Add projects from the admin dashboard</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-mint/50 transition-all group cursor-pointer"
            >
              <div className="relative h-48 bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl text-neon-mint/50">{project.title[0]}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all flex items-end">
                  <div className="p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-neon-mint">{project.category}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-neon-mint/10 border border-neon-mint/30 rounded-full text-xs text-neon-mint font-medium">
                    {project.status}
                  </span>
                  <span className="text-xs text-tertiary">{project.year}</span>
                </div>
                <p className="text-secondary text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 glass border border-white/10 rounded-full text-xs text-tertiary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.demoUrl || project.githubUrl || project.liveUrl) && (
                  <div className="flex gap-2 mt-4">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-mint text-black text-sm font-semibold hover:bg-neon-mint/90 transition-all"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </motion.a>
                    )}
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-neon-mint text-sm font-semibold hover:border-neon-mint/50 transition-all"
                      >
                        <Play size={16} />
                        View Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 text-white text-sm font-semibold hover:border-neon-mint/50 transition-all"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ExternalLink, FileText, Briefcase, BookOpen } from "lucide-react";

interface SearchResult {
  type: "project" | "blog" | "skill" | "service";
  title: string;
  description: string;
  url: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load data for search
    const loadData = async () => {
      try {
        const [projectsRes, blogsRes] = await Promise.all([
          fetch("/api/data/projects"),
          fetch("/api/data/blogs"),
        ]);
        if (projectsRes.ok) {
          const projData = await projectsRes.json();
          setProjects(projData);
        }
        if (blogsRes.ok) {
          const blogData = await blogsRes.json();
          setBlogs(blogData);
        }
      } catch (error) {
        console.error("Error loading search data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    // Keyboard shortcut: Ctrl+K or Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const searchResults: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search projects
    projects.forEach((project) => {
      if (
        project.title?.toLowerCase().includes(lowerQuery) ||
        project.description?.toLowerCase().includes(lowerQuery) ||
        project.technologies?.some((tech: string) => tech.toLowerCase().includes(lowerQuery))
      ) {
        searchResults.push({
          type: "project",
          title: project.title,
          description: project.description,
          url: `#projects`,
        });
      }
    });

    // Search blogs
    blogs.forEach((blog) => {
      if (
        blog.title?.toLowerCase().includes(lowerQuery) ||
        blog.content?.toLowerCase().includes(lowerQuery) ||
        blog.category?.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "blog",
          title: blog.title,
          description: blog.content?.substring(0, 100) + "...",
          url: `#blog`,
        });
      }
    });

    // Search skills (hardcoded for now)
    const skills = ["Python", "PostgreSQL", "AWS", "Azure", "Tableau", "Power BI", "Spark", "Kafka", "Airflow", "dbt"];
    skills.forEach((skill) => {
      if (skill.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: "skill",
          title: skill,
          description: "Technical skill",
          url: `#technologies`,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query, projects, blogs]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setQuery("");
    const element = document.querySelector(url);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Briefcase size={16} />;
      case "blog":
        return <BookOpen size={16} />;
      case "skill":
        return <FileText size={16} />;
      default:
        return <ExternalLink size={16} />;
    }
  };

  return (
    <>
      {/* Search Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 glass p-3 rounded-full border border-white/10 text-neon-mint hover:bg-neon-mint/10 transition-all backdrop-blur-xl bg-black/40"
        aria-label="Search"
      >
        <SearchIcon size={20} />
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-2xl mx-4"
            >
              <div className="glass rounded-2xl p-6 border border-white/10 backdrop-blur-xl bg-black/60">
                <div className="flex items-center gap-3 mb-4">
                  <SearchIcon className="text-neon-mint" size={24} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects, blogs, skills... (Ctrl+K)"
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {query && (
                  <div className="max-h-96 overflow-y-auto">
                    {results.length > 0 ? (
                      <div className="space-y-2">
                        {results.map((result, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleResultClick(result.url)}
                            className="w-full text-left glass rounded-lg p-4 border border-white/10 hover:border-neon-mint/50 transition-all group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-1 text-neon-mint">{getIcon(result.type)}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-white font-semibold group-hover:text-neon-mint transition-colors">
                                    {result.title}
                                  </span>
                                  <span className="text-xs text-gray-400 px-2 py-0.5 bg-gray-800 rounded">
                                    {result.type}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-2">{result.description}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <p>No results found for "{query}"</p>
                      </div>
                    )}
                  </div>
                )}

                {!query && (
                  <div className="text-center py-8 text-gray-400">
                    <p>Start typing to search...</p>
                    <p className="text-xs mt-2">Press Esc to close</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


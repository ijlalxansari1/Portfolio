"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FolderOpen, 
  Award, 
  BookOpen, 
  Mail, 
  LogOut, 
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Download,
  RefreshCw,
  ExternalLink,
  Home,
  MessageSquare,
  Calendar,
  Briefcase
} from "lucide-react";
import AdminForm from "./components/AdminForm";
import { useToast } from "@/app/components/Toast";
import AITestButton from "@/app/components/AITestButton";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  date: string;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
}

interface Blog {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
  allowComments?: boolean;
  comments?: Array<{
    id?: number;
    name: string;
    email: string;
    message: string;
    date: string;
  }>;
  emojiReactions?: {
    [key: string]: number;
  };
}

interface Email {
  id: number;
  name: string;
  email: string;
  serviceType?: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "certifications" | "blogs" | "emails">("projects");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<"project" | "blog" | "certification">("project");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = () => {
    // Simple password check (in production, use proper authentication)
    if (password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      loadData();
      toast.success("Logged in successfully!");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projRes, certRes, blogRes, emailRes] = await Promise.all([
        fetch("/api/data/projects"),
        fetch("/api/data/certifications"),
        fetch("/api/data/blogs"),
        fetch("/api/data/emails"),
      ]);
      
      // Check if responses are ok
      if (!projRes.ok) {
        console.error("Projects API error:", projRes.status, projRes.statusText);
      }
      if (!certRes.ok) {
        console.error("Certifications API error:", certRes.status, certRes.statusText);
      }
      if (!blogRes.ok) {
        console.error("Blogs API error:", blogRes.status, blogRes.statusText);
      }
      if (!emailRes.ok) {
        console.error("Emails API error:", emailRes.status, emailRes.statusText);
      }
      
      const [projData, certData, blogData, emailData] = await Promise.all([
        projRes.ok ? projRes.json().catch(() => []) : Promise.resolve([]),
        certRes.ok ? certRes.json().catch(() => []) : Promise.resolve([]),
        blogRes.ok ? blogRes.json().catch(() => []) : Promise.resolve([]),
        emailRes.ok ? emailRes.json().catch(() => []) : Promise.resolve([]),
      ]);

      // Ensure we have arrays and log what we got
      const projectsArray = Array.isArray(projData) ? projData : [];
      const certsArray = Array.isArray(certData) ? certData : [];
      const blogsArray = Array.isArray(blogData) ? blogData : [];
      const emailsArray = Array.isArray(emailData) ? emailData : [];
      
      setProjects(projectsArray);
      setCertifications(certsArray);
      setBlogs(blogsArray);
      setEmails(emailsArray);
      
      console.log("Loaded data:", {
        projects: projectsArray.length,
        certifications: certsArray.length,
        blogs: blogsArray.length,
        emails: emailsArray.length,
      });
      
      if (projectsArray.length === 0 && certsArray.length === 0 && blogsArray.length === 0) {
        console.warn("No data loaded. Check API routes and JSON files.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = () => {
    const data = {
      projects,
      certifications,
      blogs,
      emails,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const getStats = () => {
    return {
      totalProjects: projects.length,
      totalCertifications: certifications.length,
      totalBlogs: blogs.length,
      totalEmails: emails.length,
      recentEmails: emails.filter((e) => {
        const emailDate = new Date(e.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return emailDate > weekAgo;
      }).length,
    };
  };

  const filteredData = () => {
    let data: any[] = [];
    if (activeTab === "projects") data = projects;
    else if (activeTab === "certifications") data = certifications;
    else if (activeTab === "blogs") data = blogs;
    else if (activeTab === "emails") data = emails;

    let filtered = data;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((item) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.title?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.category?.toLowerCase().includes(searchLower) ||
          item.name?.toLowerCase().includes(searchLower) ||
          item.email?.toLowerCase().includes(searchLower) ||
          item.message?.toLowerCase().includes(searchLower) ||
          item.serviceType?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Category filter
    if (filterCategory !== "all" && activeTab !== "emails") {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    return filtered;
  };

  const categories = Array.from(
    new Set(
      activeTab === "projects"
        ? projects.map((p) => p.category)
        : activeTab === "blogs"
        ? blogs.map((b) => b.category)
        : []
    )
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-8 max-w-md w-full border border-neon-mint/50"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white mb-4 focus:outline-none focus:border-neon-mint"
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full py-3 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90 transition-all"
          >
            Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <motion.a
                href="/"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 glass border border-white/10 text-white rounded-lg hover:border-neon-mint/50 transition-all"
              >
                <Home size={18} />
                View Portfolio
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadData}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 glass border border-white/10 text-white rounded-lg hover:border-neon-mint/50 transition-all disabled:opacity-50"
              >
                <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                Refresh
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 glass border border-neon-mint/50 text-neon-mint rounded-lg hover:bg-neon-mint/10 transition-all"
              >
                <Download size={18} />
                Export
              </motion.button>
              <AITestButton />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 glass border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-all"
              >
                <LogOut size={20} />
                Logout
              </motion.button>
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
          >
            {Object.entries(getStats()).map(([key, value]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass rounded-lg p-4 border border-white/10 text-center"
              >
                <div className="text-2xl font-bold text-neon-mint mb-1">{value}</div>
                <div className="text-xs text-secondary capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-4 mb-8 flex-wrap"
        >
          {[
            { id: "projects", label: "Projects", icon: FolderOpen },
            { id: "certifications", label: "Certifications", icon: Award },
            { id: "blogs", label: "Blogs", icon: BookOpen },
            { id: "emails", label: "Emails", icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-neon-mint text-black"
                    : "glass text-gray-300 border border-white/10 hover:border-neon-mint/50"
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 border border-white/10 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-mint"
              />
            </div>
            {activeTab !== "emails" && categories.length > 0 && (
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neon-mint"></div>
              <p className="text-gray-400 mt-4">Loading data...</p>
            </div>
          ) : (
            <>
          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Projects {searchQuery || filterCategory !== "all" ? `(${filteredData().length})` : `(${projects.length})`}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFormType("project");
                    setEditingItem(null);
                    setShowAddForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90"
                >
                  <Plus size={20} />
                  Add Project
                </motion.button>
              </div>
              <div className="space-y-4">
                {filteredData().length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    {searchQuery || filterCategory !== "all" 
                      ? "No projects match your filters" 
                      : "No projects yet. Add your first project!"}
                  </div>
                ) : (
                  filteredData().map((project: Project) => (
                  <div key={project.id} className="glass rounded-lg p-4 border border-white/10 hover:border-neon-mint/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                        <p className="text-gray-300 mt-2 text-sm">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="px-2 py-1 glass border border-white/10 rounded text-xs text-tertiary">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 text-xs text-tertiary">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setFormType("project");
                            setEditingItem(project.id);
                            setShowAddForm(true);
                          }}
                          className="p-2 glass rounded-lg text-neon-mint hover:bg-neon-mint/10 transition-all"
                          title="Edit Project"
                        >
                          <Edit size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={async () => {
                            if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                              try {
                                const response = await fetch(`/api/data/projects?id=${project.id}`, {
                                  method: "DELETE",
                                });
                                if (response.ok) {
                                  toast.success("Project deleted successfully!");
                                  loadData();
                                } else {
                                  toast.error("Failed to delete project");
                                }
                              } catch (error) {
                                console.error("Error deleting project:", error);
                                toast.error("Failed to delete project");
                              }
                            }
                          }}
                          className="p-2 glass rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete Project"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Certifications Tab */}
          {activeTab === "certifications" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Certifications {searchQuery ? `(${filteredData().length})` : `(${certifications.length})`}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFormType("certification");
                    setEditingItem(null);
                    setShowAddForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90"
                >
                  <Plus size={20} />
                  Add Certification
                </motion.button>
              </div>
              <div className="space-y-4">
                {filteredData().length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    {searchQuery ? "No certifications match your search" : "No certifications yet. Add your first certification!"}
                  </div>
                ) : (
                  filteredData().map((cert: Certification) => (
                    <div key={cert.id} className="glass rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{cert.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
                          <p className="text-gray-300 mt-2">ID: {cert.credentialId}</p>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setFormType("certification");
                              setEditingItem(cert.id);
                              setShowAddForm(true);
                            }}
                            className="p-2 glass rounded-lg text-neon-mint hover:bg-neon-mint/10 transition-all"
                            title="Edit Certification"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={async () => {
                              if (confirm(`Are you sure you want to delete "${cert.title}"?`)) {
                                try {
                                  const response = await fetch(`/api/data/certifications?id=${cert.id}`, {
                                    method: "DELETE",
                                  });
                                  if (response.ok) {
                                    toast.success("Certification deleted successfully!");
                                    loadData();
                                  } else {
                                    toast.error("Failed to delete certification");
                                  }
                                } catch (error) {
                                  console.error("Error deleting certification:", error);
                                  toast.error("Failed to delete certification");
                                }
                              }
                            }}
                            className="p-2 glass rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete Certification"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Blogs Tab */}
          {activeTab === "blogs" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFormType("blog");
                    setEditingItem(null);
                    setShowAddForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90"
                >
                  <Plus size={20} />
                  Add Blog
                </motion.button>
              </div>
              <div className="space-y-4">
                {filteredData().length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    {searchQuery || filterCategory !== "all"
                      ? "No blog posts match your filters"
                      : "No blog posts yet. Add your first blog post!"}
                  </div>
                ) : (
                  filteredData().map((blog: Blog) => (
                    <div key={blog.id} className="glass rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{blog.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">{blog.category} • {blog.date}</p>
                          <p className="text-gray-300 mt-2">{blog.excerpt}</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                            {blog.comments && blog.comments.length > 0 && (
                              <span className="flex items-center gap-1">
                                <MessageSquare size={14} />
                                {blog.comments.length} {blog.comments.length === 1 ? 'comment' : 'comments'}
                              </span>
                            )}
                            {blog.emojiReactions && Object.keys(blog.emojiReactions).length > 0 && (
                              <span className="flex items-center gap-1">
                                {Object.entries(blog.emojiReactions).map(([emoji, count]) => (
                                  <span key={emoji}>{emoji} {count}</span>
                                ))}
                              </span>
                            )}
                            {blog.allowComments === false && (
                              <span className="text-red-400">Comments disabled</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setFormType("blog");
                              setEditingItem(blog.id);
                              setShowAddForm(true);
                            }}
                            className="p-2 glass rounded-lg text-neon-mint hover:bg-neon-mint/10 transition-all"
                            title="Edit Blog"
                          >
                            <Edit size={18} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={async () => {
                              if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
                                try {
                                  const response = await fetch(`/api/data/blogs?id=${blog.id}`, {
                                    method: "DELETE",
                                  });
                                  if (response.ok) {
                                    toast.success("Blog deleted successfully!");
                                    loadData();
                                  } else {
                                    toast.error("Failed to delete blog");
                                  }
                                } catch (error) {
                                  console.error("Error deleting blog:", error);
                                  toast.error("Failed to delete blog");
                                }
                              }
                            }}
                            className="p-2 glass rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete Blog"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Emails Tab */}
          {activeTab === "emails" && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Email Submissions {searchQuery ? `(${filteredData().length})` : `(${emails.length})`}
                </h2>
                <div className="space-y-4">
                  {filteredData().length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                      {searchQuery ? "No emails match your search" : "No email submissions yet"}
                    </div>
                  ) : (
                    filteredData().map((email: Email) => (
                    <div key={email.id} className="glass rounded-lg p-6 border border-white/10 hover:border-neon-mint/30 transition-all">
                      {/* Header Section */}
                      <div className="flex justify-between items-start mb-6 pb-4 border-b border-white/10">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-2xl mb-2">{email.name || "Unknown"}</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail size={16} className="text-neon-mint" />
                              <a 
                                href={`mailto:${email.email}`}
                                className="text-neon-mint text-sm hover:underline"
                              >
                                {email.email || "No email"}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-gray-400" />
                              <span className="text-gray-400 text-sm">
                                {email.date ? new Date(email.date).toLocaleString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) : "No date"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Service Type Section */}
                      <div className="mb-4">
                        <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Service Type / Project Type</label>
                        {email.serviceType ? (
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-mint/10 border border-neon-mint/30 rounded-lg text-neon-mint font-medium">
                            <Briefcase size={16} />
                            {email.serviceType}
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm italic">Not specified</span>
                        )}
                      </div>

                      {/* Message Section */}
                      <div className="mb-6">
                        <label className="block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider">Message / Inquiry Details</label>
                        <div className="glass rounded-lg p-4 border border-white/10 bg-black/20 min-h-[100px]">
                          <p className="text-white leading-relaxed whitespace-pre-wrap text-base">
                            {email.message || "No message provided"}
                          </p>
                        </div>
                      </div>

                      {/* Additional Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="glass rounded-lg p-3 border border-white/10 bg-black/20">
                          <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-1">Name</label>
                          <p className="text-white font-medium">{email.name || "Not provided"}</p>
                        </div>
                        <div className="glass rounded-lg p-3 border border-white/10 bg-black/20">
                          <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-1">Email Address</label>
                          <p className="text-white font-medium break-all">{email.email || "Not provided"}</p>
                        </div>
                        <div className="glass rounded-lg p-3 border border-white/10 bg-black/20">
                          <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-1">Service Type</label>
                          <p className="text-white font-medium">{email.serviceType || "Not specified"}</p>
                        </div>
                        <div className="glass rounded-lg p-3 border border-white/10 bg-black/20">
                          <label className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-1">Date & Time</label>
                          <p className="text-white font-medium text-sm">
                            {email.date ? new Date(email.date).toLocaleString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : "Not available"}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-white/10">
                        <motion.a
                          href={`mailto:${email.email || ''}?subject=${encodeURIComponent(`Re: ${email.serviceType || 'Your Inquiry'} - ${email.name || ''}`)}&body=${encodeURIComponent(`Hi ${email.name || 'there'},\n\nThank you for your inquiry regarding: ${email.serviceType || 'your project'}.\n\nBest regards,\nIjlal Ansari`)}`}
                          onClick={(e) => {
                            if (!email.email) {
                              e.preventDefault();
                              toast.error("No email address available");
                              return;
                            }
                            // Let the browser handle the mailto link naturally
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 px-4 py-3 glass rounded-lg text-neon-mint hover:bg-neon-mint/10 text-sm flex items-center justify-center gap-2 font-medium border border-neon-mint/30 no-underline ${!email.email ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                        >
                          <Mail size={18} />
                          Reply via Email
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={async () => {
                            if (confirm(`Are you sure you want to delete this email from ${email.name}?`)) {
                              try {
                                const response = await fetch(`/api/data/emails?id=${email.id}`, {
                                  method: "DELETE",
                                });
                                if (response.ok) {
                                  toast.success("Email deleted successfully!");
                                  loadData();
                                } else {
                                  toast.error("Failed to delete email");
                                }
                              } catch (error) {
                                console.error("Error deleting email:", error);
                                toast.error("Failed to delete email");
                              }
                            }
                          }}
                          className="px-4 py-3 glass rounded-lg text-red-400 hover:bg-red-500/10 text-sm flex items-center gap-2 font-medium border border-red-400/30"
                        >
                          <Trash2 size={18} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
            </>
          )}
        </motion.div>

        {/* Admin Form Modal */}
        {showAddForm && (
          <AdminForm
            type={formType}
            onClose={() => {
              setShowAddForm(false);
              setEditingItem(null);
            }}
            onSave={async (data) => {
              try {
                const endpoint = formType === "project" ? "/api/data/projects" :
                                 formType === "blog" ? "/api/data/blogs" :
                                 "/api/data/certifications";
                const method = editingItem ? "PUT" : "POST";
                
                const response = await fetch(endpoint, {
                  method,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  toast.success(`${formType} saved successfully!`);
                  setShowAddForm(false);
                  setEditingItem(null);
                  loadData();
                } else {
                  const error = await response.json();
                  toast.error(error.error || `Failed to save ${formType}`);
                }
              } catch (error) {
                console.error("Error saving:", error);
                toast.error(`Failed to save ${formType}. Please try again.`);
              }
            }}
            initialData={editingItem ? 
              (formType === "project" ? projects.find(p => p.id === editingItem) :
               formType === "blog" ? blogs.find(b => b.id === editingItem) :
               certifications.find(c => c.id === editingItem)) : undefined
            }
          />
        )}
      </div>
    </div>
  );
}


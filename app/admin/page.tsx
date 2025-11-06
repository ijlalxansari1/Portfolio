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
  X
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
}

interface Email {
  id: number;
  name: string;
  email: string;
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
  const toast = useToast();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadData();
    }
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
    try {
      const [projRes, certRes, blogRes, emailRes] = await Promise.all([
        fetch("/api/data/projects"),
        fetch("/api/data/certifications"),
        fetch("/api/data/blogs"),
        fetch("/api/data/emails.json"),
      ]);
      
      const [projData, certData, blogData, emailData] = await Promise.all([
        projRes.json(),
        certRes.json(),
        blogRes.json(),
        emailRes.json(),
      ]);

      setProjects(projData);
      setCertifications(certData);
      setBlogs(blogData);
      setEmails(emailData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

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
          className="flex justify-between items-center mb-8 flex-wrap gap-4"
        >
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
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

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-xl p-6 border border-white/10"
        >
          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Projects</h2>
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
                {projects.map((project) => (
                  <div key={project.id} className="glass rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{project.category}</p>
                        <p className="text-gray-300 mt-2">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
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
                <h2 className="text-2xl font-bold text-white">Certifications</h2>
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
                {certifications.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No certifications yet. Add your first certification!</p>
                ) : (
                  certifications.map((cert) => (
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
                {blogs.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No blog posts yet. Add your first blog post!</p>
                ) : (
                  blogs.map((blog) => (
                    <div key={blog.id} className="glass rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{blog.title}</h3>
                          <p className="text-gray-400 text-sm mt-1">{blog.category} • {blog.date}</p>
                          <p className="text-gray-300 mt-2">{blog.excerpt}</p>
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
              <h2 className="text-2xl font-bold text-white mb-6">Email Submissions</h2>
              <div className="space-y-4">
                {emails.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No email submissions yet</p>
                ) : (
                  emails.map((email) => (
                    <div key={email.id} className="glass rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-white font-semibold">{email.name}</h3>
                          <p className="text-neon-mint text-sm">{email.email}</p>
                        </div>
                        <span className="text-gray-400 text-xs">{email.date}</span>
                      </div>
                      <p className="text-gray-300 mt-3">{email.message}</p>
                      <button className="mt-3 p-2 glass rounded-lg text-red-400 hover:bg-red-500/10 text-sm">
                        <Trash2 size={16} className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
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


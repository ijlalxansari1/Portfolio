"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Wand2 } from "lucide-react";
import ImageUpload from "@/app/components/ImageUpload";
import { useToast } from "@/app/components/Toast";

interface AdminFormProps {
  type: "project" | "blog" | "certification";
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export default function AdminForm({ type, onClose, onSave, initialData }: AdminFormProps) {
  const [formData, setFormData] = useState(initialData || {
    title: "",
    description: "",
    category: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    // Project-specific fields
    ...(type === "project" && { 
      technologies: "", 
      githubUrl: "", 
      demoUrl: "", 
      status: "Completed" 
    }),
    // Blog-specific fields
    ...(type === "blog" && { 
      excerpt: "", 
      content: "", 
      allowComments: true,
      comments: [],
      emojiReactions: {}
    }),
    // Certification-specific fields
    ...(type === "certification" && { 
      issuer: "", 
      credentialId: "",
      verificationUrl: ""
    }),
  });
  const [aiGenerating, setAiGenerating] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Load categories
    const categoryType = type === "project" ? "projects" : "blogs";
    fetch(`/api/data/categories?type=${categoryType}`)
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch((err) => console.error("Error loading categories:", err));
  }, [type]);

  // Sync form data with initialData when it changes
  useEffect(() => {
    if (initialData) {
      // Convert technologies array to comma-separated string if it's an array
      const processedData = {
        ...initialData,
        technologies: Array.isArray(initialData.technologies) 
          ? initialData.technologies.join(", ") 
          : initialData.technologies || "",
        // Ensure all type-specific fields are present
        ...(type === "project" && {
          githubUrl: initialData.githubUrl || "",
          demoUrl: initialData.demoUrl || "",
          status: initialData.status || "Completed"
        }),
        ...(type === "blog" && {
          allowComments: initialData.allowComments !== undefined ? initialData.allowComments : true,
          comments: initialData.comments || [],
          emojiReactions: initialData.emojiReactions || {}
        }),
        ...(type === "certification" && {
          verificationUrl: initialData.verificationUrl || ""
        }),
      };
      setFormData(processedData);
    } else {
      // Reset form when adding new item
      setFormData({
        title: "",
        description: "",
        category: "",
        image: "",
        date: new Date().toISOString().split("T")[0],
        ...(type === "project" && { 
          technologies: "", 
          githubUrl: "", 
          demoUrl: "", 
          status: "Completed" 
        }),
        ...(type === "blog" && { 
          excerpt: "", 
          content: "", 
          allowComments: true,
          comments: [],
          emojiReactions: {}
        }),
        ...(type === "certification" && { 
          issuer: "", 
          credentialId: "",
          verificationUrl: ""
        }),
      });
    }
  }, [initialData, type]);

  const handleAIGenerate = async (field: string, prompt: string) => {
    setAiGenerating(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "text", prompt }),
      });
      const data = await response.json();
      if (data.success && data.response) {
        setFormData((prev: any) => ({ ...prev, [field]: data.response }));
        toast.success("AI content generated successfully!");
      } else {
        toast.error(data.error || "Failed to generate content");
      }
    } catch (error: any) {
      console.error("AI generation error:", error);
      toast.error("AI generation failed. Please check your API key.");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleImageAIAnalysis = async (imageBase64: string) => {
    setAiGenerating(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "image",
          image: imageBase64,
          prompt: "Generate a detailed description for this image suitable for a portfolio project",
        }),
      });
      const data = await response.json();
      if (data.success && data.response) {
        setFormData((prev: any) => ({ ...prev, description: data.response }));
        toast.success("Image analyzed successfully!");
      } else {
        toast.error(data.error || "Failed to analyze image");
      }
    } catch (error: any) {
      console.error("AI image analysis error:", error);
      toast.error("Image analysis failed. Please check your API key.");
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      technologies: formData.technologies 
        ? (typeof formData.technologies === "string" 
            ? formData.technologies.split(",").map((t: string) => t.trim()).filter((t: string) => t.length > 0)
            : Array.isArray(formData.technologies) 
              ? formData.technologies 
              : [])
        : [],
    };
    onSave(processedData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-xl p-8 max-w-3xl w-full border border-neon-mint/50 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {initialData ? "Edit" : "Add"} {type.charAt(0).toUpperCase() + type.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-white font-medium mb-2">Image</label>
            <ImageUpload
              type={type === "project" ? "projects" : type === "blog" ? "blog" : "certifications"}
              onUpload={(url) => setFormData((prev: any) => ({ ...prev, image: url }))}
              currentImage={formData.image}
              onAIGenerate={async (prompt) => {
                const response = await fetch("/api/ai", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ type: "text", prompt }),
                });
                const data = await response.json();
                return data.response || "";
              }}
            />
          </div>

          {/* Title */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">Title</label>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAIGenerate("title", `Generate a professional title for a ${type} about ${formData.category || "data engineering"}`)}
                disabled={aiGenerating}
                className="flex items-center gap-1 px-2 py-1 text-xs glass rounded text-neon-mint hover:bg-neon-mint/10 disabled:opacity-50"
              >
                <Sparkles size={12} />
                AI Generate
              </motion.button>
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
              required
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">Description</label>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAIGenerate("description", `Write a professional description for a ${type} titled "${formData.title}"`)}
                disabled={aiGenerating}
                className="flex items-center gap-1 px-2 py-1 text-xs glass rounded text-neon-mint hover:bg-neon-mint/10 disabled:opacity-50"
              >
                <Wand2 size={12} />
                AI Generate
              </motion.button>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint resize-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">Category</label>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="text-xs text-neon-mint hover:underline"
              >
                {showAddCategory ? "Cancel" : "+ Add New Category"}
              </motion.button>
            </div>
            {showAddCategory ? (
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter new category name"
                  className="flex-1 px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    if (newCategory.trim()) {
                      try {
                        const categoryType = type === "project" ? "projects" : "blogs";
                        const response = await fetch("/api/data/categories", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ type: categoryType, category: newCategory.trim() }),
                        });
                        if (response.ok) {
                          const data = await response.json();
                          setCategories(data.categories);
                          setFormData((prev: any) => ({ ...prev, category: newCategory.trim() }));
                          setNewCategory("");
                          setShowAddCategory(false);
                          toast.success("Category added successfully!");
                        } else {
                          toast.error("Failed to add category");
                        }
                      } catch (error) {
                        console.error("Error adding category:", error);
                        toast.error("Failed to add category");
                      }
                    }
                  }}
                  className="px-4 py-2 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90"
                >
                  Add
                </motion.button>
              </div>
            ) : null}
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Project-specific fields */}
          {type === "project" && (
            <>
              <div>
                <label className="block text-white font-medium mb-2">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, technologies: e.target.value }))}
                  placeholder="Python, React, AWS"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Demo URL</label>
                <input
                  type="url"
                  value={formData.demoUrl || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, demoUrl: e.target.value }))}
                  placeholder="https://demo.example.com"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Status</label>
                <select
                  value={formData.status || "Completed"}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>
            </>
          )}

          {/* Blog-specific fields */}
          {type === "blog" && (
            <>
              <div>
                <label className="block text-white font-medium mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  placeholder="Short summary of the blog post"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint resize-none"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Content</label>
                <textarea
                  value={formData.content || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  placeholder="Full blog content (supports markdown)"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint resize-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="allowComments"
                  checked={formData.allowComments !== false}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, allowComments: e.target.checked }))}
                  className="w-4 h-4 text-neon-mint bg-black/30 border-white/10 rounded focus:ring-neon-mint"
                />
                <label htmlFor="allowComments" className="text-white font-medium">
                  Allow Comments
                </label>
              </div>
              {initialData && formData.comments && formData.comments.length > 0 && (
                <div className="glass rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-3">Comments ({formData.comments.length})</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {formData.comments.map((comment: any, idx: number) => (
                      <div key={idx} className="bg-black/20 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-white font-medium text-sm">{comment.name || "Anonymous"}</p>
                            <p className="text-gray-400 text-xs">{comment.email || ""}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newComments = formData.comments.filter((_: any, i: number) => i !== idx);
                              setFormData((prev: any) => ({ ...prev, comments: newComments }));
                            }}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-secondary text-sm">{comment.message}</p>
                        {comment.date && (
                          <p className="text-gray-500 text-xs mt-1">{new Date(comment.date).toLocaleDateString()}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Certification-specific fields */}
          {type === "certification" && (
            <>
              <div>
                <label className="block text-white font-medium mb-2">Issuer</label>
                <input
                  type="text"
                  value={formData.issuer || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, issuer: e.target.value }))}
                  placeholder="Coursera, AWS, Google Cloud, etc."
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Credential ID</label>
                <input
                  type="text"
                  value={formData.credentialId || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, credentialId: e.target.value }))}
                  placeholder="Certificate number or ID"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Verification URL</label>
                <input
                  type="url"
                  value={formData.verificationUrl || ""}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, verificationUrl: e.target.value }))}
                  placeholder="https://www.credly.com/earner/earned/badge/..."
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                />
              </div>
            </>
          )}

          {/* Date */}
          <div>
            <label className="block text-white font-medium mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, date: e.target.value }))}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 px-6 py-3 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90 transition-all"
            >
              {initialData ? "Update" : "Create"}
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 glass border border-white/10 text-white rounded-lg hover:bg-white/5 transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}


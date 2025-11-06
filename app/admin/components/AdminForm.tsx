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
    technologies: type === "project" ? "" : undefined,
    image: "",
    date: new Date().toISOString().split("T")[0],
    ...(type === "blog" && { excerpt: "", content: "" }),
    ...(type === "certification" && { issuer: "", credentialId: "" }),
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
      technologies: formData.technologies ? formData.technologies.split(",").map((t: string) => t.trim()) : [],
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

          {/* Technologies (for projects) */}
          {type === "project" && (
            <div>
              <label className="block text-white font-medium mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, technologies: e.target.value }))}
                placeholder="Python, React, AWS"
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
              />
            </div>
          )}

          {/* Blog-specific fields */}
          {type === "blog" && (
            <>
              <div>
                <label className="block text-white font-medium mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint resize-none"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, content: e.target.value }))}
                  rows={8}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint resize-none"
                />
              </div>
            </>
          )}

          {/* Certification-specific fields */}
          {type === "certification" && (
            <>
              <div>
                <label className="block text-white font-medium mb-2">Issuer</label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, issuer: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-mint"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Credential ID</label>
                <input
                  type="text"
                  value={formData.credentialId}
                  onChange={(e) => setFormData((prev: any) => ({ ...prev, credentialId: e.target.value }))}
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


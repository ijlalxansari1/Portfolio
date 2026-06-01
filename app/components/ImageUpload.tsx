"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon, Sparkles } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  type?: "projects" | "blog" | "certifications" | "skills";
  currentImage?: string;
  defaultImage?: string;
  onAIGenerate?: (prompt: string) => Promise<string>;
  className?: string;
  iconOnly?: boolean;
}

export default function ImageUpload({ 
  onUpload, 
  type = "projects", 
  currentImage,
  defaultImage,
  onAIGenerate,
  className = "",
  iconOnly = false
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || defaultImage || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const token = sessionStorage.getItem("aether-admin-session");
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setPreview(data.url);
        onUpload(data.url);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim() || !onAIGenerate) return;
    
    setAiGenerating(true);
    try {
      const description = await onAIGenerate(aiPrompt);
      if (description) {
        // You can use this description for image generation or other purposes
        console.log("AI Generated Description:", description);
      }
    } catch (error) {
      console.error("AI generation error:", error);
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <div className={`space-y-4 ${iconOnly ? 'h-full w-full' : ''}`}>
      {preview ? (
        <div className="relative group h-full w-full">
          <div className={`relative w-full rounded-lg overflow-hidden border border-white/10 ${iconOnly ? 'h-full' : 'h-48'}`}>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={preview.includes('http') || preview.includes('data:image')}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`${iconOnly ? 'p-1' : 'px-4 py-2'} glass rounded-lg text-white hover:bg-white/10`}
                title="Change"
              >
                {iconOnly ? <ImageIcon size={14} /> : "Change"}
              </button>
              <button
                onClick={() => {
                  setPreview(null);
                  onUpload("");
                }}
                className={`${iconOnly ? 'p-1' : 'px-4 py-2'} glass rounded-lg text-red-400 hover:bg-red-500/10`}
                title="Remove"
              >
                <X size={iconOnly ? 14 : 20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${iconOnly ? 'p-2 h-full' : 'p-8'} ${className} ${
            dragActive
              ? "border-neon-mint bg-neon-mint/10"
              : "border-white/20 hover:border-neon-mint/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <ImageIcon className={`${iconOnly ? 'mb-0 text-gray-500' : 'mx-auto mb-4 text-gray-400'}`} size={iconOnly ? 20 : 48} />
          {!iconOnly && (
            <>
              <p className="text-gray-400 mb-2">
                Drag and drop an image or{" "}
                <span className="text-neon-mint hover:underline">
                  browse
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                PNG, JPG, WEBP up to 5MB
              </p>
            </>
          )}
          {uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-neon-mint"></div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* AI Image Generation */}
      {onAIGenerate && (
        <div className="glass rounded-lg p-4 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-neon-mint" />
            <span className="text-sm font-medium text-white">AI Image Generator</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe the image you want..."
              className="flex-1 px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-mint"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAIGenerate}
              disabled={aiGenerating || !aiPrompt.trim()}
              className="px-4 py-2 bg-neon-mint/10 border border-neon-mint text-neon-mint rounded-lg hover:bg-neon-mint/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              {aiGenerating ? "Generating..." : "Generate"}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}


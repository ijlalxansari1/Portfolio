"use client";

import { motion } from "framer-motion";
import { Download, FileText, BookOpen, FileCheck } from "lucide-react";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: "case-study" | "whitepaper" | "guide" | "resume";
  fileUrl: string;
  fileSize?: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Resume - Ijlal Ansari",
    description: "Download my latest resume in PDF format",
    type: "resume",
    fileUrl: "/Poono-Resume.pdf",
    fileSize: "2.5 MB",
  },
  {
    id: 2,
    title: "Ethical AI Implementation Guide",
    description: "A comprehensive guide to implementing ethical AI practices in data engineering",
    type: "guide",
    fileUrl: "#",
    fileSize: "1.2 MB",
  },
  {
    id: 3,
    title: "Data Pipeline Architecture Case Study",
    description: "Real-world case study on building scalable data pipelines",
    type: "case-study",
    fileUrl: "#",
    fileSize: "3.8 MB",
  },
];

export default function DownloadableResources() {
  const handleDownload = (resource: Resource) => {
    if (resource.fileUrl && resource.fileUrl !== "#") {
      const link = document.createElement("a");
      link.href = resource.fileUrl;
      link.download = resource.title;
      link.click();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "resume":
        return <FileCheck size={24} />;
      case "case-study":
        return <FileText size={24} />;
      case "whitepaper":
        return <BookOpen size={24} />;
      case "guide":
        return <FileText size={24} />;
      default:
        return <Download size={24} />;
    }
  };

  return (
    <section id="resources" className="min-h-screen flex items-center justify-center py-4 px-8 md:px-16 relative z-20">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <Download className="text-neon-mint" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Resources</h2>
          </div>
          <p className="text-gray-300 mb-8 text-center">
            Download case studies, guides, and resources to learn more about my work
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-neon-mint/50 transition-all cursor-pointer group"
                onClick={() => handleDownload(resource)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-neon-mint/10 border border-neon-mint/30 text-neon-mint">
                    {getIcon(resource.type)}
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {resource.type.replace("-", " ")}
                    </span>
                    {resource.fileSize && (
                      <p className="text-xs text-gray-500">{resource.fileSize}</p>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-mint transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{resource.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-neon-mint text-sm font-semibold hover:text-neon-cyan transition-colors"
                >
                  <Download size={16} />
                  Download
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  verificationUrl?: string;
}

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const response = await fetch("/api/data/certifications");
        if (response.ok) {
          const data = await response.json();
          setCertifications(data);
        }
      } catch (error) {
        console.error("Error loading certifications:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCertifications();
  }, []);

  if (loading) {
    return (
      <section id="certifications" className="min-h-screen flex items-center justify-center py-4 px-8 md:px-16 relative z-20">
        <div className="w-full max-w-6xl">
          <p className="text-gray-400 text-center">Loading certifications...</p>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="min-h-screen flex items-center justify-center py-4 px-8 md:px-16 relative z-20">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-neon-mint" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-neon-mint/50 transition-all group cursor-pointer"
              >
                <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20">
                  {cert.image && cert.image !== "/certifications/.jpg" ? (
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="text-neon-mint" size={48} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="text-neon-mint" size={20} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-mint transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-neon-cyan mb-3">{cert.issuer}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{new Date(cert.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                  <span className="font-mono">ID: {cert.credentialId}</span>
                </div>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neon-mint text-sm hover:text-neon-cyan transition-colors"
                  >
                    <ExternalLink size={14} />
                    Verify Credential
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


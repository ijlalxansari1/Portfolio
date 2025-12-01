"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Award, Calendar, ExternalLink } from "lucide-react";

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
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

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
      <section id="certifications" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="text-center text-secondary">Loading certifications...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
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
            Certifications & Achievements
          </motion.h2>

          {certifications.length === 0 ? (
            <div className="text-center text-secondary py-12">
              <p className="text-lg mb-2">No certifications yet</p>
              <p className="text-sm text-tertiary">Add certifications from the admin dashboard</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedCert(cert)}
                  className="glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-mint/50 transition-all group cursor-pointer"
                >
                  <div className="relative h-48 bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20 overflow-hidden">
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Award className="text-6xl text-neon-mint/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all flex items-end">
                      <div className="p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                        <p className="text-sm text-neon-mint">{cert.issuer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={14} className="text-tertiary" />
                      <span className="text-xs text-tertiary">
                        {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </span>
                    </div>
                    <p className="text-secondary text-sm">ID: {cert.credentialId}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Certification Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-xl p-8 max-w-2xl w-full border border-neon-mint/50 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </button>

              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                {selectedCert.image ? (
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neon-mint/20 to-neon-cyan/20">
                    <Award className="text-8xl text-neon-mint/50" />
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedCert.title}</h2>
                <p className="text-neon-mint text-lg mb-4">{selectedCert.issuer}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(selectedCert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>

              <div className="glass rounded-lg p-4 border border-white/10 mb-6">
                <h3 className="text-white font-semibold mb-2">Credential ID</h3>
                <p className="text-secondary">{selectedCert.credentialId}</p>
              </div>

              <motion.a
                href={selectedCert.verificationUrl || "#"}
                target={selectedCert.verificationUrl ? "_blank" : undefined}
                rel={selectedCert.verificationUrl ? "noopener noreferrer" : undefined}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90 transition-all"
              >
                <ExternalLink size={18} />
                {selectedCert.verificationUrl ? "Verify Credential" : "View Credential"}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


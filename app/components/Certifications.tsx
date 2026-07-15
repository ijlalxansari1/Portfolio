"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Award, Calendar, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  verificationUrl?: string;
  verification_url?: string;
}

export default function Certifications() {
  const { language } = useLanguage();
  const t = translations[language].certifications;
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Delay fetching by 2 seconds to ensure it doesn't block the initial LCP
    // but without relying on IntersectionObserver which fails in nested scroll containers
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const fetchCerts = async () => {
      try {
        const res = await fetch("/api/data/admin?key=admin-certs");
        if (res.ok) {
          const { data } = await res.json();
          if (data && data.length > 0) {
            setCertifications(data.filter((c: any) => c.status !== 'Draft').map((c: any) => ({
              ...c,
              verificationUrl: c.verificationUrl || c.verification_url,
            })));
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch certs from API, falling back to local storage", err);
      }
      
      const adminData = localStorage.getItem("admin-certs");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          setCertifications(parsed.filter((c: any) => c.status !== 'Draft').map((c: any) => ({
            ...c,
            verificationUrl: c.verificationUrl || c.verification_url,
          })));
          setLoading(false);
          return;
        }
      }
      
      const fallbackCerts = [
        { id: 1, title: "Python for Data Science, AI & Development", issuer: "IBM", date: "2024-05-01", credentialId: "87.5%", image: "" },
        { id: 2, title: "Introduction to Data Engineering", issuer: "IBM", date: "2024-06-01", credentialId: "92.6%", image: "" },
        { id: 3, title: "Business Intelligence (BI) Essentials", issuer: "IBM", date: "2024-07-01", credentialId: "88.33%", image: "" },
        { id: 4, title: "Foundations: Data, Data, Everywhere", issuer: "Google", date: "2024-04-01", credentialId: "91.75%", image: "" },
        { id: 5, title: "SQL for Data Science", issuer: "Coursera", date: "2024-08-01", credentialId: "In Progress", image: "" },
      ];
      
      // Fallback to static data if no localStorage data
      setCertifications(fallbackCerts);
      setLoading(false);
    };

    fetchCerts();
    
    const handleUpdate = () => fetchCerts();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, [isVisible]);

  return (
    <section id="certifications" className="w-full" ref={sectionRef}>
      <div className="mb-12">
        <p className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">{t.label}</p>
        <h2 className="text-4xl font-bold text-[var(--text-primary)]">{t.title}</h2>
        <div className="w-16 h-1 mt-4 bg-neon-mint rounded-full" />
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 text-sm">{t.loading}</div>
      ) : certifications.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-muted)] text-sm font-medium">{t.empty}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedCert(cert)}
              className="rc-card overflow-hidden cursor-pointer group transition-all duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="relative h-44 bg-[var(--border-color)] overflow-hidden">
                {cert.image ? (
                  <Image src={cert.image} alt={cert.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--bg-sidebar)]">
                    <Award size={48} className="text-neon-mint/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/80 to-transparent" />
              </div>
              <div className="p-8">
                <p className="text-neon-mint text-[10px] font-black uppercase tracking-widest mb-2">{cert.issuer}</p>
                <h3 className="text-[var(--text-primary)] font-bold text-base mb-4 line-clamp-2 group-hover:text-neon-mint transition-colors">{cert.title}</h3>
                <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
                  <Calendar size={12} className="text-neon-mint" />
                  <span>{cert.date ? new Date(cert.date).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "N/A"}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-0 max-w-xl w-full relative shadow-2xl overflow-hidden transition-colors duration-300"
            >
              <button 
                onClick={() => setSelectedCert(null)} 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 hover:bg-neon-mint hover:text-black flex items-center justify-center text-white z-50 transition-all"
              >
                <X size={18} />
              </button>

              <div className="relative h-56 bg-[var(--border-color)]">
                {selectedCert.image ? (
                  <Image src={selectedCert.image} alt={selectedCert.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--bg-sidebar)]">
                    <Award size={64} className="text-neon-mint/10" />
                  </div>
                )}
              </div>

              <div className="p-10">
                <p className="text-neon-mint text-[10px] font-black uppercase tracking-widest mb-2">{selectedCert.issuer}</p>
                <h2 className="text-2xl font-black text-[var(--text-primary)] mb-6 leading-tight">{selectedCert.title}</h2>

                {selectedCert.credentialId && (
                  <div className="bg-[var(--border-color)]/30 rounded-xl p-5 mb-6 border border-[var(--border-color)]">
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-1">{t.cred_id}</p>
                    <p className="text-[var(--text-primary)] text-sm font-mono break-all">{selectedCert.credentialId}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs font-bold uppercase tracking-wider mb-8">
                  <Calendar size={14} className="text-neon-mint" />
                  <span>{t.issued} {selectedCert.date ? new Date(selectedCert.date).toLocaleDateString(language === 'en' ? "en-US" : "de-DE", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}</span>
                </div>

                <a
                  href={selectedCert.verificationUrl || "#"}
                  target={selectedCert.verificationUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 bg-neon-mint text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-neon-mint/80 shadow-lg shadow-neon-mint/20 transition-all"
                >
                  <ExternalLink size={16} />
                  {selectedCert.verificationUrl ? t.verify : t.details}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

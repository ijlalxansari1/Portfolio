"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { ArrowRight, Database, Workflow, ShieldCheck, Code2, LineChart, Network, Activity, Globe, Zap, BookOpen } from "lucide-react";

import { getPublishedServices } from "../utils/services";
import { storage } from "../utils/storage";

export default function Services({ initialServices }: { initialServices: ReturnType<typeof getPublishedServices> }) {
  const { language } = useLanguage();
  const t = translations[language].services;


  const [publishedServices, setPublishedServices] = useState(initialServices);

  useEffect(() => {
    const handleStorage = () => {
      const saved = storage.get<unknown>("admin-services-jr", null);
      setPublishedServices(saved === null && language === "en"
        ? initialServices
        : getPublishedServices(saved, language));
    };
    handleStorage();
    window.addEventListener("admin-updated", handleStorage);
    return () => window.removeEventListener("admin-updated", handleStorage);
  }, [initialServices, language]);

  const getIcon = (iconStr: string) => {
    switch (iconStr) {
      case 'Workflow': return <Workflow size={28} />;
      case 'Database': return <Database size={28} />;
      case 'ShieldCheck': return <ShieldCheck size={28} />;
      case 'Code2': return <Code2 size={28} />;
      case 'LineChart': return <LineChart size={28} />;
      case 'Activity': return <Activity size={28} />;
      case 'Globe': return <Globe size={28} />;
      case 'Zap': return <Zap size={28} />;
      case 'BookOpen': return <BookOpen size={28} />;
      default: return <Network size={28} />;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="text-center max-w-2xl mx-auto mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-1">
          {t?.title || "Services"}
        </p>
        <h2 className="section-heading text-[24px] md:text-[30px] font-black text-[var(--text-primary)] mb-1">
          What I Build
        </h2>
        <p className="text-[12px] text-[var(--text-secondary)] opacity-70 leading-relaxed">
          End-to-end data solutions spanning pipeline design, quality assurance, governance, and production deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
        {publishedServices.length > 0 ? publishedServices.map((service, idx) => {
          const href = service.href || service.linkUrl || service.link || "#contact";
          const isExternal = typeof href === "string" && href.startsWith("http");

          return (
            <motion.div
              key={`${service.id || 'srv'}-${service.title || idx}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className="group relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 lg:p-5 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent)]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col">
                {/* Icon & Title */}
                <div className="mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] mb-2.5 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                    {getIcon(service.icon || 'Network')}
                  </div>
                  <h3 className="text-base font-black text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                  {service.summary}
                </p>

                {/* Action */}
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 mt-auto text-[10px] font-black uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
                >
                  {service.link || "Let's Connect"}
                  <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          );
        }) : (
          <div className="md:col-span-2 rounded-3xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-primary)]/40 p-8 text-center text-[13px] text-[var(--text-secondary)] opacity-60">
            {language === "de" ? "Veröffentlichte Dienste werden hier angezeigt, sobald sie hinzugefügt wurden." : "Published services will appear here once they are added from the admin dashboard."}
          </div>
        )}
      </div>
    </div>
  );
}

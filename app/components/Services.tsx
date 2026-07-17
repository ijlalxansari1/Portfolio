"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { ArrowRight, Database, Workflow, ShieldCheck, Code2, LineChart, Network, Activity, Globe, Zap, BookOpen } from "lucide-react";

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language].services;
  
  
const defaultServices_EN = [
    { id: 1, title: "ETL / ELT Pipelines", icon: "Workflow", status: "Published", summary: "Building and maintaining basic data pipelines to extract, transform, and load data.", link: "Let's Connect", href: "#contact" },
    { id: 2, title: "SQL & Database Maintenance", icon: "Database", status: "Published", summary: "Writing efficient queries, managing tables, and assisting with database upkeep.", link: "Let's Connect", href: "#contact" },
    { id: 3, title: "Data Cleaning & Prep", icon: "Globe", status: "Published", summary: "Scraping, cleaning, and formatting raw datasets for analysis or dashboards.", link: "Let's Connect", href: "#contact" },
    { id: 4, title: "Documentation & Testing", icon: "BookOpen", status: "Published", summary: "Writing clear technical docs and adding basic data quality tests to pipelines.", link: "Let's Connect", href: "#contact" },
];

const defaultServices_DE = [
    { id: 1, title: "ETL / ELT Pipelines", icon: "Workflow", status: "Published", summary: "Aufbau und Pflege grundlegender Datenpipelines zum Extrahieren, Transformieren und Laden von Daten.", link: "Lass uns verbinden", href: "#contact" },
    { id: 2, title: "SQL & Datenbankwartung", icon: "Database", status: "Published", summary: "Schreiben effizienter Abfragen, Verwalten von Tabellen und Unterstützung bei der Datenbankwartung.", link: "Lass uns verbinden", href: "#contact" },
    { id: 3, title: "Datenbereinigung & Vorbereitung", icon: "Globe", status: "Published", summary: "Scraping, Bereinigung und Formatierung von Rohdaten für Analysen oder Dashboards.", link: "Lass uns verbinden", href: "#contact" },
    { id: 4, title: "Dokumentation & Tests", icon: "BookOpen", status: "Published", summary: "Erstellen klarer technischer Dokumentationen und Hinzufügen grundlegender Datenqualitätstests.", link: "Lass uns verbinden", href: "#contact" },
];


  const [dynamicServices, setDynamicServices] = useState<any[]>(language === "de" ? defaultServices_DE : defaultServices_EN);

  useEffect(() => {
    const handleStorage = () => {
      const data = localStorage.getItem("admin-services-jr");
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mergedMap = new Map();
            
            // First add defaults
            (language === "de" ? defaultServices_DE : defaultServices_EN).forEach(s => mergedMap.set(s.title, s));
            
            // Then overwrite/append with admin panel data
            parsed.forEach(s => {
              const title = s.title || s.name;
              if (title) {
                mergedMap.set(title, {
                  ...s,
                  deliverables: s.deliverables || ["Requirement gathering", "Custom Implementation", "Testing & CI/CD"],
                  summary: s.summary || s.body?.substring(0, 80) + '...'
                });
              }
            });
            
            setDynamicServices(Array.from(mergedMap.values()));
          }
        } catch {
          setDynamicServices(language === "de" ? defaultServices_DE : defaultServices_EN);
        }
      } else {
        setDynamicServices(language === "de" ? defaultServices_DE : defaultServices_EN);
      }
    };
    handleStorage();
    window.addEventListener("admin-updated", handleStorage);
    return () => window.removeEventListener("admin-updated", handleStorage);
  }, [language]);

  const publishedServices = dynamicServices.filter((service) => String(service?.status || "Published").toLowerCase() === "published");

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
    <div className="w-full space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[var(--accent)] mb-3">
          {t?.title || "Services"}
        </p>
        <h2 className="section-heading text-[32px] md:text-[40px] font-black text-[var(--text-primary)] mb-4">
          What I Build
        </h2>
        <p className="text-[14px] text-[var(--text-secondary)] opacity-60 leading-relaxed">
          End-to-end data solutions spanning pipeline design, quality assurance, governance, and production deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {publishedServices.length > 0 ? publishedServices.map((service, idx) => {
          const href = service.href || service.linkUrl || service.link || "#contact";
          const isExternal = typeof href === "string" && href.startsWith("http");

          return (
            <motion.div
              key={`${service.id || 'srv'}-${service.title || idx}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-8 hover:bg-[var(--bg-secondary)] hover:border-[var(--accent)]/40 hover:shadow-[0_15px_40px_rgba(var(--accent-rgb),0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden"
            >
              {/* Subtle gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon & Title */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-md">
                    {getIcon(service.icon || 'Network')}
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {service.title || service.name}
                  </h3>
                </div>



                {/* Action */}
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 mt-auto text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
                >
                  {t.cta || "Let's Build"}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";
import { ArrowRight, Database, Workflow, ShieldCheck, Code2, LineChart, Network, Activity, Globe, Zap, BookOpen } from "lucide-react";

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language].services;
  
  const defaultServices = [
    { 
      id: 1, title: "Data Pipelines & Integration", icon: "Workflow", status: "Published",
      summary: "End-to-end ETL/ELT pipelines, data integration from APIs/databases/files, transformation, and workflow automation.",
      deliverables: ["Custom Extract/Load connect", "dbt data transformations", "Airflow/Dagster automation"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 2, title: "Database Architecture", icon: "Database", status: "Published",
      summary: "Design scalable relational databases with star schemas, dimensional modeling, warehousing, efficient indexing.",
      deliverables: ["Star/Snowflake Schemas", "Query Optimization", "Performance Indexing"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 3, title: "Data Quality & Validation", icon: "ShieldCheck", status: "Published",
      summary: "Implement validation rules, schema checks, duplicate detection, missing value handling, and monitoring.",
      deliverables: ["Automated schema checks", "Anomaly detection", "Data quality monitoring"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 4, title: "Data Governance", icon: "Network", status: "Published",
      summary: "Design data systems with documentation, audit trails, access control, metadata management, and best practices.",
      deliverables: ["Audit trails", "Role-Based Access", "Metadata management"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 5, title: "Analytics Engineering", icon: "LineChart", status: "Published",
      summary: "Prepare clean, well-structured datasets for dashboards, business intelligence, analytical reporting.",
      deliverables: ["Dimensional modeling", "Dashboard ready datasets", "BI Integration"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 6, title: "Pipeline Reliability & Monitoring", icon: "Activity", status: "Published",
      summary: "Build observable, reliable pipelines with logging, error handling, retry mechanisms, alerts, testing, and CI/CD.",
      deliverables: ["Error handling & retries", "CI/CD deployment", "DataOps practices"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 7, title: "API Development", icon: "Code2", status: "Published",
      summary: "Build RESTful APIs with FastAPI for data ingestion, processing, integration, and secure data access layers.",
      deliverables: ["FastAPI microservices", "Secure data access", "Rate limiting & logging"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 8, title: "Web Scraping & Data Collection", icon: "Globe", status: "Published",
      summary: "Collect structured data from websites, public datasets, APIs, CSV, JSON, XML sources.",
      deliverables: ["Automated Scrapers", "API Integrations", "Data Parsing"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 9, title: "Performance Optimization", icon: "Zap", status: "Published",
      summary: "Optimize SQL queries, pipeline execution, storage efficiency, data processing speed, and system scalability.",
      deliverables: ["SQL tuning", "Pipeline scaling", "Storage efficiency"],
      link: "Let's Connect", href: "#contact"
    },
    { 
      id: 10, title: "Technical Documentation", icon: "BookOpen", status: "Published",
      summary: "Produce clear technical documentation, architecture diagrams, data dictionaries, and pipeline documentation.",
      deliverables: ["Architecture diagrams", "Data dictionaries", "Pipeline documentation"],
      link: "Let's Connect", href: "#contact"
    },
  ];

  const [dynamicServices, setDynamicServices] = useState<any[]>(defaultServices);

  useEffect(() => {
    const handleStorage = () => {
      const data = localStorage.getItem("admin-services");
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mergedMap = new Map();
            
            // First add defaults
            defaultServices.forEach(s => mergedMap.set(s.title, s));
            
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
          // fallback
        }
      }
    };
    handleStorage();
    window.addEventListener("admin-updated", handleStorage);
    return () => window.removeEventListener("admin-updated", handleStorage);
  }, []);

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
                  <p className="text-[14px] text-[var(--text-secondary)] opacity-70 leading-relaxed min-h-[44px]">
                    {service.summary || service.body}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="mt-auto pt-6 border-t border-[var(--border-subtle)] mb-8">
                  <ul className="space-y-3">
                    {(service.deliverables || []).slice(0,3).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-[13px] text-[var(--text-secondary)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/50 mt-1.5 shrink-0" />
                        <span className="opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 mt-auto text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors"
                >
                  {t.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          );
        }) : (
          <div className="md:col-span-2 rounded-3xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-primary)]/40 p-8 text-center text-[13px] text-[var(--text-secondary)] opacity-60">
            Published services will appear here once they are added from the admin dashboard.
          </div>
        )}
      </div>
    </div>
  );
}

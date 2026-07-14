"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, FlaskConical, Database, ShieldCheck, Zap, BarChart3, GraduationCap, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { trackEvent } from "./AnalyticsTracker";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

import AetherDemo from "./demos/AetherDemo";
import ETLPipelineDemo from "./demos/ETLPipelineDemo";
import BiasAuditDemo from "./demos/BiasAuditDemo";
import FastAPIGatewayDemo from "./demos/FastAPIGatewayDemo";
import AnalyticsDashboardDemo from "./demos/AnalyticsDashboardDemo";
import DataEngTrackerDemo from "./demos/DataEngTrackerDemo";

const getDemoList = (language: string) => [
  { id: 1, title: "TraceFlow", tag: "Python", icon: <FlaskConical size={24} />, description: language === 'de' ? "Erkunden Sie einen nachvollziehbaren Daten-Workflow mit Lineage, Überprüfbarkeit und praktischen Kontrollen." : "Explore a traceable data workflow with lineage, auditability, and practical controls.", iframeUrl: "https://aether-blond-nine.vercel.app/" },
  { id: 2, title: "Data Eng Tracker", tag: "Next.js", icon: <GraduationCap size={24} />, description: language === 'de' ? "Interaktiver Lehrplan-Manager mit Echtzeit-Fortschrittsverfolgung." : "Interactive curriculum manager with real-time progress tracking.", component: <DataEngTrackerDemo /> },
  { id: 3, title: "ETL Pipeline", tag: "SQL", icon: <Database size={24} />, description: language === 'de' ? "Entwerfen Sie SQL-Transformationen und zeigen Sie automatische dbt-Lineage an." : "Design SQL transformations and view automated dbt lineage.", component: <ETLPipelineDemo /> },
  { id: 4, title: "Bias Audit System", tag: "Python", icon: <ShieldCheck size={24} />, description: language === 'de' ? "Führen Sie automatisierte Fairness-Audits mithilfe von Disparate-Impact-Metriken durch." : "Execute automated fairness audits using disparate impact metrics.", component: <BiasAuditDemo /> },
  { id: 5, title: "FastAPI Gateway", tag: "FastAPI", icon: <Zap size={24} />, description: language === 'de' ? "Live REST API Builder mit JWT-Sicherheit und Latenztests." : "Live REST API builder with JWT security and latency tests.", component: <FastAPIGatewayDemo /> },
  { id: 6, title: "Analytics Dashboard", tag: "Next.js", icon: <BarChart3 size={24} />, description: language === 'de' ? "Interaktives OLAP-Dashboard, unterstützt durch DuckDB-Architektur." : "Interactive OLAP dashboard powered by DuckDB architecture.", component: <AnalyticsDashboardDemo /> },
];

export default function DemosHub() {
  const { language } = useLanguage();
  const t = translations[language].demosHub;
  const [activeDemo, setActiveDemo] = useState<number | null>(null);
  const [demos, setDemos] = useState<any[]>(getDemoList(language));

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-demos");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          const currentDemoList = getDemoList(language);
          const merged = parsed.filter((d: any) => d.status !== 'Draft').map((d: any) => {
            const staticMatch = currentDemoList.find(s => s.title === d.title || s.id === d.id);
            return {
              ...d,
              icon: d.iconUrl ? <img src={d.iconUrl} alt="icon" className="w-full h-full object-cover rounded-2xl" /> : (staticMatch?.icon || <FlaskConical size={24} />),
              component: staticMatch?.component || null
            };
          });
          setDemos(merged);
        } else {
          setDemos(getDemoList(language));
        }
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, [language]);

  const currentDemo = demos.find(d => d.id === activeDemo);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => setCurrentIndex((prev) => (demos.length > 0 ? (prev + 1) % demos.length : 0));
  const handlePrev = () => setCurrentIndex((prev) => (demos.length > 0 ? (prev - 1 + demos.length) % demos.length : 0));

  useEffect(() => {
    if (isPaused || demos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (demos.length > 0 ? (prev + 1) % demos.length : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, demos.length]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="section-pill"><FlaskConical size={14} /> {t.label}</div>
          <h2 className="section-heading text-[32px] font-black text-white">{t.title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[13px] text-[var(--text-secondary)] opacity-50 max-w-sm leading-relaxed hidden md:block">
            {t.desc}
          </p>
          <div className="flex gap-2 shrink-0 z-20">
            <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={handleNext} className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          {demos.length > 0 && demos[currentIndex] && (
            <motion.div
              key={demos[currentIndex].id}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl mx-auto bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] p-8 md:p-12 cursor-pointer flex flex-col group relative overflow-hidden hover:border-[var(--accent)]/50 transition-colors"
              onClick={() => setActiveDemo(demos[currentIndex].id)}
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 h-full pointer-events-none text-center md:text-left">
                <div className="w-24 h-24 rounded-[32px] flex items-center justify-center bg-[var(--bg-card)] border border-[var(--border)] text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black group-hover:shadow-[0_0_40px_rgba(var(--accent-rgb),0.3)] transition-all duration-500 shrink-0">
                  {/* Using a clone to increase icon size slightly for this large card */}
                  {React.isValidElement(demos[currentIndex].icon) ? React.cloneElement(demos[currentIndex].icon as React.ReactElement<any>, { size: 40 }) : demos[currentIndex].icon}
                </div>
                
                <div className="flex-1 flex flex-col items-center md:items-start">
                  <div className="space-y-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-md">{demos[currentIndex].tag}</span>
                    <h3 className="text-[28px] md:text-[32px] font-black text-white">{demos[currentIndex].title}</h3>
                  </div>
                  
                  <p className="text-[14px] md:text-[15px] text-[var(--text-secondary)] opacity-70 leading-relaxed mb-8 max-w-lg">
                    {demos[currentIndex].description}
                  </p>
                  
                  <div className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[2px] transition-all text-[var(--accent)] mt-auto group-hover:gap-5">
                    {t.launch} <Play size={16} fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Background Decorative */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-[var(--accent)]/20 transition-all duration-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {demos.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-[var(--accent)] w-6' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>

      {/* Demo Modal Overlay */}
      <AnimatePresence>
        {activeDemo !== null && currentDemo && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => setActiveDemo(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-[800px] relative z-10"
            >
              <button 
                onClick={() => setActiveDemo(null)}
                className="absolute -top-12 right-0 md:-right-12 text-white hover:text-[var(--accent)] transition-all"
              >
                <X size={32} />
              </button>

              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[40px] shadow-2xl overflow-hidden relative">
                {currentDemo.iframeUrl ? (
                  <div className="w-full h-[65vh] bg-black flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white/5 px-4 sm:px-6 py-3 border-b border-white/10 shrink-0 gap-2 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-white/50">{language === 'de' ? 'Wird der Inhalt blockiert?' : 'Is the content blocked?'}</span>
                      <a 
                        href={currentDemo.iframeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[10px] sm:text-xs text-[var(--accent)] hover:underline flex items-center gap-1.5 font-bold tracking-wide"
                      >
                        {language === 'de' ? 'In neuem Tab öffnen' : 'Open in new tab'} <ExternalLink size={14} />
                      </a>
                    </div>
                    <iframe src={currentDemo.iframeUrl} className="w-full flex-1 border-0" title={currentDemo.title} />
                  </div>
                ) : (
                  <div className="p-2">
                    {currentDemo.component ? React.cloneElement(currentDemo.component as any, { config: currentDemo.config }) : (
                      <div className="p-20 text-center text-white/20 font-mono">{language === "de" ? "Simulations-Engine ausstehend..." : "Simulation Engine Pending..."}<br/><span className="text-[10px] opacity-50">{language === "de" ? "Bitte weisen Sie eine Iframe-URL zu oder verlinken Sie eine lokale Komponente." : "Please assign an Iframe URL or link a local component."}</span></div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[3px] text-[var(--text-secondary)] opacity-40">
                <span className="flex items-center gap-2"><FlaskConical size={12} /> {language === "de" ? "Sandbox-Modus" : "Sandbox Mode"}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span>{language === "de" ? "Isolierte Umgebung" : "Isolated Environment"}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

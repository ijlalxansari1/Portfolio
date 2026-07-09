"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, FlaskConical, Database, ShieldCheck, Zap, BarChart3, GraduationCap } from "lucide-react";
import { trackEvent } from "./AnalyticsTracker";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

import AetherDemo from "./demos/AetherDemo";
import ETLPipelineDemo from "./demos/ETLPipelineDemo";
import BiasAuditDemo from "./demos/BiasAuditDemo";
import FastAPIGatewayDemo from "./demos/FastAPIGatewayDemo";
import AnalyticsDashboardDemo from "./demos/AnalyticsDashboardDemo";
import DataEngTrackerDemo from "./demos/DataEngTrackerDemo";

const demoList = [
  { id: 1, title: "TraceFlow", tag: "Python", icon: <FlaskConical size={24} />, description: "Explore a traceable data workflow with lineage, auditability, and practical controls.", component: <AetherDemo /> },
  { id: 2, title: "Data Eng Tracker", tag: "Next.js", icon: <GraduationCap size={24} />, description: "Interactive curriculum manager with real-time progress tracking.", component: <DataEngTrackerDemo /> },
  { id: 3, title: "ETL Pipeline", tag: "SQL", icon: <Database size={24} />, description: "Design SQL transformations and view automated dbt lineage.", component: <ETLPipelineDemo /> },
  { id: 4, title: "Bias Audit System", tag: "Python", icon: <ShieldCheck size={24} />, description: "Execute automated fairness audits using disparate impact metrics.", component: <BiasAuditDemo /> },
  { id: 5, title: "FastAPI Gateway", tag: "FastAPI", icon: <Zap size={24} />, description: "Live REST API builder with JWT security and latency tests.", component: <FastAPIGatewayDemo /> },
  { id: 6, title: "Analytics Dashboard", tag: "Next.js", icon: <BarChart3 size={24} />, description: "Interactive OLAP dashboard powered by DuckDB architecture.", component: <AnalyticsDashboardDemo /> },
];

export default function DemosHub() {
  const { language } = useLanguage();
  const t = translations[language].demosHub;
  const [activeDemo, setActiveDemo] = useState<number | null>(null);
  const [demos, setDemos] = useState<any[]>(demoList);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-demos");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) {
          // Merge with static components since components can't be stored in localStorage
          const merged = parsed.filter((d: any) => d.status !== 'Draft').map((d: any) => {
            const staticMatch = demoList.find(s => s.title === d.title || s.id === d.id);
            return {
              ...d,
              icon: d.iconUrl ? <img src={d.iconUrl} alt="icon" className="w-full h-full object-cover rounded-2xl" /> : (staticMatch?.icon || <FlaskConical size={24} />),
              component: staticMatch?.component || null
            };
          });
          setDemos(merged);
        } else {
          setDemos(demoList);
        }
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  const currentDemo = demos.find(d => d.id === activeDemo);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="section-pill"><FlaskConical size={14} /> {t.label}</div>
          <h2 className="section-heading text-[32px] font-black text-white">{t.title}</h2>
        </div>
        <p className="text-[13px] text-[var(--text-secondary)] opacity-50 max-w-sm leading-relaxed">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demos.map((demo) => (
          <div 
            key={demo.id} 
            className="group bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] p-8 hover:border-[var(--accent)]/30 transition-all cursor-pointer relative overflow-hidden flex flex-col h-full"
            onClick={() => setActiveDemo(demo.id)}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 bg-[var(--bg-card)] rounded-2xl flex items-center justify-center text-[var(--accent)] border border-[var(--border)] mb-6 group-hover:scale-110 transition-all duration-500 shrink-0">
                {demo.icon}
              </div>
              
              <div className="space-y-1 mb-4 shrink-0">
                <span className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-black uppercase tracking-widest rounded">{demo.tag}</span>
                <h3 className="text-[18px] font-black text-white">{demo.title}</h3>
              </div>
              
              <p className="text-[13px] text-[var(--text-secondary)] opacity-50 leading-relaxed mb-8 flex-1">
                {demo.description}
              </p>
              
              <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[2px] text-[var(--accent)] group-hover:gap-4 transition-all shrink-0 mt-auto">
                {t.launch} <Play size={14} fill="currentColor" />
              </button>
            </div>

            {/* Background Decorative */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[var(--accent)]/10 transition-all" />
          </div>
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
                  <div className="w-full h-[65vh] bg-black">
                    <iframe src={currentDemo.iframeUrl} className="w-full h-full border-0" title={currentDemo.title} />
                  </div>
                ) : (
                  <div className="p-2">
                    {currentDemo.component ? React.cloneElement(currentDemo.component as any, { config: currentDemo.config }) : (
                      <div className="p-20 text-center text-white/20 font-mono">Simulation Engine Pending...<br/><span className="text-[10px] opacity-50">Please assign an Iframe URL or link a local component.</span></div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[3px] text-[var(--text-secondary)] opacity-40">
                <span className="flex items-center gap-2"><FlaskConical size={12} /> Sandbox Mode</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span>Isolated Environment</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

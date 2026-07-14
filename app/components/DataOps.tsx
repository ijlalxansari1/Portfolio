"use client";

import { motion } from "framer-motion";
import { Database, ArrowRightLeft, HardDrive, ShieldCheck, Layers, Workflow, Zap, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const DATAOPS_LIFECYCLE = [
  { icon: Database, stepKey: "sources", descKey: "sources_desc" },
  { icon: ArrowRightLeft, stepKey: "ingestion", descKey: "ingestion_desc" },
  { icon: HardDrive, stepKey: "storage", descKey: "storage_desc" },
  { icon: ShieldCheck, stepKey: "validation", descKey: "validation_desc" },
  { icon: Layers, stepKey: "modeling", descKey: "modeling_desc" },
  { icon: Workflow, stepKey: "orchestration", descKey: "orchestration_desc" },
  { icon: Zap, stepKey: "serving", descKey: "serving_desc" }
];

export default function DataOps() {
  const { language } = useLanguage();
  const tAbout = translations[language].about;

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* DataOps Lifecycle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 pb-10"
      >
        <div className="mb-8">
          <h3 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2 mb-2">
            <Workflow size={20} className="text-[var(--accent)]" />
            {tAbout.dataops.title}
          </h3>
          <p className="text-[13px] text-[var(--text-secondary)] opacity-80 max-w-lg">
            {tAbout.dataops.subtitle}
          </p>
        </div>

        <div className="w-full overflow-x-auto custom-scrollbar pb-6">
          <div className="flex items-center min-w-max">
            {DATAOPS_LIFECYCLE.map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-3 w-32 group">
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center shadow-sm group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--accent)]/10 transition-all text-[var(--text-secondary)] group-hover:text-[var(--accent)]">
                    <step.icon size={22} className="group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">{tAbout.dataops[step.stepKey as keyof typeof tAbout.dataops] as string}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] opacity-70 leading-tight px-2">{tAbout.dataops[step.descKey as keyof typeof tAbout.dataops] as string}</div>
                  </div>
                </div>
                
                {i < DATAOPS_LIFECYCLE.length - 1 ? (
                  <div className="w-12 flex items-center justify-center mb-8 relative">
                    <div className="w-full h-[2px] bg-gradient-to-r from-[var(--border-subtle)] to-[var(--accent)]/50 rounded-full" />
                    <ChevronRight size={16} className="text-[var(--accent)] absolute -right-2 bg-[var(--bg-card)]" />
                  </div>
                ) : (
                  <div className="flex items-center ml-2 mb-8 relative">
                    <div className="w-8 h-[2px] bg-[var(--border-subtle)] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--border-subtle)]" />
                    </div>
                    <div className="flex flex-col gap-2 py-4 pl-4 border-l-2 border-[var(--border-subtle)] relative">
                      {tAbout.serving_branches.map((branch: string, j: number) => (
                        <div key={j} className="flex items-center gap-2 group/branch">
                          <div className="w-3 h-px bg-[var(--border-subtle)] group-hover/branch:bg-[var(--accent)]/50 transition-colors" />
                          <span className="px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-md group-hover/branch:border-[var(--accent)]/30 group-hover/branch:text-[var(--text-primary)] transition-colors cursor-default whitespace-nowrap">
                            {branch}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

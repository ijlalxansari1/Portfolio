import { motion, AnimatePresence } from "framer-motion";
import { X, Network, Database, ArrowRight, Server, Shield, BarChart3, Code2, FileText, Layers } from "lucide-react";

/* ── Per-project architecture data ── */
const ARCHITECTURE_DATA: Record<number, {
  stages: { label: string; color: string }[];
  description: string;
  technologies: string[];
}> = {
  1: {
    stages: [
      { label: "Data Ingestion", color: "blue" },
      { label: "Schema Validation", color: "blue" },
      { label: "Cleaning Layer", color: "emerald" },
      { label: "Feature Engineering", color: "emerald" },
      { label: "Bias Detection", color: "amber" },
      { label: "SHAP Explainability", color: "purple" },
      { label: "Audit Logger", color: "red" },
      { label: "Output", color: "emerald" },
    ],
    description:
      "Data flows through ingestion and schema validation into a cleaning layer. Features are engineered and passed to Fairlearn for bias scoring. SHAP generates per-feature explanations. Every step is audit-logged for full traceability and compliance.",
    technologies: ["Python", "FastAPI", "DuckDB", "Fairlearn", "SHAP"],
  },
  2: {
    stages: [
      { label: "Curriculum JSON", color: "blue" },
      { label: "React State", color: "emerald" },
      { label: "Progress Tracker", color: "amber" },
      { label: "localStorage", color: "purple" },
      { label: "Dashboard UI", color: "emerald" },
    ],
    description:
      "A static curriculum JSON defines the 20-hour learning path. React state manages progress per module, persisted to localStorage for zero-backend operation. The dashboard visualises completion rate and time spent.",
    technologies: ["Next.js", "React", "localStorage", "Tailwind CSS"],
  },
  3: {
    stages: [
      { label: "Data Sources", color: "blue" },
      { label: "Dagster Ingestion", color: "blue" },
      { label: "PostgreSQL Raw", color: "emerald" },
      { label: "dbt Staging", color: "amber" },
      { label: "dbt Marts", color: "purple" },
      { label: "DuckDB Analytics", color: "emerald" },
    ],
    description:
      "Raw data is ingested via Dagster into PostgreSQL staging tables. dbt Core transforms staging data through tested models into fact and dimension marts. DuckDB provides fast OLAP for downstream analytics — no separate cluster needed.",
    technologies: ["dbt Core", "Dagster", "PostgreSQL", "DuckDB", "SQL"],
  },
  4: {
    stages: [
      { label: "Input Dataset", color: "blue" },
      { label: "Group Identification", color: "blue" },
      { label: "Fairness Scoring", color: "amber" },
      { label: "SHAP Explanations", color: "purple" },
      { label: "PDF Report", color: "emerald" },
    ],
    description:
      "The audit module accepts a labelled dataset, identifies protected groups, runs Fairlearn metrics (demographic parity, equalised odds), generates SHAP feature importance plots, and exports a PDF compliance report.",
    technologies: ["Python", "Fairlearn", "SHAP", "ReportLab", "Pandas"],
  },
  5: {
    stages: [
      { label: "JWT Middleware", color: "blue" },
      { label: "Rate Limiter", color: "amber" },
      { label: "RBAC Engine", color: "red" },
      { label: "PostgreSQL", color: "emerald" },
      { label: "Audit Log", color: "purple" },
    ],
    description:
      "Incoming requests pass through JWT verification and per-tenant rate limiting. A three-tier RBAC engine controls resource access. All auth events are written to a structured audit log for compliance and debugging.",
    technologies: ["FastAPI", "Redis", "Pydantic", "PostgreSQL", "JWT"],
  },
  6: {
    stages: [
      { label: "DuckDB Storage", color: "blue" },
      { label: "FastAPI Query", color: "emerald" },
      { label: "Next.js Frontend", color: "amber" },
      { label: "Recharts Visuals", color: "purple" },
    ],
    description:
      "Million-row datasets are stored in DuckDB for in-process OLAP. FastAPI exposes filtered aggregation endpoints. The Next.js frontend renders interactive Recharts visualisations with sub-200ms latency — zero cloud cost.",
    technologies: ["DuckDB", "FastAPI", "Next.js", "Recharts"],
  },
};

/* ── Color map for stage nodes ── */
const COLOR_MAP: Record<string, { bg: string; border: string; text: string }> = {
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/20",    text: "text-blue-400"    },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/20",   text: "text-amber-400"   },
  purple:  { bg: "bg-purple-500/10",  border: "border-purple-500/20",  text: "text-purple-400"  },
  red:     { bg: "bg-red-500/10",     border: "border-red-500/20",     text: "text-red-400"     },
};

/* ── Fallback default architecture ── */
const DEFAULT_ARCH = {
  stages: [
    { label: "Extract", color: "blue" },
    { label: "Transform", color: "emerald" },
    { label: "Load / Serve", color: "purple" },
  ],
  description:
    "Data is extracted from various sources, validated, and loaded into the staging area. It is then transformed using dbt models to create facts and dimensions, ensuring idempotency and clear lineage.",
  technologies: ["Python", "SQL"],
};

export default function ArchitectureModal({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}) {
  if (!isOpen || !project) return null;

  const arch = ARCHITECTURE_DATA[project.id] || DEFAULT_ARCH;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            role="dialog"
            aria-modal="true"
            aria-label={`System Architecture for ${project.title}`}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[var(--bg-primary)]/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
                  <Network size={20} />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-[var(--text-primary)]">
                    System Architecture
                  </h3>
                  <p className="text-[12px] text-[var(--text-secondary)]">
                    {project.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close architecture modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)] space-y-8">
              
              {/* Architecture Diagram Visualization */}
              <div className="w-full bg-black/40 rounded-2xl border border-[var(--border-subtle)] overflow-hidden relative p-6 md:p-8">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                {/* Pipeline Flow */}
                <div className="relative z-10 w-full overflow-x-auto custom-scrollbar-hidden pb-2">
                  <div className="flex items-center min-w-max gap-3">
                    {arch.stages.map((stage, i) => {
                      const colors = COLOR_MAP[stage.color] || COLOR_MAP.blue;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className="flex flex-col items-center gap-2">
                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text}`}>
                              <Layers size={22} />
                            </div>
                            <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${colors.text} text-center max-w-[80px] leading-tight`}>
                              {stage.label}
                            </span>
                          </div>
                          {i < arch.stages.length - 1 && (
                            <ArrowRight className="text-[var(--border-subtle)] shrink-0" size={16} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Data Flow Description + Technologies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--accent)]">Data Flow</h4>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {arch.description}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)]">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {arch.technologies.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { Play, Database, Network, Table as TableIcon, FileCode, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ETLPipelineDemo() {
  const [sql, setSql] = useState("SELECT \n  user_id,\n  COUNT(order_id) as total_orders,\n  SUM(amount) as total_revenue\nFROM raw.orders\nGROUP BY 1");
  const [isRunning, setIsRunning] = useState(false);
  const [view, setView] = useState<"sql" | "lineage" | "output">("sql");

  const runPipeline = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setView("lineage");
    }, 2000);
  };

  return (
    <div className="w-full bg-[#0d0d0d] border border-[var(--border)] rounded-2xl p-6 overflow-hidden min-h-[440px] flex flex-col">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Database size={20} />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-wider">ELT Pipeline Simulator</h3>
            <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">dbt + Dagster Infrastructure</p>
          </div>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg border border-[var(--border)]">
          <button onClick={() => setView("sql")} className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${view === "sql" ? "bg-white/10 text-white" : "text-[var(--text-secondary)] opacity-40 hover:opacity-100"}`}>SQL</button>
          <button onClick={() => setView("lineage")} className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${view === "lineage" ? "bg-white/10 text-white" : "text-[var(--text-secondary)] opacity-40 hover:opacity-100"}`}>Lineage</button>
          <button onClick={() => setView("output")} className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${view === "output" ? "bg-white/10 text-white" : "text-[var(--text-secondary)] opacity-40 hover:opacity-100"}`}>Output</button>
        </div>
      </div>

      <div className="flex-1 relative">
        {view === "sql" && (
          <div className="space-y-4">
            <div className="relative font-mono text-[13px] bg-black/50 border border-[var(--border)] rounded-xl p-4 min-h-[200px]">
              <textarea 
                value={sql} 
                onChange={(e) => setSql(e.target.value)}
                className="w-full h-full bg-transparent border-none outline-none text-blue-400 resize-none leading-relaxed"
                spellCheck={false}
              />
              <div className="absolute top-4 right-4 text-white/5 pointer-events-none"><FileCode size={40} /></div>
            </div>
            <button 
              onClick={runPipeline}
              disabled={isRunning}
              className="w-full py-4 bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-[12px] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(59,130,246,0.2)]"
            >
              {isRunning ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Play size={18} /></motion.div> : <Play size={18} />}
              {isRunning ? "Transforming with dbt..." : "Execute Pipeline"}
            </button>
          </div>
        )}

        {view === "lineage" && (
          <div className="flex flex-col items-center justify-center min-h-[260px] p-4">
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center text-blue-500 shadow-xl">
                  <Database size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50">raw_orders</span>
              </div>
              
              <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-green-500 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_blue]" />
              </div>

              <div className="flex flex-col items-center gap-2 scale-110">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-blue-500/50 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  <Network size={32} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[2px] text-blue-400">fct_revenue</span>
              </div>

              <div className="w-12 h-px bg-gradient-to-r from-green-500 to-[var(--accent)] relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_green]" />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shadow-xl">
                  <TableIcon size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50">reporting_view</span>
              </div>
            </div>
            <p className="mt-12 text-[10px] font-black text-blue-500 uppercase tracking-[3px] animate-pulse">DAG Orchestrated by Dagster ✓</p>
          </div>
        )}

        {view === "output" && (
          <div className="bg-black/50 border border-[var(--border)] rounded-xl overflow-hidden min-h-[260px]">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-[var(--border)]">
                <tr>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">user_id</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">total_orders</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">revenue</th>
                </tr>
              </thead>
              <tbody className="text-[13px] font-mono text-white/70">
                <tr className="border-b border-white/5"><td className="p-4">usr_9901</td><td className="p-4">12</td><td className="p-4">$1,240.50</td></tr>
                <tr className="border-b border-white/5"><td className="p-4">usr_4432</td><td className="p-4">8</td><td className="p-4">$890.20</td></tr>
                <tr className="border-b border-white/5"><td className="p-4">usr_1211</td><td className="p-4">5</td><td className="p-4">$412.00</td></tr>
                <tr><td className="p-4">usr_8820</td><td className="p-4">24</td><td className="p-4">$4,560.10</td></tr>
              </tbody>
            </table>
            <div className="p-4 bg-white/5 flex items-center justify-center gap-2 text-[11px] font-bold text-green-400">
              <CheckCircle2 size={14} /> Schema Validation Passed
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

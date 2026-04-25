"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Filter, Calendar, Layers, MousePointer2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsDashboardDemo() {
  const [activeRange, setActiveRange] = useState("7D");
  const data = [40, 70, 45, 90, 65, 80, 55];

  return (
    <div className="w-full bg-[#0d0d0d] border border-[var(--border)] rounded-2xl p-6 overflow-hidden min-h-[440px] flex flex-col">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-wider">Analytics Dashboard</h3>
            <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">DuckDB + OLAP Intelligence</p>
          </div>
        </div>
        <div className="flex bg-white/5 p-1 rounded-lg border border-[var(--border)]">
          {["7D", "30D", "1Y"].map(r => (
            <button 
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeRange === r ? "bg-purple-500 text-white" : "text-[var(--text-secondary)] opacity-40"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white/5 border border-[var(--border)] rounded-xl group hover:border-purple-500/30 transition-all cursor-default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Total Events</span>
            <TrendingUp size={12} className="text-purple-500" />
          </div>
          <p className="text-[24px] font-black text-white">128.4K</p>
          <p className="text-[9px] text-green-400 font-bold uppercase tracking-tight mt-1">+12.5% from last period</p>
        </div>
        <div className="p-4 bg-white/5 border border-[var(--border)] rounded-xl group hover:border-purple-500/30 transition-all cursor-default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Query Speed</span>
            <MousePointer2 size={12} className="text-purple-500" />
          </div>
          <p className="text-[24px] font-black text-white">18ms</p>
          <p className="text-[9px] text-purple-400 font-bold uppercase tracking-tight mt-1">Powered by DuckDB</p>
        </div>
      </div>

      <div className="flex-1 bg-white/5 border border-[var(--border)] rounded-2xl p-6 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <Filter size={14} className="text-[var(--text-secondary)] opacity-30" />
          <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-30">Interactive Chart</span>
        </div>

        <div className="h-full flex items-end justify-between gap-3 pt-6">
          {data.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
              <div className="relative w-full">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className="w-full bg-gradient-to-t from-purple-600/40 to-purple-400 rounded-t-lg group-hover:to-purple-300 transition-all shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                  {val}k
                </div>
              </div>
              <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-30 uppercase tracking-widest">Day {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-purple-500" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Real-time Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-purple-500" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">OLAP Engine Active</span>
        </div>
      </div>
    </div>
  );
}

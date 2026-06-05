"use client";

import { useState } from "react";
import { Upload, Play, CheckCircle2, AlertCircle, BarChart3, PieChart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AetherDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate 10-stage pipeline
    setTimeout(() => {
      setResults({
        biasScore: 0.12,
        fairnessGap: "Low",
        shapValues: [
          { feature: "Age", impact: 0.45 },
          { feature: "Gender", impact: 0.08 },
          { feature: "Credit Score", impact: 0.32 },
          { feature: "Postal Code", impact: 0.15 },
        ],
        stages: [
          "Data Ingestion ✓",
          "Privacy Masking ✓",
          "Outlier Detection ✓",
          "Feature Engineering ✓",
          "Model Training ✓",
          "SHAP Calculation ✓",
          "Fairness Auditing ✓",
          "Bias Mitigation ✓",
          "Report Generation ✓",
          "Audit Log Finalization ✓",
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-[#0d0d0d] border border-[var(--border)] rounded-2xl p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
        <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]">
          <BarChart3 size={20} />
        </div>
        <div>
          <h3 className="text-[14px] font-black text-white uppercase tracking-wider">LOKI Variance Analysis</h3>
          <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">Ethical AI Pipeline Simulator</p>
        </div>
      </div>

      {!results ? (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-10 text-center group hover:border-[var(--accent)]/40 transition-all">
            <input type="file" id="aether-upload" className="hidden" onChange={handleUpload} accept=".csv" />
            <label htmlFor="aether-upload" className="cursor-pointer flex flex-col items-center">
              <Upload className={`mb-4 transition-all ${file ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] opacity-30 group-hover:opacity-100'}`} size={32} />
              <p className="text-[13px] font-bold text-white mb-1">
                {file ? file.name : "Drop your dataset (CSV) here"}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">or click to browse files</p>
            </label>
          </div>

          <button 
            onClick={runAnalysis}
            disabled={!file || isAnalyzing}
            className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 transition-all ${
              !file || isAnalyzing ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-[var(--accent)] text-black hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isAnalyzing ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Play size={18} /></motion.div>
            ) : <Play size={18} />}
            {isAnalyzing ? "Processing 10-Stage Pipeline..." : "Execute Ethical Analysis"}
          </button>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 3 }} 
                  className="h-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" 
                />
              </div>
              <p className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-widest text-center animate-pulse">Initializing Fairlearn Engine...</p>
            </div>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-[var(--border)] rounded-xl p-4">
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">Demographic Parity</p>
              <p className="text-[24px] font-black text-[var(--accent)]">0.92</p>
              <div className="flex items-center gap-1 text-[9px] text-[var(--accent)] font-bold uppercase tracking-tight mt-1">
                <CheckCircle2 size={10} /> Excellent Fairness
              </div>
            </div>
            <div className="bg-white/5 border border-[var(--border)] rounded-xl p-4">
              <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-1">SHAP Max Influence</p>
              <p className="text-[24px] font-black text-white">Age</p>
              <div className="flex items-center gap-1 text-[9px] text-orange-400 font-bold uppercase tracking-tight mt-1">
                <Info size={10} /> High Weight Feature
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-[var(--border)] rounded-xl p-5">
            <p className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-widest mb-4">Feature Impact Analysis (SHAP)</p>
            <div className="space-y-4">
              {results.shapValues.map((s: any, i: number) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-white">{s.feature}</span>
                    <span className="text-[var(--text-secondary)] opacity-50">{Math.round(s.impact * 100)}% impact</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${s.impact * 100}%` }} 
                      className="h-full bg-[var(--accent)]" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {results.stages.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-[var(--border)] rounded-full text-[9px] font-black text-[var(--accent)] uppercase tracking-widest">
                {s}
              </span>
            ))}
          </div>

          <button 
            onClick={() => { setResults(null); setFile(null); }}
            className="w-full py-3 border border-[var(--border)] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:bg-white/5 transition-all"
          >
            Reset Analysis
          </button>
        </motion.div>
      )}
    </div>
  );
}

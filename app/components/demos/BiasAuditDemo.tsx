"use client";

import { useState } from "react";
import { Search, ShieldCheck, Users, AlertTriangle, Fingerprint, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function BiasAuditDemo() {
  const { language } = useLanguage();
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const startAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setResults({
        disparateImpact: 0.78,
        protectedGroups: [language === 'de' ? "Geschlecht" : "Gender", language === 'de' ? "Ethnizität" : "Ethnicity", language === 'de' ? "Alter" : "Age"],
        riskLevel: language === 'de' ? "Mittel" : "Medium",
        violations: 2
      });
      setIsAuditing(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#0d0d0d] border border-[var(--border)] rounded-2xl p-6 overflow-hidden min-h-[440px]">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-[var(--border)]">
        <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h3 className="text-[14px] font-black text-white uppercase tracking-wider">{language === 'de' ? 'Bias-Audit-System' : 'Bias Audit System'}</h3>
          <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{language === 'de' ? 'Modell-Governance & Fairness' : 'Model Governance & Fairness'}</p>
        </div>
      </div>

      {!results ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-white/5 border border-[var(--border)] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fingerprint size={18} className="text-orange-500" />
                <div>
                  <p className="text-[12px] font-black text-white">{language === 'de' ? 'Sensible Attribute' : 'Sensitive Attributes'}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{language === 'de' ? '3 in Metadaten erkannt' : '3 detected in metadata'}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <div className="w-2 h-2 rounded-full bg-orange-500/30" />
                <div className="w-2 h-2 rounded-full bg-orange-500/30" />
              </div>
            </div>
            
            <div className="p-5 bg-white/5 border border-[var(--border)] rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity size={18} className="text-blue-500" />
                <div>
                  <p className="text-[12px] font-black text-white">{language === 'de' ? 'Zielvariable' : 'Target Variable'}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">loan_approved_binary</p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[9px] font-black uppercase rounded">{language === 'de' ? 'Auto-Zugeordnet' : 'Auto-Mapped'}</span>
            </div>
          </div>

          <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 flex gap-3">
            <AlertTriangle className="text-orange-500 shrink-0" size={16} />
            <p className="text-[11px] text-orange-200/70 leading-relaxed">
              {language === 'de' ? 'Dieses System berechnet das Disparate Impact Ratio über alle sensiblen Gruppen mithilfe der 4/5-Daumenregel.' : 'This system will calculate the Disparate Impact Ratio across all sensitive groups using the 4/5ths Rule of thumb.'}
            </p>
          </div>

          <button 
            onClick={startAudit}
            disabled={isAuditing}
            className="w-full py-4 bg-orange-500 text-white font-black uppercase tracking-[0.2em] text-[12px] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isAuditing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search size={18} />}
            {isAuditing ? (language === 'de' ? "Auditiere Metadaten..." : "Auditing Metadata...") : (language === 'de' ? "Bias-Audit Ausführen" : "Run Bias Audit")}
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="text-center p-6 bg-orange-500/5 border border-orange-500/20 rounded-[28px]">
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-[3px] mb-2">{language === 'de' ? 'Disparate Impact Ratio' : 'Disparate Impact Ratio'}</p>
            <p className="text-[48px] font-black text-white leading-none mb-4">{results.disparateImpact}</p>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${results.riskLevel === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>
              <AlertTriangle size={12} /> {results.riskLevel} {language === 'de' ? 'Risiko Erkannt' : 'Risk Detected'}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {results.protectedGroups.map((group: string, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-[var(--border)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-[var(--text-secondary)] opacity-50" />
                  <span className="text-[12px] font-bold text-white uppercase tracking-wider">{group}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: i === 0 ? '78%' : i === 1 ? '85%' : '92%' }} />
                  </div>
                  <span className="text-[11px] font-mono text-orange-500">{i === 0 ? '0.78' : i === 1 ? '0.85' : '0.92'}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setResults(null)}
            className="w-full py-3 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest border border-[var(--border)] rounded-xl hover:bg-white/5 transition-all"
          >
            {language === 'de' ? 'Neues Audit' : 'New Audit'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

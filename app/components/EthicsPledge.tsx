"use client";

import { useState, useEffect } from "react";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const pledges = [
  "I will never build systems that obscure the truth in data.",
  "I will always document bias risks before deployment.",
  "I will treat data governance as a first-class feature, not an afterthought.",
  "I will design for the people behind the data, not just the pipeline.",
  "I will make my work auditable, explainable, and honest by default."
];

export default function EthicsPledge() {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (visibleIndex < pledges.length - 1) {
      setIsTyping(true);
      const targetText = pledges[visibleIndex + 1];
      let i = 0;
      const interval = setInterval(() => {
        setCurrentText(targetText.slice(0, i + 1));
        i++;
        if (i === targetText.length) {
          clearInterval(interval);
          setIsTyping(false);
          setTimeout(() => {
            setVisibleIndex(prev => prev + 1);
            setCurrentText("");
          }, 1000);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [visibleIndex]);

  return (
    <div className="w-full">
      <div className="section-pill"><ShieldCheck size={14} /> My Commitment</div>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-8">The Data Ethics Pledge</h2>

      <div className="bg-[#0d0d0d] border border-[var(--accent)]/30 rounded-[28px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          {pledges.map((p, idx) => (
            <div key={idx} className={`flex gap-4 transition-all duration-500 ${idx > visibleIndex && idx !== visibleIndex + 1 ? 'opacity-0' : 'opacity-100'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${idx <= visibleIndex ? 'bg-[var(--accent)] text-black' : 'border border-[var(--border)]'}`}>
                {idx <= visibleIndex && <Check size={14} strokeWidth={4} />}
              </div>
              <p className="text-[16px] md:text-[18px] font-medium text-white leading-relaxed">
                {idx === visibleIndex + 1 ? (
                  <span className="typewriter-text border-r-2 border-[var(--accent)]">{currentText}</span>
                ) : (
                  idx <= visibleIndex ? p : ""
                )}
              </p>
            </div>
          ))}

          <AnimatePresence>
            {visibleIndex === pledges.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-8 border-t border-[var(--border)] mt-8"
              >
                <p className="text-[18px] font-black text-white mb-6">&quot;This is why I built AETHER.&quot;</p>
                <button 
                  onClick={() => {
                    const panel = document.getElementById("content-scroll-panel");
                    const target = document.getElementById("projects");
                    if (panel && target) panel.scrollTo({ top: target.offsetTop, behavior: "smooth" });
                  }}
                  className="flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-black text-[12px] font-black uppercase tracking-[2px] rounded-full hover:scale-105 transition-all shadow-xl"
                >
                  View the Project <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Check size={200} className="text-[var(--accent)]" />
        </div>
      </div>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-4 mt-8">
        {["10-Stage Ethical Pipeline", "24-Permission RBAC", "Append-Only Audit Logs"].map((s, i) => (
          <div key={i} className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50 hover:opacity-100 transition-all">
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

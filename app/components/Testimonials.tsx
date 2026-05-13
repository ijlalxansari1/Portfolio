"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const testimonials = [
  {
    quote: "Ijlal approaches data engineering with a maturity beyond his experience level. The governance architecture in AETHER — particularly the append-only audit logs and RBAC system — reflects genuine engineering thinking, not just tutorial-following.",
    avatar: "SL",
    name: "[Supervisor Name]",
    title: "Academic Supervisor"
  },
  {
    quote: "What stood out about Ijlal's pipeline work was the documentation. Every dbt model tested, every transformation explained. That discipline is rare in junior engineers and it makes a real difference in production.",
    avatar: "ME",
    name: "[Mentor Name]",
    title: "Senior Data Engineer"
  },
  {
    quote: "Most junior engineers build things that work. Ijlal builds things that work and that you can audit, explain, and trust. The ethics focus in AETHER is not a gimmick — it's structurally embedded in every pipeline stage.",
    avatar: "CR",
    name: "[Collaborator Name]",
    title: "AI Ethics Researcher"
  }
];

export default function Testimonials() {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="w-full">
<<<<<<< HEAD
      <div className="flex justify-center"><div className="section-pill"><Quote size={14} /> Testimonials</div></div>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-12 text-center">Here&apos;s What My Collaborators Say</h2>
=======
      <p className="section-label uppercase tracking-[3px] text-[11px] font-bold mb-2 text-[var(--accent)]">
        {language === 'en' ? "TESTIMONIALS" : "TESTIMONIALS"}
      </p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-12">
        {language === 'en' ? "Here's What My Collaborators Say" : "Was meine Partner sagen"}
      </h2>
>>>>>>> be68d009683ef17e78a0ca9b4668278cb581c24b

      <div className="relative max-w-4xl mx-auto px-12">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <Quote size={40} className="text-[var(--accent)] opacity-20 mb-8" />
              <p className="text-[18px] md:text-[22px] font-medium text-[var(--text-primary)] leading-[1.6] mb-10 italic">
                &quot;{testimonials[current].quote}&quot;
              </p>
              
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-[var(--accent)] text-black rounded-full flex items-center justify-center font-black text-[18px] mb-4 shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]">
                  {testimonials[current].avatar}
                </div>
                <h4 className="text-[16px] font-black text-white mb-1">{testimonials[current].name}</h4>
                <p className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest">{testimonials[current].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <button 
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[var(--accent)] w-6" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Ijlal's work on the AETHER platform demonstrates exceptional depth. The governance layer and audit infrastructure reflect a rare combination of engineering rigour and ethical thinking that is hard to find at this level.",
    name: "Dr. Sarah Lyons",
    title: "Research Lead",
    initials: "SL"
  },
  {
    quote: "The data pipeline architecture Ijlal designed was clean, well-documented, and production-ready. His command of dbt and Dagster is well above what you would expect from someone at this stage of their career.",
    name: "Marcus Edwards",
    title: "Senior Data Engineer",
    initials: "ME"
  },
  {
    quote: "Ijlal doesn't just build pipelines — he thinks about what the data means and who it affects. That perspective on responsible analytics is exactly what the industry needs more of.",
    name: "Chen Rui",
    title: "AI Ethics Researcher",
    initials: "CR"
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full">
      <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2 text-center">TESTIMONIALS</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-12 text-center">Here&apos;s What My Collaborators Say</h2>

      <div className="relative max-w-[800px] mx-auto px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="p-10 bg-[#141414] border border-[#222222] rounded-xl text-center space-y-8"
          >
            <Quote className="quote-mark mx-auto text-[var(--accent)] opacity-40" size={48} />
            
            <p className="text-[15px] text-white leading-[1.8] italic font-medium">
              &quot;{testimonials[index].quote}&quot;
            </p>

            <div className="w-16 h-px bg-white/10 mx-auto" />

            <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-[var(--accent)] text-[14px] font-black border border-white/5">
                  {testimonials[index].initials}
               </div>
               <div>
                  <h4 className="text-[14px] font-black text-white">{testimonials[index].name}</h4>
                  <p className="text-[12px] font-bold text-white/30 uppercase tracking-widest">{testimonials[index].title}</p>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-white hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${index === i ? 'bg-[var(--accent)] scale-125 shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]' : 'bg-[#333]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

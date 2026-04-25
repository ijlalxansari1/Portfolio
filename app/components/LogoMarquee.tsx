"use client";

import { motion } from "framer-motion";

const technologies = [
  "Python", "SQL", "FastAPI", "Next.js", "PostgreSQL", "DuckDB", "dbt", "Dagster",
  "Airflow", "Kafka", "Docker", "AWS", "PyTorch", "Pandas", "NumPy", "Scikit-Learn"
];

export default function LogoMarquee() {
  return (
    <div className="w-full py-16 overflow-hidden relative">
      {/* Fading Edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10" />

      <div className="flex animate-marquee-scroll whitespace-nowrap">
        {/* Double items for infinite scroll loop */}
        {[...technologies, ...technologies].map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-8 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full mx-3 text-[var(--text-secondary)] opacity-40 hover:opacity-100 hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-50" />
            <span className="text-[13px] font-black uppercase tracking-widest">{tech}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

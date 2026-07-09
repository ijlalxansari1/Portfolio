"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const defaultExperience = [
  { 
    company: "Google", 
    role: "Big Data Engineer", 
    location: "Los Angeles",
    period: "2022 - Present", 
    desc: "3+ years of experience with big data/Hadoop and Cloud technologies - Spark, Hive, Flink, Presto, Snowflake, Map Reduce, YARN, Amazon AWS.",
    startYear: 2022,
    endYear: 2026
  },
  { 
    company: "Microsoft", 
    role: "Data Warehouse Developer", 
    location: "New York",
    period: "2021 - 2022", 
    desc: "Continuous enhancement and development of a solution that helps to reveal, manage. Build in AWS Cloud with Tableau analytics on top of it.",
    startYear: 2021,
    endYear: 2022
  }
];

const defaultEducation = [
  { school: "Karakoram International University", location: "Gilgit", degree: "Bachelors in Software Engineering", period: "Sep 2021 - Sep 2025", link: "#", startYear: 2021, endYear: 2025 }
];

export default function Resume() {
  const { language } = useLanguage();
  const t = translations[language].experience;
  const [experience, setExperience] = useState(defaultExperience);
  const [education, setEducation] = useState(defaultEducation);

  useEffect(() => {
    const handleUpdate = () => {
      const exp = localStorage.getItem("admin-experience");
      if (exp) setExperience(JSON.parse(exp));
      
      const edu = localStorage.getItem("admin-education");
      if (edu) setEducation(JSON.parse(edu));
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  // Combine and sort timeline events
  const timelineEvents = [
    ...education.map((e) => ({ ...e, type: "education" as const, school: e.school })),
    ...experience.map((e) => ({ ...e, type: "experience" as const, company: e.company }))
  ].sort((a, b) => (b.startYear || 0) - (a.startYear || 0));

  return (
    <div className="w-full space-y-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/30">
            <Briefcase size={16} />
          </div>
          <p className="section-label uppercase tracking-[3px] text-[11px] font-bold text-[var(--accent)]">Roadmap</p>
        </div>
        <h2 className="section-heading text-[32px] md:text-[42px] font-black text-[var(--text-primary)]">Career Timeline</h2>
      </div>

      {/* Vertical Timeline Roadmap */}
      <div className="w-full">
        <div className="relative">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[var(--accent)]/50 via-[var(--accent)]/30 to-[var(--accent)]/50 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]" />

          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineEvents.map((event, idx) => {
              const isEducation = event.type === "education";
              const isLeft = idx % 2 === 0;
              const eventTitle = isEducation ? event.degree : event.role;
              const eventMeta = isEducation ? `${event.school}, ${event.location}` : `${event.location}, ${event.company}`;
              const eventDescription = isEducation ? undefined : event.desc;
              const eventLink = isEducation ? event.link : undefined;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl hover:border-[var(--accent)]/40 transition-all group"
                    >
                      {/* Badge */}
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                          isEducation 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                            : 'bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30'
                        }`}>
                          {isEducation ? '🎓' : '💼'}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] opacity-50">
                          {isEducation ? 'Education' : 'Experience'}
                        </span>
                      </div>

                      {/* Period */}
                      <span className="inline-block px-2.5 py-0.5 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[9px] font-bold uppercase tracking-widest rounded-md border border-[var(--border-subtle)] mb-3">
                        {event.period}
                      </span>

                      {/* Title */}
                      <h3 className="text-[13px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1 leading-snug">
                        {eventTitle}
                      </h3>

                      {/* Location/Company */}
                      <p className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-widest mb-2">
                        {eventMeta}
                      </p>

                      {/* Description */}
                      {eventDescription && (
                        <p className="text-[11px] text-[var(--text-secondary)] opacity-60 leading-[1.5]">
                          {eventDescription}
                        </p>
                      )}

                      {/* Link */}
                      {eventLink && eventLink !== "#" && (
                        <a href={eventLink} className="inline-flex text-[10px] font-black text-[var(--accent)] uppercase tracking-widest hover:underline gap-1 mt-3">
                          Learn More →
                        </a>
                      )}
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className="flex items-center justify-center flex-shrink-0 relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="relative w-4 h-4 bg-[var(--bg-primary)] border-3 border-[var(--bg-secondary)] rounded-full flex items-center justify-center"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        isEducation 
                          ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]' 
                          : 'bg-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.6)]'
                      }`} />
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-center"
        >
          <p className="text-[24px] font-black text-[var(--accent)]">{experience.length}</p>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-60 mt-1">Jobs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-center"
        >
          <p className="text-[24px] font-black text-blue-400">{education.length}</p>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-60 mt-1">Degrees</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-center"
        >
          <p className="text-[24px] font-black text-[var(--accent)]">4+</p>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-60 mt-1">Years Exp</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl text-center"
        >
          <p className="text-[24px] font-black text-blue-400">2</p>
          <p className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest opacity-60 mt-1">Locations</p>
        </motion.div>
      </div>
    </div>
  );
}


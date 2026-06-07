"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Award, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const defaultExperience = [
  { company: "Precise Tech", role: "Business Intelligence Analyst (Intern)", period: "Sep 2024 – Jan 2025", desc: "Analysed 100K+ data points to improve decision-making by 20%." }
];

const defaultEducation = [
  { school: "Karakoram International University", degree: "Bachelors in Software Engineering", period: "2021 – 2025" }
];

const defaultCourses = [
  { title: "Python for Data Science, AI & Development", provider: "IBM", link: "#" },
  { title: "Introduction to Data Engineering", provider: "IBM", link: "#" },
  { title: "Business Intelligence (BI) Essentials", provider: "IBM", link: "#" },
  { title: "Foundations: Data, Data, Everywhere", provider: "Google", link: "#" },
  { title: "SQL for Data Science", provider: "Coursera", link: "#" },
];

function TimelineItem({ period, title, place, body, link, tag }: { period: string; title: string; place: string; body: string; link?: string; tag?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 border-l border-[var(--border)]"
    >
      <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
      
      <div className="group p-6 bg-[var(--accent)]/[0.03] border border-[var(--accent)]/10 rounded-[24px] hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/[0.08] transition-all duration-500 shadow-sm hover:shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--border)] opacity-50">
            {period}
          </span>
          {tag && (
            <span className="inline-block px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[8px] font-black uppercase tracking-widest rounded-md border border-[var(--accent)]/20">
              [{tag}]
            </span>
          )}
        </div>
        <h4 className="text-[17px] font-black text-white group-hover:text-[var(--accent)] transition-all mb-1">{title}</h4>
        <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-3">{place}</p>
        <p className="text-[13px] text-white/60 group-hover:text-white/90 transition-all leading-[1.8] break-words">{body}</p>
        {link && (
          <a href="#" className="inline-flex items-center gap-2 mt-3 text-[11px] font-black uppercase tracking-widest text-[var(--accent)] hover:underline">
            {link} <ExternalLink size={11} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

import LanguageSkills from "./LanguageSkills";

export default function Resume() {
  const { language } = useLanguage();
  const t = translations[language].experience;
  const [courses, setCourses] = useState(defaultCourses);
  const [experience, setExperience] = useState(defaultExperience);
  const [education, setEducation] = useState(defaultEducation);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  useEffect(() => {
    const handleUpdate = () => {
      const certs = localStorage.getItem("admin-certs");
      if (certs) setCourses(JSON.parse(certs).filter((c: any) => c.status !== 'Draft'));
      
      const exp = localStorage.getItem("admin-experience");
      if (exp) setExperience(JSON.parse(exp));
      
      const edu = localStorage.getItem("admin-education");
      if (edu) setEducation(JSON.parse(edu));
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <p className="section-label uppercase tracking-[3px] text-[11px] font-bold mb-2 text-[var(--accent)]">{t.label}</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-12">{t.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
        <div>
          <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-10">{t.exp_title}</h3>
          <div className="space-y-12">
            {experience.map((e: any, i) => <TimelineItem key={i} period={e.period} title={e.role} place={e.company} body={e.desc} />)}
          </div>
        </div>
        <div>
          <h3 className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-[0.25em] mb-10">{t.edu_title}</h3>
          <div className="space-y-12">
            {education.map((e: any, i) => <TimelineItem key={i} period={e.period} title={e.degree} place={e.school} body={""} />)}
          </div>
        </div>
      </div>



      <div className="h-px w-full bg-[var(--border-subtle)] opacity-50" />
      
      <LanguageSkills />

      {/* Certification Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} className="fixed inset-0 bg-black/92 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[480px] bg-[#111111] border border-white/10 rounded-[32px] p-8 shadow-2xl z-10 overflow-hidden"
            >
               <button onClick={() => setSelectedCert(null)} className="absolute top-6 right-6 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-red-500/20 hover:text-red-400 transition-all">
                 <X size={20} />
               </button>

               <div className="flex flex-col items-center text-center space-y-6 pt-4">
                  <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-3xl flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)]">
                     <Award size={40} />
                  </div>
                  
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[3px]">{selectedCert.provider}</p>
                     <h2 className="text-[24px] font-black text-white leading-tight">{selectedCert.title}</h2>
                  </div>

                  {selectedCert.link && selectedCert.link !== "#" ? (
                    <div className="w-full space-y-4">
                       <div className="p-5 bg-white/5 border border-white/10 rounded-2xl text-left">
                          <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Status</p>
                          <p className="text-[13px] text-emerald-400 font-bold flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Credential
                          </p>
                       </div>

                       <a 
                         href={selectedCert.link} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="w-full py-4 bg-[var(--accent)] text-black rounded-2xl text-[12px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                       >
                          Verify Certificate <ExternalLink size={16} />
                       </a>
                    </div>
                  ) : (
                    <div className="w-full p-8 bg-white/5 border border-white/10 rounded-3xl text-center">
                       <p className="text-[13px] text-white/40 font-medium leading-relaxed italic">
                         &quot;This credential is currently in the verification pipeline. Documentation will be available shortly.&quot;
                       </p>
                    </div>
                  )}
               </div>

               {/* Background Decorative */}
               <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--accent)]/5 rounded-full blur-[80px] pointer-events-none" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


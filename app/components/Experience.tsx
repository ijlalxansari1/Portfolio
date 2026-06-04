"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

function TimelineItem({ period, title, subtitle, description, tags, index }: {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-10 pb-12 last:pb-0"
    >
      {/* Timeline line connecting items */}
      <div className="absolute left-[5px] top-4 bottom-0 w-[1px] bg-[var(--border-color)] last:hidden" />
      
      {/* Timeline node */}
      <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full bg-[var(--bg-card)] border-2 border-[var(--accent)] z-10" />

      {/* Period badge */}
      <div className="inline-flex px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[10px] text-[var(--accent)] font-black uppercase tracking-widest mb-4">
        {period}
      </div>

      <h4 className="text-[var(--text-primary)] font-bold text-lg mb-1">{title}</h4>
      <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-widest mb-4">{subtitle}</p>
      
      <div className="text-[var(--text-secondary)] text-[14px] leading-relaxed mb-6 space-y-3">
        {(() => {
          const lines = (description || "").split('\n').filter(p => p.trim() !== "");
          if (lines.length === 0) return null;
          
          return (
            <ul className="space-y-2 pl-1">
              {lines.map((line, i) => {
                // Remove bullet prefix if user manually typed one anyway
                const cleanLine = line.replace(/^[-•–]\s+/, '');
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                    <span>{cleanLine}</span>
                  </li>
                );
              })}
            </ul>
          );
        })()}
      </div>

      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-[var(--border-color)] text-[var(--text-primary)] transition-colors hover:bg-[var(--accent)] hover:text-black">
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const { language } = useLanguage();
  const t = translations[language].experience;

  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);

  useEffect(() => {
    const defaultExp = [
    {
      period: language === 'en' ? "July 2025 – August 2025" : "Juli 2025 – August 2025",
      title: language === 'en' ? "Data Engineering Intern" : "Praktikant Data Engineering",
      company: "LivingPath",
      description: language === 'en' ? "Designed and implemented automated data pipelines for real-time analytics. Optimized cloud infrastructure on AWS, reducing costs by 30% while improving data processing speed. Worked with Apache Airflow, Python, and PostgreSQL to build scalable ETL solutions." : "Entwurf und Implementierung automatisierter Datenpipelines für Echtzeitanalysen. Optimierung der Cloud-Infrastruktur auf AWS, Reduzierung der Kosten um 30% bei gleichzeitiger Verbesserung der Datenverarbeitungsgeschwindigkeit. Arbeit mit Apache Airflow, Python und PostgreSQL zum Aufbau skalierbarer ETL-Lösungen.",
      technologies: ["Python", "AWS", "PostgreSQL", "Airflow"],
    },
    {
      period: "2024 – 2025",
      title: language === 'en' ? "Research Lead" : "Forschungsleiter",
      company: "Ethical Attention Modeling",
      description: language === 'en' ? "Led interdisciplinary research on ethical AI systems and attention-aware analytics frameworks. Published research on fairness metrics in machine learning models. Developed open-source tools for bias detection and model interpretability." : "Leitung interdisziplinärer Forschung zu ethischen KI-Systemen und Frameworks für aufmerksamkeitsbewusste Analysen. Veröffentlichung von Forschungsergebnissen zu Fairness-Metriken in Modellen des maschinellen Lernens. Entwicklung von Open-Source-Tools zur Erkennung von Bias und Modellinterpretierbarkeit.",
      technologies: ["Python", "PyTorch", language === 'en' ? "Research" : "Forschung", "Open Source"],
    },
  ];

  const defaultEdu = [
    {
      period: "2021 – 2025",
      title: language === 'en' ? "BS Software Engineering" : "Bachelor Software Engineering",
      institution: "Karakorum International University",
      description: language === 'en' ? "Specialized in data engineering, machine learning, and ethical AI systems. Coursework: Database Systems, Machine Learning, Cloud Computing, Software Engineering." : "Spezialisierung auf Data Engineering, maschinelles Lernen und ethische KI-Systeme. Schwerpunkte: Datenbanksysteme, maschinelles Lernen, Cloud Computing, Software Engineering.",
      achievements: language === 'en' ? ["Dean's List", "Research Publications", "Open Source Contributions"] : ["Bestenliste", "Forschungspublikationen", "Open-Source-Beiträge"],
    },
    {
      period: "2024 – 2025",
      title: language === 'en' ? "Thesis: Ethical Churn Prediction using SLAM Dataset" : "Bachelorarbeit: Ethische Churn-Vorhersage mit SLAM-Datensatz",
      institution: language === 'en' ? "Research Project" : "Forschungsprojekt",
      description: language === 'en' ? "Developed ethical ML models for customer churn prediction with transparency and fairness metrics. Achieved 85% accuracy while maintaining demographic parity." : "Entwicklung ethischer ML-Modelle für die Kundenabwanderungsprognose mit Fokus auf Transparenz und Fairness. Erreichung einer Genauigkeit von 85% bei gleichzeitiger Wahrung der demografischen Parität.",
      achievements: language === 'en' ? ["Published Research", "Open Source Tool", "Conference Presentation"] : ["Veröffentlichte Forschung", "Open-Source-Tool", "Konferenzvortrag"],
    },
  ];

    const loadData = () => {
      const storedExp = localStorage.getItem("admin-experience");
      if (storedExp) setExperience(JSON.parse(storedExp));
      else setExperience(defaultExp);

      const storedEdu = localStorage.getItem("admin-education");
      if (storedEdu) setEducation(JSON.parse(storedEdu));
      else setEducation(defaultEdu);
    };

    loadData();
    window.addEventListener("admin-updated", loadData);
    return () => window.removeEventListener("admin-updated", loadData);
  }, [language]);

  return (
    <section id="resume" className="w-full">
      <div className="mb-12">
        <p className="text-[var(--text-muted)] text-sm font-semibold uppercase tracking-wider mb-2">{t.label}</p>
        <h2 className="text-4xl font-bold text-[var(--text-primary)]">{t.title}</h2>
        <div className="w-16 h-1 mt-4 bg-[var(--accent)] rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Work Experience */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
              <Briefcase size={22} className="text-[var(--accent)]" />
            </div>
            <h3 className="text-[var(--text-primary)] font-bold text-xl">{t.exp_title}</h3>
          </div>

          <div className="relative">
            {experience.map((exp, i) => (
              <TimelineItem
                key={i}
                index={i}
                period={exp.period}
                title={exp.role || exp.title}
                subtitle={exp.company}
                description={exp.description || exp.desc}
                tags={exp.technologies}
              />
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
              <GraduationCap size={22} className="text-[var(--accent)]" />
            </div>
            <h3 className="text-[var(--text-primary)] font-bold text-xl">{t.edu_title}</h3>
          </div>

          <div className="relative">
            {education.map((edu, i) => (
              <TimelineItem
                key={i}
                index={i}
                period={edu.period}
                title={edu.degree || edu.title}
                subtitle={edu.school || edu.institution}
                description={edu.description || edu.desc}
                tags={edu.achievements}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

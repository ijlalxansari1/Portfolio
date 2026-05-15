"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Globe, Loader2 } from "lucide-react";
import { trackEvent } from "./AnalyticsTracker";
import emailjs from '@emailjs/browser';

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

import { storage } from "../utils/storage";

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage(language === 'en' ? "Please fill in all required fields." : "Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    setStatus("sending");

    try {
      // EmailJS Integration
      if (formRef.current) {
        await emailjs.sendForm(
          'YOUR_SERVICE_ID', 
          'YOUR_TEMPLATE_ID', 
          formRef.current, 
          'YOUR_PUBLIC_KEY'
        );
      }

      // Admin Panel Sync (Local)
      const submission = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleString(),
        read: false
      };


      const existing = storage.get("admin-submissions", []);
      storage.set("admin-submissions", [submission, ...existing]);
      window.dispatchEvent(new Event('admin-updated'));
      trackEvent("form_submit", { name: formData.name });

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setErrorMessage(language === 'en' ? "Failed to send message. Please try again." : "Nachricht konnte nicht gesendet werden.");
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <p className="section-label uppercase tracking-[3px] text-[11px] font-bold mb-2 text-center text-[var(--accent)]">{t.label}</p>
        <h2 className="section-heading text-[32px] md:text-[42px] font-black text-[var(--text-primary)] mb-4 text-center">{t.title}</h2>
        <p className="text-[16px] text-[var(--text-secondary)] text-center mb-12 max-w-2xl mx-auto leading-relaxed opacity-60">
          {t.subheading}
        </p>

        {/* Form */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.name}</label>
                <input 
                   type="text" 
                   name="user_name"
                   placeholder="John Doe" 
                   value={formData.name}
                   onChange={e => setFormData({ ...formData, name: e.target.value })}
                   className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.email}</label>
                <input 
                   type="email" 
                   name="user_email"
                   placeholder="john@example.com" 
                   value={formData.email}
                   onChange={e => setFormData({ ...formData, email: e.target.value })}
                   className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.subject}</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>{t.subject_placeholder}</option>
                <option value="Data Infrastructure">{language === 'en' ? "Data Infrastructure" : "Dateninfrastruktur"}</option>
                <option value="AI/ML Research">{language === 'en' ? "AI/ML Research" : "KI/ML-Forschung"}</option>
                <option value="Technical Consultation">{language === 'en' ? "Technical Consultation" : "Technische Beratung"}</option>
                <option value="Freelance Project">{language === 'en' ? "Freelance Project" : "Freiberufliches Projekt"}</option>
                <option value="Other">{language === 'en' ? "Other" : "Sonstiges"}</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.message}</label>
              <textarea 
                name="message"
                rows={6} 
                placeholder={t.message_placeholder} 
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20 resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={status === "sending"}
              className="w-full py-5 bg-[var(--accent)] text-[var(--bg-primary)] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(var(--accent-rgb),0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? <><Loader2 size={20} className="animate-spin" /> {language === 'en' ? "Sending..." : "Senden..."}</> : 
               status === "success" ? <><CheckCircle2 size={20} /> {t.submit_success}</> : 
               <><Send size={20} /> {t.submit_idle}</>}
            </button>
            {status === "error" && <p className="text-red-400 text-[12px] font-bold text-center">{errorMessage}</p>}
          </form>
          
          {/* Background Decorative */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00e87a]/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16">
          {[
            { label: t.email_label, value: t.email_value, icon: <Mail size={16} />, href: `mailto:${t.email_value}`, color: "from-blue-400/20 to-cyan-400/20" },
            { label: t.portfolio_label, value: t.portfolio_value, icon: <Globe size={16} />, href: "https://dataden.vercel.app", color: "from-[#00e87a]/20 to-emerald-400/20" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.05] transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-lg`}>
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-40 group-hover:opacity-100 transition-all">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="text-[14px] font-black text-white hover:text-[#00e87a] transition-all">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-[14px] font-black text-white">{item.value}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


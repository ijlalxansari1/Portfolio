"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, Globe, Loader2, Copy, Check } from "lucide-react";
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
  const [isPruning, setIsPruning] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleClearPrune = () => {
    setIsPruning(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsPruning(false);
    }, 1000); // 1 second animation time
  };

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

      // Sync to Postgres Backend
      try {
        await fetch("/api/data/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            serviceType: formData.subject,
            message: formData.message,
          })
        });
      } catch (err) {
        console.error("Failed to sync to database", err);
      }

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
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes prune {
              0% { opacity: 1; filter: contrast(1) sepia(0); box-shadow: none; transform: translateY(0) scale(1); }
              30% { opacity: 1; filter: contrast(2) sepia(1) hue-rotate(340deg); box-shadow: 0 0 30px 10px rgba(255,140,0,0.8); transform: translateY(-3px) scale(1.02); border-color: #ff8c00; color: transparent; background: rgba(255,140,0,0.2); }
              100% { opacity: 0; filter: blur(15px) sepia(1) hue-rotate(340deg); box-shadow: 0 0 60px 20px rgba(255,80,0,0); transform: translateY(-20px) scale(1.1); border-color: transparent; }
            }
            .prune-anim input, .prune-anim select, .prune-anim textarea {
              animation: prune 1s ease-out forwards;
            }
          `}} />
          <form ref={formRef} onSubmit={handleSubmit} className={`space-y-6 ${isPruning ? 'prune-anim pointer-events-none' : ''}`}>
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

            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={handleClearPrune}
                className="px-6 py-5 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[#ff8c00] hover:border-[#ff8c00]/50 font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
              >
                Clear
              </button>
              <button 
                type="submit" 
                disabled={status === "sending" || isPruning}
                className="flex-1 py-5 bg-[var(--accent)] text-[var(--bg-primary)] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(var(--accent-rgb),0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? <><Loader2 size={20} className="animate-spin" /> {language === 'en' ? "Sending..." : "Senden..."}</> : 
                 status === "success" ? <><CheckCircle2 size={20} /> {t.submit_success}</> : 
                 <><Send size={20} /> {t.submit_idle}</>}
              </button>
            </div>
            {status === "error" && <p className="text-red-400 text-[12px] font-bold text-center">{errorMessage}</p>}
          </form>
          
          {/* Background Decorative */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00e87a]/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-16">
          {[
            { label: t.email_label, value: t.email_value, icon: <Mail size={16} />, href: `mailto:${t.email_value}`, color: "from-blue-400/20 to-cyan-400/20", copyValue: t.email_value },
            { label: "LinkedIn", value: "in/ijlal-ansari", icon: <Globe size={16} />, href: "https://linkedin.com/in/ijlal-ansari-56b0371b0", color: "from-[#0077B5]/20 to-blue-400/20", copyValue: "https://linkedin.com/in/ijlal-ansari-56b0371b0" },
            { label: "GitHub", value: "ijlalxansari1", icon: <Globe size={16} />, href: "https://github.com/ijlalxansari1", color: "from-white/10 to-gray-400/20", copyValue: "https://github.com/ijlalxansari1" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group flex items-center justify-between gap-6 px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.05] transition-all flex-1"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-lg`}>
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-40 group-hover:opacity-100 transition-all">{item.label}</span>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[14px] font-black text-white hover:text-[var(--accent)] transition-all">
                    {item.value}
                  </a>
                </div>
              </div>
              
              <button 
                onClick={(e) => { e.preventDefault(); handleCopy(item.copyValue, item.label); }}
                className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors"
                aria-label={`Copy ${item.label}`}
              >
                {copiedItem === item.label ? <Check size={14} className="text-[#00e87a]" /> : <Copy size={14} />}
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Global Toast for Copied Status */}
        <div aria-live="polite" aria-atomic="true">
          <AnimatePresence>
            {copiedItem && (
              <motion.div
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 50, x: "-50%" }}
                className="fixed bottom-10 left-1/2 z-[10000] px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl rounded-2xl flex items-center gap-3"
              >
                <CheckCircle2 size={16} className="text-[var(--accent)]" />
                <span className="text-[12px] font-black uppercase tracking-widest text-[var(--text-primary)]">
                  {copiedItem} Copied
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


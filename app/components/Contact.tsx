"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, Globe, Loader2, Copy, Check } from "lucide-react";
import { trackEvent } from "./AnalyticsTracker";
import emailjs from '@emailjs/browser';

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

import { storage } from "../utils/storage";

const FiverrIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 508.02 508.02" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="254.01" cy="254.01" r="254.01" fill="#1DBF73"/>
    <circle cx="315.97" cy="162.19" r="26.87" fill="#FFFFFF"/>
    <path d="M345.87,207.66h-123V199.6c0-15.83,15.83-16.13,23.89-16.13,9.25,0,13.44.9,13.44.9v-43.6a155.21,155.21,0,0,0-19.71-1.19c-25.68,0-73.16,7.16-73.16,61.51V208h-22.4v40.31h22.4v85.1h-20.9v40.31H247.34V333.37H222.85v-85.1H290v85.1H269.13v40.31h97.65V333.37H345.87Z" fill="#FFFFFF" transform="translate(-1.83 -0.98)"/>
  </svg>
);

const SpotifyIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.18-1.139-.66-.12-.48.18-1.02.66-1.139 4.32-1.32 9.78-.6 13.56 1.74.359.24.479.78.24 1.139zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.199-.12-1.379-.72-.18-.6.12-1.199.72-1.379 4.2-1.26 11.28-1.02 15.66 1.62.54.3 1.08.18 1.08.72 0 .6-.48 1.08-1.08 1.08z"/>
  </svg>
);

const SoundCloudIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.66.721c.27 2.453.308 4.606-.006 7.072a.274.274 0 0 1-.54 0c-.287-2.433-.245-4.57 0-7.072a.274.274 0 0 1 .546 0Zm-1.64.673c.278 2.278.293 4.256-.006 6.54a.274.274 0 0 1-.54 0c-.27-2.228-.21-4.22 0-6.54a.274.274 0 0 1 .546 0Zm-1.636.568c.224 2.128.27 3.992.006 6.136a.274.274 0 0 1-.54 0c-.233-2.096-.188-3.959 0-6.136a.274.274 0 0 1 .534 0Zm-1.64.717c.224 1.956.248 3.659.006 5.632a.27.27 0 0 1-.533 0c-.21-1.928-.157-3.626 0-5.632a.27.27 0 0 1 .527 0Zm-1.64.551c.21 1.838.225 3.393.006 5.25a.27.27 0 0 1-.533 0c-.187-1.808-.135-3.376 0-5.25a.27.27 0 0 1 .527 0Zm-1.64.526c.21 1.703.225 3.196.006 4.908a.267.267 0 0 1-.527 0c-.187-1.67-.142-3.158 0-4.908a.267.267 0 0 1-.521 0ZM.213 14.165a.267.267 0 0 1 .527 0c.165 1.543.142 2.91.006 4.453a.267.267 0 0 1-.527 0c-.113-1.501-.068-2.887-.006-4.453Z"/>
  </svg>
);

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPruning, setIsPruning] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [dynamicOptions, setDynamicOptions] = useState<string[]>([]);

  // Load admin services to populate the subject dropdown
  useEffect(() => {
    const loadServices = () => {
      const data = localStorage.getItem("admin-services-jr");
      const opts = new Set<string>();
      if (data) {
        try {
          const parsed = JSON.parse(data);
          parsed.forEach((s: any) => {
            if (s.title || s.name) opts.add(s.title || s.name);
          });
        } catch {}
      }
      setDynamicOptions(Array.from(opts));
    };
    loadServices();
  }, []);

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
      // 1. Sync to Postgres Backend First
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
        throw new Error("Database sync failed");
      }

      // 2. Try EmailJS (Non-blocking if it fails)
      try {
        if (formRef.current) {
          await emailjs.sendForm(
            'YOUR_SERVICE_ID', 
            'YOUR_TEMPLATE_ID', 
            formRef.current, 
            'YOUR_PUBLIC_KEY'
          );
        }
      } catch (err) {
        console.warn("EmailJS Not Configured or Failed:", err);
        // We do NOT throw here so the form still succeeds for the database
      }

      trackEvent("form_submit", { name: formData.name });

      setStatus("success");
    } catch (err) {
      console.error("Form Submission Error:", err);
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
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center text-center p-10 md:p-14 bg-[var(--bg-secondary)] border border-[var(--accent)]/30 rounded-3xl shadow-[0_0_50px_rgba(var(--accent-rgb),0.1)] relative overflow-hidden"
              >
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/10 to-transparent pointer-events-none" />
                
                <div className="w-24 h-24 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--accent)]/30 shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)] relative z-10">
                  <CheckCircle2 size={48} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-4 tracking-tight relative z-10">
                  {language === 'en' ? "Message Sent Successfully!" : "Nachricht erfolgreich gesendet!"}
                </h3>
                <p className="text-[15px] text-[var(--text-secondary)] mb-10 max-w-md leading-relaxed relative z-10">
                  {language === 'en' 
                    ? `Thank you for reaching out, ${formData.name || "friend"}. I've received your message and will get back to you as soon as possible.` 
                    : `Vielen Dank für Ihre Nachricht, ${formData.name || "Freund"}. Ich habe Ihr Anliegen erhalten und werde mich so schnell wie möglich bei Ihnen melden.`}
                </p>
                <button 
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-8 py-4 bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-xl text-[12px] hover:scale-105 hover:-translate-y-1 relative z-10"
                >
                  {language === 'en' ? "Send Another Message" : "Neue Nachricht senden"}
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={formRef} 
                onSubmit={handleSubmit} 
                className={`space-y-6 ${isPruning ? 'prune-anim pointer-events-none' : ''}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="user_name" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.name}</label>
                    <input 
                       id="user_name"
                       type="text" 
                       name="user_name"
                       placeholder="John Doe" 
                       value={formData.name}
                       onChange={e => setFormData({ ...formData, name: e.target.value })}
                       className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="user_email" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.email}</label>
                    <input 
                       id="user_email"
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
                  <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.subject}</label>
                  <div className="relative group">
                    <select 
                      id="subject"
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
                      {dynamicOptions.map(opt => (
                        <option key={opt} value={opt}>✨ {opt}</option>
                      ))}
                      <option value="Other">{language === 'en' ? "Other" : "Sonstiges"}</option>
                    </select>
                    
                    {/* Custom dropdown arrow */}
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">{t.message}</label>
                  <textarea 
                    id="message"
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
                    className="px-6 py-3.5 sm:py-5 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[#ff8c00] hover:border-[#ff8c00]/50 font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                  >
                    Clear
                  </button>
                  <button 
                    type="submit" 
                    disabled={status === "sending" || isPruning}
                    className="flex-1 py-3.5 sm:py-5 bg-[var(--accent)] text-[var(--bg-primary)] font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(var(--accent-rgb),0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? <><Loader2 size={20} className="animate-spin" /> {language === 'en' ? "Sending..." : "Senden..."}</> : 
                     <><Send size={20} /> {t.submit_idle}</>}
                  </button>
                </div>
                {status === "error" && <p className="text-red-400 text-[12px] font-bold text-center">{errorMessage}</p>}
              </motion.form>
            )}
          </AnimatePresence>
          
          {/* Background Decorative */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00e87a]/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Contact Info */}
        <div className="mt-16 space-y-12 w-full">
          {/* Career Section */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]/40 text-center">
              Professional Channels
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: t.email_label, value: t.email_value, icon: <Mail size={16} />, href: `mailto:${t.email_value}`, color: "from-blue-400/20 to-cyan-400/20", copyValue: t.email_value },
                { label: "LinkedIn", value: "in/ijlal-ansari", icon: <Globe size={16} />, href: "https://linkedin.com/in/ijlal-ansari-56b0371b0", color: "from-[#0077B5]/20 to-blue-400/20", copyValue: "https://linkedin.com/in/ijlal-ansari-56b0371b0" },
                { label: "GitHub", value: "ijlalxansari1", icon: <Globe size={16} />, href: "https://github.com/ijlalxansari1", color: "from-white/10 to-gray-400/20", copyValue: "https://github.com/ijlalxansari1" },
                { label: "Fiverr", value: "ijlalansari", icon: <FiverrIcon size={16} />, href: "https://www.fiverr.com/s/8xdmv6g", color: "from-[#1DBF73]/20 to-emerald-400/20", copyValue: "https://www.fiverr.com/s/8xdmv6g" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group flex items-center justify-between gap-4 px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-lg shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-40 group-hover:opacity-100 transition-all">{item.label}</span>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[13px] font-black text-white hover:text-[var(--accent)] transition-all truncate">
                        {item.value}
                      </a>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.preventDefault(); handleCopy(item.copyValue, item.label); }}
                    className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    aria-label={`Copy ${item.label}`}
                  >
                    {copiedItem === item.label ? <Check size={14} className="text-[#00e87a]" /> : <Copy size={14} />}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Music Section */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)]/40 text-center">
              Soundscapes & Playlists
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Spotify", value: "spotify/ijlalansari", icon: <SpotifyIcon size={16} />, href: "https://open.spotify.com/user/317wnqu4ns3xrkhibk5djcuhfmq4?si=ba33e571a6044615", color: "from-[#1DB954]/20 to-green-400/20", copyValue: "https://open.spotify.com/user/317wnqu4ns3xrkhibk5djcuhfmq4?si=ba33e571a6044615" },
                { label: "SoundCloud", value: "soundcloud/traverser", icon: <SoundCloudIcon size={16} />, href: "https://on.soundcloud.com/mLoNh7A9s8me4liNZ8", color: "from-[#FF5500]/20 to-orange-400/20", copyValue: "https://on.soundcloud.com/mLoNh7A9s8me4liNZ8" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group flex items-center justify-between gap-4 px-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-lg shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-40 group-hover:opacity-100 transition-all">{item.label}</span>
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-[13px] font-black text-white hover:text-[var(--accent)] transition-all truncate">
                        {item.value}
                      </a>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.preventDefault(); handleCopy(item.copyValue, item.label); }}
                    className="w-8 h-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    aria-label={`Copy ${item.label}`}
                  >
                    {copiedItem === item.label ? <Check size={14} className="text-[#00e87a]" /> : <Copy size={14} />}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
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


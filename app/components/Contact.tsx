"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, MapPin } from "lucide-react";
import { trackEvent } from "./AnalyticsTracker";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) { setStatus("error"); return; }
    
    const submission = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString(),
      read: false
    };
    
    const existing = JSON.parse(localStorage.getItem("admin-submissions") || "[]");
    localStorage.setItem("admin-submissions", JSON.stringify([submission, ...existing]));
    window.dispatchEvent(new Event('admin-updated'));
    trackEvent("form_submit", { name: formData.name });

    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        <p className="section-label uppercase tracking-[3px] text-[11px] font-bold mb-2 text-center text-[var(--accent)]">Get in Touch</p>
        <h2 className="section-heading text-[32px] md:text-[42px] font-black text-[var(--text-primary)] mb-6 text-center">Ready to Start a Project?</h2>
        <p className="text-[16px] text-[var(--text-secondary)] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
          I'm currently available for freelance work and technical consultations. 
          Fill out the form below and I'll get back to you within 24 hours.
        </p>

        {/* Simplified Form */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">Full Name</label>
                <input type="text" placeholder="John Doe" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">Email Address</label>
                <input type="email" placeholder="john@example.com" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">Subject</label>
              <input type="text" placeholder="Project Inquiry" value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] ml-1">Your Message</label>
              <textarea rows={6} placeholder="Tell me about your project goals..." value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-5 py-4 text-[var(--text-primary)] text-[14px] outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--text-secondary)]/20 resize-none"
              />
            </div>

            <button type="submit" className="w-full py-5 bg-[var(--accent)] text-black font-black uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(var(--accent-rgb),0.2)]">
              {status === "success" ? <><CheckCircle2 size={20} /> Message Sent Successfully!</> : <><Send size={20} /> Send Message Now</>}
            </button>
            {status === "error" && <p className="text-red-400 text-[12px] font-bold text-center">Please fill in all required fields to proceed.</p>}
          </form>
        </div>

        {/* High-Fidelity Contact Info Zone */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16">
          {[
            { label: "Email", value: "ansariijlal90@gmail.com", icon: <Mail size={16} />, href: "mailto:ansariijlal90@gmail.com", color: "from-blue-400/20 to-cyan-400/20" },
            { label: "Location", value: "Remote / Worldwide", icon: <MapPin size={16} />, color: "from-[var(--accent)]/20 to-emerald-400/20" }
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
                  <a href={item.href} className="text-[14px] font-black text-white hover:text-[var(--accent)] transition-all">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-[14px] font-black text-white">{item.value}</span>
                )}
              </div>
              
              {/* Subtle Ambient Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-20 blur-xl transition-all pointer-events-none`} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

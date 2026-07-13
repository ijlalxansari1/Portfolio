"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const { language } = useLanguage();
  const t = translations[language].loginModal;

  useEffect(() => {
    if (isOpen) {
      setPin(Array(6).fill(""));
      setError("");
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleLogin = async (pinStr: string) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinStr }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("aether-admin-session", data.token);
        onLoginSuccess();
      } else {
        setError(data.error || "Access Denied");
        setPin(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError("Server Unreachable");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto focus next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit
    if (newPin.every(digit => digit !== "")) {
      handleLogin(newPin.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pastedData) return;

    const newPin = [...pin];
    for (let i = 0; i < pastedData.length; i++) {
      newPin[i] = pastedData[i];
    }
    setPin(newPin);

    if (pastedData.length === 6) {
      inputRefs.current[5]?.focus();
      handleLogin(newPin.join(""));
    } else {
      inputRefs.current[pastedData.length]?.focus();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-10 max-w-[420px] w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)]/10 to-transparent opacity-20 pointer-events-none" />
            
            <div className="flex justify-between items-center mb-10 relative z-10">
              <div className="flex flex-col gap-1 text-white">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[var(--accent)] mb-4 border border-white/10">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-widest">{t.adminLogin}</h2>
                <p className="text-xs text-white/40 uppercase tracking-[0.2em]">Enter Access Code</p>
              </div>
              <button onClick={onClose} className="absolute top-0 right-0 text-white/30 hover:text-white transition-all p-2 bg-white/5 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex gap-3 justify-between" onPaste={handlePaste}>
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={isSubmitting}
                    className="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-white text-2xl font-black outline-none focus:border-[var(--accent)] focus:bg-[var(--accent)]/10 transition-all"
                  />
                ))}
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#e24b4a] text-xs font-bold text-center uppercase tracking-widest bg-[#e24b4a]/10 py-3 rounded-lg border border-[#e24b4a]/20"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("aether-admin-session", data.token);
        onLoginSuccess();
        setUsername("");
        setPassword("");
      } else {
        setError(data.error || "Invalid credentials. Access denied.");
      }
    } catch (err) {
      setError("Authentication server unreachable.");
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
            className="bg-[#141414] border border-white/10 rounded-2xl p-8 max-w-[400px] w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center text-[var(--accent)]">
                  <Lock size={20} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-widest">Admin Login</h2>
              </div>
              <button onClick={onClose} className="text-white/30 hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 px-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-5 py-4 text-white text-[14px] outline-none focus:border-[var(--accent)]/50 transition-all placeholder:text-white/20"
                  placeholder="Enter username"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2 px-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl px-5 py-4 text-white text-[14px] outline-none focus:border-[var(--accent)]/50 transition-all placeholder:text-white/20"
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <p className="text-[#e24b4a] text-[12px] font-bold text-center animate-pulse">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[var(--accent)] text-black font-black uppercase tracking-[0.15em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(var(--accent-rgb),0.2)]"
              >
                Login to Panel
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

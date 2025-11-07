"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Send } from "lucide-react";
import { useToast } from "./Toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        showToast("Successfully subscribed to newsletter!", "success");
      } else {
        showToast("Subscription failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      showToast("An error occurred. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-8 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <Mail className="text-neon-mint" size={28} />
        <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
      </div>
      <p className="text-gray-300 mb-6">
        Subscribe to my newsletter for the latest insights on data engineering, AI ethics, and tech trends.
      </p>

      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-neon-mint/50 transition-all"
            required
          />
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-neon-mint text-black font-semibold hover:bg-neon-mint/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              "Subscribing..."
            ) : (
              <>
                <Send size={18} />
                Subscribe
              </>
            )}
          </motion.button>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 text-neon-mint"
        >
          <CheckCircle2 size={24} />
          <p className="text-lg font-semibold">Thank you for subscribing!</p>
        </motion.div>
      )}
    </motion.div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateCounter = async () => {
      try {
        // Increment visitor count
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: window.location.pathname }),
        });

        // Get total visitors
        const response = await fetch("/api/analytics");
        if (response.ok) {
          const data = await response.json();
          setCount(data.uniqueVisitors || 0);
        }
      } catch (error) {
        console.error("Error updating counter:", error);
      } finally {
        setLoading(false);
      }
    };

    updateCounter();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 left-6 z-40 glass rounded-full px-4 py-2 border border-white/10 backdrop-blur-xl bg-black/40 flex items-center gap-2"
    >
      <Users className="text-neon-mint" size={16} />
      <span className="text-white text-sm font-medium">
        {count.toLocaleString()} visitors
      </span>
    </motion.div>
  );
}


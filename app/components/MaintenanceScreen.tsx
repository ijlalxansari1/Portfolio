"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";


export default function MaintenanceScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center text-white overflow-hidden bg-[#02040A]/80">

      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6"
      >
        <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 relative">
           <Wrench size={40} className="text-emerald-400" />
           <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-50" style={{ animationDuration: '3s' }} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
          Under Maintenance
        </h1>
        <p className="text-lg md:text-xl text-white/50 mb-12 font-medium max-w-md mx-auto">
          The sacred timeline is currently being pruned and optimized. We'll be back shortly.
        </p>
        
        <div className="text-[10px] uppercase tracking-[0.3em] font-black text-emerald-400/50 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          System Updating
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}

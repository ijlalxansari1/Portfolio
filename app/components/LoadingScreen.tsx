"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Simulate a fast, cinematic loading sequence
    let currentProgress = 0;
    const duration = 2500; // 2.5 seconds
    const interval = 30; // Update every 30ms
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      currentProgress += step;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
        setTimeout(() => setIsFinished(true), 500); // Wait a tiny bit at 100%
      }
      setProgress(Math.floor(currentProgress));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isFinished) {
      const exitTimer = setTimeout(onComplete, 1200); // Allow exit animation to play slightly longer for cinematic feel
      return () => clearTimeout(exitTimer);
    }
  }, [isFinished, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#02040A] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Cinematic Background Image */}
          <div 
            className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
            style={{
              backgroundImage: "url('/loki/loading.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Cinematic UI Overlay */}
          <div className="relative z-10 flex flex-col items-center max-w-[90vw] mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-[#a3ff3c] text-xl md:text-3xl font-black uppercase tracking-[0.2em] font-sans text-center drop-shadow-[0_0_15px_rgba(163,255,60,0.5)]">
                Initializing the Data Multiverse
              </h1>
              <p className="text-white mt-4 text-xs md:text-sm font-mono tracking-widest uppercase opacity-80">
                Weaving the timelines of data...
              </p>
            </motion.div>

            {/* Progress Bar & Counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 w-full max-w-[300px] flex flex-col items-center gap-4"
            >
              <span className="text-[#a3ff3c] text-4xl md:text-5xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(163,255,60,0.3)]">
                {progress}%
              </span>
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[#a3ff3c] shadow-[0_0_15px_#a3ff3c]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>

          {/* Vignette overlay for cinematic focus */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(2,4,10,0.85) 100%)"
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

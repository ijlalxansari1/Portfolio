"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const bootLines = [
  'Initializing CMD interface...',
  'Loading terminal renderer...',
  'Applying phosphor display...',
  'Disabling GUI mode...',
  'CMD interface ready.'
];

export default function BootOverlay({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    if (isActive) {
      setVisibleLines([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootLines.length) {
          setVisibleLines(prev => [...prev, bootLines[i]]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 500);
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-[99999] flex flex-col justify-center items-start p-10 md:p-20 font-mono text-[14px] text-[#00ff41] pointer-events-none"
        >
          <div className="space-y-2">
            {visibleLines.map((line, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span>
                <span>{line}</span>
              </div>
            ))}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-[#00ff41] ml-1"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

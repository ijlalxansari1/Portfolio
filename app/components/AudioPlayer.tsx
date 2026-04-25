"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Cinematic Orchestral Track (Hans Zimmer / Avengers style ambient)
  const cinematicTrack = "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a7343e.mp3?filename=cinematic-epic-6414.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25; 
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[5000] flex items-center gap-3">
      <audio
        ref={audioRef}
        src={cinematicTrack}
        loop
      />
      
      <motion.button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={togglePlay}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 overflow-hidden ${
          isPlaying 
            ? "bg-[var(--accent)] text-black border-transparent shadow-[0_20px_50px_rgba(var(--accent-rgb),0.3)]" 
            : "bg-black/40 text-white/40 border-white/10 hover:border-white/20 backdrop-blur-2xl"
        }`}
      >
        {/* Cinematic Ripple Effect */}
        {isPlaying && (
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        )}

        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div key="playing" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <Volume2 size={24} />
            </motion.div>
          ) : (
            <motion.div key="paused" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
              <VolumeX size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {(showTooltip || isPlaying) && (
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2">
               <Shield size={10} className="text-[var(--accent)] animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
                 Cinematic Feed
               </span>
            </div>
            <span className="text-[12px] font-black text-white/60 uppercase tracking-tighter">
               {isPlaying ? "Avengers / Zimmer Ambience" : "System Audio Muted"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualizer Bars */}
      {isPlaying && (
        <div className="flex gap-1 h-4 items-end ml-4 mb-1">
          {[0.8, 0.4, 1, 0.6, 0.9].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: ["30%", "100%", "30%"] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1, ease: "easeInOut" }}
              className="w-1 bg-gradient-to-t from-[var(--accent)] to-white rounded-full shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]"
            />
          ))}
        </div>
      )}
    </div>
  );
}

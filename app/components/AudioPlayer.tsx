"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Local Cinematic Track (Hans Zimmer Interstellar Theme)
  const cinematicTrack = "/bgmusic/Hans_Zimmer_-_Interstellar_Main_Theme_OST_INTERSTELLER_(mp3.pm).mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25; 
    }

    // Attempt autoplay
    const attemptPlay = async () => {
      try {
        if (audioRef.current) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        }
      } catch (e) {
        // If autoplay fails, try muted autoplay
        try {
          if (audioRef.current) {
            audioRef.current.muted = true;
            await audioRef.current.play();
            setIsPlaying(true);
          }
        } catch (err) {
          console.log("Autoplay blocked by browser");
        }
      }
    };

    const timeout = setTimeout(() => {
      attemptPlay();
    }, 1000);

    // First user interaction to unmute and trigger audio
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        if (audioRef.current.muted) {
          audioRef.current.muted = false;
        }
        if (audioRef.current.paused) {
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.log("Play failed on interaction:", e));
        }
      }
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.muted = false;
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
        className={`relative w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-700 overflow-hidden ${
          isPlaying 
            ? "bg-[var(--accent)] text-black border-transparent shadow-[0_25px_60px_rgba(var(--accent-rgb),0.4)]" 
            : "bg-black/40 text-white/40 border-white/10 hover:border-white/20 backdrop-blur-2xl"
        }`}
      >
        {/* Advanced Circular Visualizer */}
        {isPlaying && (
          <div className="absolute inset-0">
             {[...Array(3)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ scale: 1, opacity: 0.5 }}
                 animate={{ scale: 2, opacity: 0 }}
                 transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: "easeOut" }}
                 className="absolute inset-0 border border-[var(--accent)] rounded-full"
               />
             ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div 
              key="playing" 
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }} 
              animate={{ opacity: 1, scale: 1, rotate: 0 }} 
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            >
              <Volume2 className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div 
              key="paused" 
              initial={{ opacity: 0, scale: 0.5, rotate: 90 }} 
              animate={{ opacity: 1, scale: 1, rotate: 0 }} 
              exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
            >
              <VolumeX className="w-6 h-6" />
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
            className="flex flex-col bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-ping" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent)]">
                 Sonic Field
               </span>
            </div>
            <span className="text-[12px] font-black text-white/60 uppercase tracking-tighter">
               {isPlaying ? "Interstellar Theme OST" : "Audio Infrastructure Idle"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Waveform Visualizer */}
      {isPlaying && (
        <div className="flex gap-1.5 h-6 items-center ml-4">
          {[0.8, 0.4, 1, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: ["20%", "100%", "20%"] }}
              transition={{ repeat: Infinity, duration: 0.4 + (i * 0.1), ease: "easeInOut" }}
              className="w-1 bg-gradient-to-t from-[var(--accent)] to-white/20 rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
            />
          ))}
        </div>
      )}
    </div>
  );
}

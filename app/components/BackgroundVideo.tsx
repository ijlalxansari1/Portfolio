"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function BackgroundVideo() {
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = document.getElementById("bg-video") as HTMLVideoElement;
    
    if (video) {
      video.addEventListener("loadeddata", () => setVideoLoaded(true));
    }

    // Try to play audio after user interaction
    const handleUserInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Audio autoplay prevented:", err);
        });
      }
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute and play
        audioRef.current.muted = false;
        audioRef.current.play().catch((err) => {
          console.log("Audio play failed:", err);
        });
        setIsMuted(false);
      } else {
        // Mute
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        id="bg-video"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "blur(2px) brightness(0.4)",
        }}
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      
      {/* Background Audio */}
      <audio
        ref={audioRef}
        id="bg-audio"
        loop
        muted={isMuted}
        preload="auto"
        className="hidden"
      >
        <source src="/bg-music.mp3" type="audio/mpeg" />
        <source src="/bg-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Music Control Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-30 glass p-3 rounded-full border border-neon-mint/50 text-neon-mint hover:bg-neon-mint/10 transition-all"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
    </div>
  );
}

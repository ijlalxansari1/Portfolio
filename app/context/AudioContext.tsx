"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate Audio on client side
    const audio = new Audio("/bgmusic/interstellar.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = "auto";
    audio.load();
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("playing", handlePlay);

    // Autoplay attempt
    const attemptAutoplay = async () => {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (err) {
        // Fallback to muted autoplay
        try {
          audio.muted = true;
          await audio.play();
        } catch (e) {
          console.log("Autoplay blocked");
        }
      }
    };

    const timeout = setTimeout(attemptAutoplay, 1000);

    // Unmute on first interaction
    const handleInteraction = () => {
      if (audio.muted) {
        audio.muted = false;
      }
      if (audio.paused) {
        audio.play()
          .catch(e => console.log("Play failed on interaction:", e));
      }
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });

    return () => {
      clearTimeout(timeout);
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("playing", handlePlay);
      audioRef.current = null;
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (audio.paused) {
      audio.muted = false;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Audio playback failed:", e));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

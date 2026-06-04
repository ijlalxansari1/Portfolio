"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { storage } from '../utils/storage';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  nextTrack: () => void;
  currentTrack: any | null;
  tracks: any[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFirstLoad = useRef(true);
  const { theme } = useTheme();

  useEffect(() => {
    const loadTracks = () => {
      const storedTracks = storage.get("admin-bg-music", []);
      const activeTracks = storedTracks.filter((t: any) => t.status === "Active" && t.url);
      
      if (activeTracks.length > 0) {
        setTracks(activeTracks);
        // Random track on first load
        if (isFirstLoad.current) {
          setCurrentTrackIndex(Math.floor(Math.random() * activeTracks.length));
          isFirstLoad.current = false;
        }
      } else {
        setTracks([{
          title: "Interstellar Theme OST",
          artist: "Hans Zimmer",
          url: "/bgmusic/interstellar.mp3" // Default fallback
        }]);
      }
    };

    loadTracks();
    window.addEventListener("admin-updated", loadTracks);
    return () => window.removeEventListener("admin-updated", loadTracks);
  }, []);

  useEffect(() => {
    if (tracks.length === 0) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.25;
      audioRef.current.preload = "auto";
    }

    const audio = audioRef.current;
    // Don't loop, so onended fires
    audio.loop = false;
    
    // Set src if it changed
    if (audio.src !== window.location.origin + tracks[currentTrackIndex]?.url && audio.src !== tracks[currentTrackIndex]?.url) {
      audio.src = tracks[currentTrackIndex]?.url;
      audio.load();
      if (isPlaying) {
         audio.play().catch(e => console.log("Play failed on track change:", e));
      }
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      if (tracks.length > 1) {
        setCurrentTrackIndex(prev => (prev + 1) % tracks.length);
      } else {
        audio.play().catch(e => console.log("Replay failed:", e)); // single track loop manually
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("playing", handlePlay);
    audio.addEventListener("ended", handleEnded);

    // Initial autoplay attempt (only on first load)
    if (!isPlaying && currentTrackIndex === 0 && !audio.src.includes('blob:')) {
       const attemptAutoplay = async () => {
         try {
           const playPromise = audio.play();
           if (playPromise !== undefined) {
             await playPromise;
           }
         } catch (err) {
           try {
             audio.muted = true;
             await audio.play();
           } catch (e) {
             console.log("Autoplay blocked");
           }
         }
       };
       const timeout = setTimeout(attemptAutoplay, 1000);
       return () => clearTimeout(timeout);
    }

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("playing", handlePlay);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [tracks, currentTrackIndex]);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        if (audioRef.current.muted) {
          audioRef.current.muted = false;
        }
        if (audioRef.current.paused && tracks.length > 0) {
          audioRef.current.play().catch(e => console.log("Play failed on interaction:", e));
        }
      }
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };

    window.addEventListener("pointerdown", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    window.addEventListener("scroll", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
    };
  }, [tracks]);

  // Theme-based automatic track switching
  useEffect(() => {
    if (theme === 'loki' && tracks.length > 0) {
      const lokiTrackIndex = tracks.findIndex(t => 
        (t.title && t.title.toLowerCase().includes('loki')) || 
        (t.artist && t.artist.toLowerCase().includes('loki'))
      );

      if (lokiTrackIndex !== -1) {
        setCurrentTrackIndex(lokiTrackIndex);
        
        // Force play immediately
        setIsPlaying(true);
        if (audioRef.current) {
          audioRef.current.muted = false;
          audioRef.current.play().catch(e => console.log("Theme auto-play failed:", e));
        }
      }
    }
  }, [theme, tracks]);

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

  const nextTrack = () => {
    if (tracks.length > 1) {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
  };

  const currentTrack = tracks.length > 0 ? tracks[currentTrackIndex] : null;

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, nextTrack, currentTrack, tracks }}>
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

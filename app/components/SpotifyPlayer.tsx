"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Minimize2, Maximize2, X } from "lucide-react";

interface SpotifyPlayerProps {
  playlistId?: string;
  trackId?: string;
  albumId?: string;
  artistId?: string;
  width?: string;
  height?: string;
  compact?: boolean;
}

export default function SpotifyPlayer({
  playlistId = "37i9dQZF1DXcBWIGoYBM5M", // Default: Spotify's "Today's Top Hits"
  trackId,
  albumId,
  artistId,
  width = "100%",
  height = "380",
  compact = false,
}: SpotifyPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Build Spotify embed URL
  const getSpotifyUrl = () => {
    if (trackId) {
      return `https://open.spotify.com/embed/track/${trackId}`;
    }
    if (albumId) {
      return `https://open.spotify.com/embed/album/${albumId}`;
    }
    if (artistId) {
      return `https://open.spotify.com/embed/artist/${artistId}`;
    }
    // Default to playlist
    return `https://open.spotify.com/embed/playlist/${playlistId}`;
  };

  const spotifyUrl = getSpotifyUrl();

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-20 right-6 z-40 p-4 rounded-full glass border border-neon-mint/50 text-neon-mint hover:bg-neon-mint/10 hover:border-neon-mint transition-all shadow-lg backdrop-blur-xl bg-black/40"
            aria-label="Open Spotify Player"
          >
            <Music size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Spotify Player Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "80px" : "auto"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed ${isMinimized ? "bottom-20 right-6" : "bottom-6 right-6"} z-40 w-[350px] md:w-[400px]`}
          >
            <div className="glass rounded-2xl p-4 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/60 backdrop-blur-xl shadow-2xl">
              {/* Header Controls */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Music size={20} className="text-neon-mint" />
                  <span className="text-white font-semibold text-sm">Spotify Player</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1.5 rounded-lg text-neon-mint hover:bg-neon-mint/10 transition-all"
                    aria-label={isMinimized ? "Expand player" : "Minimize player"}
                  >
                    {isMinimized ? (
                      <Maximize2 size={16} />
                    ) : (
                      <Minimize2 size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsMinimized(false);
                    }}
                    className="p-1.5 rounded-lg text-neon-mint hover:bg-neon-mint/10 transition-all"
                    aria-label="Close player"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Spotify Embed */}
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg overflow-hidden"
                >
                  <iframe
                    src={`${spotifyUrl}?utm_source=generator&theme=0&t=0`}
                    width={width}
                    height={height}
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                    style={{
                      filter: "brightness(0.95)",
                    }}
                  />
                </motion.div>
              )}

              {/* Minimized View */}
              {isMinimized && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-mint to-cyan-400 flex items-center justify-center">
                    <Music size={20} className="text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">Spotify Player</p>
                    <p className="text-gray-400 text-xs">Tap to expand</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react";

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.15); // Low default volume (15%)
    const [showControls, setShowControls] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Load user preferences
        const savedPlaying = localStorage.getItem("bgMusic_playing");
        const savedVolume = localStorage.getItem("bgMusic_volume");

        if (savedVolume) setVolume(parseFloat(savedVolume));
        if (savedPlaying === "true") {
            // Don't auto-play, wait for user interaction
            setHasInteracted(false);
        }

        // Initialize audio element
        if (typeof window !== "undefined") {
            audioRef.current = new Audio();
            // Using a public domain lofi track URL (you can replace with your own)
            audioRef.current.src = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3";
            audioRef.current.loop = true;
            audioRef.current.volume = volume;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            localStorage.setItem("bgMusic_volume", volume.toString());
        }
    }, [volume]);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
                localStorage.setItem("bgMusic_playing", "false");
            } else {
                setHasInteracted(true);
                await audioRef.current.play();
                setIsPlaying(true);
                localStorage.setItem("bgMusic_playing", "true");
            }
        } catch (error) {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (volume > 0) {
            setVolume(0);
        } else {
            setVolume(0.15);
        }
    };

    return (
        <>
            {/* Floating Music Control Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 right-6 z-40"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                {/* Main Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className={`w-14 h-14 rounded-full glass border-2 flex items-center justify-center transition-all shadow-lg ${isPlaying
                            ? "border-neon-mint/50 bg-neon-mint/10 hover:bg-neon-mint/20"
                            : "border-white/20 hover:border-white/40"
                        }`}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                    {isPlaying ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="relative"
                        >
                            <Music size={24} className="text-neon-mint" />
                            {/* Animated sound waves */}
                            <motion.div
                                className="absolute -right-1 -top-1 w-2 h-2 bg-neon-mint rounded-full"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    ) : (
                        <Play size={24} className="text-gray-400" />
                    )}
                </motion.button>

                {/* Extended Controls Panel */}
                <AnimatePresence>
                    {showControls && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-16 right-0 glass rounded-xl p-4 border border-white/10 min-w-[200px] shadow-xl backdrop-blur-xl"
                        >
                            {/* Title */}
                            <div className="flex items-center gap-2 mb-4">
                                <Music size={16} className="text-neon-mint" />
                                <span className="text-white text-sm font-medium">Ambient Music</span>
                            </div>

                            {/* Volume Control */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={toggleMute}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {volume > 0 ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                                        className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-mint"
                                        style={{
                                            background: `linear-gradient(to right, #58F3B6 0%, #58F3B6 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`,
                                        }}
                                    />
                                    <span className="text-xs text-gray-400 w-8 text-right">
                                        {Math.round(volume * 100)}%
                                    </span>
                                </div>

                                {/* Track Info */}
                                <div className="text-xs text-gray-500 pt-2 border-t border-white/10">
                                    {isPlaying ? (
                                        <div className="flex items-center gap-2">
                                            <motion.div
                                                className="w-2 h-2 bg-green-400 rounded-full"
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            <span>Now Playing: Lofi Ambient</span>
                                        </div>
                                    ) : (
                                        <span>Paused</span>
                                    )}
                                </div>

                                {/* Quick Presets */}
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => setVolume(0.05)}
                                        className="flex-1 px-2 py-1 text-xs glass rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Low
                                    </button>
                                    <button
                                        onClick={() => setVolume(0.15)}
                                        className="flex-1 px-2 py-1 text-xs glass rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Med
                                    </button>
                                    <button
                                        onClick={() => setVolume(0.30)}
                                        className="flex-1 px-2 py-1 text-xs glass rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        High
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulsing Indicator (when playing) */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-neon-mint/30"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                    />
                )}
            </motion.div>

            {/* First-time user hint */}
            {!hasInteracted && !isPlaying && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 3 }}
                        className="fixed bottom-24 right-6 z-39 glass rounded-lg px-4 py-2 border border-neon-mint/30 max-w-xs"
                    >
                        <p className="text-xs text-gray-300">
                            <Music size={12} className="inline mr-1 text-neon-mint" />
                            Click to play ambient music while browsing
                        </p>
                        <button
                            onClick={() => setHasInteracted(true)}
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-xs text-gray-400 hover:text-white"
                        >
                            ×
                        </button>
                    </motion.div>
                </AnimatePresence>
            )}
        </>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

function DataSphere() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#1899d6" 
          wireframe 
          emissive="#1cb0f6" 
          emissiveIntensity={0.5} 
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh scale={0.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial 
          color="#0f172a" 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.9} 
          roughness={0.1} 
          distort={0.4} 
          speed={3} 
        />
      </mesh>
    </Float>
  );
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
      const exitTimer = setTimeout(onComplete, 800); // Allow exit animation to play
      return () => clearTimeout(exitTimer);
    }
  }, [isFinished, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 3D Background */}
          <div className="absolute inset-0 w-full h-full opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} color="#1899d6" />
              <pointLight position={[-10, -10, -5]} intensity={1} color="#ff9600" />
              <DataSphere />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>

          {/* Cinematic UI Overlay */}
          <div className="relative z-10 flex flex-col items-center max-w-[80vw]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
              <h1 className="text-white text-xl md:text-3xl font-black uppercase tracking-[0.3em] font-sans text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                Initializing DataOps
              </h1>
              <p className="text-[var(--text-muted)] mt-2 text-xs md:text-sm font-mono tracking-widest uppercase">
                Establishing secure connection...
              </p>
            </motion.div>

            {/* Progress Bar & Counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 w-full max-w-[300px] flex flex-col items-center gap-4"
            >
              <span className="text-[var(--accent)] text-4xl md:text-5xl font-black tracking-tighter">
                {progress}%
              </span>
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </div>

          {/* Noise / Grain overlay for cinematic feel */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const { theme } = useTheme();

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      
      const isPointerElement = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;

      setIsPointer(isPointerElement);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const showLokiCursor = theme === "loki" || theme === "tva" || theme === "void";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {showLokiCursor && (
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1024px) {
            * { cursor: none !important; }
          }
        `}} />
      )}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: "var(--accent)",
          mixBlendMode: showLokiCursor ? "normal" : "difference"
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          backgroundColor: isPointer ? "rgba(var(--accent-rgb), 0.1)" : "transparent",
        }}
      />
      {showLokiCursor ? (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[10000] hidden lg:block drop-shadow-[0_0_12px_rgba(var(--accent-rgb),1)]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-20%",
            translateY: "-20%",
          }}
          animate={{
            scale: isPointer ? 1.2 : 1,
          }}
        >
          <img src="/loki/sweezy-pointer.png" alt="Loki Cursor" className="w-full h-full object-contain" />
        </motion.div>
      ) : (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] hidden lg:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            backgroundColor: "var(--accent)",
          }}
        />
      )}
    </>
  );
}

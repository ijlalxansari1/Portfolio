"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring animation for smooth cursor movement
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        setIsMounted(true);

        // Check if device supports hover (not touch device)
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (!hasHover) {
            setIsHidden(true);
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            setIsHidden(false);
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Check if hovering over interactive element
            const target = e.target as HTMLElement;
            const interactive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(Boolean(interactive));
        };

        const hideCursor = () => setIsHidden(true);
        const showCursor = () => setIsHidden(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseleave', hideCursor);
        window.addEventListener('mouseenter', showCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseleave', hideCursor);
            window.addEventListener('mouseenter', showCursor);
        };
    }, [cursorX, cursorY]);

    if (!isMounted || isHidden) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isPointer ? 1.5 : 1,
                        opacity: isPointer ? 0.8 : 1,
                    }}
                    transition={{ duration: 0.15 }}
                    className="relative"
                    style={{
                        width: '12px',
                        height: '12px',
                        marginLeft: '-6px',
                        marginTop: '-6px',
                    }}
                >
                    {/* Center dot */}
                    <div className="absolute inset-0 bg-neon-mint rounded-full" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-neon-mint rounded-full blur-sm opacity-50" />
                </motion.div>
            </motion.div>

            {/* Cursor ring/trail */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    animate={{
                        scale: isPointer ? 1.8 : 1,
                        opacity: isPointer ? 0.3 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                    style={{
                        width: '32px',
                        height: '32px',
                        marginLeft: '-16px',
                        marginTop: '-16px',
                    }}
                >
                    {/* Outer ring */}
                    <div className="absolute inset-0 border-2 border-neon-mint rounded-full" />

                    {/* Animated pulse ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                        className="absolute inset-0 border border-neon-mint rounded-full"
                    />
                </motion.div>
            </motion.div>

            {/* Trail effect - multiple dots following cursor */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed top-0 left-0 pointer-events-none z-[9997]"
                    style={{
                        x: cursorXSpring,
                        y: cursorYSpring,
                    }}
                >
                    <motion.div
                        animate={{
                            scale: isPointer ? 0 : 1 - (i * 0.2),
                            opacity: isPointer ? 0 : 0.3 - (i * 0.1),
                        }}
                        transition={{
                            duration: 0.1 + (i * 0.05),
                            delay: i * 0.03,
                        }}
                        className="bg-neon-mint rounded-full blur-sm"
                        style={{
                            width: `${8 - i * 2}px`,
                            height: `${8 - i * 2}px`,
                            marginLeft: `${-4 + i}px`,
                            marginTop: `${-4 + i}px`,
                        }}
                    />
                </motion.div>
            ))}

            {/* Click ripple effect */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }

        @media (hover: none) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
        </>
    );
}

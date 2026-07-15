"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useMotionValue, useSpring } from "framer-motion";

export default function TemporalRadiation() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Use spring physics to smooth out the velocity readings
  const distortion = useMotionValue(0);
  const smoothDistortion = useSpring(distortion, {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
  });

  useEffect(() => {
    setIsClient(true);
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = Math.abs(currentScrollY - lastScrollY);
          
          // Calculate a normalized distortion value based on scroll speed
          // Cap it at around 1.0 for maximum readable distortion
          const currentVelocity = Math.min(delta * 0.05, 1.0);
          
          distortion.set(currentVelocity);
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Decay the distortion back to zero when not scrolling
    const decayInterval = setInterval(() => {
      const current = distortion.get();
      if (current > 0) {
        distortion.set(Math.max(0, current - 0.1));
      }
    }, 50);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(decayInterval);
    };
  }, [distortion]);

  useEffect(() => {
    // Apply CSS variables to the root based on framer-motion spring updates
    return smoothDistortion.on("change", (latest) => {
      document.documentElement.style.setProperty("--temporal-distortion", latest.toString());
      
      // Calculate derived values for the CSS filter
      const blurAmt = latest * 3; // Max 3px blur
      const hueShift = latest * 45; // Max 45deg hue shift
      const saturate = 100 + (latest * 100); // Max 200% saturation
      
      // We only apply this heavy filter if distortion is noticeable to save performance
      // Disabled on mobile devices (width <= 768px) to prevent blurry scrolling and lag
      if (latest > 0.05 && window.innerWidth > 768) {
        document.body.style.filter = `blur(${blurAmt}px) hue-rotate(${hueShift}deg) saturate(${saturate}%)`;
      } else {
        document.body.style.filter = "none";
      }
    });
  }, [smoothDistortion]);

  if (!isClient) return null;

  return (
    <>
      {/* Optional: Add an SVG filter for actual chromatic aberration if we want it to look even crazier */}
      <svg className="hidden">
        <defs>
          <filter id="chromatic-aberration">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="SourceGraphic" result="red" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" in="SourceGraphic" result="green" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" in="SourceGraphic" result="blue" />
            <feOffset in="red" dx="var(--temporal-distortion, 0)" dy="0" result="red-shifted" />
            <feOffset in="blue" dx="calc(var(--temporal-distortion, 0) * -1)" dy="0" result="blue-shifted" />
            <feBlend mode="screen" in="red-shifted" in2="green" result="rg" />
            <feBlend mode="screen" in="rg" in2="blue-shifted" result="color" />
          </filter>
        </defs>
      </svg>
    </>
  );
}

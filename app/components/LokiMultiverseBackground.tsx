"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

export default function LokiMultiverseBackground() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlipping, setIsSlipping] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSlideRef = useRef(0);
  
  const slides = [
    '/loki/slide1.png', // The Void
    '/loki/slide2.png', // Looking up
    '/loki/slide3.png', // Asteroid
    '/loki/slide4.png', // Citadel Window
    '/loki/slide5.png', // Yggdrasil
  ];

  // Scroll tracking to change slides
  useEffect(() => {
    if (theme !== "loki") return;

    const handleScroll = () => {
      const scrollPanel = document.getElementById('content-scroll-panel');
      let scrollTop = 0;
      let scrollHeight = 1;
      let clientHeight = 1;

      // Detect if we are on desktop (custom scroll panel) or mobile (window scroll)
      if (window.innerWidth >= 1024 && scrollPanel) {
        scrollTop = scrollPanel.scrollTop;
        scrollHeight = scrollPanel.scrollHeight;
        clientHeight = scrollPanel.clientHeight;
      } else {
        scrollTop = window.scrollY;
        scrollHeight = document.documentElement.scrollHeight;
        clientHeight = window.innerHeight;
      }
      
      const maxScroll = Math.max(1, scrollHeight - clientHeight);
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      
      // Map progress to slide index
      const slideIndex = Math.min(slides.length - 1, Math.floor(progress * slides.length));
      
      if (slideIndex !== lastSlideRef.current) {
        lastSlideRef.current = slideIndex;
        setCurrentSlide(slideIndex);
        
        // Trigger Time Slipping Glitch effect when a transition happens!
        setIsSlipping(true);
        setTimeout(() => setIsSlipping(false), 800); // Glitch lasts 800ms
      }
    };

    const scrollPanel = document.getElementById('content-scroll-panel');
    if (scrollPanel) {
      scrollPanel.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      if (scrollPanel) scrollPanel.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [theme, slides.length]);

  // Ambient Canvas Magic
  useEffect(() => {
    if (theme !== "loki") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    class MagicEmber {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      life: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.8 + 0.2); 
        this.life = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.8 ? "245, 158, 11" : "16, 185, 129"; 
      }

      update() {
        this.x += this.vx + Math.sin(this.life) * 0.2;
        this.y += this.vy;
        this.life += 0.01;

        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
        }
      }

      draw(ctx: CanvasRenderingContext2D, isSlipping: boolean) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // If time slipping, the magic glows intensely and erratically
        const pulse = isSlipping ? Math.random() : (Math.sin(this.life * 2) + 1) / 2;
        ctx.fillStyle = `rgba(${this.color}, ${pulse * 0.8})`; 
        ctx.shadowBlur = isSlipping ? 20 : 8;
        ctx.shadowColor = `rgb(${this.color})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const embers: MagicEmber[] = [];
    for (let i = 0; i < 150; i++) embers.push(new MagicEmber());

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Read current state from ref to avoid closure staleness if we were using it, 
      // but we need to pass isSlipping from state. We'll read the DOM class for a sync check
      const slipping = document.body.classList.contains('loki-slipping');

      if (slipping) {
        // Temporal Glitch Canvas Artifacts
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(16, 185, 129, ${Math.random() * 0.15})`;
          ctx.fillRect(0, 0, width, height);
        }
        
        // Draw chromatic tear lines
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 0, 0, 0.4)" : "rgba(0, 100, 255, 0.4)";
          ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 400 + 100, Math.random() * 5 + 1);
        }
      }

      for (const e of embers) {
        e.update();
        e.draw(ctx, slipping);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  // Sync isSlipping state to body class so canvas can read it without React re-binding the RAF
  useEffect(() => {
    if (isSlipping) {
      document.body.classList.add('loki-slipping');
    } else {
      document.body.classList.remove('loki-slipping');
    }
    return () => document.body.classList.remove('loki-slipping');
  }, [isSlipping]);

  if (theme !== "loki") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cinematic-zoom {
          0% { transform: scale(1); filter: brightness(0.7) contrast(1.1); }
          100% { transform: scale(1.08); filter: brightness(1) contrast(1.15); }
        }
        .slide-anim {
          animation: cinematic-zoom 15s ease-out forwards;
        }

        @keyframes time-slip-glitch {
          0% { transform: translate(0) scale(1.05); filter: hue-rotate(0deg); opacity: 1; }
          10% { transform: translate(-10px, 5px) scale(1.08); filter: hue-rotate(-90deg) contrast(1.5); opacity: 0.8; }
          20% { transform: translate(15px, -10px) scale(1.05); filter: invert(0.2); opacity: 0.9; }
          30% { transform: translate(-5px, 15px) scale(1.1); filter: hue-rotate(90deg) saturate(3); opacity: 0.7; }
          40% { transform: translate(10px, -5px) scale(1.05); filter: contrast(2.5); opacity: 1; }
          50% { transform: translate(0) scale(1.05); filter: hue-rotate(0deg); opacity: 1; }
          100% { transform: translate(0) scale(1.05); filter: hue-rotate(0deg); opacity: 1; }
        }

        .glitch-active {
          animation: time-slip-glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          mix-blend-mode: color-dodge;
        }
      `}} />
      
      <div className="fixed inset-0 bg-[#02040A] z-[-4] pointer-events-none" />

      {/* Main Slideshow Layer */}
      {slides.map((src, index) => (
        <div
          key={src}
          className={`fixed inset-0 pointer-events-none z-[-3] transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-90 slide-anim" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Time Slipping Glitch Clone Layer */}
      {isSlipping && (
        <div
          className="fixed inset-0 pointer-events-none z-[-2] glitch-active"
          style={{
            backgroundImage: `url('${slides[currentSlide]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
          }}
        />
      )}

      {/* Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-2] transition-opacity duration-1000"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(2,4,10,0.85) 100%)"
        }}
      />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-1] mix-blend-screen"
      />
    </>
  );
}

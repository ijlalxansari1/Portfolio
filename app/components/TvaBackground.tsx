"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

export default function TvaBackground() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSlideRef = useRef(0);
  
  const slides = [
    '/tva/tva1.png', // Void Lantern
    '/tva/tva2.png', // Elevator
    '/tva/tva3.png', // Time Vault
    '/tva/tva4.png', // Miss Minutes Room
    '/tva/tva5.png', // Temporal Loom
    '/tva/tva6.png', // Vault
    '/tva/tva7.png', // Spaghettification
    '/tva/tva8.png', // Loki God of Stories
    '/tva/tva9.png', // Loom Explosion
    '/tva/tva10.png', // Miss Minutes Screen
    '/tva/tva11.png', // Time Keepers
    '/tva/tva12.png', // TVA Retro Monitor Branches
    '/tva/tva13.png', // Citadel End of Time Void Green Skies
    '/tva/tva14.png', // Void Ruined Ship
  ];

  // Scroll tracking to change slides
  useEffect(() => {
    if (theme !== "tva") return;

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
      }
    };

    const scrollPanel = document.getElementById('content-scroll-panel');
    if (scrollPanel) {
      scrollPanel.addEventListener("scroll", handleScroll, { passive: true });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      if (scrollPanel) scrollPanel.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [theme, slides.length]);

  // Ambient TVA Canvas Magic (Dust + CRT effects)
  useEffect(() => {
    if (theme !== "tva") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const mouse = { x: width / 2, y: height / 2, isDragging: false };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseDown = () => (mouse.isDragging = true);
    const handleMouseUp = () => (mouse.isDragging = false);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
         mouse.x = e.touches[0].clientX;
         mouse.y = e.touches[0].clientY;
         mouse.isDragging = true;
      }
    };
    const handleTouchEnd = () => { mouse.isDragging = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    class TimeDust {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      opacity: number;
      pulseRate: number;
      life: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2 - 0.1; 
        this.opacity = Math.random() * 0.4 + 0.1;
        this.pulseRate = Math.random() * 0.05 + 0.01;
        this.life = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life += this.pulseRate;

        // Mouse interaction for dust (subtle push)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
           this.x -= (dx / dist) * 2;
           this.y -= (dy / dist) * 2;
        }

        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const currentOpacity = this.opacity * ((Math.sin(this.life) + 1) / 2 + 0.2);
        ctx.fillStyle = `rgba(255, 140, 0, ${currentOpacity})`; // Amber/Orange TVA color
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255, 140, 0, 0.6)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class TVATimelineBranch {
      x: number;
      y: number;
      length: number;
      speed: number;
      amplitude: number;
      frequency: number;
      phase: number;
      opacity: number;
      width: number;
      
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      
      reset() {
        this.x = Math.random() * width;
        this.y = height + 200;
        this.length = Math.random() * 400 + 200; 
        this.speed = Math.random() * 1.5 + 0.5; 
        this.amplitude = Math.random() * 1.5; // Almost perfectly straight branches
        this.frequency = Math.random() * 0.003 + 0.001; 
        this.phase = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.width = Math.random() * 3 + 1;
      }
      
      update() {
        this.y -= this.speed;
        this.phase += this.frequency;
        if (this.y < -this.length) this.reset();
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        
        for (let i = 0; i < this.length; i += 20) {
          const pastPhase = this.phase - (i * this.frequency * 0.8);
          let px = this.x + Math.sin(pastPhase) * this.amplitude;
          let py = this.y + i;

          // Mouse pull
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullRadius = mouse.isDragging ? 400 : 200;
          const maxForce = mouse.isDragging ? 50 : 15; // Much lower pull to prevent tangling
          
          if (dist < pullRadius) {
             const force = (1 - dist / pullRadius) * maxForce;
             px += (dx / dist) * force;
             py += (dy / dist) * force;
          }

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        
        const grad = ctx.createLinearGradient(0, this.y, 0, this.y + this.length);
        grad.addColorStop(0, `rgba(255, 140, 0, 0)`);
        grad.addColorStop(0.2, `rgba(255, 160, 0, ${this.opacity})`);
        grad.addColorStop(0.8, `rgba(255, 120, 0, ${this.opacity * 0.8})`);
        grad.addColorStop(1, `rgba(255, 140, 0, 0)`);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 140, 0, 0.5)";
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 60 : 150;
    const numBranches = isMobile ? 10 : 25;

    const particles: TimeDust[] = [];
    for (let i = 0; i < numParticles; i++) particles.push(new TimeDust());
    
    const branches: TVATimelineBranch[] = [];
    for (let i = 0; i < numBranches; i++) branches.push(new TVATimelineBranch());
    
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // CRT Scanlines Effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      for (let i = 0; i < height; i += 4) {
        ctx.fillRect(0, i, width, 1);
      }
      
      // Moving subtle scanline bar
      const scanlineY = (time * 2) % height;
      const scanlineGrad = ctx.createLinearGradient(0, scanlineY - 20, 0, scanlineY + 20);
      scanlineGrad.addColorStop(0, "transparent");
      scanlineGrad.addColorStop(0.5, "rgba(255, 140, 0, 0.03)");
      scanlineGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanlineGrad;
      ctx.fillRect(0, scanlineY - 20, width, 40);

      // Draw branches
      for (const b of branches) {
        b.update();
        b.draw(ctx);
      }

      // Draw dust
      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }

      // MOUSE GLOW EFFECT
      if (mouse.x > 0 && mouse.y > 0) {
        const glowRadius = mouse.isDragging ? 300 : 150;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        grad.addColorStop(0, "rgba(255, 140, 0, 0.15)"); // TVA Orange/Amber
        grad.addColorStop(1, "rgba(255, 140, 0, 0)");
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
      
      // Static noise grain (subtle)
      const imageData = ctx.createImageData(width, height);
      // We won't draw full screen noise as it is too heavy, we'll use CSS for heavy grain
      
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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [theme]);

  if (theme !== "tva") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tva-zoom {
          0% { transform: scale(1); filter: sepia(0.5) contrast(1.1) saturate(1.2); }
          100% { transform: scale(1.05); filter: sepia(0.3) contrast(1.2) saturate(1.4); }
        }
        .tva-anim {
          animation: tva-zoom 20s ease-out forwards;
        }
        
        .tva-crt-overlay {
          pointer-events: none;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          background-size: 100% 4px, 6px 100%;
          z-index: -1;
        }
      `}} />
      
      <div className="fixed inset-0 bg-[#1c140d] z-[-4] pointer-events-none" />

      {/* Main Slideshow Layer */}
      {slides.map((src, index) => (
        <div
          key={src}
          className={`fixed inset-0 pointer-events-none z-[-3] transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-90 tva-anim" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      

      {/* Vintage Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-2] transition-opacity duration-1000 mix-blend-multiply"
        style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(20, 10, 0, 0.9) 100%)"
        }}
      />
      
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 tva-crt-overlay mix-blend-overlay opacity-70" />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-1] mix-blend-screen"
      />
    </>
  );
}

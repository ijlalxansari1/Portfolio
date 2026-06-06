"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

export default function LokiMultiverseBackground() {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlipping, setIsSlipping] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 1024);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSlideRef = useRef(0);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const slides = [
    '/tva/tva1.png', // Void Lantern
    '/loki/slide1.png', // The Void
    '/tva/tva14.png', // Void Ruined Ship
    '/tva/tva13.png', // Citadel Void Green Skies
    '/loki/slide4.png', // Citadel Window
    '/images/loki-slide6.png', // Citadel inside looking up (NEW)
    '/images/loki-slide8.png', // Citadel outside green aura (NEW)
    '/images/loki-slide1.png', // He Who Remains
    '/images/loki-slide4.png', // Alioth Diorama
    '/images/loki-slide7.png', // Void landscape (gloomy) (NEW)
    '/images/loki-slide2.png', // Sylvie Magic
    '/images/loki-slide3.png', // Loki & Sylvie
    '/images/loki-slide5.png', // Loki Flaming Sword
    '/tva/tva8.png', // Loki God of Stories
    '/loki/slide6.png', // Yggdrasil Tree
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
        
        // Trigger Time Slipping Glitch effect when a transition happens! (Desktop only)
        if (window.innerWidth >= 1024) {
          setIsSlipping(true);
          setTimeout(() => setIsSlipping(false), 800); // Glitch lasts 800ms
        }
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
      x!: number;
      y!: number;
      size!: number;
      vx!: number;
      vy!: number;
      life!: number;
      color!: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = -(Math.random() * 0.8 + 0.2); 
        this.life = Math.random() * Math.PI * 2;
        this.color = Math.random() > 0.5 ? "16, 163, 74" : "248, 250, 252"; // Deep Green / White
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

    // Elegant Golden Timelines flowing up the void
    class TimelineThread {
      x!: number;
      y!: number;
      length!: number;
      speed!: number;
      amplitude!: number;
      frequency!: number;
      phase!: number;
      opacity!: number;
      width!: number;
      lifeEnergy!: number;
      subBranches!: { offset: number, side: number, length: number, phaseOffset: number }[];
      
      constructor() {
        this.reset();
        this.y = Math.random() * height; // Distribute initially
      }
      
      reset() {
        this.x = Math.random() * width;
        this.y = height + 200;
        this.length = Math.random() * 500 + 300; 
        this.speed = Math.random() * 2.5 + 1.0; 
        this.amplitude = Math.random() * 1.5; // Almost perfectly straight branches
        this.frequency = Math.random() * 0.005 + 0.002; 
        this.phase = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.4 + 0.1; 
        this.width = Math.random() * 2.0 + 1.0; // Slightly thicker
        this.lifeEnergy = 0; // Starts as decaying ash
        this.subBranches = [];
        const numBranches = Math.floor(Math.random() * 3); 
        for (let i = 0; i < numBranches; i++) {
          this.subBranches.push({
            offset: Math.random() * 0.6 + 0.2, // 20% to 80% along the length
            side: Math.random() > 0.5 ? 1 : -1,
            length: Math.random() * 100 + 50,
            phaseOffset: Math.random() * Math.PI
          });
        }
      }
      
      update() {
        this.y -= this.speed;
        this.phase += this.frequency;
        if (this.y < -this.length) this.reset();
      }
      
      draw(ctx: CanvasRenderingContext2D, isSlipping: boolean) {
        let minDistanceToCursor = Infinity;
        const pathPoints: {px: number, py: number}[] = [];
        
        // Calculate main branch path
        for (let i = 0; i < this.length; i += 10) {
          const pastPhase = this.phase - (i * this.frequency * 0.8);
          
          let px = this.x + Math.sin(pastPhase) * this.amplitude;
          let py = this.y + i;

          // Plucking a string effect
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDistanceToCursor) minDistanceToCursor = dist;

          const hoverRadius = mouse.isDragging ? 350 : 200;
          if (dist < hoverRadius) {
             const force = 1 - dist / hoverRadius; 
             // Oscillates like a plucked string, dampening as it gets further from the mouse Y
             const pluckWave = Math.sin(time * 0.4 - Math.abs(dy) * 0.02) * (force * 15);
             px += pluckWave;
          }

          pathPoints.push({px, py});
        }

        // Restore life energy if touched
        const touchRadius = mouse.isDragging ? 800 : 400;
        if (minDistanceToCursor < touchRadius) {
           this.lifeEnergy = Math.min(1, this.lifeEnergy + 0.05); // Rapidly come back to life
           
           // Massive spark generation when alive
           if (Math.random() < 0.4 && embers.length < 400) {
              const numSparks = Math.floor(Math.random() * 4) + 1;
              for (let k = 0; k < numSparks; k++) {
                const p = pathPoints[Math.floor(Math.random() * pathPoints.length)];
                const ember = new MagicEmber();
                ember.x = p.px + (Math.random() - 0.5) * 40; // Spread out sparks
                ember.y = p.py + (Math.random() - 0.5) * 40;
                embers.push(ember);
              }
           }
        } else {
           this.lifeEnergy = Math.max(0, this.lifeEnergy - 0.002); // Slowly decay back to ash
        }
        
        ctx.beginPath();
        if (pathPoints.length > 0) {
          ctx.moveTo(pathPoints[0].px, pathPoints[0].py);
          for (let i = 1; i < pathPoints.length; i++) {
            ctx.lineTo(pathPoints[i].px, pathPoints[i].py);
          }
        }
        
        // Draw sub-branches
        for (const sub of this.subBranches) {
          const startIdx = Math.floor(sub.offset * pathPoints.length);
          if (startIdx < pathPoints.length) {
            const startP = pathPoints[startIdx];
            ctx.moveTo(startP.px, startP.py);
            for (let j = 0; j < sub.length; j += 10) {
               // Curve outwards from the main branch
               const subPhase = this.phase + sub.phaseOffset - (j * this.frequency * 1.5);
               const outX = startP.px + Math.sin(subPhase) * this.amplitude * 0.5 + (j * sub.side * 0.5);
               const outY = startP.py - j * 0.8;
               ctx.lineTo(outX, outY);
            }
          }
        }
        
        const grad = ctx.createLinearGradient(0, this.y, 0, this.y + this.length);
        const alpha = isSlipping ? Math.min(1, this.opacity * 5) : this.opacity;
        
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        if (this.lifeEnergy > 0.1) {
           // Glowing vibrant darker green magic
           const e = this.lifeEnergy;
           grad.addColorStop(0, `rgba(16, 163, 74, 0)`);
           grad.addColorStop(0.2, `rgba(20, 180, 120, ${alpha * e})`); // Darker Cyan-green
           grad.addColorStop(0.5, `rgba(16, 163, 74, ${alpha * 1.5 * e})`); // Darker Emerald Green
           grad.addColorStop(0.8, `rgba(120, 200, 20, ${alpha * 0.8 * e})`); // Darker Lime/Gold
           grad.addColorStop(1, `rgba(16, 163, 74, 0)`);
           
           // Disable shadowBlur as we are manually doing glows with globalAlpha which is faster
           ctx.shadowBlur = 0;
           ctx.setLineDash([]); // Solid life line
           
           // GLOWING ECHOES OF TIME (Multiple stroke layers)
           ctx.strokeStyle = grad;
           ctx.globalCompositeOperation = "screen";
           
           // Outer Glow (Optimized from 3 to 2 layers)
           ctx.lineWidth = this.width * 4;
           ctx.globalAlpha = 0.4;
           ctx.stroke();
           
           // Core Line
           ctx.lineWidth = this.width * 1.5;
           ctx.globalAlpha = 1.0;
           ctx.stroke();
           
           ctx.globalCompositeOperation = "source-over";
           
        } else {
           // Dying, flaky, black, grey, decaying ash
           grad.addColorStop(0, `rgba(50, 50, 50, 0)`);
           grad.addColorStop(0.2, `rgba(100, 100, 100, ${alpha})`); // Ash Grey
           grad.addColorStop(0.8, `rgba(40, 40, 40, ${alpha})`); // Dark Ash
           grad.addColorStop(1, `rgba(20, 20, 20, 0)`);
           
           ctx.shadowBlur = 0;
           // Decaying ash lines are broken and flaky
           ctx.setLineDash([Math.random() * 5 + 2, Math.random() * 8 + 4]); 
           
           ctx.strokeStyle = grad;
           ctx.lineWidth = this.width * 1.5; // Thicker dead branches
           ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
        ctx.setLineDash([]); // Reset dash for other elements
      }
    }

    // Swirling Timeline branches that orbit the mouse
    class OrbitalTimeline {
      history!: {x: number, y: number}[];
      radius!: number;
      angle!: number;
      speed!: number;
      width!: number;
      opacity!: number;

      constructor() {
        this.radius = Math.random() * 60 + 20; // Orbit distance
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (Math.random() - 0.5) * 0.08 + 0.02; // Rotation speed
        this.width = Math.random() * 2 + 1.5;
        this.opacity = (Math.random() * 0.5 + 0.3) * 1.5;
        this.history = [];
      }

      update() {
        this.angle += this.speed;
        
        // Target position orbits the mouse
        const currentRadius = mouse.isDragging ? this.radius * 0.2 : this.radius;
        const currentSpeed = mouse.isDragging ? this.speed * 3 : this.speed;
        this.angle += currentSpeed;
        
        const targetX = mouse.x + Math.cos(this.angle) * currentRadius;
        const targetY = mouse.y + Math.sin(this.angle) * currentRadius;

        this.history.unshift({ x: targetX, y: targetY });
        if (this.history.length > 25) { // Trail length
          this.history.pop();
        }
      }

      draw(ctx: CanvasRenderingContext2D, isSlipping: boolean) {
        if (this.history.length < 2) return;
        
        ctx.beginPath();
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          // Smooth the trail slightly
          const xc = (this.history[i].x + this.history[i - 1].x) / 2;
          const yc = (this.history[i].y + this.history[i - 1].y) / 2;
          ctx.quadraticCurveTo(this.history[i - 1].x, this.history[i - 1].y, xc, yc);
        }

        let alpha = isSlipping ? Math.min(1, this.opacity * 2) : this.opacity;
        if (mouse.isDragging) alpha = Math.min(1, alpha * 2.5);
        
        // The orbiting branches are always "touched", so they are constantly bursting with life
        const grad = ctx.createLinearGradient(this.history[0].x, this.history[0].y, this.history[this.history.length-1].x, this.history[this.history.length-1].y);
        grad.addColorStop(0, `rgba(0, 255, 255, ${alpha})`); // Cyan
        grad.addColorStop(0.5, `rgba(16, 255, 90, ${alpha})`); // Green Magic
        grad.addColorStop(1, `rgba(255, 215, 0, 0)`); // Gold fading out
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = mouse.isDragging ? this.width * 2.5 : this.width * 1.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        // Removed expensive shadowBlur for orbitals to save performance
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, radius: 200, isDragging: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    
    const handleMouseDown = () => (mouse.isDragging = true);
    const handleMouseUp = () => (mouse.isDragging = false);

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
         mouse.targetX = e.touches[0].clientX;
         mouse.targetY = e.touches[0].clientY;
         mouse.isDragging = true;
      }
    };
    const handleTouchEnd = () => { mouse.isDragging = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const numEmbers = 90;
    const numThreads = 40;
    const numOrbitals = 6;

    const embers: MagicEmber[] = [];
    for (let i = 0; i < numEmbers; i++) embers.push(new MagicEmber());
    
    const threads: TimelineThread[] = [];
    for (let i = 0; i < numThreads; i++) threads.push(new TimelineThread());

    const orbitals: OrbitalTimeline[] = [];
    for (let i = 0; i < numOrbitals; i++) orbitals.push(new OrbitalTimeline());

    let animationFrameId: number;
    let time = 0;
    // Cache bg color to avoid getComputedStyle layout thrashing
    let cachedBgColor = "#02040a";
    const updateColors = () => {
      try {
        cachedBgColor = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim();
      } catch(e) {}
    };
    updateColors();
    const colorInterval = setInterval(updateColors, 1000);

    const render = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const slipping = document.body.classList.contains('loki-slipping');

      // 1. Draw volumetric mouse hover light
      ctx.save();
      const baseRadius = mouse.isDragging ? mouse.radius * 4 : mouse.radius * 2.5;
      // Add a magical pulsing animation to the Loki energy glow
      const pulse = Math.sin(time * 0.05) * 40;
      const currentRadius = baseRadius + pulse;

      const lightGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0, mouse.x, mouse.y, currentRadius
      );
      // Golden magical energy glow that intensifies during a time slip
      let intensity = slipping ? 0.25 : 0.12;
      if (mouse.isDragging) intensity = 0.35;
      lightGrad.addColorStop(0, `rgba(16, 163, 74, ${intensity})`);
      lightGrad.addColorStop(0.5, `rgba(16, 163, 74, ${intensity * 0.4})`);
      lightGrad.addColorStop(1, "transparent");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      if (slipping) {
        // Temporal Glitch Canvas Artifacts
        if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(16, 163, 74, ${Math.random() * 0.15})`;
          ctx.fillRect(0, 0, width, height);
        }
        
        for (let i = 0; i < 5; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 0, 0, 0.4)" : "rgba(0, 100, 255, 0.4)";
          ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 400 + 100, Math.random() * 5 + 1);
        }
      }

      // Draw background timelines
      for (const t of threads) {
        t.update();
        t.draw(ctx, slipping);
      }

      // Draw orbital timelines following mouse
      for (const o of orbitals) {
        o.update();
        o.draw(ctx, slipping);
      }

      // Draw foreground magic embers
      for (const e of embers) {
        e.update();
        e.draw(ctx, slipping);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(colorInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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
      {isMobile ? (
        <div
          className="fixed inset-0 pointer-events-none z-[-3] opacity-90"
          style={{
            backgroundImage: `url('/loki/yggdrasil.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        slides.map((src, index) => (
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
        ))
      )}

      {/* Time Slipping Glitch Clone Layer */}
      {!isMobile && isSlipping && (
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

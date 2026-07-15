"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // High-performance theme reference to keep animation loop fast and sync-safe
  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.innerWidth < 1024) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with target interpolation
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 165,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      initGrass();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Grass Blade Structure
    class GrassBlade {
      x: number;
      y: number;
      height: number;
      width: number;
      angle: number;
      swaySpeed: number;
      swayMax: number;
      phase: number;
      color: string;
      controlOffset: number;

      constructor(
        x: number,
        y: number,
        height: number,
        width: number,
        color: string,
        swaySpeed: number,
        swayMax: number
      ) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.swaySpeed = swaySpeed;
        this.swayMax = swayMax;
        this.phase = Math.random() * Math.PI * 2;
        this.angle = 0;
        this.controlOffset = Math.random() * 14 - 7;
      }

      update(time: number) {
        // Natural swaying motion
        const wind = Math.sin(time * this.swaySpeed + this.phase) * this.swayMax;

        const tipX = this.x + Math.sin(this.angle) * this.height;
        const tipY = this.y - Math.cos(this.angle) * this.height;

        const dx = mouse.x - tipX;
        const dy = mouse.y - tipY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let bend = 0;

        // Move away from mouse on cursor hover
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 35;
          const direction = dx > 0 ? -1 : 1;
          bend = direction * force;
        }

        this.angle = (wind * Math.PI) / 180 + (bend * Math.PI) / 180;
      }

      draw(ctx: CanvasRenderingContext2D, isGhost: boolean) {
        ctx.save();
        
        // Glass Blades dynamic color replacement
        ctx.fillStyle = isGhost 
          ? this.color.replace("rgba(18, 30, 60,", "rgba(45, 95, 200, 0.2")
                      .replace("rgba(10, 18, 38,", "rgba(35, 75, 180, 0.35")
                      .replace("rgba(3, 5, 12,", "rgba(20, 50, 140, 0.6")
          : this.color;
          
        ctx.beginPath();
        ctx.moveTo(this.x - this.width / 2, this.y);

        const tipX = this.x + Math.sin(this.angle) * this.height;
        const tipY = this.y - Math.cos(this.angle) * this.height;

        const ctrlX = this.x + Math.sin(this.angle * 0.5) * (this.height * 0.5) + this.controlOffset;
        const ctrlY = this.y - Math.cos(this.angle * 0.5) * (this.height * 0.5);

        ctx.quadraticCurveTo(ctrlX - this.width * 0.2, ctrlY, tipX, tipY);
        ctx.quadraticCurveTo(ctrlX + this.width * 0.2, ctrlY, this.x + this.width / 2, this.y);
        ctx.closePath();
        ctx.fill();

        // Stroke the outline with electric glass sheen in Ghost Mode
        if (isGhost) {
          ctx.strokeStyle = "rgba(120, 200, 255, 0.35)";
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
        
        ctx.restore();
      }
    }

    // Tsushima Falling Leaves
    class FallingLeaf {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      angle: number;
      spin: number;
      color: string;
      phase: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height; // Spread leaves vertically initially
        this.size = Math.random() * 8 + 6;
        this.vx = Math.random() * 0.8 + 0.4;
        this.vy = Math.random() * 0.9 + 0.6;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.025;
        
        const colors = [
          "rgba(225, 60, 45, 0.75)",  // Crimson Tsushima Maple Leaf
          "rgba(245, 170, 35, 0.75)", // Golden Ginkgo Leaf
          "rgba(59, 130, 246, 0.65)",  // Cosmic Blue Sparkle Petal
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.phase = Math.random() * Math.PI;
      }

      update(time: number) {
        this.x += this.vx + Math.sin(time * 0.004 + this.phase) * 0.25;
        this.y += this.vy;
        this.angle += this.spin;

        if (this.y > height + 20 || this.x > width + 20) {
          this.y = -20;
          this.x = Math.random() * width;
          this.size = Math.random() * 8 + 6;
          this.vx = Math.random() * 0.8 + 0.4;
          this.vy = Math.random() * 0.9 + 0.6;
          this.angle = Math.random() * Math.PI * 2;
          this.spin = (Math.random() - 0.5) * 0.025;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        
        // Draw leaf silhouette shape
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.quadraticCurveTo(this.size / 2, -this.size / 2, this.size / 2, 0);
        ctx.quadraticCurveTo(this.size / 2, this.size / 2, 0, this.size / 2);
        ctx.quadraticCurveTo(-this.size / 2, this.size / 2, -this.size / 2, 0);
        ctx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // Interstellar Cosmic Twinkle Stars / Pollen
    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      phase: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.phase = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx + Math.sin(this.phase) * 0.08;
        this.y += this.vy + Math.cos(this.phase) * 0.08;
        this.phase += 0.008;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const force = (1 - dist / 250) * 0.06;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D, accent: string, isGhost: boolean) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        
        if (isGhost) {
          // Draw Interstellar 4-spiked twinkle stars
          const cx = this.x;
          const cy = this.y;
          const spikes = 4;
          const outerRadius = this.size * 2.2;
          const innerRadius = this.size * 0.4;
          
          let rot = (Math.PI / 2) * 3;
          let x = cx;
          let y = cy;
          const step = Math.PI / spikes;

          ctx.moveTo(cx, cy - outerRadius);
          for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
          }
          ctx.lineTo(cx, cy - outerRadius);
          ctx.closePath();
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        } else {
          // Circular particle
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
          grad.addColorStop(0, accent);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Falling Snow Particle Structure
    class Snowflake {
      x: number;
      y: number;
      radius: number;
      density: number;
      vy: number;
      vx: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2.2 + 0.8;
        this.density = Math.random() * 30;
        this.vy = Math.random() * 0.8 + 0.5; // slow drift downward
        this.vx = (Math.random() - 0.5) * 0.3; // subtle left/right sway
      }

      update(time: number) {
        // Falling speed + sway
        this.y += this.vy;
        this.x += this.vx + Math.sin(time * 0.005 + this.density) * 0.15;

        // Reset if it goes off screen
        if (this.y > height + 10) {
          this.y = -10;
          this.x = Math.random() * width;
        }
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
        ctx.restore();
      }
    }

    let backgroundGrass: GrassBlade[] = [];
    let midgroundGrass: GrassBlade[] = [];
    let foregroundGrass: GrassBlade[] = [];

    const initGrass = () => {
      backgroundGrass = [];
      midgroundGrass = [];
      foregroundGrass = [];

      const bgCount = Math.floor(width / 14);
      const mdCount = Math.floor(width / 18);
      const fgCount = Math.floor(width / 24);

      // Background grass
      for (let i = 0; i < bgCount; i++) {
        const x = (i / bgCount) * width + Math.random() * 20 - 10;
        const y = height * 0.95 + Math.random() * 20;
        const bladeHeight = height * 0.25 + Math.random() * (height * 0.15);
        const bladeWidth = 4 + Math.random() * 3;
        const color = "rgba(18, 30, 60, 0.4)";
        backgroundGrass.push(new GrassBlade(x, y, bladeHeight, bladeWidth, color, 0.001, 3));
      }

      // Midground grass
      for (let i = 0; i < mdCount; i++) {
        const x = (i / mdCount) * width + Math.random() * 30 - 15;
        const y = height * 0.98 + Math.random() * 20;
        const bladeHeight = height * 0.38 + Math.random() * (height * 0.2);
        const bladeWidth = 8 + Math.random() * 4;
        const color = "rgba(10, 18, 38, 0.75)";
        midgroundGrass.push(new GrassBlade(x, y, bladeHeight, bladeWidth, color, 0.0012, 5));
      }

      // Foreground grass
      for (let i = 0; i < fgCount; i++) {
        const x = (i / fgCount) * width + Math.random() * 40 - 20;
        const y = height + 10;
        const bladeHeight = height * 0.55 + Math.random() * (height * 0.28);
        const bladeWidth = 14 + Math.random() * 6;
        const color = "rgba(3, 5, 12, 0.95)";
        foregroundGrass.push(new GrassBlade(x, y, bladeHeight, bladeWidth, color, 0.0015, 7));
      }
    };

    initGrass();
    
    // SETUP TSUSHIMA LEAVES (18 floating nodes)
    const leaves: FallingLeaf[] = Array.from({ length: 18 }, () => new FallingLeaf());
    const snowflakes: Snowflake[] = Array.from({ length: 75 }, () => new Snowflake());
    
    const particles: Particle[] = Array.from({ length: 55 }, () => new Particle());
    
    let time = 0;
    
    // Cache colors to prevent getComputedStyle layout thrashing in the render loop
    let cachedAccentColor = "#00e87a";
    let cachedBgColor = "";
    const updateColors = () => {
      try {
        cachedAccentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00e87a";
        cachedBgColor = getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim();
      } catch(e) {}
    };
    updateColors();
    // Re-fetch colors if theme changes by polling every second or just rely on the initial fetch if theme changes remount component
    const colorInterval = setInterval(updateColors, 1000);

    const render = () => {
      time += 1.2;
      const isGhost = themeRef.current === "ghost";

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      let accentColor = cachedAccentColor || "#00e87a";

      // 1. Clear Frame
      ctx.fillStyle = cachedBgColor || (isGhost ? "#040612" : "#0c172d");
      ctx.fillRect(0, 0, width, height);

      // 2. Horizon sunset glow OR Interstellar nebula cloud
      if (isGhost) {
        // Interstellar cosmic nebula
        const nebula = ctx.createRadialGradient(
          width * 0.3,
          height * 0.45,
          50,
          width * 0.3,
          height * 0.45,
          width * 0.6
        );
        nebula.addColorStop(0, "rgba(59, 130, 246, 0.16)"); // Electric Blue
        nebula.addColorStop(0.5, "rgba(168, 85, 247, 0.08)"); // Cosmic Violet
        nebula.addColorStop(1, "transparent");
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Sunset orange horizon glow
        const sunsetGrad = ctx.createLinearGradient(0, height * 0.38, 0, height * 0.55);
        sunsetGrad.addColorStop(0, "rgba(255, 150, 75, 0.0)");
        sunsetGrad.addColorStop(0.5, "rgba(255, 150, 75, 0.26)");
        sunsetGrad.addColorStop(1, "rgba(255, 150, 75, 0.0)");
        ctx.fillStyle = sunsetGrad;
        ctx.fillRect(0, height * 0.3, width, height * 0.3);
      }

      // 3. Draw background grass
      backgroundGrass.forEach((blade) => {
        blade.update(time);
        blade.draw(ctx, isGhost);
      });

      // 4. Fog overlay 1
      const fog1 = ctx.createLinearGradient(0, height * 0.4, 0, height);
      fog1.addColorStop(0, "rgba(12, 23, 45, 0.0)");
      fog1.addColorStop(0.6, isGhost ? "rgba(4, 6, 18, 0.45)" : "rgba(12, 23, 45, 0.4)");
      fog1.addColorStop(1, isGhost ? "rgba(4, 6, 18, 0.88)" : "rgba(12, 23, 45, 0.85)");
      ctx.fillStyle = fog1;
      ctx.fillRect(0, height * 0.4, width, height * 0.6);

      // 5. Draw midground grass
      midgroundGrass.forEach((blade) => {
        blade.update(time);
        blade.draw(ctx, isGhost);
      });

      // 6. Volumetric lighting glow tracking mouse
      ctx.save();
      const lightGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.radius * 2.2
      );
      lightGrad.addColorStop(0, isGhost ? "rgba(59, 130, 246, 0.35)" : `${accentColor}35`);
      lightGrad.addColorStop(0.5, isGhost ? "rgba(59, 130, 246, 0.06)" : `${accentColor}08`);
      lightGrad.addColorStop(1, "transparent");
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 7. Draw foreground grass
      foregroundGrass.forEach((blade) => {
        blade.update(time);
        blade.draw(ctx, isGhost);
      });

      // 8. Ground fog
      const groundFog = ctx.createLinearGradient(0, height * 0.8, 0, height);
      groundFog.addColorStop(0, "rgba(4, 7, 14, 0.0)");
      groundFog.addColorStop(1, isGhost ? "rgba(4, 6, 18, 0.95)" : "rgba(4, 7, 14, 0.9)");
      ctx.fillStyle = groundFog;
      ctx.fillRect(0, height * 0.8, width, height * 0.2);

      // 9. Draw falling Leaves in Ghost Mode
      if (isGhost) {
        leaves.forEach((l) => {
          l.update(time);
          l.draw(ctx);
        });
      }

      // 10. Draw cosmic twinkling stars / space sparkles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx, accentColor, isGhost);
      });

      // 11. Draw falling snow across all themes
      snowflakes.forEach((s) => {
        s.update(time);
        s.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
      clearInterval(colorInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-10] w-full h-full"
    />
  );
}

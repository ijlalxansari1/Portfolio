"use client";

import { useEffect, useRef } from "react";

const branches = Array.from({ length: 26 }, (_, index) => ({
  start: 0.53 + Math.sin(index * 2) * 0.06,
  fork: 0.48 + Math.sin(index * 3) * 0.17,
  end: -0.12 + (index / 25) * 1.24,
}));

export default function LokiTimeline() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d");
    if (!element || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let lastPaint = -Infinity;

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      branches.forEach(({ start, fork, end }, index) => {
        const points = [start, start, fork, end];
        ctx.beginPath();
        ctx.moveTo(0, start * height);
        ctx.bezierCurveTo(width * 0.3, start * height, width * 0.6, fork * height, width, end * height);
        ctx.strokeStyle = index % 4 === 0 ? "#efb85c" : "#61e7a5";
        ctx.globalAlpha = index % 4 === 0 ? 0.27 : 0.42;
        ctx.lineWidth = index % 5 === 0 ? 1.8 : 0.8;
        ctx.stroke();

        const progress = (time / (5500 + index * 127) + index * 0.137) % 1;
        const rest = 1 - progress;
        const weights = [rest ** 3, 3 * rest ** 2 * progress, 3 * rest * progress ** 2, progress ** 3];
        const x = (weights[1] * 0.3 + weights[2] * 0.6 + weights[3]) * width;
        const y = points.reduce((sum, point, i) => sum + weights[i] * point, 0) * height;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.globalAlpha = 0.88;
        ctx.fillStyle = index % 4 === 0 ? "#ffda93" : "#b2ffd4";
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function animate(time: number) {
      if (time - lastPaint >= 32) {
        draw(time);
        lastPaint = time;
      }
      frame = requestAnimationFrame(animate);
    }

    function resize() {
      if (!element || !ctx) return;
      width = element.clientWidth;
      height = element.clientHeight;
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * scale);
      element.height = Math.round(height * scale);
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      draw(0);
    }

    function updateMotion() {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches) draw(0);
      else frame = requestAnimationFrame(animate);
    }

    resize();
    updateMotion();
    window.addEventListener("resize", resize);
    reducedMotion.addEventListener("change", updateMotion);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener("change", updateMotion);
    };
  }, []);

  return <canvas ref={canvas} className="h-full w-full" data-loki-timelines aria-hidden="true" />;
}

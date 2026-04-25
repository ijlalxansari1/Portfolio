"use client";

import { useEffect } from "react";

export type AnalyticsEvent = {
  type: string;
  metadata?: any;
  timestamp: string;
};

export const trackEvent = (type: string, metadata?: any) => {
  if (typeof window === "undefined") return;
  
  const event: AnalyticsEvent = {
    type,
    metadata,
    timestamp: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem("admin-analytics") || "[]");
  const updated = [event, ...existing].slice(0, 500); // Keep last 500
  localStorage.setItem("admin-analytics", JSON.stringify(updated));
  
  // Trigger update for admin panel if open
  window.dispatchEvent(new CustomEvent("analytics-updated"));
};

export default function AnalyticsTracker() {
  useEffect(() => {
    // Page view
    trackEvent("page_view", {
      referrer: document.referrer,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      device: window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop"
    });

    // Intersection observer for section views
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent("section_view", { section: entry.target.id });
        }
      });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll("section[id]");
    sections.forEach(s => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return null;
}

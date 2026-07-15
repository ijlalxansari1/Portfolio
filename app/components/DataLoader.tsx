"use client";

import { useEffect } from "react";

export default function DataLoader() {
  useEffect(() => {
    const hydrateData = async () => {
      try {
        const res = await fetch("/api/data/admin");
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            let hasUpdates = false;
            Object.keys(data).forEach(key => {
              if (key.startsWith('portfolio-')) return;
              const strData = JSON.stringify(data[key]);
              if (localStorage.getItem(key) !== strData) {
                localStorage.setItem(key, strData);
                hasUpdates = true;
              }
            });
            if (hasUpdates) {
              window.dispatchEvent(new CustomEvent("admin-updated"));
            }
          }
        }
      } catch (e) {
        console.error("Failed to hydrate local storage from API", e);
      }
    };
    // Delay hydration to allow initial page animations (fade-in) to complete smoothly
    const timer = setTimeout(() => {
      hydrateData();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  
  return null;
}

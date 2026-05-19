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
    
    // Initial hydration
    hydrateData();
    
    // Poll every 60 seconds for live updates from admin changes
    const interval = setInterval(hydrateData, 60000);
    return () => clearInterval(interval);
  }, []);
  
  return null;
}

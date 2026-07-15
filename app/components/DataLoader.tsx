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
    
    // Initial hydration only to prevent crashing the server with massive payloads
    hydrateData();
    // Removed the 60-second polling to prevent server and DB lockups
  }, []);
  
  return null;
}

"use client";

import { useState, useEffect } from "react";
import AdminPanel from "../components/AdminPanel";
import LoginModal from "../components/LoginModal";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = sessionStorage.getItem("aether-admin-session");
      if (session) {
        try {
          const res = await fetch("/api/auth/verify", {
            headers: { Authorization: `Bearer ${session}` }
          });
          if (res.ok) {
            setIsLoggedIn(true);
            return;
          }
        } catch (e) {
          console.error("Auth verification failed", e);
        }
      }
      sessionStorage.removeItem("aether-admin-session");
      setShowLogin(true);
    };
    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-[#080808] flex items-center justify-center">
        <LoginModal 
          isOpen={showLogin} 
          onClose={() => window.location.href = "/"} 
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowLogin(false);
          }} 
        />
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 animate-pulse">
          Authenticating Secure Gateway...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#080808]">
      <AdminPanel isOpen={true} onClose={() => window.location.href = "/"} />
    </div>
  );
}

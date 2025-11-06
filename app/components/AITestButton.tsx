"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "./Toast";

export default function AITestButton() {
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const toast = useToast();

  const testAI = async () => {
    setTesting(true);
    setStatus("idle");
    
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "text",
          prompt: "Write a short professional title for a data engineering project",
        }),
      });

      const data = await response.json();
      
      if (data.success && data.response) {
        setStatus("success");
        toast.success("AI API is working! ✅");
        console.log("AI Response:", data.response);
      } else {
        setStatus("error");
        toast.error(data.error || "AI API test failed");
      }
    } catch (error: any) {
      setStatus("error");
      toast.error("Failed to connect to AI API. Check your API key.");
      console.error("AI Test Error:", error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <motion.button
      onClick={testAI}
      disabled={testing}
      whileHover={{ scale: testing ? 1 : 1.05 }}
      whileTap={{ scale: testing ? 1 : 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        status === "success"
          ? "bg-green-500/20 border border-green-500/50 text-green-400"
          : status === "error"
          ? "bg-red-500/20 border border-red-500/50 text-red-400"
          : "glass border border-neon-mint/50 text-neon-mint hover:bg-neon-mint/10"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {testing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neon-mint"></div>
          Testing...
        </>
      ) : status === "success" ? (
        <>
          <CheckCircle size={16} />
          AI Connected
        </>
      ) : status === "error" ? (
        <>
          <XCircle size={16} />
          Test Failed
        </>
      ) : (
        <>
          <Sparkles size={16} />
          Test AI Connection
        </>
      )}
    </motion.button>
  );
}


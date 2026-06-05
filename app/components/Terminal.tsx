"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bootText = [
      "Initializing LOKI Protocol terminal v1.0...",
      "Loading profile: Ijlal Ansari...",
      "Status: Available for hire ✓",
      "",
      "Type 'help' to see available commands.",
    ];

    if (isOpen) {
      setIsBooting(true);
      setOutput([]);
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootText.length) {
          setOutput((prev) => [...prev, bootText[i]]);
          i++;
        } else {
          setIsBooting(false);
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [output, isBooting]);

  const handleCommand = (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
    setOutput((prev) => [...prev, `ijlal@portfolio:~$ ${cmd}`]);

    switch (c) {
      case "help":
        setOutput((prev) => [
          ...prev,
          "COMMAND        DESCRIPTION",
          "-------        -----------",
          "about          Prints full bio paragraph",
          "skills         Prints ASCII bar chart of skills",
          "projects       Lists all 6 projects",
          "contact        Shows social links",
          "loki           Special protocol info",
          "hire           Go to contact section",
          "clear          Clears terminal",
          "exit           Closes terminal",
        ]);
        break;
      case "about":
        setOutput((prev) => [
          ...prev,
          "Senior Data Engineer & AI Researcher specializing in ethical data intelligence.",
          "Building the LOKI Protocol for glorious purpose, free will, and better data systems across the sacred timeline.",
        ]);
        break;
      case "skills":
        setOutput((prev) => [
          ...prev,
          "Python      ████████████████████ 92%",
          "PostgreSQL  █████████████████░░░ 85%",
          "DuckDB      ██████████████████░░ 90%",
          "FastAPI     █████████████████░░░ 87%",
          "Kafka       ███████████████░░░░░ 75%",
          "Next.js     ██████████████████░░ 88%",
          "Docker      ██████████████████░░ 90%",
          "Airflow     █████████████████░░░ 85%",
        ]);
        break;
      case "projects":
        setOutput((prev) => [
          ...prev,
          "1. LOKI Protocol - Temporal Data Intelligence",
          "2. Data Engineering Tracker - Learning Path",
          "3. ETL Pipeline - dbt + Dagster",
          "4. Bias Audit System - ML Fairness",
          "5. FastAPI Data Gateway - Secure Access",
          "6. Analytics Dashboard - DuckDB Backed",
          "Type 1-6 to learn more (Coming Soon).",
        ]);
        break;
      case "contact":
        setOutput((prev) => [
          ...prev,
          "Email: ijlalansari@email.com",
          "GitHub: github.com/ijlalansari",
          "LinkedIn: linkedin.com/in/ijlalansari",
        ]);
        break;
      case "loki":
        const lines = [
          "> LOKI — Temporal Data Analysis Protocol. For all time. Always.",
          "> Loading pipeline modules...",
          "> [████████████████████] 100%",
          "> Bias detection: ACTIVE",
          "> Fairlearn integration: ONLINE",
          "> SHAP explainability: ONLINE",
          "> Audit log: APPEND-ONLY ✓",
          "> RBAC matrix: 24 permissions loaded",
          "> Status: All systems operational.",
        ];
        let i = 0;
        const interval = setInterval(() => {
          if (i < lines.length) {
            setOutput((prev) => [...prev, lines[i]]);
            i++;
          } else {
            clearInterval(interval);
          }
        }, 300);
        break;
      case "hire":
        onClose();
        const contactSection = document.getElementById("contact");
        const panel = document.getElementById("content-scroll-panel");
        if (contactSection && panel) {
          panel.scrollTo({ top: contactSection.offsetTop, behavior: "smooth" });
        }
        break;
      case "clear":
        setOutput([]);
        break;
      case "exit":
      case "quit":
        onClose();
        break;
      default:
        setOutput((prev) => [...prev, `Command not found: ${cmd}. Type 'help' for commands.`]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      if (historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="terminal-window w-[640px] h-[420px] bg-black rounded-lg overflow-hidden flex flex-col pointer-events-auto shadow-2xl"
      >
        {/* Top Bar */}
        <div className="h-10 bg-[#1a1a1a] flex items-center px-4 justify-between border-b border-[#333] cursor-move">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[11px] font-bold text-[#666] tracking-wider">ijlal@portfolio:~$</span>
          <button onClick={onClose} className="text-[#666] hover:text-white transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto custom-scrollbar-hidden text-[13px] text-[#00e87a] leading-relaxed"
        >
          {output.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
          ))}
          
          {!isBooting && (
            <div className="flex items-center gap-2 mt-2">
              <span className="shrink-0">ijlal@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-[#00e87a]"
                autoFocus
              />
              <div className="terminal-cursor" />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

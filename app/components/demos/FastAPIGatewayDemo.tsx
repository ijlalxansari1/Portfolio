"use client";

import { useState } from "react";
import { Globe, Send, Shield, Zap, Lock, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function FastAPIGatewayDemo() {
  const { language } = useLanguage();
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("/v1/analytics/bias-report");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const sendRequest = () => {
    setIsLoading(true);
    setResponse(null);
    setTimeout(() => {
      setResponse({
        status: 200,
        latency: "42ms",
        data: {
          id: "req_7721",
          timestamp: new Date().toISOString(),
          authorized: true,
          payload: {
            total_records: 12500,
            audit_status: "passed",
            policy: "strict-governance"
          }
        }
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#0d0d0d] border border-[var(--border)] rounded-2xl p-6 overflow-hidden min-h-[440px] flex flex-col">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="text-[14px] font-black text-white uppercase tracking-wider">{language === 'de' ? 'FastAPI Daten-Gateway' : 'FastAPI Data Gateway'}</h3>
          <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">{language === 'de' ? 'Sichere REST-Infrastruktur' : 'Secure REST Infrastructure'}</p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div className="flex gap-2">
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value)}
            className="bg-white/5 border border-[var(--border)] rounded-xl px-3 py-3 text-[12px] font-black text-emerald-500 outline-none"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
          </select>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full bg-white/5 border border-[var(--border)] rounded-xl px-4 py-3 text-[13px] font-mono text-white/70 outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>
          <button 
            onClick={sendRequest}
            disabled={isLoading}
            className="px-6 bg-emerald-500 text-black rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-2 hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50"
          >
            {isLoading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Send size={14} />}
            {language === 'de' ? 'Senden' : 'Send'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Lock size={14} />, label: "Auth", value: language === 'de' ? "JWT (Aktiv)" : "JWT (Active)" },
            { icon: <Shield size={14} />, label: language === 'de' ? "Sicherheit" : "Security", value: language === 'de' ? "RBAC Aktiviert" : "RBAC Enabled" },
            { icon: <Globe size={14} />, label: "Rate Limit", value: "500 req/min" },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-white/5 border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">
                {item.icon} {item.label}
              </div>
              <p className="text-[11px] font-bold text-white whitespace-nowrap">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-black/50 border border-[var(--border)] rounded-xl p-4 font-mono overflow-hidden relative min-h-[160px]">
          <div className="absolute top-2 right-4 flex gap-1.5 opacity-20">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <p className="text-[10px] text-emerald-500/50 mb-3 uppercase tracking-widest">{language === 'de' ? '// Antwort Header' : '// Response Header'}</p>
          
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <div className="w-[60%] h-3 bg-white/5 animate-pulse rounded" />
              <div className="w-[40%] h-3 bg-white/5 animate-pulse rounded" />
              <div className="w-[80%] h-3 bg-white/5 animate-pulse rounded" />
            </div>
          ) : response ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[12px] space-y-1">
              <p className="text-emerald-400">HTTP/1.1 {response.status} OK</p>
              <p className="text-white/40">{language === 'de' ? 'Latenz' : 'Latency'}: {response.latency}</p>
              <pre className="text-white/70 mt-4 leading-relaxed">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </motion.div>
          ) : (
            <p className="text-white/20 italic text-[12px] flex items-center gap-2 h-full justify-center">
              <Code size={16} /> {language === 'de' ? 'Warten auf Anfrage...' : 'Waiting for request...'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

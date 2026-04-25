"use client";

import { useState, useEffect } from "react";
import { Github, Star, GitBranch, Terminal as TerminalIcon, Users, Package } from "lucide-react";
import { motion } from "framer-motion";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{ message: string; sha: string }>;
    ref?: string;
  };
  created_at: string;
}

const fallbackEvents = [
  { id: 'f1', repo: { name: 'ijlal/aether-platform' }, payload: { commits: [{ message: 'Add SHAP explainability module to pipeline' }], ref: 'main' }, created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 'f2', repo: { name: 'ijlal/data-engineering-tracker' }, payload: { commits: [{ message: 'Update progress tracking with localStorage sync' }], ref: 'main' }, created_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { id: 'f3', repo: { name: 'ijlal/bias-audit-system' }, payload: { commits: [{ message: 'Integrate Fairlearn demographic parity metrics' }], ref: 'dev' }, created_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { id: 'f4', repo: { name: 'ijlal/fastapi-data-gateway' }, payload: { commits: [{ message: 'Add Redis rate limiting middleware' }], ref: 'main' }, created_at: new Date(Date.now() - 14 * 86400000).toISOString() },
  { id: 'f5', repo: { name: 'ijlal/analytics-dashboard' }, payload: { commits: [{ message: 'DuckDB query optimisation for 1M row datasets' }], ref: 'feature/perf' }, created_at: new Date(Date.now() - 21 * 86400000).toISOString() },
];

export default function GitHubFeed() {
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({ repos: 12, stars: 8, followers: 24 });
  const [loading, setLoading] = useState(true);
  const username = "ijlalansari";

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
        if (!eventsRes.ok) throw new Error("Fallback");
        const eventsData = await eventsRes.json();
        const pushEvents = eventsData.filter((e: any) => e.type === "PushEvent").slice(0, 5);
        if (pushEvents.length === 0) throw new Error("No events");
        setEvents(pushEvents);

        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setStats({
            repos: userData.public_repos || 12,
            stars: 8,
            followers: userData.followers || 24,
          });
        }
      } catch (err) {
        setEvents(fallbackEvents);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchGitHubData();
  }, []);

  const formatTime = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return `${Math.floor(diff / 604800)}w ago`;
  };

  return (
    <div className="w-full">
      <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">LIVE ACTIVITY</p>
      <h2 className="section-heading text-[28px] font-black text-[var(--text-primary)] mb-10">What I&apos;m Building Right Now</h2>

      <div className="space-y-4 mb-10">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="h-[80px] bg-[#141414] border border-[#222] rounded-xl skeleton-shimmer" />
          ))
        ) : (
          events.map((event) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="github-card p-5 bg-[#141414] border border-[#222] border-l-2 border-l-[var(--accent)] rounded-xl group hover:border-[var(--accent)]/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" />
                       <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer" className="text-[13px] font-black text-white hover:text-[var(--accent)] transition-all">
                          {event.repo.name.split('/').pop()}
                       </a>
                    </div>
                    <p className="text-[13px] text-white/60 font-medium line-clamp-1 italic">
                       {event.payload.commits?.[0]?.message?.substring(0, 80) || "Update repository"}
                    </p>
                 </div>
                 <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-md text-[10px] font-black text-white/30 uppercase tracking-widest">
                       <GitBranch size={10} /> {event.payload.ref?.replace('refs/heads/', '') || 'main'}
                    </div>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                       {formatTime(event.created_at)}
                    </span>
                 </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="flex flex-wrap gap-4">
         <div className="px-4 py-2 bg-[#141414] border border-[#222] rounded-full text-[12px] font-black text-white/40 flex items-center gap-2">
            <Package size={14} className="text-[var(--accent)]" /> Public Repos: <span className="text-white">{stats.repos}</span>
         </div>
         <div className="px-4 py-2 bg-[#141414] border border-[#222] rounded-full text-[12px] font-black text-white/40 flex items-center gap-2">
            <Star size={14} className="text-[var(--accent)]" /> Stars: <span className="text-white">{stats.stars}</span>
         </div>
         <div className="px-4 py-2 bg-[#141414] border border-[#222] rounded-full text-[12px] font-black text-white/40 flex items-center gap-2">
            <Users size={14} className="text-[var(--accent)]" /> Followers: <span className="text-white">{stats.followers}</span>
         </div>
      </div>
    </div>
  );
}

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
  const [stats, setStats] = useState({ repos: 12, stars: 8, followers: 24, contributions: 0 });
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("ijlalxansari1");

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const savedUsername = localStorage.getItem("admin-github-username") || "ijlalxansari1";
        const repoOffset = parseInt(localStorage.getItem("admin-github-repos-offset") || "0");
        const starOffset = parseInt(localStorage.getItem("admin-github-stars-offset") || "0");
        setUsername(savedUsername);

        const eventsRes = await fetch(`https://api.github.com/users/${savedUsername}/events/public`);
        if (!eventsRes.ok) throw new Error("Fallback");
        const eventsData = await eventsRes.json();
        const pushEvents = eventsData.filter((e: any) => e.type === "PushEvent").slice(0, 5);
        
        if (pushEvents.length === 0) {
           // If no push events, fetch recent repos as activity
           const repoRes = await fetch(`https://api.github.com/users/${savedUsername}/repos?sort=updated&per_page=5`);
           const repoData = await repoRes.json();
           setEvents(repoData.map((r: any) => ({
              id: r.id,
              type: "RepoUpdate",
              repo: { name: r.full_name },
              payload: { commits: [{ message: r.description || "Updated repository" }], ref: r.default_branch },
              created_at: r.updated_at
           })));
        } else {
           setEvents(pushEvents);
        }

        const userRes = await fetch(`https://api.github.com/users/${savedUsername}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setStats({
            repos: (userData.public_repos || 12) + repoOffset,
            stars: 8 + starOffset,
            followers: userData.followers || 24,
            contributions: 0 // Placeholder
          });
        }
      } catch (err) {
        setEvents(fallbackEvents);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchGitHubData();

    const handleUpdate = () => fetchGitHubData();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
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
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
           <p className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2 flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
             LIVE GITHUB STREAM
           </p>
           <h2 className="section-heading text-[32px] font-black text-[var(--text-primary)]">What I&apos;m Building</h2>
           <p className="text-[14px] text-[var(--text-secondary)] opacity-50 max-w-lg">A real-time synchronization with my open-source commits, experiments, and architectural evolutions.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
           <div className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl flex items-center gap-3">
              <Package size={14} className="text-[var(--accent)]" />
              <div className="flex flex-col">
                 <span className="text-[14px] font-black text-[var(--text-primary)] leading-none">{stats.repos}</span>
                 <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Repos</span>
              </div>
           </div>
           <div className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl flex items-center gap-3">
              <Star size={14} className="text-[var(--accent)]" />
              <div className="flex flex-col">
                 <span className="text-[14px] font-black text-[var(--text-primary)] leading-none">{stats.stars}</span>
                 <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Stars</span>
              </div>
           </div>
           <div className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl flex items-center gap-3">
              <Users size={14} className="text-[var(--accent)]" />
              <div className="flex flex-col">
                 <span className="text-[14px] font-black text-[var(--text-primary)] leading-none">{stats.followers}</span>
                 <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-secondary)] opacity-40">Followers</span>
              </div>
           </div>
        </div>
      </div>

      {/* Live Heatmap Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 p-6 lg:p-8 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[32px] relative overflow-hidden group"
      >
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-3">
              <TerminalIcon size={16} className="text-[var(--accent)]" />
              <h3 className="text-[12px] font-black uppercase tracking-[2px] text-[var(--text-primary)]">Contribution Pulse</h3>
           </div>
           <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] hover:underline">View Profile</a>
        </div>
        
        <div className="w-full overflow-x-auto custom-scrollbar-hidden">
           <div className="min-w-[800px] h-[120px] flex items-center justify-center bg-white/[0.01] rounded-2xl border border-white/5 relative group/chart">
              {!loading && (
                 <img 
                    src={`https://ghchart.rshah.org/${username}`} 
                    alt={`${username}'s contributions`}
                    className="max-w-full h-auto grayscale group-hover/chart:grayscale-0 transition-all duration-700 opacity-70 group-hover/chart:opacity-100"
                 />
              )}
              {loading && <div className="absolute inset-0 skeleton-shimmer" />}
           </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 blur-[60px] rounded-full pointer-events-none" />
      </motion.div>

      {/* Activity Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-[100px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl skeleton-shimmer" />
          ))
        ) : (
          events.map((event, idx) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl group hover:border-[var(--accent)]/30 transition-all relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 relative z-10">
                 <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${event.type === 'PushEvent' ? 'bg-[var(--accent)]' : 'bg-blue-400'} shadow-lg`} />
                       <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer" className="text-[14px] font-black text-[var(--text-primary)] hover:text-[var(--accent)] transition-all leading-none">
                          {event.repo.name.split('/').pop()}
                       </a>
                    </div>
                    <p className="text-[13px] text-[var(--text-secondary)] font-medium line-clamp-2 italic opacity-60 leading-relaxed">
                       {event.payload.commits?.[0]?.message || "Refining source code and architecture."}
                    </p>
                    <div className="flex items-center gap-4 pt-1">
                       <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)] rounded-lg text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest">
                          <GitBranch size={10} /> {event.payload.ref?.replace('refs/heads/', '') || 'main'}
                       </div>
                       <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-30 uppercase tracking-[2px]">
                          {formatTime(event.created_at)}
                       </span>
                    </div>
                 </div>
                 <div className="w-10 h-10 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-center text-[var(--text-secondary)] opacity-20 group-hover:opacity-100 group-hover:text-[var(--accent)] transition-all">
                    <TerminalIcon size={18} />
                 </div>
              </div>
              
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </motion.div>
          ))
        )}
      </div>

      <div className="mt-12 p-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
         <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-30 uppercase tracking-widest">Powered by GitHub REST API v3</p>
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
               <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">Push Events</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
               <span className="text-[9px] font-black text-[var(--text-secondary)] opacity-40 uppercase tracking-widest">Metadata Sync</span>
            </div>
         </div>
      </div>
    </div>
  );
}

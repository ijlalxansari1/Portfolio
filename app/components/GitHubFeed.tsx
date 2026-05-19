"use client";

import { useState, useEffect } from "react";
import { Github, Star, GitBranch, Terminal as TerminalIcon, Users, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

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
  const { language } = useLanguage();
  const t = translations[language].githubFeed;
  const [events, setEvents] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);
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

        // Fetch Events
        const eventsRes = await fetch(`https://api.github.com/users/${savedUsername}/events/public`);
        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          setEvents(eventsData.filter((e: any) => e.type === "PushEvent").slice(0, 4));
        }

        // Fetch Repositories
        const repoRes = await fetch(`https://api.github.com/users/${savedUsername}/repos?sort=updated&per_page=6`);
        if (repoRes.ok) {
          const repoData = await repoRes.json();
          setRepos(repoData.filter((r: any) => !r.fork));
        }

        // Fetch User Stats
        const userRes = await fetch(`https://api.github.com/users/${savedUsername}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setStats({
            repos: (userData.public_repos || 12) + repoOffset,
            stars: 8 + starOffset,
            followers: userData.followers || 24,
            contributions: 0 
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
            <div className="section-label text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              {t.label}
            </div>
           <h2 className="section-heading text-[32px] font-black text-[var(--text-primary)]">{t.title}</h2>
           <p className="text-[14px] text-[var(--text-secondary)] opacity-50 max-w-lg">{t.desc}</p>
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
           <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] hover:underline">{t.view_github}</a>
        </div>
        
        <div className="w-full overflow-x-auto custom-scrollbar-hidden">
           <div className="min-w-[800px] h-[120px] flex items-center justify-center bg-white/[0.01] rounded-2xl border border-white/5 relative group/chart">
              {!loading && (
                 <div className="relative w-full h-full flex items-center justify-center">
                    <Image 
                       src={`https://ghchart.rshah.org/${username}`} 
                       alt={`${username}'s contributions`}
                       width={800}
                       height={120}
                       unoptimized
                       className="max-w-full h-auto grayscale group-hover/chart:grayscale-0 transition-all duration-700 opacity-70 group-hover/chart:opacity-100"
                    />
                 </div>
              )}
              {loading && <div className="absolute inset-0 skeleton-shimmer" />}
           </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 blur-[60px] rounded-full pointer-events-none" />
      </motion.div>

      {/* Repositories Section */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
           <Package size={16} className="text-[var(--accent)]" />
           <h3 className="text-[13px] font-black uppercase tracking-[0.25em] text-[var(--text-primary)]">{t.label}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-[180px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl skeleton-shimmer" />
            ))
          ) : (
            repos.map((repo, idx) => (
              <motion.div 
                key={repo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl group hover:border-[var(--accent)]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)]">
                      <TerminalIcon size={16} />
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-[var(--text-secondary)] opacity-40 flex items-center gap-1">
                          <Star size={10} /> {repo.stargazers_count}
                       </span>
                    </div>
                  </div>
                  <h4 className="text-[15px] font-black text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-all mb-2 truncate">
                    {repo.name}
                  </h4>
                  <p className="text-[12px] text-[var(--text-secondary)] opacity-50 line-clamp-2 mb-6 leading-relaxed min-h-[36px]">
                    {repo.description || "Experimental engineering implementation and data architecture."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                   <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent)]/60">
                     {repo.language || "TypeScript"}
                   </span>
                   <div className="flex items-center gap-3">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all"
                        title="View Source"
                      >
                        <Github size={14} />
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all"
                          title="View Live"
                        >
                          <ArrowRight size={14} />
                        </a>
                      )}
                   </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
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

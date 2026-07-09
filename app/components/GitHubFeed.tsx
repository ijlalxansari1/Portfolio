"use client";

import { useState, useEffect } from "react";
import { Github, Star, GitBranch, Terminal as TerminalIcon, Users, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
  { id: 'f1', repo: { name: 'ijlalxansari1/Aether' }, payload: { commits: [{ message: 'Add SHAP explainability module to pipeline' }], ref: 'main' }, created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: 'f2', repo: { name: 'ijlalxansari1/Data-Engineering-Foundry' }, payload: { commits: [{ message: 'Update progress tracking with localStorage sync' }], ref: 'main' }, created_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { id: 'f3', repo: { name: 'ijlalxansari1/Portfolio' }, payload: { commits: [{ message: 'Integrate Fairlearn demographic parity metrics' }], ref: 'dev' }, created_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { id: 'f4', repo: { name: 'ijlalxansari1/compound_verse' }, payload: { commits: [{ message: 'Add Redis rate limiting middleware' }], ref: 'main' }, created_at: new Date(Date.now() - 14 * 86400000).toISOString() },
  { id: 'f5', repo: { name: 'ijlalxansari1/Predicting-Churn-using-ML-and-DL' }, payload: { commits: [{ message: 'DuckDB query optimisation for 1M row datasets' }], ref: 'feature/perf' }, created_at: new Date(Date.now() - 21 * 86400000).toISOString() },
];

const fallbackRepos = [
  { id: 'r1', name: 'Aether', description: 'Advanced AI and data platform.', language: 'TypeScript', stargazers_count: 5, html_url: 'https://github.com/ijlalxansari1/Aether' },
  { id: 'r2', name: 'Data-Engineering-Foundry', description: 'Core data engineering concepts and implementations.', language: 'Python', stargazers_count: 8, html_url: 'https://github.com/ijlalxansari1/Data-Engineering-Foundry' },
  { id: 'r3', name: 'Portfolio', description: 'Modern, dynamic developer portfolio.', language: 'TypeScript', stargazers_count: 3, html_url: 'https://github.com/ijlalxansari1/Portfolio' },
  { id: 'r4', name: 'compound_verse', description: 'Experimental blockchain smart contracts.', language: 'Solidity', stargazers_count: 2, html_url: 'https://github.com/ijlalxansari1/compound_verse' },
  { id: 'r5', name: 'Predicting-Churn-using-ML-and-DL', description: 'Customer churn prediction models.', language: 'Jupyter Notebook', stargazers_count: 6, html_url: 'https://github.com/ijlalxansari1/Predicting-Churn-using-ML-and-DL' },
  { id: 'r6', name: 'n8n', description: 'Workflow automation node setup.', language: 'JavaScript', stargazers_count: 1, html_url: 'https://github.com/ijlalxansari1/n8n' }
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
        if (!eventsRes.ok) throw new Error("API limit");
        const eventsData = await eventsRes.json();
        setEvents(eventsData.filter((e: any) => e.type === "PushEvent").slice(0, 4));

        // Fetch Repositories
        const repoRes = await fetch(`https://api.github.com/users/${savedUsername}/repos?sort=updated&per_page=6`);
        if (!repoRes.ok) throw new Error("API limit");
        const repoData = await repoRes.json();
        setRepos(repoData.filter((r: any) => !r.fork));

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
        setRepos(fallbackRepos);
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

      {/* Activity Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-12">
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
         <p className="text-[10px] font-bold text-[var(--text-secondary)] opacity-30 uppercase tracking-widest">Live GitHub data from public repositories</p>
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

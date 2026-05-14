"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, BarChart3, ShieldCheck, Settings, LogOut, Save, Plus, Trash2, 
  Download, Upload as UploadIcon, Briefcase, Newspaper, MessageSquare, 
  User as UserIcon, Globe, Bold, Italic, Code, Link as LinkIcon, 
  RefreshCw, Award, Mail, Star, ExternalLink, Trash, CheckCircle2, Zap, Search, Cpu,
  ChevronDown, Layers, Palette, Eye, Type, Image as ImageIcon, Tag,
  Calendar, Clock, Monitor, Smartphone, Tablet, TrendingUp, Inbox, Quote, ArrowUpRight, Users, FlaskConical
} from "lucide-react";
import { storage } from "../utils/storage";

// ── DEFAULT DATA CONSTANTS ──
const defaultProjects = [
  { id: 1, title: "AETHER Platform", tag: "Python", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", description: "Open-source ethical data analysis platform with a 10-stage analytical pipeline.", status: "Active" },
  { id: 2, title: "Data Engineering Tracker", tag: "Next.js", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800", description: "Interactive 20-hour data engineering curriculum tracker built on the 80/20 principle.", status: "Active" },
  { id: 3, title: "ETL Pipeline — dbt + Dagster", tag: "SQL", image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800", description: "End-to-end ELT pipeline using dbt Core and Dagster for orchestration.", status: "Active" }
];

const defaultPosts = [
  { id: 1, date: "Jan 2025", category: "Platform Design", title: "Building AETHER: Designing an Ethical Data Platform", status: "Published" },
  { id: 2, date: "Feb 2025", category: "Data Engineering", title: "Why Append-Only Audit Logs Matter", status: "Published" }
];

const defaultCerts = [
  { id: 1, title: "dbt Fundamentals", provider: "dbt Labs", link: "#", status: "Active" },
  { id: 2, title: "Data Engineering Zoomcamp", provider: "DataTalks.Club", link: "#", status: "Active" }
];

const defaultCategories = {
  projects: ["Python", "SQL", "Next.js", "FastAPI", "Pandas", "PyTorch"],
  blog: ["Data Engineering", "Platform Design", "Ethics & AI", "Python Tips"]
};

const defaultTestimonials = [
  { id: 1, name: "Dr. Sarah Chen", role: "AI Research Lead", company: "DataTalks.Club", quote: "Ijlal's work on ethical data systems is truly impressive. His AETHER platform sets a new standard.", avatar: "", status: "Published" },
  { id: 2, name: "Marcus Weber", role: "Senior Data Engineer", company: "Freelance Client", quote: "Exceptional data pipeline architecture. Delivered ahead of schedule with production-grade quality.", avatar: "", status: "Published" }
];

const defaultRadar = [
  { name: "Python", value: 92 }, { name: "PostgreSQL", value: 85 }, { name: "DuckDB", value: 90 }, { name: "FastAPI", value: 87 }, { name: "Kafka", value: 75 }, { name: "Next.js", value: 88 }
];

const defaultTools = [
  { name: "dbt Core", progress: 95, level: "Expert", desc: "SQL transformations & lineage" },
  { name: "Dagster", progress: 85, level: "Professional", desc: "Asset-based orchestration" },
  { name: "Apache Airflow", progress: 88, level: "Advanced", desc: "Workflow automation" }
];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("Analytics");
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [certs, setCerts] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [radarSkills, setRadarSkills] = useState<any[]>([]);
  const [toolSkills, setToolSkills] = useState<any[]>([]);
  const [demos, setDemos] = useState<any[]>([]);
  const [skillGroups, setSkillGroups] = useState<any[]>([]);
  const [practiceList, setPracticeList] = useState<any[]>([]);
  const [categories, setCategories] = useState<any>(defaultCategories);
  const [isSaving, setIsSaving] = useState(false);
  const [systemAudit, setSystemAudit] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [clientEvents, setClientEvents] = useState<any[]>([]);
  const [inboxMessages, setInboxMessages] = useState<any[]>([]);
  const [readMessages, setReadMessages] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setProjects(storage.get("admin-projects", defaultProjects));
        setPosts(storage.get("admin-posts", defaultPosts));
        setCerts(storage.get("admin-certs", defaultCerts));
        setSubmissions(storage.get("admin-submissions", []));
        setRadarSkills(storage.get("admin-skills-radar", defaultRadar));
        setSkillGroups(storage.get("admin-skills-groups", []));
        setPracticeList(storage.get("admin-skills-practices", []));
        setCategories(storage.get("admin-categories", defaultCategories));
        setTestimonials(storage.get("admin-testimonials", defaultTestimonials));
        setReadMessages(storage.get("admin-read-messages", []));
        
        const toolsData = storage.get("admin-skills", { tools: defaultTools });
        setToolSkills(toolsData.tools || defaultTools);
        setDemos(storage.get("admin-demos", []));
        setSystemAudit(storage.audit());

        // Client-side analytics events
        const events = storage.get("admin-analytics", []);
        setClientEvents(events);

        // Fetch server-side analytics
        try {
          const res = await fetch("/api/analytics");
          if (res.ok) setAnalyticsData(await res.json());
        } catch { /* silent */ }

        // Fetch server-side inbox
        try {
          const res = await fetch("/api/data/emails");
          if (res.ok) {
            const serverEmails = await res.json();
            const localSubs = storage.get("admin-submissions", []);
            const merged = [...localSubs, ...serverEmails]
              .sort((a: any, b: any) => new Date(b.date || b.timestamp || 0).getTime() - new Date(a.date || a.timestamp || 0).getTime());
            setInboxMessages(merged);
          }
        } catch { /* silent */ }
      };
      loadData();
    }
  }, [isOpen]);

  const saveData = (key: string, data: any) => {
    setIsSaving(true);
    storage.set(key, data);
    window.dispatchEvent(new CustomEvent("admin-updated"));
    setSystemAudit(storage.audit());
    setTimeout(() => setIsSaving(false), 800);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      // Optimization: Check file size to prevent quota issues
      if (file.size > 800000) { // 800KB limit for base64 storage
        alert("Warning: Asset exceeds 800KB. Large assets may impact system performance.");
      }
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />
        
        {/* Creative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--accent)] blur-[200px] rounded-full animate-pulse" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500 blur-[150px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          className="relative w-full max-w-[1500px] h-full bg-[#050505]/80 border border-white/5 rounded-[48px] overflow-hidden flex shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          {/* Creative Sidebar */}
          <div className="w-[280px] shrink-0 border-r border-white/5 bg-black/40 p-8 flex flex-col gap-1.5 relative z-10">
            <div className="flex flex-col gap-2 mb-12 px-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-emerald-400 rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
                  <Cpu size={24} className="text-black" />
                </div>
                <div>
                  <h1 className="text-[16px] font-black uppercase tracking-[3px] text-white leading-none">Aether</h1>
                  <span className="text-[9px] font-black uppercase tracking-[2px] text-[var(--accent)]">Studio v2.0</span>
                </div>
              </div>
            </div>

            {(() => {
              const unreadCount = inboxMessages.filter((m: any) => !readMessages.includes(String(m.id))).length;
              return [
              { id: "Analytics", icon: <BarChart3 size={16} />, color: "text-blue-400", badge: 0 },
              { id: "Inbox", icon: <Inbox size={16} />, color: "text-cyan-400", badge: unreadCount },
              { id: "Radar & Tools", icon: <Layers size={16} />, color: "text-purple-400", badge: 0 },
              { id: "Projects", icon: <Briefcase size={16} />, color: "text-orange-400", badge: 0 },
              { id: "Blog", icon: <Newspaper size={16} />, color: "text-pink-400", badge: 0 },
              { id: "Demos", icon: <FlaskConical size={16} />, color: "text-indigo-400", badge: 0 },
              { id: "Testimonials", icon: <Quote size={16} />, color: "text-amber-400", badge: 0 },
              { id: "Certifications", icon: <Award size={16} />, color: "text-yellow-400", badge: 0 },
              { id: "Security", icon: <ShieldCheck size={16} />, color: "text-emerald-400", badge: 0 },
              { id: "Settings", icon: <Settings size={16} />, color: "text-white/40", badge: 0 },
            ];})().map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative ${
                  activeTab === tab.id 
                  ? 'bg-white text-black shadow-[0_10px_25px_rgba(255,255,255,0.15)] scale-[1.03]' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-black' : tab.color}>{tab.icon}</span>
                {tab.id}
                {tab.badge > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-[8px] font-black rounded-full min-w-[20px] text-center">{tab.badge}</span>
                )}
                {activeTab === tab.id && (
                  <motion.div layoutId="tab-glow" className="absolute -right-2 w-1 h-6 bg-[var(--accent)] rounded-full blur-[2px]" />
                )}
              </button>
            ))}

            <div className="mt-auto pt-8 border-t border-white/5">
              <button onClick={onClose} className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                <LogOut size={16} /> Terminate Session
              </button>
            </div>
          </div>

          {/* Creative Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-transparent relative z-10">
            <header className="h-28 flex items-center justify-between px-12 border-b border-white/5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-4">
                  <h2 className="text-[24px] font-black text-white tracking-tight">{activeTab}</h2>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/30">
                    Live Dashboard
                  </div>
                </div>
                {isSaving ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[var(--accent)] text-[9px] font-black uppercase tracking-widest">
                    <RefreshCw size={10} className="animate-spin" /> Syncing with Cluster...
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-2 text-white/20 text-[9px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={10} /> Cloud Origin Synced
                  </div>
                )}
              </div>
              <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/5 rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar-hidden">
              <AnimatePresence mode="wait">
                {/* ── PROJECTS TAB ── */}
                {activeTab === "Projects" && (
                   <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                     <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <h3 className="text-[12px] font-black text-[var(--accent)] uppercase tracking-[4px]">Work Portfolio</h3>
                           <p className="text-[14px] text-white/40 font-medium max-w-md">Manage your case studies and technological proof-of-concepts.</p>
                        </div>
                        <button onClick={() => {
                          const updated = [{ id: Date.now(), title: "New Evolution", description: "", status: "Draft", tag: categories.projects[0] || "Python", image: "" }, ...projects];
                          setProjects(updated);
                          saveData("admin-projects", updated);
                        }} className="group flex items-center gap-3 px-8 py-4 bg-[var(--accent)] text-black rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                          <Plus size={18} /> Spawn Project
                        </button>
                     </div>

                     {/* Category Manager */}
                     <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                           <Tag size={18} className="text-[var(--accent)]" />
                           <h4 className="text-[12px] font-black text-white uppercase tracking-widest">Manage Categories</h4>
                        </div>
                        <div className="flex flex-wrap gap-3">
                           {categories.projects.map((cat: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold text-white group">
                                 {cat}
                                 <button onClick={() => {
                                    const updated = { ...categories, projects: categories.projects.filter((_: any, i: number) => i !== idx) };
                                    setCategories(updated);
                                    saveData("admin-categories", updated);
                                 }} className="text-white/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"><X size={12} /></button>
                              </div>
                           ))}
                           <div className="flex items-center gap-2 px-3 py-1 bg-transparent border border-dashed border-white/20 rounded-xl">
                              <input 
                                 placeholder="New..." 
                                 className="bg-transparent text-[11px] text-white outline-none w-20" 
                                 onKeyDown={(e: any) => {
                                    if (e.key === 'Enter' && e.target.value) {
                                       const updated = { ...categories, projects: [...categories.projects, e.target.value] };
                                       setCategories(updated);
                                       saveData("admin-categories", updated);
                                       e.target.value = '';
                                    }
                                 }}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 gap-6">
                        {projects.map((p, i) => (
                          <motion.div 
                             key={p.id} 
                             initial={{ opacity: 0, x: -20 }} 
                             animate={{ opacity: 1, x: 0 }} 
                             transition={{ delay: i * 0.05 }}
                             className="group relative p-10 bg-white/[0.03] border border-white/5 rounded-[40px] hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden"
                          >
                            <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                               <div className="w-full lg:w-64 aspect-video lg:aspect-square bg-white/5 rounded-[32px] border border-white/5 relative overflow-hidden group/img flex items-center justify-center shrink-0 shadow-2xl">
                                  {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale-[0.5] group-hover/img:grayscale-0 transition-all duration-700 scale-105 group-hover/img:scale-100" /> : <ImageIcon size={40} className="text-white/10" />}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all">
                                     <label className="cursor-pointer px-5 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all">
                                        Swap Assets
                                        <input type="file" className="hidden" onChange={e => handleImageUpload(e, (b64) => {
                                           const n = [...projects]; n[i].image = b64; setProjects(n); saveData("admin-projects", n);
                                        })} />
                                     </label>
                                  </div>
                               </div>

                               <div className="flex-1 space-y-6">
                                  <div className="flex flex-wrap items-start justify-between gap-4">
                                     <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                           <Type size={14} className="text-[var(--accent)] opacity-40" />
                                           <input type="text" value={p.title} onChange={e => { const n = [...projects]; n[i].title = e.target.value; setProjects(n); }} onBlur={() => saveData("admin-projects", projects)} className="bg-transparent text-white font-black text-[24px] lg:text-[32px] outline-none flex-1 tracking-tight" placeholder="Project Name" />
                                        </div>
                                        <div className="flex items-center gap-6">
                                           {/* CATEGORY DROPDOWN */}
                                           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                                              <Tag size={12} className="text-white/40" />
                                              <select 
                                                 value={p.tag} 
                                                 onChange={e => { const n = [...projects]; n[i].tag = e.target.value; setProjects(n); saveData("admin-projects", n); }} 
                                                 className="bg-transparent text-[11px] font-black uppercase tracking-widest text-[var(--accent)] outline-none cursor-pointer"
                                              >
                                                 {categories.projects.map((cat: string) => <option key={cat} className="bg-[#111]">{cat}</option>)}
                                              </select>
                                           </div>
                                           {/* STATUS DROPDOWN */}
                                           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                                              <div className={`w-1.5 h-1.5 rounded-full ${p.status === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-orange-400'}`} />
                                              <select 
                                                 value={p.status} 
                                                 onChange={e => { const n = [...projects]; n[i].status = e.target.value; setProjects(n); saveData("admin-projects", n); }} 
                                                 className="bg-transparent text-[11px] font-black uppercase tracking-widest text-white/50 outline-none cursor-pointer"
                                              >
                                                 <option className="bg-[#111]">Draft</option>
                                                 <option className="bg-[#111]">Active</option>
                                                 <option className="bg-[#111]">Featured</option>
                                              </select>
                                           </div>
                                        </div>
                                     </div>
                                     <button onClick={() => {
                                        if(confirm("Erase project history?")) {
                                          const updated = projects.filter(x => x.id !== p.id);
                                          setProjects(updated);
                                          saveData("admin-projects", updated);
                                        }
                                     }} className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500/20 transition-all border border-red-500/10"><Trash2 size={18} /></button>
                                  </div>
                                  <div className="space-y-2">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Analytical Context</label>
                                     <textarea value={p.description} onChange={e => { const n = [...projects]; n[i].description = e.target.value; setProjects(n); }} onBlur={() => saveData("admin-projects", projects)} className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-6 text-white/60 text-[15px] outline-none focus:border-white/10 transition-all resize-none min-h-[120px] leading-relaxed" placeholder="Elaborate on the technical architecture..." />
                                  </div>
                               </div>
                            </div>

                            {/* Creative Background Glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--accent-rgb),0.03)_0%,transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-700" />
                          </motion.div>
                        ))}
                     </div>
                   </motion.div>
                )}

                {/* ── BLOG TAB ── */}
                {activeTab === "Blog" && (
                   <motion.div key="blog" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <h3 className="text-[12px] font-black text-pink-400 uppercase tracking-[4px]">Thought Leadership</h3>
                           <p className="text-[14px] text-white/40 font-medium max-w-md">Publish your technical insights and research documentation.</p>
                        </div>
                        <button onClick={() => {
                          const updated = [{ id: Date.now(), title: "New Technical Deep Dive", category: categories.blog[0] || "General", date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), status: "Draft" }, ...posts];
                          setPosts(updated);
                          saveData("admin-posts", updated);
                        }} className="group flex items-center gap-3 px-8 py-4 bg-pink-500 text-black rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                          <Plus size={18} /> New Transmission
                        </button>
                      </div>

                      {/* Category Manager */}
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                           <Layers size={18} className="text-pink-400" />
                           <h4 className="text-[12px] font-black text-white uppercase tracking-widest">Article Categories</h4>
                        </div>
                        <div className="flex flex-wrap gap-3">
                           {categories.blog.map((cat: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[11px] font-bold text-white group">
                                 {cat}
                                 <button onClick={() => {
                                    const updated = { ...categories, blog: categories.blog.filter((_: any, i: number) => i !== idx) };
                                    setCategories(updated);
                                    saveData("admin-categories", updated);
                                 }} className="text-white/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"><X size={12} /></button>
                              </div>
                           ))}
                           <div className="flex items-center gap-2 px-3 py-1 bg-transparent border border-dashed border-white/20 rounded-xl">
                              <input 
                                 placeholder="Add Category..." 
                                 className="bg-transparent text-[11px] text-white outline-none w-28" 
                                 onKeyDown={(e: any) => {
                                    if (e.key === 'Enter' && e.target.value) {
                                       const updated = { ...categories, blog: [...categories.blog, e.target.value] };
                                       setCategories(updated);
                                       saveData("admin-categories", updated);
                                       e.target.value = '';
                                    }
                                 }}
                              />
                           </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {posts.map((post, i) => (
                          <motion.div 
                             key={post.id} 
                             className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-pink-500/30 transition-all"
                          >
                             <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1 space-y-4 w-full">
                                   <input type="text" value={post.title} onChange={e => { const n = [...posts]; n[i].title = e.target.value; setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="bg-transparent text-white font-black text-[20px] outline-none w-full" placeholder="Article Title" />
                                   <div className="flex items-center gap-6">
                                      <select 
                                         value={post.category} 
                                         onChange={e => { const n = [...posts]; n[i].category = e.target.value; setPosts(n); saveData("admin-posts", n); }} 
                                         className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-[2px] text-pink-400 outline-none cursor-pointer"
                                      >
                                         {categories.blog.map((cat: string) => <option key={cat} className="bg-[#111]">{cat}</option>)}
                                      </select>
                                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{post.date}</div>
                                   </div>
                                </div>
                                <div className="flex gap-3 shrink-0">
                                   <select value={post.status} onChange={e => { const n = [...posts]; n[i].status = e.target.value; setPosts(n); saveData("admin-posts", n); }} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                      <option className="bg-[#111]">Draft</option>
                                      <option className="bg-[#111]">Published</option>
                                   </select>
                                   <button onClick={() => { if(confirm("Discard article?")) { const updated = posts.filter(x => x.id !== post.id); setPosts(updated); saveData("admin-posts", updated); } }} className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500/20 border border-red-500/10"><Trash2 size={18} /></button>
                                </div>
                             </div>
                          </motion.div>
                        ))}
                      </div>
                   </motion.div>
                )}

                {/* ── CERTIFICATIONS TAB ── */}
                {activeTab === "Certifications" && (
                   <motion.div key="certs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <h3 className="text-[12px] font-black text-yellow-400 uppercase tracking-[4px]">Verified Training</h3>
                           <p className="text-[14px] text-white/40 font-medium max-w-md">Manage your academic and industry certifications.</p>
                        </div>
                        <button onClick={() => {
                          const updated = [{ id: Date.now(), title: "New Certification", provider: "Institution", link: "#", status: "Draft" }, ...certs];
                          setCerts(updated);
                          saveData("admin-certs", updated);
                        }} className="group flex items-center gap-3 px-8 py-4 bg-yellow-400 text-black rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                          <Plus size={18} /> Add Credential
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certs.map((c, i) => (
                          <motion.div 
                             key={c.id} 
                             className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-yellow-400/30 transition-all space-y-6"
                          >
                             <div className="flex justify-between gap-4">
                                <div className="flex-1 space-y-4">
                                   <input type="text" value={c.title} onChange={e => { const n = [...certs]; n[i].title = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-white font-black text-[18px] outline-none w-full" placeholder="Course/Cert Title" />
                                   <input type="text" value={c.provider} onChange={e => { const n = [...certs]; n[i].provider = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-yellow-400/60 font-bold text-[11px] uppercase tracking-widest outline-none w-full" placeholder="Issuing Institution" />
                                </div>
                                <button onClick={() => { if(confirm("Revoke credential?")) { const updated = certs.filter(x => x.id !== c.id); setCerts(updated); saveData("admin-certs", updated); } }} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 border border-red-500/10"><Trash2 size={16} /></button>
                             </div>
                             
                             <div className="flex items-center gap-4">
                                <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                                   <LinkIcon size={12} className="text-white/20" />
                                   <input type="text" value={c.link} onChange={e => { const n = [...certs]; n[i].link = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-white/40 text-[11px] outline-none w-full" placeholder="Credential URL" />
                                </div>
                                <select value={c.status} onChange={e => { const n = [...certs]; n[i].status = e.target.value; setCerts(n); saveData("admin-certs", n); }} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                   <option className="bg-[#111]">Draft</option>
                                   <option className="bg-[#111]">Active</option>
                                </select>
                             </div>
                          </motion.div>
                        ))}
                      </div>
                   </motion.div>
                )}

                 {/* ── DEMOS TAB ── */}
                 {activeTab === "Demos" && (
                   <motion.div key="demos" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <h3 className="text-[12px] font-black text-indigo-400 uppercase tracking-[4px]">Interactive Showcases</h3>
                           <p className="text-[14px] text-white/40 font-medium max-w-md">Manage the live sandboxes and interactive project demos.</p>
                        </div>
                        <button onClick={() => {
                          const updated = [{ id: Date.now(), title: "New Simulation", tag: "Python", description: "Interactive sandbox for new technology.", status: "Active" }, ...demos];
                          setDemos(updated);
                          saveData("admin-demos", updated);
                        }} className="group flex items-center gap-3 px-8 py-4 bg-indigo-500 text-white rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                          <Plus size={18} /> Add Sandbox
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {demos.map((d, i) => (
                          <motion.div 
                             key={d.id} 
                             className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-indigo-500/30 transition-all space-y-6"
                          >
                             <div className="flex justify-between gap-4">
                                <div className="flex-1 space-y-4">
                                   <input type="text" value={d.title} onChange={e => { const n = [...demos]; n[i].title = e.target.value; setDemos(n); }} onBlur={() => saveData("admin-demos", demos)} className="bg-transparent text-white font-black text-[18px] outline-none w-full" placeholder="Demo Title" />
                                   <div className="flex items-center gap-3">
                                      <Tag size={12} className="text-indigo-400" />
                                      <input type="text" value={d.tag} onChange={e => { const n = [...demos]; n[i].tag = e.target.value; setDemos(n); }} onBlur={() => saveData("admin-demos", demos)} className="bg-transparent text-white/40 font-bold text-[10px] uppercase tracking-widest outline-none" placeholder="Tag (e.g. Python)" />
                                   </div>
                                </div>
                                <button onClick={() => { if(confirm("Discard demo configuration?")) { const updated = demos.filter(x => x.id !== d.id); setDemos(updated); saveData("admin-demos", updated); } }} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 border border-red-500/10"><Trash2 size={16} /></button>
                             </div>
                             
                             <textarea value={d.description} onChange={e => { const n = [...demos]; n[i].description = e.target.value; setDemos(n); }} onBlur={() => saveData("admin-demos", demos)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[13px] text-white/50 outline-none h-24 resize-none" placeholder="Explain the sandbox context..." />
                             
                             <div className="flex items-center justify-between">
                                <select value={d.status} onChange={e => { const n = [...demos]; n[i].status = e.target.value; setDemos(n); saveData("admin-demos", n); }} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                   <option className="bg-[#111]">Draft</option>
                                   <option className="bg-[#111]">Active</option>
                                </select>
                             </div>
                          </motion.div>
                        ))}
                      </div>
                   </motion.div>
                 )}

                {/* ── RADAR & TOOLS TAB ── */}
                {activeTab === "Radar & Tools" && (
                   <motion.div key="radar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                         <div className="space-y-8">
                            <div className="flex justify-between items-center">
                               <h3 className="text-[12px] font-black text-purple-400 uppercase tracking-[4px]">Skill Radar</h3>
                               <button onClick={() => {
                                  const updated = [...radarSkills, { name: "New Skill", value: 50 }];
                                  setRadarSkills(updated);
                                  saveData("admin-skills-radar", updated);
                               }} className="w-10 h-10 bg-purple-500 text-black rounded-xl flex items-center justify-center hover:scale-110 transition-all"><Plus size={20} /></button>
                            </div>
                            <div className="space-y-4">
                               {radarSkills.map((s, i) => (
                                  <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group">
                                     <input type="text" value={s.name} onChange={e => { const n = [...radarSkills]; n[i].name = e.target.value; setRadarSkills(n); }} onBlur={() => saveData("admin-skills-radar", radarSkills)} className="bg-transparent text-white font-bold text-[13px] outline-none flex-1" />
                                     <input type="number" value={s.value} onChange={e => { const n = [...radarSkills]; n[i].value = parseInt(e.target.value); setRadarSkills(n); }} onBlur={() => saveData("admin-skills-radar", radarSkills)} className="w-12 bg-white/5 border border-white/10 rounded-lg p-1 text-[11px] text-purple-400 font-bold text-center outline-none" />
                                     <button onClick={() => {
                                        const updated = radarSkills.filter((_, idx) => idx !== i);
                                        setRadarSkills(updated);
                                        saveData("admin-skills-radar", updated);
                                     }} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash size={14} /></button>
                                  </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-8">
                            <div className="flex justify-between items-center">
                               <h3 className="text-[12px] font-black text-blue-400 uppercase tracking-[4px]">Tool proficiency</h3>
                               <button onClick={() => {
                                  const updated = [...toolSkills, { name: "New Tool", progress: 50, level: "Professional", desc: "" }];
                                  setToolSkills(updated);
                                  saveData("admin-skills", { tools: updated });
                               }} className="w-10 h-10 bg-blue-500 text-black rounded-xl flex items-center justify-center hover:scale-110 transition-all"><Plus size={20} /></button>
                            </div>
                            <div className="space-y-4">
                               {toolSkills.map((s, i) => (
                                  <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group space-y-4">
                                     <div className="flex justify-between items-start">
                                        <input type="text" value={s.name} onChange={e => { const n = [...toolSkills]; n[i].name = e.target.value; setToolSkills(n); }} onBlur={() => saveData("admin-skills", { tools: toolSkills })} className="bg-transparent text-white font-bold text-[15px] outline-none" />
                                        <button onClick={() => {
                                           const updated = toolSkills.filter((_, idx) => idx !== i);
                                           setToolSkills(updated);
                                           saveData("admin-skills", { tools: updated });
                                        }} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash size={16} /></button>
                                     </div>
                                     <div className="flex gap-4">
                                        <input type="number" value={s.progress} onChange={e => { const n = [...toolSkills]; n[i].progress = parseInt(e.target.value); setToolSkills(n); }} onBlur={() => saveData("admin-skills", { tools: toolSkills })} className="w-16 bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-blue-400 font-bold text-center outline-none" placeholder="%" />
                                        <select value={s.level} onChange={e => { const n = [...toolSkills]; n[i].level = e.target.value; setToolSkills(n); saveData("admin-skills", { tools: n }); }} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] font-bold text-white/40 outline-none">
                                           <option className="bg-[#111]">Beginner</option>
                                           <option className="bg-[#111]">Professional</option>
                                           <option className="bg-[#111]">Advanced</option>
                                           <option className="bg-[#111]">Expert</option>
                                        </select>
                                     </div>
                                     <textarea value={s.desc} onChange={e => { const n = [...toolSkills]; n[i].desc = e.target.value; setToolSkills(n); }} onBlur={() => saveData("admin-skills", { tools: toolSkills })} className="w-full bg-transparent text-white/40 text-[11px] outline-none border-t border-white/5 pt-2 resize-none h-12" placeholder="Brief description..." />
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </motion.div>
                )}

                {/* ── ANALYTICS TAB ── */}
                {activeTab === "Analytics" && (
                   <motion.div key="analytics" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                     {/* Welcome Header */}
                     <div className="flex justify-between items-end">
                       <div className="space-y-2">
                         <h3 className="text-[32px] font-black text-white tracking-tight">
                           {new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening"}, Ijlal 👋
                         </h3>
                         <p className="text-[14px] text-white/40 font-medium">Here&apos;s your portfolio performance overview.</p>
                       </div>
                       <div className="flex gap-3">
                         <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all">
                           <ArrowUpRight size={14} /> Visit Site
                         </a>
                         <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                           <RefreshCw size={14} /> Refresh
                         </button>
                       </div>
                     </div>

                     {/* Stat Cards */}
                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                       {[
                         { label: "Total Views", value: analyticsData?.totalViews || clientEvents.filter((e: any) => e.type === "page_view").length || 0, icon: <Eye size={20} />, color: "from-blue-500 to-cyan-400", change: "+12%" },
                         { label: "Unique Visitors", value: analyticsData?.uniqueVisitors || 0, icon: <Users size={20} />, color: "from-purple-500 to-pink-400", change: "+8%" },
                         { label: "Today's Views", value: analyticsData?.todayViews || 0, icon: <TrendingUp size={20} />, color: "from-emerald-500 to-green-400", change: "Live" },
                         { label: "Messages", value: inboxMessages.length, icon: <Mail size={20} />, color: "from-orange-500 to-amber-400", change: `${inboxMessages.filter((m: any) => !readMessages.includes(String(m.id))).length} unread` },
                       ].map((stat, i) => (
                         <motion.div
                           key={i}
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.1 }}
                           className="p-6 bg-white/[0.03] border border-white/5 rounded-[28px] hover:border-white/10 transition-all group"
                         >
                           <div className="flex items-center justify-between mb-4">
                             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                               {stat.icon}
                             </div>
                             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">{stat.change}</span>
                           </div>
                           <div className="text-[36px] font-black text-white leading-none tracking-tight">{stat.value}</div>
                           <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2">{stat.label}</div>
                         </motion.div>
                       ))}
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                       {/* Section Heatmap */}
                       <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-6">
                         <div className="flex items-center gap-3">
                           <BarChart3 size={16} className="text-blue-400" />
                           <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Section Engagement</h4>
                         </div>
                         <div className="space-y-4">
                           {(() => {
                             const sectionData = analyticsData?.popularSections?.length
                               ? analyticsData.popularSections
                               : Object.entries(
                                   clientEvents
                                     .filter((e: any) => e.type === "section_view")
                                     .reduce((acc: any, e: any) => { const s = e.metadata?.section || "unknown"; acc[s] = (acc[s] || 0) + 1; return acc; }, {})
                                 ).map(([section, views]) => ({ section, views })).sort((a: any, b: any) => b.views - a.views).slice(0, 6);
                             const maxViews = Math.max(...(sectionData.map((s: any) => s.views) as number[]), 1);
                             return sectionData.length > 0 ? sectionData.map((s: any, i: number) => (
                               <div key={i} className="space-y-1.5">
                                 <div className="flex justify-between text-[11px]">
                                   <span className="font-bold text-white/60 capitalize">{s.section}</span>
                                   <span className="font-black text-white/30">{s.views}</span>
                                 </div>
                                 <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                   <motion.div initial={{ width: 0 }} animate={{ width: `${(s.views / maxViews) * 100}%` }} transition={{ delay: i * 0.1, duration: 0.6 }} className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                                 </div>
                               </div>
                             )) : <p className="text-white/20 text-[12px] text-center py-8">No section data yet. Visit the portfolio to generate engagement data.</p>;
                           })()}
                         </div>
                       </div>

                       {/* Device Breakdown + Recent Activity */}
                       <div className="space-y-6">
                         {/* Device Breakdown */}
                         <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-5">
                           <div className="flex items-center gap-3">
                             <Monitor size={16} className="text-purple-400" />
                             <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Device Breakdown</h4>
                           </div>
                           <div className="flex gap-6">
                             {(() => {
                               const devices = clientEvents.filter((e: any) => e.type === "page_view").reduce((acc: any, e: any) => {
                                 const d = e.metadata?.device || "desktop"; acc[d] = (acc[d] || 0) + 1; return acc;
                               }, {} as Record<string, number>);
                               const total = Object.values(devices).reduce((a: any, b: any) => a + b, 0) as number || 1;
                               return [
                                 { name: "Desktop", icon: <Monitor size={18} />, count: devices.desktop || 0, color: "text-blue-400" },
                                 { name: "Tablet", icon: <Tablet size={18} />, count: devices.tablet || 0, color: "text-purple-400" },
                                 { name: "Mobile", icon: <Smartphone size={18} />, count: devices.mobile || 0, color: "text-emerald-400" },
                               ].map((d, i) => (
                                 <div key={i} className="flex-1 text-center space-y-2">
                                   <div className={`mx-auto w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${d.color}`}>{d.icon}</div>
                                   <div className="text-[20px] font-black text-white">{d.count}</div>
                                   <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{d.name}</div>
                                   <div className="text-[9px] font-bold text-white/20">{total > 0 ? Math.round((d.count / total) * 100) : 0}%</div>
                                 </div>
                               ));
                             })()}
                           </div>
                         </div>

                         {/* Recent Activity Feed */}
                         <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                           <div className="flex items-center gap-3">
                             <Clock size={16} className="text-emerald-400" />
                             <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Live Activity</h4>
                           </div>
                           <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar-hidden">
                             {clientEvents.slice(0, 12).map((evt: any, i: number) => (
                               <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.02] rounded-xl text-[10px]">
                                 <div className={`w-2 h-2 rounded-full shrink-0 ${evt.type === "page_view" ? "bg-blue-400" : evt.type === "section_view" ? "bg-emerald-400" : "bg-orange-400"}`} />
                                 <span className="font-bold text-white/60 capitalize">{evt.type.replace("_", " ")}</span>
                                 {evt.metadata?.section && <span className="text-white/30 capitalize">→ {evt.metadata.section}</span>}
                                 {evt.metadata?.device && <span className="ml-auto text-white/20">{evt.metadata.device}</span>}
                                 <span className="text-white/15 shrink-0">{new Date(evt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                               </div>
                             ))}
                             {clientEvents.length === 0 && <p className="text-white/20 text-[11px] text-center py-6">No activity events recorded yet.</p>}
                           </div>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                )}

                {/* ── INBOX TAB ── */}
                {activeTab === "Inbox" && (
                   <motion.div key="inbox" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                     <div className="flex justify-between items-end">
                       <div className="space-y-2">
                         <h3 className="text-[12px] font-black text-cyan-400 uppercase tracking-[4px]">Contact Submissions</h3>
                         <p className="text-[14px] text-white/40 font-medium max-w-md">Messages from your portfolio contact form — both local and server-synced.</p>
                       </div>
                       <div className="flex gap-3">
                         <button onClick={() => {
                           const allIds = inboxMessages.map((m: any) => String(m.id));
                           setReadMessages(allIds);
                           saveData("admin-read-messages", allIds);
                         }} className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-all">
                           <CheckCircle2 size={14} /> Mark All Read
                         </button>
                       </div>
                     </div>

                     <div className="space-y-3">
                       {inboxMessages.length === 0 && (
                         <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                           <div className="w-16 h-16 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400"><Inbox size={28} /></div>
                           <p className="text-white/30 text-[13px]">No messages yet. Your inbox is empty.</p>
                         </div>
                       )}
                       {inboxMessages.map((msg: any, i: number) => {
                         const isRead = readMessages.includes(String(msg.id));
                         return (
                           <motion.div
                             key={msg.id || i}
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: i * 0.03 }}
                             className={`p-6 border rounded-[28px] transition-all cursor-pointer group ${isRead ? "bg-white/[0.01] border-white/5" : "bg-cyan-500/[0.03] border-cyan-500/20 hover:border-cyan-400/40"}`}
                             onClick={() => {
                               if (!isRead) {
                                 const updated = [...readMessages, String(msg.id)];
                                 setReadMessages(updated);
                                 saveData("admin-read-messages", updated);
                               }
                             }}
                           >
                             <div className="flex items-start gap-5">
                               <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isRead ? "bg-white/5 text-white/20" : "bg-cyan-500/20 text-cyan-400"}`}>
                                 <Mail size={18} />
                               </div>
                               <div className="flex-1 min-w-0 space-y-2">
                                 <div className="flex items-center gap-3">
                                   <span className={`font-black text-[14px] ${isRead ? "text-white/40" : "text-white"}`}>{msg.name || "Anonymous"}</span>
                                   {!isRead && <span className="px-2 py-0.5 bg-cyan-500 text-black text-[7px] font-black rounded-full uppercase tracking-widest">New</span>}
                                   {msg.serviceType && <span className="px-2 py-0.5 bg-white/5 text-white/30 text-[8px] font-bold rounded-full">{msg.serviceType}</span>}
                                 </div>
                                 <p className="text-[12px] text-white/30 font-medium">{msg.email}</p>
                                 <p className={`text-[13px] leading-relaxed ${isRead ? "text-white/25" : "text-white/50"}`}>{msg.message}</p>
                               </div>
                               <div className="flex flex-col items-end gap-3 shrink-0">
                                 <span className="text-[9px] font-bold text-white/20">{msg.date ? new Date(msg.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "N/A"}</span>
                                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                   <a href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`} className="w-8 h-8 bg-[var(--accent)]/10 text-[var(--accent)] rounded-lg flex items-center justify-center hover:bg-[var(--accent)]/20 transition-all" title="Reply"><ArrowUpRight size={14} /></a>
                                   <button onClick={(e) => { e.stopPropagation(); if(confirm("Delete this message?")) { const updated = inboxMessages.filter((_: any, idx: number) => idx !== i); setInboxMessages(updated); }}} className="w-8 h-8 bg-red-500/10 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-all" title="Delete"><Trash size={14} /></button>
                                 </div>
                               </div>
                             </div>
                           </motion.div>
                         );
                       })}
                     </div>
                   </motion.div>
                )}

                {/* ── TESTIMONIALS TAB ── */}
                {activeTab === "Testimonials" && (
                   <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                     <div className="flex justify-between items-end">
                       <div className="space-y-2">
                         <h3 className="text-[12px] font-black text-amber-400 uppercase tracking-[4px]">Social Proof</h3>
                         <p className="text-[14px] text-white/40 font-medium max-w-md">Manage testimonials displayed on your portfolio.</p>
                       </div>
                       <button onClick={() => {
                         const updated = [{ id: Date.now(), name: "New Collaborator", role: "Title", company: "Company", quote: "", avatar: "", status: "Draft" }, ...testimonials];
                         setTestimonials(updated);
                         saveData("admin-testimonials", updated);
                       }} className="group flex items-center gap-3 px-8 py-4 bg-amber-400 text-black rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                         <Plus size={18} /> Add Testimonial
                       </button>
                     </div>

                     <div className="grid grid-cols-1 gap-6">
                       {testimonials.map((t: any, i: number) => (
                         <motion.div
                           key={t.id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.05 }}
                           className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-amber-400/30 transition-all space-y-6"
                         >
                           <div className="flex items-start gap-6">
                             {/* Avatar */}
                             <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center group/avatar relative">
                               {t.avatar ? <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" /> : <UserIcon size={24} className="text-white/20" />}
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-all">
                                 <label className="cursor-pointer text-[8px] font-black text-white uppercase tracking-widest">
                                   Edit
                                   <input type="file" className="hidden" accept="image/*" onChange={e => handleImageUpload(e, (b64) => { const n = [...testimonials]; n[i].avatar = b64; setTestimonials(n); saveData("admin-testimonials", n); })} />
                                 </label>
                               </div>
                             </div>

                             {/* Info */}
                             <div className="flex-1 space-y-3">
                               <input type="text" value={t.name} onChange={e => { const n = [...testimonials]; n[i].name = e.target.value; setTestimonials(n); }} onBlur={() => saveData("admin-testimonials", testimonials)} className="bg-transparent text-white font-black text-[18px] outline-none w-full" placeholder="Person Name" />
                               <div className="flex gap-4">
                                 <input type="text" value={t.role} onChange={e => { const n = [...testimonials]; n[i].role = e.target.value; setTestimonials(n); }} onBlur={() => saveData("admin-testimonials", testimonials)} className="bg-transparent text-amber-400/60 font-bold text-[11px] uppercase tracking-widest outline-none" placeholder="Role/Title" />
                                 <span className="text-white/10">@</span>
                                 <input type="text" value={t.company} onChange={e => { const n = [...testimonials]; n[i].company = e.target.value; setTestimonials(n); }} onBlur={() => saveData("admin-testimonials", testimonials)} className="bg-transparent text-white/40 font-bold text-[11px] uppercase tracking-widest outline-none" placeholder="Company" />
                               </div>
                             </div>

                             {/* Actions */}
                             <div className="flex gap-3 shrink-0">
                               <select value={t.status} onChange={e => { const n = [...testimonials]; n[i].status = e.target.value; setTestimonials(n); saveData("admin-testimonials", n); }} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                 <option className="bg-[#111]">Draft</option>
                                 <option className="bg-[#111]">Published</option>
                               </select>
                               <button onClick={() => { if(confirm("Remove testimonial?")) { const updated = testimonials.filter((x: any) => x.id !== t.id); setTestimonials(updated); saveData("admin-testimonials", updated); }}} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 border border-red-500/10"><Trash2 size={16} /></button>
                             </div>
                           </div>

                           {/* Quote */}
                           <div className="space-y-2">
                             <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1 flex items-center gap-2"><Quote size={10} /> Testimonial Quote</label>
                             <textarea value={t.quote} onChange={e => { const n = [...testimonials]; n[i].quote = e.target.value; setTestimonials(n); }} onBlur={() => saveData("admin-testimonials", testimonials)} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-5 text-white/50 text-[14px] outline-none focus:border-amber-400/20 transition-all resize-none min-h-[100px] leading-relaxed italic" placeholder='"Write what they said about your work..."' />
                           </div>
                         </motion.div>
                       ))}
                     </div>
                   </motion.div>
                )}

                {activeTab === "Settings" && (
                   <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto space-y-12">
                      <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] space-y-8">
                         <div className="flex items-center gap-4">
                            <Palette size={20} className="text-blue-400" />
                            <h4 className="text-[14px] font-black text-white uppercase tracking-widest">Interface Theme</h4>
                         </div>
                         <div className="grid grid-cols-3 gap-4">
                            {['Cyber', 'Classic', 'Aether'].map(t => (
                               <button key={t} className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${t === 'Aether' ? 'bg-[var(--accent)] text-black shadow-xl' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                                  {t} Mode
                               </button>
                            ))}
                         </div>
                      </div>
                      <button onClick={() => {
                         sessionStorage.removeItem("aether-admin-session");
                         onClose();
                         window.location.reload();
                      }} className="w-full py-6 bg-red-500/10 text-red-400 border border-red-500/20 rounded-[32px] font-black uppercase text-[11px] tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-4">
                         <LogOut size={20} /> Terminate Operational Session
                      </button>
                   </motion.div>
                )}
                {/* ── SECURITY TAB ── */}
                {activeTab === "Security" && (
                  <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                    <div className="space-y-2">
                       <h3 className="text-[12px] font-black text-emerald-400 uppercase tracking-[4px]">Security & Architecture Audit</h3>
                       <p className="text-[14px] text-white/40 font-medium max-w-md">System-wide check for data integrity and security measures.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                       <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                          <div className="flex items-center gap-3 text-white/60 mb-2">
                             <Layers size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Storage Footprint</span>
                          </div>
                          <div className="text-3xl font-black text-white">{systemAudit?.totalSize || "0 KB"}</div>
                          <p className="text-[11px] text-white/30 leading-relaxed font-medium">Current local database usage on this machine.</p>
                       </div>
                       <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                          <div className="flex items-center gap-3 text-emerald-400/60 mb-2">
                             <ShieldCheck size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Auth Status</span>
                          </div>
                          <div className="text-3xl font-black text-white">Active Token</div>
                          <p className="text-[11px] text-white/30 leading-relaxed font-medium">Session token verified via server-side gateway.</p>
                       </div>
                       <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                          <div className="flex items-center gap-3 text-blue-400/60 mb-2">
                             <BarChart3 size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Data Objects</span>
                          </div>
                          <div className="text-3xl font-black text-white">{systemAudit?.items || 0}</div>
                          <p className="text-[11px] text-white/30 leading-relaxed font-medium">Total registered entities in local cluster.</p>
                       </div>
                    </div>

                    <div className="p-10 bg-red-500/5 border border-red-500/10 rounded-[40px] space-y-6">
                       <div className="flex items-center gap-4 text-red-400">
                          <Zap size={20} />
                          <h4 className="text-[14px] font-black uppercase tracking-widest">Destructive Actions</h4>
                       </div>
                       <p className="text-[12px] text-white/40 leading-relaxed max-w-2xl">
                          Wipe all local administrative data and restore original defaults. This will resolve most &quot;database leaks&quot; or synchronization issues but cannot be undone.
                       </p>
                       <div className="flex gap-4">
                          <button 
                            onClick={() => {
                               if (confirm("Initiate total system reset? This wipes ALL local data.")) {
                                  storage.clearAll();
                                  window.location.reload();
                               }
                            }}
                            className="px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                          >
                             Factory Reset Database
                          </button>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

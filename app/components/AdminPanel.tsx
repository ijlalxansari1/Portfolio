"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, BarChart3, ShieldCheck, Settings, LogOut, Save, Plus, Trash2, 
  Download, Upload as UploadIcon, Briefcase, Newspaper, MessageSquare, 
  User as UserIcon, Globe, Bold, Italic, Code, Link as LinkIcon, 
  RefreshCw, Award, Mail, Star, ExternalLink, Trash, CheckCircle2, Zap, Search, Cpu,
  ChevronDown, Layers, Palette, Eye, Type, Image as ImageIcon, Tag,
  Calendar, Clock, Monitor, Smartphone, Tablet, TrendingUp, Inbox, Quote, ArrowUpRight, Users, FlaskConical, Github, Landmark, Briefcase as BriefcaseIcon, Server, Music
} from "lucide-react";
import Image from "next/image";
import { storage } from "../utils/storage";
import ImageUpload from "./ImageUpload";

// ── DEFAULT DATA CONSTANTS ──
const defaultProjects = [
  { id: 1, title: "DataDen Platform", tag: "Python", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", description: "Open-source ethical data analysis platform with a 10-stage analytical pipeline.", status: "Active" },
  { id: 2, title: "Data Engineering Tracker", tag: "Next.js", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800", description: "Interactive 20-hour data engineering curriculum tracker built on the 80/20 principle.", status: "Active" },
  { id: 3, title: "ETL Pipeline — dbt + Dagster", tag: "SQL", image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800", description: "End-to-end ELT pipeline using dbt Core and Dagster for orchestration.", status: "Active" }
];

const defaultPosts = [
  { id: 1, date: "Jan 2025", category: "Platform Design", title: "Building DataDen: Designing an Ethical Data Platform", status: "Published" },
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
  { id: 1, name: "Dr. Sarah Chen", role: "AI Research Lead", company: "DataTalks.Club", quote: "Ijlal's work on ethical data systems is truly impressive. His LOKI protocol sets a new standard.", avatar: "", status: "Published" },
  { id: 2, name: "Marcus Weber", role: "Senior Data Engineer", company: "Freelance Client", quote: "Exceptional data pipeline architecture. Delivered ahead of schedule with production-grade quality.", avatar: "", status: "Published" }
];

const defaultLanguages = [
  { name: "English", level: 90, flag: "gb" },
  { name: "Spanish", level: 60, flag: "es" },
  { name: "Italian", level: 30, flag: "it" },
  { name: "French", level: 70, flag: "fr" },
  { name: "Deutsch", level: 20, flag: "de" },
];

const defaultPractices = [
  "DWH & DB Concepts",
  "Data Analytics Engineering",
  "Data Preparation",
  "Oracle SQL",
  "Data Integration",
  "Data Provisioning",
  "Data Solution Architecture",
  "ETL/ELT Solutions"
];

const defaultRadar = [
  { name: "Python", value: 92 }, { name: "PostgreSQL", value: 85 }, { name: "DuckDB", value: 90 }, { name: "FastAPI", value: 87 }, { name: "Kafka", value: 75 }, { name: "Next.js", value: 88 }
];

const defaultTools = [
  { name: "dbt Core", progress: 95, level: "Expert", desc: "SQL transformations & lineage" },
  { name: "Dagster", progress: 85, level: "Professional", desc: "Asset-based orchestration" },
  { name: "Apache Airflow", progress: 88, level: "Advanced", desc: "Workflow automation" }
];

const defaultGithubRepos = [
  { id: 1, name: "Aether", description: "A modern data and AI platform for experimentation and observability.", language: "TypeScript", stars: 5, html_url: "https://github.com/ijlalxansari1/Aether", homepage: "", status: "Published" },
  { id: 2, name: "Data-Engineering-Foundry", description: "Reference implementations for pipelines, warehousing and analytics engineering.", language: "Python", stars: 8, html_url: "https://github.com/ijlalxansari1/Data-Engineering-Foundry", homepage: "", status: "Published" },
  { id: 3, name: "Portfolio", description: "A dynamic Next.js portfolio with admin-managed content and integrations.", language: "TypeScript", stars: 3, html_url: "https://github.com/ijlalxansari1/Portfolio", homepage: "", status: "Published" }
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
  const [knowledge, setKnowledge] = useState<string[]>([]);
  const [demos, setDemos] = useState<any[]>([]);
  const [skillGroups, setSkillGroups] = useState<any[]>([]);
  const [practices, setPractices] = useState<any[]>([]);
  const [langSkills, setLangSkills] = useState<any[]>([]);
  const [categories, setCategories] = useState<any>(defaultCategories);
  const [isSaving, setIsSaving] = useState(false);
  const [systemAudit, setSystemAudit] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [clientEvents, setClientEvents] = useState<any[]>([]);
  const [inboxMessages, setInboxMessages] = useState<any[]>([]);
  const [readMessages, setReadMessages] = useState<string[]>([]);
  const [heroConfig, setHeroConfig] = useState<any>({ label: "Data Ops Engineer", titles: ["Data Ops Engineer", "Data Engineer", "Pipeline Builder", "Platform Builder"], techTags: ["Python", "SQL", "Apache Spark", "Airflow", "dbt", "ETL/ELT", "AWS", "Data Engineering"] });
  const [manifesto, setManifesto] = useState<any>(null);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [githubRepos, setGithubRepos] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>({});
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  const [keystats, setKeystats] = useState<any>({ projects: 6, hours: 1000, taught: 100 });
  const [bgMusic, setBgMusic] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          const res = await fetch("/api/data/admin");
          const { data } = await res.json();
          const get = (key: string, fallback: any) => (data && data[key] !== undefined) ? data[key] : fallback;

          setProjects(get("admin-projects", defaultProjects));
          setPosts(get("admin-posts", defaultPosts));
          setCerts(get("admin-certs", defaultCerts));
          setSubmissions(get("admin-submissions", []));
          setRadarSkills(get("admin-skills-radar", defaultRadar));
          setToolSkills(get("admin-skills", { tools: defaultTools }).tools);
          setKnowledge(get("admin-knowledge", [
            "Distributed Systems", "Cloud Data Warehousing", "Machine Learning Ops",
            "Real-time Data Streaming", "ETL/ELT Architecture", "Data Governance",
            "API Design & Integration", "Infrastructure as Code"
          ]));
          setSkillGroups(get("admin-skills-groups", []));
          setPractices(get("admin-practices", defaultPractices));
          setLangSkills(get("admin-languages", defaultLanguages));
          setCategories(get("admin-categories", defaultCategories));
          setTestimonials(get("admin-testimonials", defaultTestimonials));
          setReadMessages(get("admin-read-messages", []));
          
          const toolsData = get("admin-skills", { tools: defaultTools });
          setToolSkills(toolsData.tools || defaultTools);
          setBgMusic(get("admin-bg-music", []));
          setDemos(get("admin-demos", []));
          const rawServices = get("admin-services", null);
          const defaultAdminServices = [
            { 
              id: 1, title: "Data Pipelines & Integration", icon: "Workflow", status: "Published", badge: "DataOps",
              summary: "End-to-end ETL/ELT pipelines, data integration from APIs/databases/files, transformation, and workflow automation.",
              body: "End-to-end ETL/ELT pipelines, data integration from APIs/databases/files, transformation, and workflow automation using Python, SQL, and orchestration tools.",
              deliverables: ["Custom Extract/Load connect", "dbt data transformations", "Airflow/Dagster automation"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 2, title: "Database Architecture", icon: "Database", status: "Published", badge: "Data Platforms",
              summary: "Design scalable relational databases with star schemas, dimensional modeling, warehousing, efficient indexing.",
              body: "Design scalable relational databases with star schemas, dimensional modeling, warehousing, efficient indexing, and query optimization.",
              deliverables: ["Star/Snowflake Schemas", "Query Optimization", "Performance Indexing"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 3, title: "Data Quality & Validation", icon: "ShieldCheck", status: "Published", badge: "Reliability",
              summary: "Implement validation rules, schema checks, duplicate detection, missing value handling, and monitoring.",
              body: "Implement validation rules, schema checks, duplicate detection, missing value handling, and comprehensive data quality monitoring.",
              deliverables: ["Automated schema checks", "Anomaly detection", "Data quality monitoring"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 4, title: "Data Governance", icon: "Network", status: "Published", badge: "Governance",
              summary: "Design data systems with documentation, audit trails, access control, metadata management, and best practices.",
              body: "Design data systems with documentation, audit trails, access control, metadata management, and governance best practices.",
              deliverables: ["Audit trails", "Role-Based Access", "Metadata management"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 5, title: "Analytics Engineering", icon: "LineChart", status: "Published", badge: "BI & Analytics",
              summary: "Prepare clean, well-structured datasets for dashboards, business intelligence, analytical reporting.",
              body: "Prepare clean, well-structured datasets for dashboards, business intelligence, analytical reporting, and data-driven insights.",
              deliverables: ["Dimensional modeling", "Dashboard ready datasets", "BI Integration"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 6, title: "Pipeline Reliability & Monitoring", icon: "Activity", status: "Published", badge: "Ops",
              summary: "Build observable, reliable pipelines with logging, error handling, retry mechanisms, alerts, testing, and CI/CD.",
              body: "Build observable, reliable pipelines with logging, error handling, retry mechanisms, alerts, DataOps practices, testing, and CI/CD deployment.",
              deliverables: ["Error handling & retries", "CI/CD deployment", "DataOps practices"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 7, title: "API Development", icon: "Code2", status: "Published", badge: "Integration",
              summary: "Build RESTful APIs with FastAPI for data ingestion, processing, integration, and secure data access layers.",
              body: "Build RESTful APIs with FastAPI for data ingestion, processing, integration, and secure data access layers.",
              deliverables: ["FastAPI microservices", "Secure data access", "Rate limiting & logging"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 8, title: "Web Scraping & Data Collection", icon: "Globe", status: "Published", badge: "Data Collection",
              summary: "Collect structured data from websites, public datasets, APIs, CSV, JSON, XML sources.",
              body: "Collect structured data from websites, public datasets, APIs, CSV, JSON, XML sources, and third-party services for downstream processing.",
              deliverables: ["Automated Scrapers", "API Integrations", "Data Parsing"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 9, title: "Performance Optimization", icon: "Zap", status: "Published", badge: "Scale",
              summary: "Optimize SQL queries, pipeline execution, storage efficiency, data processing speed, and system scalability.",
              body: "Optimize SQL queries, pipeline execution, storage efficiency, data processing speed, and system scalability for production performance.",
              deliverables: ["SQL tuning", "Pipeline scaling", "Storage efficiency"],
              link: "Let's Connect", href: "#contact"
            },
            { 
              id: 10, title: "Technical Documentation", icon: "BookOpen", status: "Published", badge: "Documentation",
              summary: "Produce clear technical documentation, architecture diagrams, data dictionaries, and pipeline documentation.",
              body: "Produce clear technical documentation, architecture diagrams, data dictionaries, and pipeline documentation for maintainability and knowledge sharing.",
              deliverables: ["Architecture diagrams", "Data dictionaries", "Pipeline documentation"],
              link: "Let's Connect", href: "#contact"
            },
          ];
          
          if (!rawServices || rawServices.length < 5) {
            setServicesData(defaultAdminServices);
            saveData("admin-services", defaultAdminServices);
          } else {
            const mergedMap = new Map();
            defaultAdminServices.forEach(s => mergedMap.set(s.title, s));
            rawServices.forEach((s: any) => {
              if (s.title) {
                mergedMap.set(s.title, {
                  ...s,
                  deliverables: s.deliverables || ["Requirement gathering", "Custom Implementation", "Testing & CI/CD"],
                  summary: s.summary || s.body?.substring(0, 80) + '...'
                });
              }
            });
            const mergedArr = Array.from(mergedMap.values());
            setServicesData(mergedArr);
            saveData("admin-services", mergedArr);
          }
          setGithubRepos(get("admin-github-repos", defaultGithubRepos));
          setSiteConfig(get("admin-config", { title: "Portfolio", description: "Data Engineer Portfolio", maintenanceMode: false }));
          setSystemAudit({ totalSize: "Remote Server", items: Object.keys(data || {}).length });

          // Fetch system logs
          try {
            const token = sessionStorage.getItem("aether-admin-session");
            const resLogs = await fetch("/api/data/logs", { headers: { "Authorization": `Bearer ${token}` } });
            if (resLogs.ok) {
              const logsData = await resLogs.json();
              setSystemLogs(logsData.logs || []);
            }
          } catch { /* silent */ }

          // Client-side analytics events
          const events = get("admin-analytics", []);
          setClientEvents(events);

          // Fetch server-side analytics
          const token = sessionStorage.getItem("aether-admin-session");
          try {
            const resAnal = await fetch("/api/analytics", { headers: { "Authorization": `Bearer ${token}` } });
            if (resAnal.ok) setAnalyticsData(await resAnal.json());
          } catch { /* silent */ }

          // Fetch server-side inbox
          try {
            const resEmails = await fetch("/api/data/emails", { headers: { "Authorization": `Bearer ${token}` } });
            if (resEmails.ok) {
              const serverEmails = await resEmails.json();
              const localSubs = get("admin-submissions", []);
              const merged = [...localSubs, ...serverEmails].sort((a: any, b: any) => new Date(b.date || b.timestamp || 0).getTime() - new Date(a.date || a.timestamp || 0).getTime());
              setInboxMessages(merged);
            }
          } catch { /* silent */ }

          // Load Manifesto and Resume data
          setManifesto(get("admin-manifesto", {
            title: "Built in silence. Engineered with intent.",
            paragraphs: [
              "My path isn't defined by the noise of the industry, but by the structural integrity of the systems I build.",
              "I specialize in architecting ethical data platforms that balance high-performance engineering with absolute governance."
            ]
          }));
          setExperience(get("admin-experience", [
            { company: "Infoline", role: "Junior Data Engineer Intern", period: "Feb 2024 — Present", desc: "Developing end-to-end data processing pipelines." }
          ]));
          setEducation(get("admin-education", [
            { school: "Karakoram International University", degree: "BS Software Engineering", period: "2021 — 2025" }
          ]));
          setKeystats(get("admin-keystats", { projects: 6, hours: 1000, taught: 100 }));
          setHeroConfig(get("admin-hero", {
            label: "Data Ops Engineer",
            titles: ["Data Ops Engineer", "Data Engineer", "Pipeline Builder", "Platform Builder"],
            techTags: ["Python", "SQL", "Apache Spark", "Airflow", "dbt", "ETL/ELT", "AWS", "Data Engineering"]
          }));
        } catch (e) {
          console.error("Failed to load admin data from API", e);
        }
      };
      loadData();
    }
  }, [isOpen]);

  const saveData = async (key: string, data: any) => {
    setIsSaving(true);
    try {
      const token = sessionStorage.getItem("aether-admin-session");
      await fetch("/api/data/admin", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ key, data })
      });
      window.dispatchEvent(new CustomEvent("admin-updated"));
      setSystemAudit({ totalSize: "Remote Server", items: (systemAudit?.items || 0) + 1 });
    } catch (e) {
      console.error(e);
    }
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
          <div className="w-[280px] shrink-0 border-r border-white/5 bg-black/40 p-8 flex flex-col gap-1.5 relative z-10 overflow-hidden">
            <div className="flex flex-col gap-2 mb-6 px-2 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--accent)] to-emerald-400 rounded-2xl flex items-center justify-center shadow-2xl rotate-3">
                  <Cpu size={24} className="text-black" />
                </div>
                <div>
                  <h1 className="text-[16px] font-black uppercase tracking-[3px] text-white leading-none">DataDen</h1>
                  <span className="text-[9px] font-black uppercase tracking-[2px] text-[var(--accent)]">DataDen Core Status</span>
                </div>
              </div>
            </div>
            <div className="space-y-1 flex-1 min-h-0 overflow-y-auto custom-scrollbar-hidden">
              <h4 className="text-[10px] font-black uppercase text-white/30 tracking-widest px-4 mb-3">Portfolio Modules</h4>
              {[
                { id: "Analytics", icon: <BarChart3 size={16} />, color: "text-blue-400", badge: 0 },
                { id: "Inbox", icon: <Inbox size={16} />, color: "text-cyan-400", badge: inboxMessages.filter((m: any) => !readMessages.includes(String(m.id))).length },
                { id: "Radar & Tools", icon: <Layers size={16} />, color: "text-purple-400", badge: 0 },
                { id: "Language Skills", icon: <Globe size={16} />, color: "text-sky-400", badge: langSkills.length },
                { id: "Projects", icon: <BriefcaseIcon size={16} />, color: "text-orange-400", badge: projects.length },
                { id: "Blog", icon: <Newspaper size={16} />, color: "text-emerald-400", badge: posts.length },
                { id: "Services", icon: <Server size={16} />, color: "text-amber-400", badge: servicesData.length },
                { id: "Demos", icon: <FlaskConical size={16} />, color: "text-indigo-400", badge: 0 },
                { id: "GitHub", icon: <Github size={16} />, color: "text-white", badge: 0 },
                { id: "Manifesto", icon: <Bold size={16} />, color: "text-[var(--accent)]", badge: 0 },
                { id: "Activity Log", icon: <Zap size={16} />, color: "text-yellow-400", badge: 0 },
                { id: "Resume", icon: <Landmark size={16} /> as any, color: "text-orange-400", badge: 0 },
                { id: "Certifications", icon: <Award size={16} />, color: "text-yellow-400", badge: certs.length },
                { id: "Music", icon: <Music size={16} />, color: "text-pink-400", badge: bgMusic.length },
                { id: "Site Config", icon: <Globe size={16} />, color: "text-cyan-400", badge: 0 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-4 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative ${
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
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 shrink-0">
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
                               <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                                  <div className="aspect-video lg:aspect-square bg-white/5 rounded-[32px] border border-white/5 relative overflow-hidden group/img flex flex-col items-center justify-center">
                                     <ImageUpload 
                                       type="projects" 
                                       currentImage={p.image} 
                                       onUpload={(url) => { const n = [...projects]; n[i].image = url; setProjects(n); saveData("admin-projects", n); }} 
                                     />
                                  </div>
                                  
                                  <div className="space-y-2 pt-2">
                                     <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Gallery Collage (Optional)</label>
                                     <div className="flex flex-wrap gap-2">
                                       {(p.gallery || []).map((imgUrl: string, gIdx: number) => (
                                          <div key={gIdx} className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 relative group/gallery shrink-0">
                                             <Image src={imgUrl} alt="Gallery item" fill className="object-cover" unoptimized />
                                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/gallery:opacity-100 transition-all flex items-center justify-center">
                                                <button onClick={() => { const n = [...projects]; n[i].gallery = n[i].gallery.filter((_: any, idx: number) => idx !== gIdx); setProjects(n); saveData("admin-projects", n); }} className="text-red-400 hover:text-red-300"><X size={14}/></button>
                                             </div>
                                          </div>
                                       ))}
                                       <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 border-dashed relative shrink-0">
                                          <ImageUpload
                                             type="projects"
                                             iconOnly
                                             onUpload={(url) => { 
                                                if (url) {
                                                   const n = [...projects]; 
                                                   if (!n[i].gallery) n[i].gallery = [];
                                                   n[i].gallery.push(url); 
                                                   setProjects(n); 
                                                   saveData("admin-projects", n);
                                                }
                                             }}
                                          />
                                       </div>
                                     </div>
                                  </div>
                                  
                                  <div className="space-y-3 pt-2">
                                     <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">GitHub Repository URL</label>
                                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                                           <Github size={12} className="text-white/40" />
                                           <input type="text" value={p.githubUrl || ""} onChange={e => { const n = [...projects]; n[i].githubUrl = e.target.value; setProjects(n); }} onBlur={() => saveData("admin-projects", projects)} className="bg-transparent text-white text-[11px] font-bold outline-none flex-1" placeholder="https://github.com/..." />
                                        </div>
                                     </div>
                                     <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Live Demo URL</label>
                                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                                           <ExternalLink size={12} className="text-white/40" />
                                           <input type="text" value={p.liveUrl || ""} onChange={e => { const n = [...projects]; n[i].liveUrl = e.target.value; setProjects(n); }} onBlur={() => saveData("admin-projects", projects)} className="bg-transparent text-white text-[11px] font-bold outline-none flex-1" placeholder="https://..." />
                                        </div>
                                     </div>
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
                             className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-pink-500/30 transition-all flex flex-col gap-6"
                          >
                             <div className="flex flex-col md:flex-row gap-8">
                                {/* Left side: Image & Meta */}
                                <div className="w-full md:w-1/3 space-y-4">
                                   <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                                     <ImageUpload 
                                       type="blog" 
                                       currentImage={post.image} 
                                       onUpload={(url) => { const n = [...posts]; n[i].image = url; setPosts(n); saveData("admin-posts", n); }} 
                                     />
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Date</label>
                                        <input type="text" value={post.date} onChange={e => { const n = [...posts]; n[i].date = e.target.value; setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] font-black text-white/80 outline-none" placeholder="e.g. Jan 2025" />
                                      </div>
                                      <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Author</label>
                                        <input type="text" value={post.author || "Ijlal Ansari"} onChange={e => { const n = [...posts]; n[i].author = e.target.value; setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] font-black text-white/80 outline-none" placeholder="Author" />
                                      </div>
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Read Time</label>
                                      <input type="text" value={post.readTime || "5 min read"} onChange={e => { const n = [...posts]; n[i].readTime = e.target.value; setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] font-black text-white/80 outline-none" placeholder="5 min read" />
                                   </div>
                                </div>
                                
                                {/* Right side: Content */}
                                <div className="flex-1 space-y-4">
                                   <div className="flex items-center justify-between gap-4">
                                     <input type="text" value={post.title} onChange={e => { const n = [...posts]; n[i].title = e.target.value; setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="bg-transparent text-white font-black text-[24px] outline-none flex-1" placeholder="Article Title" />
                                     <div className="flex gap-2">
                                        <select value={post.status} onChange={e => { const n = [...posts]; n[i].status = e.target.value; setPosts(n); saveData("admin-posts", posts); }} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                           <option className="bg-[#111]">Draft</option>
                                           <option className="bg-[#111]">Published</option>
                                        </select>
                                        <button onClick={() => { if(confirm("Discard article?")) { const updated = posts.filter(x => x.id !== post.id); setPosts(updated); saveData("admin-posts", updated); } }} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 border border-red-500/10"><Trash2 size={16} /></button>
                                     </div>
                                   </div>
                                   
                                   <select 
                                      value={post.category} 
                                      onChange={e => { const n = [...posts]; n[i].category = e.target.value; setPosts(n); saveData("admin-posts", n); }} 
                                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[11px] font-black uppercase tracking-[2px] text-pink-400 outline-none cursor-pointer w-fit"
                                   >
                                      {categories.blog.map((cat: string) => <option key={cat} className="bg-[#111]">{cat}</option>)}
                                   </select>
                                   
                                   <div className="space-y-2">
                                      <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Excerpt (Preview text)</label>
                                      <textarea value={post.excerpt} onChange={e => { const n = [...posts]; n[i].excerpt = e.target.value; setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[13px] text-white/60 outline-none h-20 resize-none focus:border-pink-500/50 transition-all" placeholder="Short excerpt for the card..." />
                                   </div>
                                   
                                   <div className="space-y-2">
                                      <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Full Content (Double-newline separated paragraphs)</label>
                                      <textarea value={(post.content || []).join('\n\n')} onChange={e => { const n = [...posts]; n[i].content = e.target.value.split('\n\n'); setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-[14px] text-white/80 outline-none h-48 resize-y focus:border-pink-500/50 transition-all font-serif" placeholder="Write your full article here..." />
                                   </div>

                                   <div className="space-y-2">
                                      <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Key Takeaways (one per line)</label>
                                      <textarea value={(post.keyPoints || []).join('\n')} onChange={e => { const n = [...posts]; n[i].keyPoints = e.target.value.split('\n'); setPosts(n); }} onBlur={() => saveData("admin-posts", posts)} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[12px] text-white/40 outline-none h-24 resize-none focus:border-pink-500/50 transition-all" placeholder="Enter key points..." />
                                   </div>
                                </div>
                             </div>
                          </motion.div>
                        ))}
                      </div>
                   </motion.div>
                )}

                {/* ── SERVICES TAB ── */}
                {activeTab === "Services" && (
                   <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                           <h3 className="text-[12px] font-black text-amber-400 uppercase tracking-[4px]">Service Offerings</h3>
                           <p className="text-[14px] text-white/40 font-medium max-w-md">Manage the professional services you offer to clients.</p>
                        </div>
                        <button onClick={() => {
                          const updated = [{ id: Date.now(), title: "New Service", badge: "Category", body: "Description of the service...", link: "See My Work", icon: "Activity", status: "Published" }, ...servicesData];
                          setServicesData(updated);
                          saveData("admin-services", updated);
                        }} className="group flex items-center gap-3 px-8 py-4 bg-amber-500 text-black rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                          <Plus size={18} /> Add Service
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {servicesData.map((s, i) => (
                          <motion.div 
                             key={s.id} 
                             className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-amber-500/30 transition-all space-y-6"
                          >
                             <div className="flex justify-between gap-4">
                                <div className="flex-1 space-y-4">
                                   <input type="text" value={s.title} onChange={e => { const n = [...servicesData]; n[i].title = e.target.value; setServicesData(n); }} onBlur={() => saveData("admin-services", servicesData)} className="bg-transparent text-white font-black text-[22px] outline-none w-full" placeholder="Service Title" />
                                   <div className="flex items-center gap-3">
                                      <Tag size={12} className="text-amber-400" />
                                      <input type="text" value={s.badge} onChange={e => { const n = [...servicesData]; n[i].badge = e.target.value; setServicesData(n); }} onBlur={() => saveData("admin-services", servicesData)} className="bg-transparent text-white/40 font-bold text-[10px] uppercase tracking-widest outline-none" placeholder="Badge/Category" />
                                   </div>
                                </div>
                                <button onClick={() => { if(confirm("Delete this service?")) { const updated = servicesData.filter(x => x.id !== s.id); setServicesData(updated); saveData("admin-services", updated); } }} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 border border-red-500/10"><Trash2 size={16} /></button>
                             </div>

                             <div className="flex items-start gap-4">
                               <div className="w-20 h-20 shrink-0">
                                 <ImageUpload 
                                    onUpload={(url) => { const n = [...servicesData]; n[i].iconUrl = url; setServicesData(n); saveData("admin-services", n); }} 
                                    defaultImage={s.iconUrl}
                                    className="h-full w-full"
                                    iconOnly={true}
                                 />
                               </div>
                               <textarea value={s.body} onChange={e => { const n = [...servicesData]; n[i].body = e.target.value; setServicesData(n); }} onBlur={() => saveData("admin-services", servicesData)} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-[13px] text-white/50 outline-none h-24 resize-none" placeholder="Describe what you provide..." />
                             </div>

                             <div className="space-y-3 pt-4 border-t border-white/5">
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex-1">
                                    <LinkIcon size={14} className="text-white/30" />
                                    <input type="text" value={s.link || ""} onChange={e => { const n = [...servicesData]; n[i].link = e.target.value; setServicesData(n); }} onBlur={() => saveData("admin-services", servicesData)} className="bg-transparent text-[10px] font-black uppercase text-white outline-none flex-1" placeholder="Button Text" />
                                  </div>
                                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex-1">
                                    <LinkIcon size={14} className="text-white/30" />
                                    <input type="text" value={s.href || ""} onChange={e => { const n = [...servicesData]; n[i].href = e.target.value; setServicesData(n); }} onBlur={() => saveData("admin-services", servicesData)} className="bg-transparent text-[10px] font-black uppercase text-white outline-none flex-1" placeholder="https://... or #section" />
                                  </div>
                                </div>
                                <div className="flex justify-end">
                                  <select value={s.status} onChange={e => { const n = [...servicesData]; n[i].status = e.target.value; setServicesData(n); saveData("admin-services", n); }} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                  </select>
                                </div>
                             </div>
                          </motion.div>
                        ))}
                      </div>
                   </motion.div>
                 )}

                {/* ── MANIFESTO TAB ── */}
                {activeTab === "Manifesto" && (
                   <motion.div key="manifesto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-12">
                      <div className="space-y-2">
                         <h3 className="text-[12px] font-black text-[var(--accent)] uppercase tracking-[4px]">Brand Identity</h3>
                         <p className="text-[14px] text-white/40 font-medium max-w-md">Edit your professional manifesto and primary biography.</p>
                      </div>

                      <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] space-y-8">
                         <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Hero Role</label>
                            <input 
                              type="text" 
                              value={heroConfig.label} 
                              onChange={e => setHeroConfig({ ...heroConfig, label: e.target.value })} 
                              onBlur={() => saveData("admin-hero", heroConfig)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-[24px] outline-none focus:border-[var(--accent)] transition-all"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Hero Titles</label>
                            <textarea
                              value={(heroConfig.titles || []).join("\n")} 
                              onChange={e => setHeroConfig({ ...heroConfig, titles: e.target.value.split("\n").filter(Boolean) })} 
                              onBlur={() => saveData("admin-hero", heroConfig)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-[14px] outline-none focus:border-[var(--accent)] min-h-[120px] resize-none transition-all"
                              placeholder="Data Ops Engineer\nData Engineer\nPipeline Builder\nPlatform Builder"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Tech Tags</label>
                            <textarea
                              value={(heroConfig.techTags || []).join(", ")} 
                              onChange={e => setHeroConfig({ ...heroConfig, techTags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean) })} 
                              onBlur={() => saveData("admin-hero", heroConfig)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-[14px] outline-none focus:border-[var(--accent)] min-h-[80px] resize-none transition-all"
                              placeholder="Python, SQL, Apache Spark, Airflow, dbt, ETL/ELT, AWS, Data Engineering"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">About Title</label>
                            <input 
                              type="text" 
                              value={manifesto?.title} 
                              onChange={e => setManifesto({ ...manifesto, title: e.target.value })} 
                              onBlur={() => saveData("admin-manifesto", manifesto)}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-[24px] outline-none focus:border-[var(--accent)] transition-all"
                            />
                         </div>

                         <div className="space-y-4">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Story Paragraphs</label>
                            {(manifesto?.paragraphs || []).map((p: string, idx: number) => (
                               <div key={idx} className="flex gap-4">
                                  <textarea 
                                    value={p} 
                                    onChange={e => {
                                      const newParas = [...manifesto.paragraphs];
                                      newParas[idx] = e.target.value;
                                      setManifesto({ ...manifesto, paragraphs: newParas });
                                    }} 
                                    onBlur={() => saveData("admin-manifesto", manifesto)}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-white/60 text-[15px] outline-none min-h-[120px] resize-none"
                                  />
                                  <button onClick={() => {
                                    const newParas = manifesto.paragraphs.filter((_: any, i: number) => i !== idx);
                                    setManifesto({ ...manifesto, paragraphs: newParas });
                                    saveData("admin-manifesto", { ...manifesto, paragraphs: newParas });
                                  }} className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-400 rounded-2xl shrink-0 self-start"><Trash2 size={18} /></button>
                               </div>
                            ))}
                            <button onClick={() => {
                               const newParas = [...(manifesto?.paragraphs || []), ""];
                               setManifesto({ ...manifesto, paragraphs: newParas });
                               saveData("admin-manifesto", { ...manifesto, paragraphs: newParas });
                            }} className="w-full py-4 border border-dashed border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white hover:border-white/40 transition-all">
                               Add Paragraph
                            </button>
                         </div>
                      </div>
                   </motion.div>
                 )}

                {/* ── ACTIVITY LOG TAB ── */}
                {activeTab === "Activity Log" && (
                   <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-12">
                      <div className="space-y-2">
                         <h3 className="text-[12px] font-black text-yellow-400 uppercase tracking-[4px]">Activity & Key Stats</h3>
                         <p className="text-[14px] text-white/40 font-medium max-w-md">Update your live hero statistics and log recent activities.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {/* Projects Stat */}
                         <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] flex flex-col items-center text-center space-y-4 relative">
                            <Zap size={24} className="text-yellow-400" />
                            <div className="space-y-1">
                               <input type="number" value={keystats.projects} onChange={e => setKeystats({...keystats, projects: Number(e.target.value)})} onBlur={() => saveData("admin-keystats", keystats)} className="bg-transparent text-white font-black text-[32px] text-center outline-none w-24" />
                               <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest">Projects Built</span>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => { const n = {...keystats, projects: keystats.projects - 1}; setKeystats(n); saveData("admin-keystats", n); }} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">-</button>
                               <button onClick={() => { const n = {...keystats, projects: keystats.projects + 1}; setKeystats(n); saveData("admin-keystats", n); }} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">+</button>
                            </div>
                         </div>

                         {/* Hours Stat */}
                         <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] flex flex-col items-center text-center space-y-4 relative">
                            <Clock size={24} className="text-blue-400" />
                            <div className="space-y-1">
                               <input type="number" value={keystats.hours} onChange={e => setKeystats({...keystats, hours: Number(e.target.value)})} onBlur={() => saveData("admin-keystats", keystats)} className="bg-transparent text-white font-black text-[32px] text-center outline-none w-24" />
                               <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest">Hours Coded</span>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => { const n = {...keystats, hours: keystats.hours - 10}; setKeystats(n); saveData("admin-keystats", n); }} className="px-3 h-8 rounded-full bg-white/5 text-[10px] font-bold flex items-center justify-center hover:bg-white/10">-10</button>
                               <button onClick={() => { const n = {...keystats, hours: keystats.hours + 10}; setKeystats(n); saveData("admin-keystats", n); }} className="px-3 h-8 rounded-full bg-white/5 text-[10px] font-bold flex items-center justify-center hover:bg-white/10">+10</button>
                            </div>
                         </div>

                         {/* Taught Stat */}
                         <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] flex flex-col items-center text-center space-y-4 relative">
                            <Award size={24} className="text-emerald-400" />
                            <div className="space-y-1">
                               <input type="number" value={keystats.taught} onChange={e => setKeystats({...keystats, taught: Number(e.target.value)})} onBlur={() => saveData("admin-keystats", keystats)} className="bg-transparent text-white font-black text-[32px] text-center outline-none w-24" />
                               <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest">% Self Taught</span>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => { const n = {...keystats, taught: keystats.taught - 10}; setKeystats(n); saveData("admin-keystats", n); }} className="px-3 h-8 rounded-full bg-white/5 text-[10px] font-bold flex items-center justify-center hover:bg-white/10">-10</button>
                               <button onClick={() => { const n = {...keystats, taught: keystats.taught + 10}; setKeystats(n); saveData("admin-keystats", n); }} className="px-3 h-8 rounded-full bg-white/5 text-[10px] font-bold flex items-center justify-center hover:bg-white/10">+10</button>
                            </div>
                         </div>
                      </div>

                      <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] space-y-6">
                         <h4 className="text-[12px] font-black text-white uppercase tracking-widest">Quick Log Activity</h4>
                         <p className="text-[12px] text-white/40">Did you just complete a lesson? Log it below to increment your Hours Coded!</p>
                         <div className="flex items-center gap-4">
                            <button onClick={() => { const n = {...keystats, hours: keystats.hours + 0.5}; setKeystats(n); saveData("admin-keystats", n); }} className="flex-1 py-4 bg-blue-500/10 text-blue-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-500/20 border border-blue-500/20 transition-all">+30 Min Lesson</button>
                            <button onClick={() => { const n = {...keystats, hours: keystats.hours + 1}; setKeystats(n); saveData("admin-keystats", n); }} className="flex-1 py-4 bg-emerald-500/10 text-emerald-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500/20 border border-emerald-500/20 transition-all">+1 Hr Coding Session</button>
                            <button onClick={() => { const n = {...keystats, hours: keystats.hours + 3}; setKeystats(n); saveData("admin-keystats", n); }} className="flex-1 py-4 bg-purple-500/10 text-purple-400 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-purple-500/20 border border-purple-500/20 transition-all">+3 Hr Deep Work</button>
                         </div>
                      </div>
                   </motion.div>
                )}

                {/* ── RESUME TAB ── */}
                {activeTab === "Resume" && (
                   <motion.div key="resume" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                         {/* Experience */}
                         <div className="space-y-8">
                            <div className="flex justify-between items-center">
                               <h3 className="text-[12px] font-black text-orange-400 uppercase tracking-[4px]">Professional Experience</h3>
                               <button onClick={() => {
                                  const updated = [{ company: "New Corp", role: "Engineer", period: "2024 — Present", desc: "" }, ...experience];
                                  setExperience(updated);
                                  saveData("admin-experience", updated);
                               }} className="w-10 h-10 bg-orange-500 text-black rounded-xl flex items-center justify-center"><Plus size={20} /></button>
                            </div>
                            <div className="space-y-6">
                               {experience.map((exp, i) => (
                                  <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4 group relative">
                                     <button onClick={() => {
                                        const updated = experience.filter((_, idx) => idx !== i);
                                        setExperience(updated);
                                        saveData("admin-experience", updated);
                                     }} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                                     <input type="text" value={exp.company} onChange={e => { const n = [...experience]; n[i].company = e.target.value; setExperience(n); }} onBlur={() => saveData("admin-experience", experience)} className="bg-transparent text-white font-black text-[18px] outline-none w-full" placeholder="Company Name" />
                                     <div className="flex gap-4">
                                        <input type="text" value={exp.role} onChange={e => { const n = [...experience]; n[i].role = e.target.value; setExperience(n); }} onBlur={() => saveData("admin-experience", experience)} className="bg-transparent text-orange-400 font-bold text-[11px] uppercase tracking-widest outline-none flex-1" placeholder="Role" />
                                        <input type="text" value={exp.period} onChange={e => { const n = [...experience]; n[i].period = e.target.value; setExperience(n); }} onBlur={() => saveData("admin-experience", experience)} className="bg-transparent text-white/20 font-bold text-[10px] uppercase tracking-widest outline-none w-32 text-right" placeholder="Period (e.g. 2024 — Present)" />
                                     </div>
                                     <div className="space-y-2 pt-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Technologies/Tags (comma separated)</label>
                                        <input type="text" value={typeof exp.technologies === 'string' ? exp.technologies : (exp.technologies || []).join(', ')} onChange={e => { const n = [...experience]; n[i].technologies = e.target.value; setExperience(n); }} onBlur={() => { const n = [...experience]; if (typeof n[i].technologies === 'string') { n[i].technologies = n[i].technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t); } setExperience(n); saveData("admin-experience", n); }} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] font-bold text-white/80 outline-none w-full" placeholder="Python, AWS, PostgreSQL..." />
                                     </div>
                                     <div className="space-y-2 pt-4 border-t border-white/5">
                                        <div className="flex items-center justify-between">
                                           <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Description</label>
                                           <span className="text-[8px] font-bold text-white/15 italic mr-1">Each new line = separate bullet point</span>
                                        </div>
                                        <textarea value={exp.description || exp.desc || ""} onChange={e => { const n = [...experience]; n[i].description = e.target.value; n[i].desc = e.target.value; setExperience(n); }} onBlur={() => saveData("admin-experience", experience)} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-white/60 text-[13px] outline-none resize-y min-h-[140px] leading-relaxed focus:border-orange-400/30 transition-all placeholder:text-white/15" placeholder={"Designed ETL pipelines processing 2M+ records daily\nReduced cloud costs by 30% through infrastructure optimization\nBuilt monitoring dashboards with real-time alerting"} />
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>

                         {/* Education */}
                         <div className="space-y-8">
                            <div className="flex justify-between items-center">
                               <h3 className="text-[12px] font-black text-blue-400 uppercase tracking-[4px]">Academic credentials</h3>
                               <button onClick={() => {
                                  const updated = [{ school: "University", degree: "Degree", period: "2020 — 2024" }, ...education];
                                  setEducation(updated);
                                  saveData("admin-education", updated);
                               }} className="w-10 h-10 bg-blue-500 text-black rounded-xl flex items-center justify-center"><Plus size={20} /></button>
                            </div>
                            <div className="space-y-6">
                               {education.map((edu, i) => (
                                  <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4 group relative">
                                     <button onClick={() => {
                                        const updated = education.filter((_, idx) => idx !== i);
                                        setEducation(updated);
                                        saveData("admin-education", updated);
                                     }} className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                                     <input type="text" value={edu.school || edu.institution} onChange={e => { const n = [...education]; n[i].school = e.target.value; n[i].institution = e.target.value; setEducation(n); }} onBlur={() => saveData("admin-education", education)} className="bg-transparent text-white font-black text-[18px] outline-none w-full" placeholder="School Name" />
                                     <input type="text" value={edu.degree || edu.title} onChange={e => { const n = [...education]; n[i].degree = e.target.value; n[i].title = e.target.value; setEducation(n); }} onBlur={() => saveData("admin-education", education)} className="bg-transparent text-blue-400 font-bold text-[11px] uppercase tracking-widest outline-none w-full" placeholder="Degree / Title" />
                                     <input type="text" value={edu.period} onChange={e => { const n = [...education]; n[i].period = e.target.value; setEducation(n); }} onBlur={() => saveData("admin-education", education)} className="bg-transparent text-white/20 font-bold text-[10px] uppercase tracking-widest outline-none w-full" placeholder="Period" />
                                     <div className="space-y-2 pt-2 border-t border-white/5">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Achievements (comma separated)</label>
                                        <input type="text" value={typeof edu.achievements === 'string' ? edu.achievements : (edu.achievements || []).join(', ')} onChange={e => { const n = [...education]; n[i].achievements = e.target.value; setEducation(n); }} onBlur={() => { const n = [...education]; if (typeof n[i].achievements === 'string') { n[i].achievements = n[i].achievements.split(',').map((t: string) => t.trim()).filter((t: string) => t); } setEducation(n); saveData("admin-education", n); }} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[11px] font-bold text-white/80 outline-none w-full" placeholder="Dean's List, Research, Open Source..." />
                                     </div>
                                     <div className="space-y-2 pt-4 border-t border-white/5">
                                        <div className="flex items-center justify-between">
                                           <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Description</label>
                                           <span className="text-[8px] font-bold text-white/15 italic mr-1">Each new line = separate bullet point</span>
                                        </div>
                                        <textarea value={edu.description || edu.desc || ""} onChange={e => { const n = [...education]; n[i].description = e.target.value; n[i].desc = e.target.value; setEducation(n); }} onBlur={() => saveData("admin-education", education)} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-white/60 text-[13px] outline-none resize-y min-h-[100px] leading-relaxed focus:border-blue-400/30 transition-all placeholder:text-white/15" placeholder={"Database Systems & Cloud Computing\nMachine Learning & Model Interpretability\nSoftware Engineering Best Practices"} />
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </motion.div>
                )}

                  {/* ── GITHUB TAB ── */}
                  {activeTab === "GitHub" && (
                    <motion.div key="github" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                       <div className="flex justify-between items-end">
                         <div className="space-y-2">
                            <h3 className="text-[12px] font-black text-white uppercase tracking-[4px]">Open Source Pulse</h3>
                            <p className="text-[14px] text-white/40 font-medium max-w-md">Synchronize your portfolio with your live GitHub ecosystem.</p>
                         </div>
                       </div>

                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-8">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white">
                                   <Github size={24} />
                                </div>
                                <div>
                                   <h4 className="text-[15px] font-black text-white">GitHub Account</h4>
                                   <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">API Connectivity</p>
                                </div>
                             </div>

                             <div className="space-y-4">
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">GitHub Username</label>
                                   <div className="flex gap-3">
                                      <input 
                                         type="text" 
                                         defaultValue={storage.get("admin-github-username", "ijlalansari")}
                                         onBlur={(e) => saveData("admin-github-username", e.target.value)}
                                         className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-[14px] outline-none focus:border-[var(--accent)] transition-all"
                                         placeholder="e.g. ijlalansari"
                                      />
                                   </div>
                                </div>

                                <div className="p-6 bg-[var(--accent)]/5 border border-dashed border-[var(--accent)]/20 rounded-2xl">
                                   <div className="flex items-start gap-4">
                                      <Zap size={18} className="text-[var(--accent)] shrink-0 mt-1" />
                                      <p className="text-[12px] text-[var(--accent)]/60 leading-relaxed">
                                         Changes to the username will trigger a re-fetch of your public events, repository counts, and follower statistics across the entire portfolio.
                                      </p>
                                   </div>
                                </div>
                             </div>
                          </div>

                          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-8">
                             <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[var(--accent)]">
                                      <Github size={24} />
                                   </div>
                                   <div>
                                      <h4 className="text-[15px] font-black text-white">Featured Repositories</h4>
                                      <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">Curated open-source links</p>
                                   </div>
                                </div>
                                <button onClick={() => {
                                   const updated = [{ id: Date.now(), name: "new-repo", description: "Describe the project", language: "TypeScript", stars: 0, html_url: "https://github.com/username/repo", homepage: "", status: "Published" }, ...githubRepos];
                                   setGithubRepos(updated);
                                   saveData("admin-github-repos", updated);
                                }} className="w-10 h-10 bg-[var(--accent)] text-black rounded-xl flex items-center justify-center"><Plus size={18} /></button>
                             </div>

                             <div className="space-y-4">
                               {githubRepos.map((repo, index) => (
                                 <div key={repo.id || index} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                                    <div className="flex items-center justify-between gap-3">
                                       <input type="text" value={repo.name || ""} onChange={(e) => { const n = [...githubRepos]; n[index].name = e.target.value; setGithubRepos(n); }} onBlur={() => saveData("admin-github-repos", githubRepos)} className="bg-transparent text-white font-black text-[14px] outline-none flex-1" placeholder="Repository name" />
                                       <button onClick={() => { const updated = githubRepos.filter((_, idx) => idx !== index); setGithubRepos(updated); saveData("admin-github-repos", updated); }} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                                    </div>
                                    <textarea value={repo.description || ""} onChange={(e) => { const n = [...githubRepos]; n[index].description = e.target.value; setGithubRepos(n); }} onBlur={() => saveData("admin-github-repos", githubRepos)} className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-[12px] text-white/50 outline-none h-20 resize-none" placeholder="Short project description" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                       <input type="text" value={repo.language || ""} onChange={(e) => { const n = [...githubRepos]; n[index].language = e.target.value; setGithubRepos(n); }} onBlur={() => saveData("admin-github-repos", githubRepos)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/70 outline-none" placeholder="Language" />
                                       <input type="number" value={repo.stars || 0} onChange={(e) => { const n = [...githubRepos]; n[index].stars = parseInt(e.target.value || "0"); setGithubRepos(n); }} onBlur={() => saveData("admin-github-repos", githubRepos)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/70 outline-none" placeholder="Stars" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                       <input type="text" value={repo.html_url || ""} onChange={(e) => { const n = [...githubRepos]; n[index].html_url = e.target.value; setGithubRepos(n); }} onBlur={() => saveData("admin-github-repos", githubRepos)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/70 outline-none" placeholder="https://github.com/..." />
                                       <input type="text" value={repo.homepage || ""} onChange={(e) => { const n = [...githubRepos]; n[index].homepage = e.target.value; setGithubRepos(n); }} onBlur={() => saveData("admin-github-repos", githubRepos)} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[11px] text-white/70 outline-none" placeholder="Live/demo URL" />
                                    </div>
                                 </div>
                               ))}
                             </div>
                          </div>

                          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-8">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-yellow-400">
                                   <Star size={24} />
                                </div>
                                <div>
                                   <h4 className="text-[15px] font-black text-white">Manual Overrides</h4>
                                   <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">Display Fallbacks</p>
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Repos Offset</label>
                                   <input 
                                      type="number" 
                                      defaultValue={storage.get("admin-github-repos-offset", 0)}
                                      onBlur={(e) => saveData("admin-github-repos-offset", parseInt(e.target.value))}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-[14px] outline-none"
                                   />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Stars Offset</label>
                                   <input 
                                      type="number" 
                                      defaultValue={storage.get("admin-github-stars-offset", 0)}
                                      onBlur={(e) => saveData("admin-github-stars-offset", parseInt(e.target.value))}
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-[14px] outline-none"
                                   />
                                </div>
                             </div>
                             <p className="text-[10px] text-white/20 italic">Use offsets to manually adjust counts if you have private repos/stars you want to showcase.</p>
                          </div>
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
                           const updated = [{ id: Date.now(), title: "New Certification", issuer: "Institution", provider: "Institution", credentialId: "", date: new Date().toISOString().split("T")[0], image: "", description: "", verificationUrl: "", verification_url: "", link: "", status: "Draft" }, ...certs];
                           setCerts(updated);
                           saveData("admin-certs", updated);
                         }} className="group flex items-center gap-3 px-8 py-4 bg-yellow-400 text-black rounded-3xl text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                           <Plus size={18} /> Add Credential
                         </button>
                       </div>

                       <div className="grid grid-cols-1 gap-6">
                         {certs.map((c, i) => (
                           <motion.div 
                              key={c.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-yellow-400/30 transition-all space-y-6"
                           >
                              <div className="flex flex-col md:flex-row gap-8">
                                 {/* Left: Image & Date */}
                                 <div className="w-full md:w-1/3 space-y-4">
                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                                      <ImageUpload 
                                        type="certifications" 
                                        currentImage={c.image} 
                                        onUpload={(url) => { const n = [...certs]; n[i].image = url; setCerts(n); saveData("admin-certs", n); }} 
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                       <div className="space-y-1">
                                         <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Issue Date</label>
                                         <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                                            <Calendar size={12} className="text-yellow-400/60" />
                                            <input type="date" value={c.date || ""} onChange={e => { const n = [...certs]; n[i].date = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-[11px] font-bold text-white/80 outline-none flex-1" />
                                         </div>
                                       </div>
                                       <div className="space-y-1">
                                         <label className="text-[9px] font-black uppercase tracking-widest text-white/20">Status</label>
                                         <select value={c.status} onChange={e => { const n = [...certs]; n[i].status = e.target.value; setCerts(n); saveData("admin-certs", n); }} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                            <option className="bg-[#111]">Draft</option>
                                            <option className="bg-[#111]">Active</option>
                                         </select>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Right: Details */}
                                 <div className="flex-1 space-y-4">
                                    <div className="flex items-center justify-between gap-4">
                                       <input type="text" value={c.title} onChange={e => { const n = [...certs]; n[i].title = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-white font-black text-[24px] outline-none flex-1" placeholder="Certification Title" />
                                       <button onClick={() => { if(confirm("Revoke credential?")) { const updated = certs.filter(x => x.id !== c.id); setCerts(updated); saveData("admin-certs", updated); } }} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 border border-red-500/10 shrink-0"><Trash2 size={16} /></button>
                                    </div>

                                    <div className="space-y-1">
                                       <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Issuing Organization</label>
                                       <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                          <Award size={14} className="text-yellow-400/60 shrink-0" />
                                          <input type="text" value={c.issuer || c.provider || ""} onChange={e => { const n = [...certs]; n[i].issuer = e.target.value; n[i].provider = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-white font-bold text-[13px] outline-none flex-1" placeholder="e.g. Google, AWS, IBM, Coursera" />
                                       </div>
                                    </div>

                                    <div className="space-y-1">
                                       <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Description</label>
                                       <textarea value={c.description || ""} onChange={e => { const n = [...certs]; n[i].description = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-white/50 text-[13px] outline-none focus:border-yellow-400/20 transition-all resize-none min-h-[80px] leading-relaxed" placeholder="Brief description of what this certification covers..." />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       <div className="space-y-1">
                                          <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Credential ID</label>
                                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                             <Tag size={12} className="text-white/20 shrink-0" />
                                             <input type="text" value={c.credentialId || ""} onChange={e => { const n = [...certs]; n[i].credentialId = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-white/60 text-[12px] font-mono outline-none flex-1" placeholder="e.g. ABC-123-XYZ or 92.6%" />
                                          </div>
                                       </div>
                                       <div className="space-y-1">
                                          <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1">Verification URL</label>
                                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                                             <ExternalLink size={12} className="text-white/20 shrink-0" />
                                             <input type="url" value={c.verificationUrl || c.verification_url || c.link || ""} onChange={e => { const n = [...certs]; n[i].verificationUrl = e.target.value; n[i].verification_url = e.target.value; n[i].link = e.target.value; setCerts(n); }} onBlur={() => saveData("admin-certs", certs)} className="bg-transparent text-white/60 text-[12px] outline-none flex-1" placeholder="https://credly.com/..." />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
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
                             className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] hover:border-indigo-500/30 transition-all space-y-6 flex flex-col"
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
                             <div className="flex gap-4">
                               <div className="w-20 h-20 shrink-0">
                                 <ImageUpload 
                                    onUpload={(url) => { const n = [...demos]; n[i].iconUrl = url; setDemos(n); saveData("admin-demos", n); }} 
                                    defaultImage={d.iconUrl}
                                    className="h-full w-full"
                                    iconOnly={true}
                                 />
                               </div>
                               <div className="flex-1 space-y-3">
                                 <textarea value={d.description} onChange={e => { const n = [...demos]; n[i].description = e.target.value; setDemos(n); }} onBlur={() => saveData("admin-demos", demos)} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[13px] text-white/50 outline-none h-20 resize-none" placeholder="Explain the sandbox context..." />
                               </div>
                             </div>

                             <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                                <LinkIcon size={14} className="text-white/30" />
                                <input type="text" value={d.iframeUrl || ''} onChange={e => { const n = [...demos]; n[i].iframeUrl = e.target.value; setDemos(n); }} onBlur={() => saveData("admin-demos", demos)} className="flex-1 bg-transparent text-[12px] text-white outline-none" placeholder="External Iframe URL (Optional: embeds remote sandbox)" />
                             </div>
                             
                             <div className="space-y-3 flex-1">
                                <div className="flex justify-between items-center">
                                   <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Sandbox Environment Variables</label>
                                   <button onClick={() => { 
                                     const n = [...demos]; 
                                     n[i].config = { ...(n[i].config || {}), [`KEY_${Date.now()}`]: "value" }; 
                                     setDemos(n); 
                                   }} className="text-[9px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                                     <Plus size={10} /> Add Variable
                                   </button>
                                </div>
                                <div className="space-y-2">
                                  {Object.entries(d.config || {}).map(([key, val], cIdx) => (
                                    <div key={cIdx} className="flex gap-2">
                                      <input type="text" value={key} onChange={e => { 
                                        const newKey = e.target.value; 
                                        const n = [...demos]; 
                                        const oldConfig = { ...n[i].config };
                                        delete oldConfig[key];
                                        oldConfig[newKey] = val;
                                        n[i].config = oldConfig;
                                        setDemos(n);
                                      }} onBlur={() => saveData("admin-demos", demos)} className="w-1/3 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-indigo-400 font-mono outline-none" placeholder="KEY" />
                                      <input type="text" value={val as string} onChange={e => { 
                                        const n = [...demos]; 
                                        n[i].config[key] = e.target.value; 
                                        setDemos(n);
                                      }} onBlur={() => saveData("admin-demos", demos)} className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white/60 font-mono outline-none" placeholder="Value" />
                                      <button onClick={() => {
                                        const n = [...demos];
                                        delete n[i].config[key];
                                        setDemos(n);
                                        saveData("admin-demos", n);
                                      }} className="text-red-400/50 hover:text-red-400 transition-all"><X size={14} /></button>
                                    </div>
                                  ))}
                                  {Object.keys(d.config || {}).length === 0 && (
                                    <div className="text-[10px] text-white/20 italic px-2">No dynamic variables configured.</div>
                                  )}
                                </div>
                             </div>
                             
                             <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                <select value={d.status} onChange={e => { const n = [...demos]; n[i].status = e.target.value; setDemos(n); saveData("admin-demos", n); }} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white/40 outline-none">
                                  <option value="Active">Active Sandbox</option>
                                  <option value="Maintenance">Maintenance</option>
                                  <option value="Draft">Draft Mode</option>
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
                      
                      {/* KNOWLEDGE BASE SECTION */}
                      <div className="mt-12 space-y-8">
                         <div className="flex justify-between items-center">
                            <h3 className="text-[12px] font-black text-neon-mint uppercase tracking-[4px]">Knowledge Base</h3>
                            <button onClick={() => {
                               const updated = [...knowledge, "New Knowledge Area"];
                               setKnowledge(updated);
                               saveData("admin-knowledge", updated);
                            }} className="w-10 h-10 bg-neon-mint/20 text-neon-mint rounded-xl flex items-center justify-center hover:scale-110 transition-all border border-neon-mint/50"><Plus size={20} /></button>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {knowledge.map((k, i) => (
                               <div key={i} className="flex items-center gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl group">
                                  <input type="text" value={k} onChange={e => { const n = [...knowledge]; n[i] = e.target.value; setKnowledge(n); }} onBlur={() => saveData("admin-knowledge", knowledge)} className="bg-transparent text-white/80 font-bold text-[12px] outline-none flex-1" />
                                  <button onClick={() => {
                                     const updated = knowledge.filter((_, idx) => idx !== i);
                                     setKnowledge(updated);
                                     saveData("admin-knowledge", updated);
                                  }} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash size={14} /></button>
                               </div>
                            ))}
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

                      {/* System Health & Topology */}
                      <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] relative overflow-hidden group">
                         <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)]">
                                     <Cpu size={20} className="animate-pulse" />
                                  </div>
                                  <div>
                                     <h4 className="text-[14px] font-black text-white uppercase tracking-widest">LOKI CORE STATUS</h4>
                                     <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Engine Operational • 99.9% Integrity</p>
                                  </div>
                               </div>
                               <div className="grid grid-cols-2 gap-8">
                                  <div className="space-y-1">
                                     <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Threads</p>
                                     <p className="text-[24px] font-black text-white">24 Parallel</p>
                                  </div>
                                  <div className="space-y-1">
                                     <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Schema Drift</p>
                                     <p className="text-[24px] font-black text-emerald-400">Zero Detected</p>
                                  </div>
                               </div>
                            </div>
                            
                            <div className="w-full lg:w-[400px] h-[120px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden relative">
                               {/* Mock Data Stream Visual */}
                               <div className="absolute inset-0 flex items-center justify-around px-8">
                                  {[1,2,3,4,5,6,7,8].map(i => (
                                     <motion.div 
                                        key={i}
                                        initial={{ height: "20%" }}
                                        animate={{ height: ["20%", "80%", "30%", "90%", "20%"] }}
                                        transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                                        className="w-2 bg-[var(--accent)] rounded-full opacity-30 blur-[1px]"
                                     />
                                  ))}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
                                <div className="absolute top-4 right-6 flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                   <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Live Stream</span>
                                </div>
                            </div>
                         </div>
                         {/* Background Grid */}
                         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--accent) 0.5px, transparent 0px)', backgroundSize: '24px 24px' }} />
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

                {/* ── LANGUAGE SKILLS TAB ── */}
                {activeTab === "Language Skills" && (
                   <motion.div key="lang-skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                       {/* Languages Column */}
                       <div className="space-y-8">
                         <div className="flex justify-between items-center">
                           <h3 className="text-[12px] font-black text-emerald-400 uppercase tracking-[4px]">Proficiency</h3>
                           <button onClick={() => {
                             const updated = [...langSkills, { name: "New", level: 50, flag: "us" }];
                             setLangSkills(updated);
                             saveData("admin-languages", updated);
                           }} className="w-10 h-10 bg-emerald-500 text-black rounded-xl flex items-center justify-center hover:scale-110 transition-all"><Plus size={20} /></button>
                         </div>
                         <div className="space-y-4">
                           {langSkills.map((s, i) => (
                             <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-[28px] group space-y-4">
                               <div className="flex justify-between items-start">
                                 <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 relative">
                                     {s.flag.includes('http') || s.flag.includes('data:image') ? (
                                       <Image src={s.flag} alt="logo" fill className="object-cover" unoptimized />
                                     ) : (
                                       <Image src={`https://flagcdn.com/w80/${s.flag}.png`} alt="flag" fill className="object-cover" unoptimized />
                                     )}
                                   </div>
                                   <input type="text" value={s.name} onChange={e => { const n = [...langSkills]; n[i].name = e.target.value; setLangSkills(n); }} onBlur={() => saveData("admin-languages", langSkills)} className="bg-transparent text-white font-bold text-[15px] outline-none" placeholder="Language / Duo ID" />
                                 </div>
                                 <button onClick={() => {
                                   const updated = langSkills.filter((_, idx) => idx !== i);
                                   setLangSkills(updated);
                                   saveData("admin-languages", updated);
                                 }} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash size={16} /></button>
                               </div>
                               <div className="flex gap-4 items-center">
                                 <div className="w-16 h-8">
                                   <ImageUpload 
                                      onUpload={(url) => { const n = [...langSkills]; n[i].flag = url; setLangSkills(n); saveData("admin-languages", n); }} 
                                      className="h-full w-full !min-h-0 !p-1 !text-[9px]"
                                      iconOnly={true}
                                   />
                                 </div>
                                 <input type="text" value={s.flag} onChange={e => { const n = [...langSkills]; n[i].flag = e.target.value; setLangSkills(n); }} onBlur={() => saveData("admin-languages", langSkills)} className="w-16 bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] text-white/40 text-center outline-none" placeholder="ISO Code" />
                                 <input type="range" min="0" max="100" step="10" value={s.level} onChange={e => { const n = [...langSkills]; n[i].level = parseInt(e.target.value); setLangSkills(n); }} onBlur={() => saveData("admin-languages", langSkills)} className="flex-1 accent-[var(--accent)]" />
                                 <span className="text-[11px] font-black text-white/40 w-8">{s.level}%</span>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Engineering Practices Column */}
                       <div className="space-y-8">
                         <div className="flex justify-between items-center">
                           <h3 className="text-[12px] font-black text-blue-400 uppercase tracking-[4px]">Practices</h3>
                           <button onClick={() => {
                             const updated = [...practices, "New Practice"];
                             setPractices(updated);
                             saveData("admin-practices", updated);
                           }} className="w-10 h-10 bg-blue-500 text-black rounded-xl flex items-center justify-center hover:scale-110 transition-all"><Plus size={20} /></button>
                         </div>
                         <div className="space-y-4">
                           {practices.map((p, i) => (
                             <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-2xl group">
                               <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                               <input type="text" value={p} onChange={e => { const n = [...practices]; n[i] = e.target.value; setPractices(n); }} onBlur={() => saveData("admin-practices", practices)} className="bg-transparent text-white font-medium text-[13px] outline-none flex-1" />
                               <button onClick={() => {
                                 const updated = practices.filter((_, idx) => idx !== i);
                                 setPractices(updated);
                                 saveData("admin-practices", updated);
                               }} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"><Trash size={14} /></button>
                             </div>
                           ))}
                         </div>
                       </div>
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
                               {t.avatar ? <Image src={t.avatar} alt={t.name} fill className="object-cover" unoptimized /> : <UserIcon size={24} className="text-white/20" />}
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

                {/* ── SITE CONFIG TAB ── */}
                {activeTab === "Site Config" && (
                   <motion.div key="site-config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                     <div className="flex justify-between items-end">
                       <div className="space-y-2">
                         <h3 className="text-[12px] font-black text-cyan-400 uppercase tracking-[4px]">Global Configuration</h3>
                         <p className="text-[14px] text-white/40 font-medium max-w-md">Manage site-wide settings like SEO metadata and maintenance mode.</p>
                       </div>
                       <button onClick={() => saveData("admin-config", siteConfig)} className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                         <Save size={14} /> Save Config
                       </button>
                     </div>

                     <div className="space-y-6 max-w-3xl">
                       <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-6">
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Site Title</label>
                           <input type="text" value={siteConfig?.title || ""} onChange={(e) => setSiteConfig({ ...siteConfig, title: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:border-[var(--accent)]" placeholder="e.g. John Doe - Data Engineer" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">SEO Description</label>
                           <textarea value={siteConfig?.description || ""} onChange={(e) => setSiteConfig({ ...siteConfig, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-[13px] outline-none focus:border-[var(--accent)] min-h-[100px] resize-none" placeholder="Meta description for search engines..." />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Keywords (comma separated)</label>
                           <input type="text" value={siteConfig?.keywords || ""} onChange={(e) => setSiteConfig({ ...siteConfig, keywords: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-[13px] outline-none focus:border-[var(--accent)]" placeholder="data engineer, analytics, python..." />
                         </div>
                         <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                           <div>
                             <h4 className="text-[13px] font-black text-red-400">Maintenance Mode</h4>
                             <p className="text-[11px] text-white/40">Disable public access to the portfolio.</p>
                           </div>
                           <button onClick={() => setSiteConfig({ ...siteConfig, maintenanceMode: !siteConfig?.maintenanceMode })} className={`w-14 h-8 rounded-full transition-all relative ${siteConfig?.maintenanceMode ? 'bg-red-500' : 'bg-white/10'}`}>
                             <div className={`w-6 h-6 rounded-full bg-white absolute top-1 transition-all ${siteConfig?.maintenanceMode ? 'left-7' : 'left-1'}`} />
                           </button>
                         </div>
                       </div>
                     </div>
                   </motion.div>
                )}

                {/* ── SETTINGS TAB ── */}
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

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                       <div className="lg:col-span-1 space-y-6">
                         <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                            <div className="flex items-center gap-3 text-emerald-400/60 mb-2">
                               <ShieldCheck size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Auth Status</span>
                            </div>
                            <div className="text-3xl font-black text-white">Active Token</div>
                            <p className="text-[11px] text-white/30 leading-relaxed font-medium">Session cryptographically verified via server-side gateway.</p>
                         </div>
                         <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] space-y-4">
                            <div className="flex items-center gap-3 text-blue-400/60 mb-2">
                               <BarChart3 size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">Data Objects</span>
                            </div>
                            <div className="text-3xl font-black text-white">{systemAudit?.items || 0}</div>
                            <p className="text-[11px] text-white/30 leading-relaxed font-medium">Total registered entities in remote cluster.</p>
                         </div>
                       </div>

                       <div className="lg:col-span-2 p-8 bg-black border border-white/10 rounded-[32px] space-y-6 font-mono relative overflow-hidden group">
                         <div className="flex items-center justify-between border-b border-white/10 pb-4">
                           <div className="flex items-center gap-3 text-emerald-400">
                             <Cpu size={16} /> <span className="text-[10px] font-black uppercase tracking-widest">System Audit Trail</span>
                           </div>
                           <div className="flex gap-1.5">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                           </div>
                         </div>
                         <div className="h-[250px] overflow-y-auto space-y-2 text-[11px] custom-scrollbar-hidden">
                           {systemLogs.length === 0 ? (
                             <div className="text-white/20">No system events recorded yet...</div>
                           ) : (
                             systemLogs.map((log, i) => (
                               <div key={i} className="flex gap-4 items-start">
                                 <span className="text-emerald-500/50 shrink-0">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                                 <span className={log.type === 'error' ? 'text-red-400' : 'text-white/60'}>{log.action}</span>
                               </div>
                             ))
                           )}
                         </div>
                         <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                       </div>
                    </div>

                    <div className="p-10 bg-red-500/5 border border-red-500/10 rounded-[40px] space-y-6">
                       <div className="flex items-center gap-4 text-red-400">
                          <Zap size={20} />
                          <h4 className="text-[14px] font-black uppercase tracking-widest">Destructive Actions</h4>
                       </div>
                       <p className="text-[12px] text-white/40 leading-relaxed max-w-2xl">
                          Purging data will remove all configurations from the server. This action cannot be undone.
                       </p>
                       <div className="flex gap-4">
                          <button 
                            onClick={async () => {
                               if (confirm("Initiate total system reset? This wipes ALL data.")) {
                                  try {
                                    const token = sessionStorage.getItem("aether-admin-session");
                                    await fetch("/api/data/admin", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify({ key: "admin-projects", data: [] }) });
                                    window.location.reload();
                                  } catch (e) { console.error(e); }
                               }
                            }}
                            className="px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                          >
                             Purge Database
                          </button>
                       </div>
                    </div>
                  </motion.div>
                )}

                {/* ── MUSIC TAB ── */}
                {activeTab === "Music" && (
                   <motion.div key="music" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                      <div className="flex justify-between items-center">
                         <div className="space-y-2">
                            <h3 className="text-[12px] font-black text-pink-400 uppercase tracking-[4px]">Background Audio</h3>
                            <p className="text-[14px] text-white/40 font-medium max-w-md">Manage MP4/audio tracks that play in the background.</p>
                         </div>
                         <div className="flex gap-2">
                           <button onClick={() => {
                              const updated = [...bgMusic, { id: Date.now(), title: "New Track", artist: "Unknown Artist", url: "", status: "Active" }];
                              setBgMusic(updated);
                              saveData("admin-bg-music", updated);
                           }} className="px-6 py-4 bg-pink-500/10 text-pink-400 rounded-[24px] font-black uppercase text-[10px] tracking-[2px] flex items-center gap-3 hover:bg-pink-500 hover:text-black transition-all">
                              <Plus size={16} /> Add Track
                           </button>

                           <button onClick={() => document.getElementById('bulk-music-upload')?.click()} className="px-6 py-4 bg-emerald-500/10 text-emerald-400 rounded-[24px] font-black uppercase text-[10px] tracking-[2px] flex items-center gap-3 hover:bg-emerald-500 hover:text-black transition-all">
                              <UploadIcon size={16} /> Bulk Upload
                           </button>
                           <input 
                             type="file" 
                             id="bulk-music-upload" 
                             multiple 
                             accept="audio/*,video/*" 
                             className="hidden" 
                             onChange={async (e) => {
                               if (!e.target.files?.length) return;
                               const files = Array.from(e.target.files);
                               
                               const newTracks: any[] = [];
                               const token = sessionStorage.getItem("aether-admin-session");

                               alert(`Starting upload of ${files.length} tracks. Please wait...`);

                               for (const file of files) {
                                 const formData = new FormData();
                                 formData.append("file", file);
                                 formData.append("type", "bgmusic");

                                 try {
                                   const res = await fetch("/api/upload", {
                                     method: "POST",
                                     headers: { "Authorization": `Bearer ${token}` },
                                     body: formData,
                                   });
                                   const data = await res.json();
                                   if (data.success) {
                                      newTracks.push({
                                        id: Date.now() + Math.random(),
                                        title: file.name.replace(/\.[^/.]+$/, ""),
                                        artist: "Unknown Artist",
                                        url: data.url,
                                        status: "Active"
                                      });
                                   }
                                 } catch (error) {
                                   console.error("Failed to upload", file.name, error);
                                 }
                               }

                               if (newTracks.length > 0) {
                                 setBgMusic(prev => {
                                   const updated = [...prev, ...newTracks];
                                   saveData("admin-bg-music", updated);
                                   return updated;
                                 });
                                 alert(`Successfully added ${newTracks.length} tracks!`);
                               } else {
                                 alert("Upload failed for all files.");
                               }
                               
                               e.target.value = ''; // Reset input
                             }} 
                           />
                         </div>
                      </div>

                      <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
                         {bgMusic.map((track, i) => (
                            <div key={track.id} className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] group relative space-y-6">
                               <button onClick={() => {
                                  const updated = bgMusic.filter((_, idx) => idx !== i);
                                  setBgMusic(updated);
                                  saveData("admin-bg-music", updated);
                               }} className="absolute top-6 right-6 w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white">
                                  <Trash2 size={16} />
                               </button>

                               <div className="space-y-4">
                                  <input type="text" value={track.title} onChange={e => { const n = [...bgMusic]; n[i].title = e.target.value; setBgMusic(n); }} onBlur={() => saveData("admin-bg-music", bgMusic)} className="bg-transparent text-[22px] font-black text-white outline-none w-full placeholder:text-white/20" placeholder="Track Title" />
                                  <input type="text" value={track.artist} onChange={e => { const n = [...bgMusic]; n[i].artist = e.target.value; setBgMusic(n); }} onBlur={() => saveData("admin-bg-music", bgMusic)} className="bg-transparent text-[14px] font-medium text-pink-400/80 outline-none w-full" placeholder="Artist Name" />
                               </div>

                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Audio/Video File (MP4)</label>
                                  <ImageUpload currentImage={track.url} type="bgmusic" onUpload={(url, originalName) => { 
                                    const n = [...bgMusic]; 
                                    n[i].url = url; 
                                    if (originalName && (n[i].title === "New Track" || !n[i].title.trim())) {
                                      n[i].title = originalName.replace(/\.[^/.]+$/, "");
                                    }
                                    setBgMusic(n); 
                                    saveData("admin-bg-music", n); 
                                  }} />
                                  <input type="text" value={track.url} onChange={e => { const n = [...bgMusic]; n[i].url = e.target.value; setBgMusic(n); }} onBlur={() => saveData("admin-bg-music", bgMusic)} className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-[12px] text-white/50 outline-none mt-2" placeholder="Or enter manual URL..." />
                               </div>

                               <div className="flex gap-4 pt-4 border-t border-white/5">
                                  {["Active", "Hidden"].map(status => (
                                     <button key={status} onClick={() => { const n = [...bgMusic]; n[i].status = status; setBgMusic(n); saveData("admin-bg-music", n); }} className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${track.status === status ? status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white' : 'bg-transparent text-white/20 hover:text-white/60'}`}>
                                        {status}
                                     </button>
                                  ))}
                               </div>
                            </div>
                         ))}
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

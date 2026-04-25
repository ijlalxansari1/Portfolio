"use client";

import { useState } from "react";
import { GraduationCap, CheckCircle2, Circle, Trophy, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function DataEngTrackerDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Data Modeling Fundamentals", done: true, time: "2h" },
    { id: 2, title: "SQL for Data Engineers", done: true, time: "4h" },
    { id: 3, title: "ETL vs ELT Architecture", done: false, time: "3h" },
    { id: 4, title: "Modern Data Stack (dbt + Snowflake)", done: false, time: "5h" },
    { id: 5, title: "Orchestration with Dagster", done: false, time: "4h" },
    { id: 6, title: "Data Governance & Ethics", done: false, time: "2h" },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <div className="w-full bg-[#0d0d0d] border border-[var(--border)] rounded-2xl p-6 overflow-hidden min-h-[440px] flex flex-col">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white uppercase tracking-wider">Data Eng Tracker</h3>
            <p className="text-[10px] text-[var(--text-secondary)] opacity-50 uppercase tracking-widest">80/20 Curriculum Manager</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
          <Trophy size={14} className="text-yellow-500" />
          <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">{completedCount}/{tasks.length} Done</span>
        </div>
      </div>

      <div className="mb-8 space-y-3">
        <div className="flex justify-between items-end">
          <p className="text-[11px] font-black text-white uppercase tracking-widest">Course Progress</p>
          <p className="text-[18px] font-black text-yellow-500">{Math.round(progress)}%</p>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]"
          />
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar-hidden max-h-[220px] pr-2">
        {tasks.map((task) => (
          <button 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${task.done ? 'bg-yellow-500/5 border-yellow-500/30 text-white' : 'bg-white/5 border-[var(--border)] text-[var(--text-secondary)] opacity-60 hover:opacity-100 hover:border-white/20'}`}
          >
            <div className="flex items-center gap-4 text-left">
              {task.done ? <CheckCircle2 size={18} className="text-yellow-500" /> : <Circle size={18} />}
              <div>
                <p className={`text-[12px] font-bold ${task.done ? 'line-through opacity-50' : ''}`}>{task.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest opacity-50"><BookOpen size={10} /> Module {task.id}</span>
                  <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest opacity-50"><Clock size={10} /> {task.time}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-[14px] font-black text-white">20h</p>
          <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-40">Total Time</p>
        </div>
        <div className="w-px h-6 bg-[var(--border)]" />
        <div className="text-center">
          <p className="text-[14px] font-black text-white">4</p>
          <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-40">Projects</p>
        </div>
        <div className="w-px h-6 bg-[var(--border)]" />
        <div className="text-center">
          <p className="text-[14px] font-black text-white">6</p>
          <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-widest opacity-40">Certificates</p>
        </div>
      </div>
    </div>
  );
}

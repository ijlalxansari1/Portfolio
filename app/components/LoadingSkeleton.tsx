"use client";

import { motion } from "framer-motion";

export function ProjectSkeleton() {
  return (
    <div className="glass rounded-xl overflow-hidden border border-white/10 animate-pulse">
      <div className="h-48 bg-gray-800" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-800 rounded w-1/4" />
        <div className="h-6 bg-gray-800 rounded w-3/4" />
      </div>
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="glass rounded-xl overflow-hidden border border-white/10 animate-pulse">
      <div className="h-48 bg-gray-800" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-gray-800 rounded w-1/4" />
        <div className="h-5 bg-gray-800 rounded w-3/4" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-xl p-6 border border-white/10 animate-pulse"
    >
      <div className="space-y-4">
        <div className="h-6 bg-gray-800 rounded w-3/4" />
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-5/6" />
      </div>
    </motion.div>
  );
}


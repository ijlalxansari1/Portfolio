"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, Eye, TrendingUp, Globe } from "lucide-react";

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  popularSections: { section: string; views: number }[];
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    uniqueVisitors: 0,
    todayViews: 0,
    popularSections: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Track page view
    const trackView = async () => {
      try {
        const response = await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            section: getCurrentSection(),
          }),
        });
      } catch (error) {
        console.error("Analytics tracking error:", error);
      }
    };

    // Load analytics data
    const loadAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    trackView();
    loadAnalytics();
  }, []);

  const getCurrentSection = () => {
    const sections = ["about", "technologies", "skills", "services", "pricing", "projects", "experience", "blog", "contact"];
    const scrollPosition = window.scrollY + 300;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          return section;
        }
      }
    }
    return "about";
  };

  if (loading) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-6 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-neon-mint" size={24} />
        <h3 className="text-xl font-bold text-white">Portfolio Analytics</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <Eye className="text-neon-mint mx-auto mb-2" size={20} />
          <p className="text-2xl font-bold text-white">{analytics.totalViews.toLocaleString()}</p>
          <p className="text-xs text-gray-400">Total Views</p>
        </div>
        <div className="text-center">
          <Users className="text-neon-cyan mx-auto mb-2" size={20} />
          <p className="text-2xl font-bold text-white">{analytics.uniqueVisitors.toLocaleString()}</p>
          <p className="text-xs text-gray-400">Visitors</p>
        </div>
        <div className="text-center">
          <TrendingUp className="text-neon-mint mx-auto mb-2" size={20} />
          <p className="text-2xl font-bold text-white">{analytics.todayViews}</p>
          <p className="text-xs text-gray-400">Today</p>
        </div>
        <div className="text-center">
          <Globe className="text-neon-cyan mx-auto mb-2" size={20} />
          <p className="text-2xl font-bold text-white">{analytics.popularSections.length}</p>
          <p className="text-xs text-gray-400">Sections</p>
        </div>
      </div>

      {analytics.popularSections.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Popular Sections</h4>
          <div className="space-y-2">
            {analytics.popularSections.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs text-gray-400 capitalize">{item.section}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.views / analytics.totalViews) * 100}%` }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-neon-mint to-neon-cyan"
                    />
                  </div>
                  <span className="text-xs text-white w-8 text-right">{item.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}


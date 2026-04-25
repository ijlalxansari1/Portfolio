"use client";

import { useEffect, useRef, useState } from "react";

const defaultSkills = [
  { name: "Python", value: 92 },
  { name: "PostgreSQL", value: 85 },
  { name: "DuckDB", value: 90 },
  { name: "FastAPI", value: 87 },
  { name: "Kafka", value: 75 },
  { name: "Next.js", value: 88 },
  { name: "Docker", value: 90 },
  { name: "Airflow", value: 85 },
];

export default function Technologies() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [skillData, setSkillData] = useState(defaultSkills);

  useEffect(() => {
    const handleUpdate = () => {
      const adminData = localStorage.getItem("admin-skills-radar");
      if (adminData) {
        const parsed = JSON.parse(adminData);
        if (parsed.length > 0) setSkillData(parsed);
      }
    };
    handleUpdate();
    window.addEventListener("admin-updated", handleUpdate);
    return () => window.removeEventListener("admin-updated", handleUpdate);
  }, []);

  useEffect(() => {
    // Load D3 from CDN if not present
    if (!(window as any).d3) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js";
      script.async = true;
      script.onload = () => drawChart();
      document.body.appendChild(script);
    } else {
      drawChart();
    }

    function drawChart() {
      // @ts-ignore
      const d3 = window.d3;
      if (!d3 || !svgRef.current) return;

      const width = 340;
      const height = 340;
      const margin = 50;
      const radius = Math.min(width, height) / 2 - margin;
      const levels = 5;
      const angleSlice = (Math.PI * 2) / skillData.length;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      // Grid circles (concentric polygons)
      for (let j = 0; j < levels; j++) {
        const levelRadius = (radius / levels) * (j + 1);
        g.append("polygon")
          .attr("points", skillData.map((_, i) => [
            levelRadius * Math.cos(angleSlice * i - Math.PI / 2),
            levelRadius * Math.sin(angleSlice * i - Math.PI / 2)
          ].join(",")).join(" "))
          .style("fill", "none")
          .style("stroke", "#222")
          .style("stroke-width", "1px");
      }

      // Axes
      const axis = g.selectAll(".axis").data(skillData).enter().append("g").attr("class", "axis");
      axis.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", (d: any, i: number) => radius * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d: any, i: number) => radius * Math.sin(angleSlice * i - Math.PI / 2))
        .style("stroke", "#222")
        .style("stroke-width", "1px");

      // Labels
      axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d: any, i: number) => (radius + 20) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d: any, i: number) => (radius + 20) * Math.sin(angleSlice * i - Math.PI / 2))
        .text((d: any) => d.name)
        .style("fill", "#666")
        .style("cursor", "pointer")
        .on("mouseover", (e: any, d: any) => setHoveredSkill(d.name))
        .on("mouseout", () => setHoveredSkill(null));

      // The Radar Area
      const radarLine = d3.lineRadial()
        // @ts-ignore
        .radius((d: any) => (d.value / 100) * radius)
        .angle((d: any, i: number) => i * angleSlice)
        .curve(d3.curveLinearClosed);

      g.append("path")
        .datum(skillData)
        .attr("d", radarLine)
        .style("fill", "rgba(0, 232, 122, 0.15)")
        .style("stroke", "var(--accent)")
        .style("stroke-width", "2px")
        .style("filter", "drop-shadow(0 0 8px rgba(0, 232, 122, 0.4))")
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Center dot
      g.append("circle")
        .attr("r", 4)
        .style("fill", "var(--accent)")
        .style("stroke", "#000")
        .style("stroke-width", "2px");
    }
  }, [skillData]);

  return (
    <div className="w-full">
      <p className="text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">Technologies</p>
      <h2 className="text-[28px] font-black text-[var(--text-primary)] mb-8">Technical Proficiency Radar</h2>
      
      <div className="flex flex-col md:flex-row items-center gap-12 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Radar Chart */}
        <div className="w-full md:w-[60%] flex justify-center">
          <svg ref={svgRef} width="340" height="340" className="overflow-visible" />
        </div>

        {/* Legend */}
        <div className="w-full md:w-[40%] space-y-4">
          {skillData.map((skill) => (
            <div 
              key={skill.name}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${hoveredSkill === skill.name ? 'border-[var(--accent)] bg-[var(--accent)]/5 scale-105' : 'border-transparent bg-[var(--bg-card)]/50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                <span className={`text-[12px] font-black uppercase tracking-wider ${hoveredSkill === skill.name ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}>
                  {skill.name}
                </span>
              </div>
              <span className="text-[12px] font-mono text-white/50">{skill.value}%</span>
            </div>
          ))}
          <p className="text-[10px] text-[var(--text-secondary)] opacity-30 italic mt-6">
            💡 The radar polygon visualizes skill synergy across 8 core axes.
          </p>
        </div>
        
        {/* Background Decorative */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
}

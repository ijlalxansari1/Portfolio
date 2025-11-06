"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Download, Mail, ArrowDown } from "lucide-react";

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}+</span>;
}

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 px-8 md:px-16 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-6"
        >
          <span className="px-4 py-2 glass rounded-full text-neon-mint text-sm font-medium border border-neon-mint/30">
            Data Engineer & AI Ethics Researcher
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Hello, I&apos;m{" "}
          <span className="text-neon-mint neon-text">Ijlal Ansari</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-semibold text-gray-300 mb-8"
        >
          Senior Data Engineer and Data Scientist Based in California, Los Angeles.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          I am a Data Engineering specialist focused on automation, ethical machine
          learning systems, and attention-aware analytics. I build reliable data
          pipelines, interpretive ML workflows, and transparent AI components using
          modern cloud and distributed systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-neon-mint text-black rounded-lg font-semibold flex items-center gap-2 hover:bg-neon-mint/90 transition-all shadow-lg shadow-neon-mint/30"
          >
            <Mail size={20} />
            Get In Touch
          </motion.a>
          <motion.a
            href="/Ijlal-Ansari-Resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass border-2 border-neon-mint text-neon-mint rounded-lg font-semibold flex items-center gap-2 hover:bg-neon-mint/10 transition-all"
          >
            <Download size={20} />
            Download CV
          </motion.a>
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-xl p-8 text-center border border-white/10 hover:border-neon-mint/50 transition-all"
          >
            <div className="text-6xl font-bold text-neon-mint mb-3">
              <Counter end={5} />
            </div>
            <p className="text-gray-400 text-lg">Completed Projects</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-xl p-8 text-center border border-white/10 hover:border-neon-mint/50 transition-all"
          >
            <div className="text-6xl font-bold text-neon-mint mb-3">
              <Counter end={2} />
            </div>
            <p className="text-gray-400 text-lg">Years Experience</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-xl p-8 text-center border border-white/10 hover:border-neon-mint/50 transition-all"
          >
            <div className="text-6xl font-bold text-neon-mint mb-3">
              <Counter end={4} />
            </div>
            <p className="text-gray-400 text-lg">Certifications</p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="text-neon-mint" size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

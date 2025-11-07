"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

  return <span ref={ref}>{count}</span>;
}

const dataDomains = [
  "Data Engineer",
  "Data Scientist",
  "BI Engineer",
  "ETL Developer",
  "Data Architect",
  "ML Engineer",
  "Data Analyst",
  "Cloud Data Engineer",
  "Big Data Engineer",
  "Analytics Engineer",
  "Data Pipeline Engineer",
  "Data Warehouse Architect",
  "Business Intelligence Developer",
  "Data Platform Engineer",
  "AI/ML Engineer",
];

export default function About() {
  const [currentDomain, setCurrentDomain] = useState(0);
  const [currentGreeting, setCurrentGreeting] = useState(0);

  const greetings = [
    "Hello, I'm Ijlal Ansari",
    "Hi, I'm Ijlal Ansari",
    "Hey, I'm Ijlal Ansari",
    "Welcome, I'm Ijlal Ansari",
  ];

    useEffect(() => {
      const domainInterval = setInterval(() => {
        setCurrentDomain((prev) => (prev + 1) % dataDomains.length);
      }, 3000);

      const greetingInterval = setInterval(() => {
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
      }, 4000);

      return () => {
        clearInterval(domainInterval);
        clearInterval(greetingInterval);
      };
    }, [dataDomains.length, greetings.length]);

  return (
      <section id="about" className="min-h-screen flex items-center justify-center py-4 px-8 md:px-16 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto w-full glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
      >
        {/* Hero Badge - Dynamic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentGreeting}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="px-5 py-2.5 glass rounded-full text-neon-mint text-sm md:text-base font-semibold border-2 border-neon-mint/50 inline-block neon-glow"
            >
              {greetings[currentGreeting]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main Heading - Dynamic with Data Domains */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-8 leading-tight text-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentDomain}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="block"
            >
              <span className="text-neon-mint neon-text text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
                {dataDomains[currentDomain]}
              </span>
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        {/* Description - Updated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-12 max-w-4xl text-left"
        >
          <p className="text-base md:text-lg lg:text-xl text-secondary leading-relaxed">
            I&apos;m an experienced data professional specializing in scalable data pipelines, cloud-based architectures, and ethical AI solutions. My work focuses on transforming complex data into actionable insights that drive business growth and informed decision-making.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-secondary leading-relaxed">
            With a deep commitment to data integrity, governance, and responsible AI, I strive to build systems that are not only efficient but also trustworthy and transparent.
          </p>
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-xl p-8 text-center border border-white/10 hover:border-neon-mint/50 transition-all"
          >
            <div className="text-6xl font-bold text-neon-mint mb-3">
              1+
            </div>
            <p className="text-secondary text-lg font-medium">Year of Experience</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-xl p-8 text-center border border-white/10 hover:border-neon-mint/50 transition-all"
          >
            <div className="text-6xl font-bold text-neon-mint mb-3">
              10+
            </div>
            <p className="text-secondary text-lg font-medium">Completed Projects</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

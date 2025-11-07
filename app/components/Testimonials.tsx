"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  rating: number;
  linkedin?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Data Science Manager",
    company: "Tech Corp",
    content: "Ijlal delivered exceptional data engineering solutions that transformed our analytics pipeline. His expertise in cloud architecture and ETL processes is outstanding.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "CTO",
    company: "StartupXYZ",
    content: "Working with Ijlal was a game-changer. His ethical AI approach and attention to data governance helped us build trustworthy systems.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Lead",
    company: "DataFlow Inc",
    content: "Ijlal's technical skills and professionalism are top-notch. He consistently delivers high-quality work on time and within budget.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load testimonials from API if available
    const loadTestimonials = async () => {
      try {
        const response = await fetch("/api/data/testimonials");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setTestimonials(data);
          }
        }
      } catch (error) {
        console.error("Error loading testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="min-h-screen flex items-center justify-center py-4 px-8 md:px-16 relative z-20">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <Quote className="text-neon-mint" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Testimonials</h2>
          </div>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>

                <Quote className="text-neon-mint/50 mx-auto mb-6" size={48} />
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed italic">
                  &ldquo;{current.content}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-4">
                  {current.image && (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-mint to-neon-cyan flex items-center justify-center text-white font-bold text-xl">
                      {current.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-semibold text-lg">{current.name}</h4>
                    <p className="text-neon-cyan text-sm">
                      {current.role} at {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full glass border border-white/10 text-neon-mint hover:bg-neon-mint/10 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-neon-mint"
                        : "w-2 bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full glass border border-white/10 text-neon-mint hover:bg-neon-mint/10 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


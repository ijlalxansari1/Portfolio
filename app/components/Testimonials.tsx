"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Bryn Hooper",
    role: "CEO, Abc.inc",
    text: "I highly recommend this business. The product quality is outstanding, exceeding my expectations every time. I was completely impressed with their professionalism and customer service. Pricing is fair and transparent - definitely value for money.",
    rating: 5,
    avatar: "/testimonials/avatar1.jpg",
  },
  {
    name: "Caspar Baldwin",
    role: "CEO, Abc.inc",
    text: "I highly recommend this business. The product quality is outstanding, exceeding my expectations every time. I was completely impressed with their professionalism and customer service. Pricing is fair and transparent - definitely value for money.",
    rating: 5,
    avatar: "/testimonials/avatar2.jpg",
  },
  {
    name: "Clayton Ayers",
    role: "CEO, Abc.inc",
    text: "I highly recommend this business. The product quality is outstanding, exceeding my expectations every time. I was completely impressed with their professionalism and customer service. Pricing is fair and transparent - definitely value for money.",
    rating: 5,
    avatar: "/testimonials/avatar3.jpg",
  },
];

const clientLogos = [
  { name: "Google", logo: "/logos/google.svg" },
  { name: "Amazon", logo: "/logos/amazon.svg" },
  { name: "Microsoft", logo: "/logos/microsoft.svg" },
  { name: "IBM", logo: "/logos/ibm.svg" },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="min-h-screen py-20 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Here's what my clients say
        </motion.h2>

        <div className="relative mb-16">
          {/* Testimonial Carousel */}
          <div className="relative h-[400px] mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-xl p-8 border border-white/10 h-full flex flex-col justify-center"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic text-lg">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-neon-mint/50">
                    <div className="w-full h-full bg-gradient-to-br from-neon-mint/30 to-neon-cyan/30 flex items-center justify-center text-2xl">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-neon-cyan text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border border-neon-mint/50 text-neon-mint flex items-center justify-center hover:bg-neon-mint/10 transition-all z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass border border-neon-mint/50 text-neon-mint flex items-center justify-center hover:bg-neon-mint/10 transition-all z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-neon-mint w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-8 text-lg">
            More than 200+ companies trusted us worldwide
          </p>
          <div className="flex justify-center items-center gap-12 flex-wrap opacity-60 grayscale hover:grayscale-0 transition-all">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="h-12 w-24 flex items-center justify-center"
              >
                <div className="text-white font-bold text-xl">{client.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

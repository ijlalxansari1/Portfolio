"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    image: string;
    rating: number;
    text: string;
    project?: string;
    date: string;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        fetch("/api/data/testimonials")
            .then((res) => res.json())
            .then((data) => {
                setTestimonials(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error loading testimonials:", err);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (autoPlay && testimonials.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 6000); // Change every 6 seconds
            return () => clearInterval(interval);
        }
    }, [autoPlay, testimonials.length]);

    const nextTestimonial = () => {
        setAutoPlay(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setAutoPlay(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index: number) => {
        setAutoPlay(false);
        setCurrentIndex(index);
    };

    if (isLoading) {
        return (
            <section id="testimonials" className="py-24 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neon-mint"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null; // Don't show section if no testimonials
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="py-24 px-4 md:px-8 relative">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Here's What My Clients Say
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Don't just take my word for it - hear from the clients and teams I've worked with
                    </p>
                </motion.div>

                {/* Testimonial Carousel */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="glass rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
                        >
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 left-6 opacity-10">
                                <Quote size={80} className="text-neon-mint" />
                            </div>

                            {/* Rating Stars */}
                            <div className="flex gap-1 mb-6 relative z-10">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={`${i < currentTestimonial.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <blockquote className="text-white text-lg md:text-xl leading-relaxed mb-8 relative z-10 italic">
                                "{currentTestimonial.text}"
                            </blockquote>

                            {/* Client Info */}
                            <div className="flex items-center gap-4 relative z-10">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-mint/20 to-neon-mint/5 border-2 border-neon-mint/30 flex items-center justify-center overflow-hidden">
                                    {currentTestimonial.image && currentTestimonial.image !== "/testimonials/avatar1.jpg" ? (
                                        <Image
                                            src={currentTestimonial.image}
                                            alt={currentTestimonial.name}
                                            width={64}
                                            height={64}
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-neon-mint">
                                            {currentTestimonial.name.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {/* Client Details */}
                                <div>
                                    <h4 className="text-white font-semibold text-lg">
                                        {currentTestimonial.name}
                                    </h4>
                                    <p className="text-gray-400 text-sm">
                                        {currentTestimonial.role} at {currentTestimonial.company}
                                    </p>
                                    {currentTestimonial.project && (
                                        <p className="text-neon-mint text-xs mt-1">
                                            Project: {currentTestimonial.project}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-mint/5 to-transparent pointer-events-none" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    {testimonials.length > 1 && (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevTestimonial}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 glass rounded-full border border-white/10 flex items-center justify-center text-white hover:border-neon-mint/50 transition-all"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={24} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextTestimonial}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 glass rounded-full border border-white/10 flex items-center justify-center text-white hover:border-neon-mint/50 transition-all"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={24} />
                            </motion.button>
                        </>
                    )}
                </div>

                {/* Dots Indicator */}
                {testimonials.length > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToTestimonial(index)}
                                className={`h-2 rounded-full transition-all ${index === currentIndex
                                        ? "w-8 bg-neon-mint"
                                        : "w-2 bg-gray-600 hover:bg-gray-500"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Grid View Alternative (Optional - commented out for carousel) */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                  />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-mint/20 border border-neon-mint/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-neon-mint">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div> */}
            </div>
        </section>
    );
}

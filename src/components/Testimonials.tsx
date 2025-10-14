import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Testimonial } from '../types';

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data) {
        setTestimonials(data);
      } else {
        const defaultTestimonials: Testimonial[] = [
          {
            id: '1',
            name: 'Sarah Johnson',
            role: 'CTO',
            company: 'DataFlow Systems',
            content:
              'Andrew transformed our entire data infrastructure. His expertise in DataOps and cloud architecture helped us scale our operations while reducing costs by 40%. Outstanding work!',
            avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
            rating: 5,
            order_index: 0,
            created_at: '',
          },
          {
            id: '2',
            name: 'Michael Chen',
            role: 'VP of Engineering',
            company: 'Tech Innovations',
            content:
              'Working with Andrew was a game-changer. His real-time data pipeline solution processes millions of events seamlessly. He delivered beyond expectations!',
            avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
            rating: 5,
            order_index: 1,
            created_at: '',
          },
          {
            id: '3',
            name: 'Emily Rodriguez',
            role: 'Data Analytics Manager',
            company: 'Analytics Pro',
            content:
              'Andrew\'s implementation of our data warehouse migration was flawless. The new infrastructure is faster, more reliable, and easier to maintain. Highly recommended!',
            avatar_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
            rating: 5,
            order_index: 2,
            created_at: '',
          },
          {
            id: '4',
            name: 'David Park',
            role: 'Lead Data Scientist',
            company: 'AI Solutions Inc',
            content:
              'The ML data pipeline Andrew built for us significantly improved our model training workflow. His attention to detail and deep technical knowledge is impressive.',
            avatar_url: 'https://images.pexels.com/photos/1496154/pexels-photo-1496154.jpeg?auto=compress&cs=tinysrgb&w=200',
            rating: 5,
            order_index: 3,
            created_at: '',
          },
        ];
        setTestimonials(defaultTestimonials);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-dark-900 rounded-2xl p-8 md:p-12 shadow-xl"
              >
                <Quote size={48} className="text-primary/20 mb-6" />

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                  "{currentTestimonial.content}"
                </p>

                {currentTestimonial.rating && (
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                      <Star key={i} size={20} className="fill-primary text-primary" />
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <img
                      src={currentTestimonial.avatar_url || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white text-lg">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentTestimonial.role}
                      {currentTestimonial.company && ` at ${currentTestimonial.company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white dark:bg-dark-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white dark:bg-dark-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 dark:bg-dark-700 hover:bg-primary/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

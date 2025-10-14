import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';

export function Hero() {
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-dark-900 dark:via-dark-900 dark:to-primary-900/10"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-2xl mb-6">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Andrew Ryan"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Andrew Ryan
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center space-x-2 text-2xl md:text-3xl font-heading font-semibold text-primary">
              <span>DataOps Engineer</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Transforming data into actionable insights. Specializing in data engineering,
            pipeline automation, and analytics infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
              <Download size={20} className="mr-2" />
              Download CV
            </button>
            <a
              href="#contact"
              onClick={handleContact}
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-dark-800 text-gray-900 dark:text-white font-medium rounded-lg border-2 border-gray-200 dark:border-dark-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Mail size={20} className="mr-2" />
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <button
              onClick={handleScrollDown}
              className="inline-flex flex-col items-center text-gray-400 hover:text-primary transition-colors group"
              aria-label="Scroll down"
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown size={24} className="group-hover:text-primary" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-dark-900 to-transparent pointer-events-none"></div>
    </section>
  );
}

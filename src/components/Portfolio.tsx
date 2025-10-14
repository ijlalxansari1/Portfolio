import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

export function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data) {
        setProjects(data);
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      } else {
        const defaultProjects: Project[] = [
          {
            id: '1',
            title: 'Real-time Data Pipeline',
            description: 'Built a real-time streaming pipeline processing 1M+ events per second using Kafka and Spark',
            category: 'Data Engineering',
            image_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
            technologies: ['Kafka', 'Spark', 'Python', 'AWS'],
            featured: true,
            order_index: 0,
            created_at: '',
          },
          {
            id: '2',
            title: 'Cloud Data Warehouse',
            description: 'Migrated on-premise data warehouse to Snowflake, reducing costs by 40%',
            category: 'Cloud',
            image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
            technologies: ['Snowflake', 'dbt', 'Airflow'],
            featured: true,
            order_index: 1,
            created_at: '',
          },
          {
            id: '3',
            title: 'Analytics Dashboard',
            description: 'Created executive dashboard with real-time metrics and predictive analytics',
            category: 'Analytics',
            image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
            technologies: ['Tableau', 'Python', 'SQL'],
            featured: false,
            order_index: 2,
            created_at: '',
          },
          {
            id: '4',
            title: 'ETL Automation',
            description: 'Automated 50+ manual ETL processes, saving 200+ hours monthly',
            category: 'Automation',
            image_url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
            technologies: ['Airflow', 'Python', 'Docker'],
            featured: false,
            order_index: 3,
            created_at: '',
          },
          {
            id: '5',
            title: 'Data Quality Framework',
            description: 'Implemented comprehensive data quality checks reducing errors by 85%',
            category: 'Data Engineering',
            image_url: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
            technologies: ['Great Expectations', 'Python', 'Airflow'],
            featured: false,
            order_index: 4,
            created_at: '',
          },
          {
            id: '6',
            title: 'ML Data Pipeline',
            description: 'Built end-to-end ML pipeline for model training and deployment',
            category: 'Machine Learning',
            image_url: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=600',
            technologies: ['Kubeflow', 'TensorFlow', 'MLflow'],
            featured: true,
            order_index: 5,
            created_at: '',
          },
        ];
        setProjects(defaultProjects);
        const uniqueCategories = ['All', ...new Set(defaultProjects.map(p => p.category))];
        setCategories(uniqueCategories);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-primary">Portfolio</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my recent projects and data engineering solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading projects...</div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white dark:bg-dark-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <div className="flex gap-4">
                          {project.project_url && (
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/90 rounded-lg hover:bg-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={20} className="text-gray-900" />
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/90 rounded-lg hover:bg-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={20} className="text-gray-900" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                        {project.category}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

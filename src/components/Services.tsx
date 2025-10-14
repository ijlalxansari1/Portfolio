import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, Cloud, GitBranch, BarChart, Workflow, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Service } from '../types';

const iconMap: Record<string, typeof Database> = {
  database: Database,
  cloud: Cloud,
  git: GitBranch,
  chart: BarChart,
  workflow: Workflow,
  shield: Shield,
};

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    }

    fetchServices();
  }, []);

  const defaultServices = [
    {
      icon: 'database',
      title: 'Data Pipeline Development',
      description:
        'Design and implement scalable data pipelines using modern tools like Apache Spark, Airflow, and Kafka for real-time and batch processing.',
    },
    {
      icon: 'cloud',
      title: 'Cloud Data Solutions',
      description:
        'Build and optimize cloud-native data architectures on AWS, GCP, and Azure with focus on cost-efficiency and performance.',
    },
    {
      icon: 'workflow',
      title: 'DataOps Implementation',
      description:
        'Establish DataOps practices including CI/CD for data pipelines, automated testing, and monitoring to ensure data reliability.',
    },
    {
      icon: 'chart',
      title: 'Analytics Infrastructure',
      description:
        'Set up modern data warehouses and analytics platforms using Snowflake, BigQuery, or Redshift with dbt for transformation.',
    },
    {
      icon: 'shield',
      title: 'Data Quality & Governance',
      description:
        'Implement data quality frameworks, validation rules, and governance policies to maintain data integrity and compliance.',
    },
    {
      icon: 'git',
      title: 'Data Engineering Consulting',
      description:
        'Provide expert consultation on data architecture, technology selection, and best practices for data engineering teams.',
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-20 bg-white dark:bg-dark-900 relative overflow-hidden">
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
            My <span className="text-primary">Services</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive data engineering solutions tailored to your business needs
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading services...</div>
        ) : (
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => {
              const Icon = iconMap[service.icon] || Database;
              return (
                <motion.div
                  key={typeof service === 'object' && 'id' in service ? service.id : index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-8 bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-primary dark:hover:border-primary hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

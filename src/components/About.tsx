import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, MapPin, Mail, Phone, Calendar, Briefcase } from 'lucide-react';

const infoItems = [
  { icon: User, label: 'Name', value: 'Andrew Ryan' },
  { icon: Calendar, label: 'Age', value: '32 Years' },
  { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
  { icon: Mail, label: 'Email', value: 'andrew.ryan@email.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: Briefcase, label: 'Experience', value: '8+ Years' },
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="grid grid-cols-1 gap-4">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-dark-800 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-3"
            >
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Hello, I'm Andrew Ryan
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate DataOps Engineer with over 8 years of experience in building
                  robust data pipelines, implementing automation solutions, and optimizing data
                  infrastructure for enterprises.
                </p>
                <p>
                  My expertise spans across cloud platforms (AWS, GCP, Azure), data engineering
                  tools (Apache Spark, Airflow, Kafka), and modern data stack technologies. I
                  specialize in designing scalable data architectures that enable organizations to
                  make data-driven decisions.
                </p>
                <p>
                  Throughout my career, I've successfully led multiple data transformation
                  projects, reduced data processing times by up to 70%, and implemented CI/CD
                  practices for data pipelines. I'm passionate about automating workflows,
                  ensuring data quality, and building reliable data systems.
                </p>
                <p>
                  When I'm not working with data, I enjoy contributing to open-source projects,
                  writing technical articles, and mentoring aspiring data engineers.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="text-center p-6 bg-primary/5 rounded-lg"
                >
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="text-center p-6 bg-primary/5 rounded-lg"
                >
                  <div className="text-4xl font-bold text-primary mb-2">30+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="text-center p-6 bg-primary/5 rounded-lg"
                >
                  <div className="text-4xl font-bold text-primary mb-2">8+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

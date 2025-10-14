import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Experience } from '../types';

export function Resume() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperience() {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data) {
        setExperiences(data);
      } else {
        const defaultExperience: Experience[] = [
          {
            id: '1',
            title: 'Senior DataOps Engineer',
            company: 'Tech Innovations Inc',
            location: 'San Francisco, CA',
            start_date: '2021-03-01',
            end_date: undefined,
            description:
              'Leading data infrastructure modernization initiatives. Built real-time streaming pipelines processing 2M+ events daily. Implemented DataOps practices reducing deployment time by 60%.',
            type: 'work',
            order_index: 0,
            created_at: '',
          },
          {
            id: '2',
            title: 'Data Engineer',
            company: 'Digital Solutions Corp',
            location: 'Seattle, WA',
            start_date: '2018-06-01',
            end_date: '2021-02-28',
            description:
              'Designed and maintained ETL pipelines using Apache Airflow and Spark. Migrated data warehouse to cloud infrastructure, improving query performance by 40%.',
            type: 'work',
            order_index: 1,
            created_at: '',
          },
          {
            id: '3',
            title: 'Junior Data Engineer',
            company: 'Analytics Pro',
            location: 'Portland, OR',
            start_date: '2016-01-01',
            end_date: '2018-05-31',
            description:
              'Developed data integration solutions and automated reporting workflows. Collaborated with cross-functional teams to deliver data-driven insights.',
            type: 'work',
            order_index: 2,
            created_at: '',
          },
          {
            id: '4',
            title: 'Master of Science in Computer Science',
            company: 'Stanford University',
            location: 'Stanford, CA',
            start_date: '2014-09-01',
            end_date: '2016-06-30',
            description:
              'Specialized in Data Systems and Machine Learning. Thesis: "Scalable Real-time Data Processing Architectures". GPA: 3.9/4.0',
            type: 'education',
            order_index: 3,
            created_at: '',
          },
          {
            id: '5',
            title: 'Bachelor of Science in Computer Science',
            company: 'UC Berkeley',
            location: 'Berkeley, CA',
            start_date: '2010-09-01',
            end_date: '2014-05-31',
            description:
              'Focus on Database Systems and Software Engineering. Graduated with Honors. Dean\'s List all semesters.',
            type: 'education',
            order_index: 4,
            created_at: '',
          },
        ];
        setExperiences(defaultExperience);
      }
      setLoading(false);
    }

    fetchExperience();
  }, []);

  const workExperience = experiences.filter((exp) => exp.type === 'work');
  const education = experiences.filter((exp) => exp.type === 'education');

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const TimelineItem = ({ experience, index }: { experience: Experience; index: number }) => {
    const Icon = experience.type === 'work' ? Briefcase : GraduationCap;

    return (
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative pl-8 pb-12 last:pb-0"
      >
        <div className="absolute left-0 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-4 border-white dark:border-dark-900 shadow-lg z-10">
          <Icon size={20} className="text-white" />
        </div>

        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-700"></div>

        <div className="ml-8 bg-white dark:bg-dark-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-dark-700">
          <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-2">
            <Calendar size={16} />
            <span>
              {formatDate(experience.start_date)} - {formatDate(experience.end_date)}
            </span>
          </div>

          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-1">
            {experience.title}
          </h3>

          <p className="text-primary font-medium mb-3">
            {experience.company}
            {experience.location && (
              <span className="text-gray-500 dark:text-gray-400"> • {experience.location}</span>
            )}
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {experience.description}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="resume" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-primary">Resume</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading resume...</div>
        ) : (
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center"
              >
                <Briefcase size={28} className="text-primary mr-3" />
                Work Experience
              </motion.h3>

              {workExperience.map((exp, index) => (
                <TimelineItem key={exp.id} experience={exp} index={index} />
              ))}
            </div>

            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 flex items-center"
              >
                <GraduationCap size={28} className="text-primary mr-3" />
                Education
              </motion.h3>

              {education.map((exp, index) => (
                <TimelineItem key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

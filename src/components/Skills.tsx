import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, Cloud, Code, GitBranch, Server, BarChart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Skill } from '../types';

const iconMap: Record<string, typeof Database> = {
  database: Database,
  cloud: Cloud,
  code: Code,
  git: GitBranch,
  server: Server,
  chart: BarChart,
};

function SkillBar({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  const [progress, setProgress] = useState(0);
  const Icon = skill.icon && iconMap[skill.icon] ? iconMap[skill.icon] : Code;

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setProgress(skill.proficiency);
      }, 300 + index * 100);
      return () => clearTimeout(timer);
    }
  }, [inView, skill.proficiency, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Icon size={20} className="text-primary mr-2" />
          <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
        </div>
        <span className="text-primary font-semibold">{progress}%</span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('order_index', { ascending: true });

      if (!error && data) {
        setSkills(data);
      }
      setLoading(false);
    }

    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                  Data Engineering
                </h3>
                {[
                  { name: 'Apache Spark', proficiency: 95, icon: 'server' },
                  { name: 'Apache Airflow', proficiency: 90, icon: 'code' },
                  { name: 'Apache Kafka', proficiency: 88, icon: 'database' },
                  { name: 'SQL & NoSQL', proficiency: 92, icon: 'database' },
                ].map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={{ ...skill, id: '', category: 'Data Engineering', order_index: index, created_at: '' }}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                  Cloud & DevOps
                </h3>
                {[
                  { name: 'AWS', proficiency: 93, icon: 'cloud' },
                  { name: 'GCP', proficiency: 85, icon: 'cloud' },
                  { name: 'Docker & Kubernetes', proficiency: 87, icon: 'server' },
                  { name: 'CI/CD', proficiency: 90, icon: 'git' },
                ].map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={{ ...skill, id: '', category: 'Cloud & DevOps', order_index: index, created_at: '' }}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                  Programming
                </h3>
                {[
                  { name: 'Python', proficiency: 95, icon: 'code' },
                  { name: 'Scala', proficiency: 82, icon: 'code' },
                  { name: 'Java', proficiency: 80, icon: 'code' },
                  { name: 'Bash/Shell', proficiency: 88, icon: 'code' },
                ].map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={{ ...skill, id: '', category: 'Programming', order_index: index, created_at: '' }}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                  Analytics & BI
                </h3>
                {[
                  { name: 'dbt', proficiency: 90, icon: 'chart' },
                  { name: 'Tableau', proficiency: 85, icon: 'chart' },
                  { name: 'Looker', proficiency: 83, icon: 'chart' },
                  { name: 'Power BI', proficiency: 80, icon: 'chart' },
                ].map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={{ ...skill, id: '', category: 'Analytics & BI', order_index: index, created_at: '' }}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                    {category}
                  </h3>
                  {categorySkills.map((skill, index) => (
                    <SkillBar key={skill.id} skill={skill} index={index} inView={inView} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

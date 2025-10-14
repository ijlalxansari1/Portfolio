import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';

export function Blog() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setPosts(data);
      } else {
        const defaultPosts: BlogPost[] = [
          {
            id: '1',
            title: 'Building Scalable Data Pipelines with Apache Kafka',
            slug: 'building-scalable-data-pipelines-kafka',
            excerpt:
              'Learn how to design and implement real-time streaming data pipelines using Apache Kafka for processing millions of events per day.',
            content: '',
            image_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
            category: 'Data Engineering',
            read_time: 8,
            published: true,
            published_at: '2024-10-01T10:00:00Z',
            created_at: '',
          },
          {
            id: '2',
            title: 'Modern Data Stack: dbt, Airflow, and Snowflake',
            slug: 'modern-data-stack-dbt-airflow-snowflake',
            excerpt:
              'A comprehensive guide to building a modern data stack using dbt for transformations, Airflow for orchestration, and Snowflake for warehousing.',
            content: '',
            image_url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
            category: 'DataOps',
            read_time: 12,
            published: true,
            published_at: '2024-09-15T10:00:00Z',
            created_at: '',
          },
          {
            id: '3',
            title: 'Implementing Data Quality Checks in Production',
            slug: 'implementing-data-quality-checks-production',
            excerpt:
              'Best practices for implementing automated data quality checks and monitoring to ensure data reliability in production environments.',
            content: '',
            image_url: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600',
            category: 'Best Practices',
            read_time: 10,
            published: true,
            published_at: '2024-09-01T10:00:00Z',
            created_at: '',
          },
        ];
        setPosts(defaultPosts);
      }
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section id="blog" className="py-20 bg-white dark:bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Latest <span className="text-primary">Blog Posts</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on data engineering
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading posts...</div>
        ) : (
          <>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image_url || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{post.read_time} min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <button className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all group/btn">
                      Read More
                      <ArrowRight size={18} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <button className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                View All Posts
                <ArrowRight size={20} className="ml-2" />
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

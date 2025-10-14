import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:andrew.ryan@email.com', label: 'Email' },
  ];

  return (
    <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              Andrew<span className="text-primary">Ryan</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              DataOps Engineer & Data Infrastructure Specialist
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 dark:bg-dark-800 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-800 text-center text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart size={16} className="text-primary fill-primary" /> by Andrew Ryan © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

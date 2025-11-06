"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "./Toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Let&apos;s Get in Touch!
        </motion.h2>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-lg p-6 border border-white/10 flex flex-col items-center text-center hover:border-neon-mint/50 transition-all"
          >
            <Phone className="text-neon-mint mb-3" size={32} />
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <a
              href="tel:+18408412569"
              className="text-gray-400 text-sm hover:text-neon-mint transition-colors"
            >
              +1 840 841 25 69
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-lg p-6 border border-white/10 flex flex-col items-center text-center hover:border-neon-mint/50 transition-all"
          >
            <Mail className="text-neon-mint mb-3" size={32} />
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <a
              href="mailto:poono.data@gmail.com"
              className="text-neon-mint text-sm hover:underline"
            >
              poono.data@gmail.com
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass rounded-lg p-6 border border-white/10 flex flex-col items-center text-center hover:border-neon-mint/50 transition-all"
          >
            <MapPin className="text-neon-mint mb-3" size={32} />
            <h3 className="text-white font-semibold mb-2">Location</h3>
            <p className="text-gray-400 text-sm">Gilgit-Baltistan, Pakistan</p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass rounded-xl p-8 border border-white/10 max-w-2xl mx-auto"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-mint transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-mint transition-all"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-mint transition-all resize-none"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className="w-full py-4 px-6 bg-neon-mint/10 border border-neon-mint text-neon-mint rounded-lg hover:bg-neon-mint/20 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neon-mint"></div>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={20} />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center text-gray-400 text-sm"
        >
          © 2025 Ijlal Ansari — Data Engineering & AI Ethics Portfolio
        </motion.footer>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "./Toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const toast = useToast();

  const serviceTypes = [
    "Data Engineering & ETL",
    "Cloud Architecture",
    "AI Ethics & Governance",
    "BI & Analytics Dashboards",
    "Machine Learning Solutions",
    "Data Pipeline Development",
    "Consultation",
    "Other",
  ];

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time validation
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
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
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", serviceType: "", message: "" });
        setErrors({});
        setFocusedField(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <section id="contact" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 border border-white/10 hover:border-neon-mint/30 transition-all bg-black/40 backdrop-blur-xl"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          >
            CONTACT
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-2">
                <Mail className="text-neon-mint" size={24} />
                <h3 className="text-white font-semibold">Email</h3>
              </div>
              <a
                href="mailto:ansariijlal90@gmail.com"
                className="text-neon-mint text-sm hover:underline"
              >
                ansariijlal90@gmail.com
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-2">
                <MapPin className="text-neon-mint" size={24} />
                <h3 className="text-white font-semibold">Location</h3>
              </div>
              <p className="text-secondary text-sm">Gilgit-Baltistan, Pakistan</p>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s make your project brilliant!</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                  Name <span className="text-neon-mint">*</span>
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your Name"
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-tertiary focus:outline-none transition-all ${
                    errors.name 
                      ? "border-red-500 focus:border-red-500" 
                      : focusedField === "name"
                      ? "border-neon-mint focus:border-neon-mint"
                      : "border-white/10 focus:border-neon-mint"
                  }`}
                />
                {errors.name && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
                {formData.name && !errors.name && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neon-mint text-xs mt-1"
                  >
                    ✓ Looks good!
                  </motion.p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                  Email <span className="text-neon-mint">*</span>
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your.email@example.com"
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-tertiary focus:outline-none transition-all ${
                    errors.email 
                      ? "border-red-500 focus:border-red-500" 
                      : focusedField === "email"
                      ? "border-neon-mint focus:border-neon-mint"
                      : "border-white/10 focus:border-neon-mint"
                  }`}
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
                {formData.email && !errors.email && validateEmail(formData.email) && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neon-mint text-xs mt-1"
                  >
                    ✓ Valid email format
                  </motion.p>
                )}
              </div>
              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-secondary mb-2">
                  Service Type <span className="text-neon-mint">*</span>
                </label>
                <motion.select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("serviceType")}
                  onBlur={() => setFocusedField(null)}
                  required
                  whileFocus={{ scale: 1.02 }}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:outline-none transition-all ${
                    errors.serviceType 
                      ? "border-red-500 focus:border-red-500" 
                      : focusedField === "serviceType"
                      ? "border-neon-mint focus:border-neon-mint"
                      : "border-white/10 focus:border-neon-mint"
                  }`}
                >
                  <option value="" className="bg-gray-900">Select a service type...</option>
                  {serviceTypes.map((service) => (
                    <option key={service} value={service} className="bg-gray-900">
                      {service}
                    </option>
                  ))}
                </motion.select>
                {errors.serviceType && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.serviceType}
                  </motion.p>
                )}
                {formData.serviceType && !errors.serviceType && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neon-mint text-xs mt-1"
                  >
                    ✓ Service type selected
                  </motion.p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                  Message <span className="text-neon-mint">*</span>
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  whileFocus={{ scale: 1.01 }}
                  className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-tertiary focus:outline-none resize-none transition-all ${
                    errors.message 
                      ? "border-red-500 focus:border-red-500" 
                      : focusedField === "message"
                      ? "border-neon-mint focus:border-neon-mint"
                      : "border-white/10 focus:border-neon-mint"
                  }`}
                ></motion.textarea>
                <div className="flex justify-between items-center mt-1">
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                  <span className={`text-xs ml-auto ${
                    formData.message.length < 10 
                      ? "text-tertiary" 
                      : formData.message.length > 500
                      ? "text-red-400"
                      : "text-neon-mint"
                  }`}>
                    {formData.message.length} / 500
                  </span>
                </div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                className="w-full py-3 bg-neon-mint text-black rounded-lg font-semibold hover:bg-neon-mint/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-tertiary text-sm mt-12"
          >
            © 2025 Ijlal Ansari — Data Engineering & AI Ethics Portfolio
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

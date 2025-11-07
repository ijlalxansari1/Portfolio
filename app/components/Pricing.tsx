"use client";

import { motion } from "framer-motion";

const pricingPlans = [
  {
    period: "per hour",
    price: "$29",
    popular: false,
    features: [
      "Data pipeline design and consultation",
      "ETL development and optimization",
      "Data modeling and architecture review",
      "Code review and best practices",
      "Email support during business hours",
    ],
  },
  {
    period: "per day",
    price: "$119",
    popular: true,
    features: [
      "Full-day dedicated development",
      "End-to-end project implementation",
      "Cloud infrastructure setup and optimization",
      "Documentation and knowledge transfer",
      "Priority support and consultation",
      "Extended support for 3 months",
    ],
  },
];

export default function Pricing() {
  return (
      <section id="pricing" className="min-h-screen py-4 px-8 md:px-16 relative z-20">
      <div className="max-w-5xl mx-auto w-full">
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
            Amazing Pricing For Your Projects
          </motion.h2>

          <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.period}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                borderColor: "#00FFB3",
                boxShadow: "0 10px 40px rgba(0, 255, 179, 0.2)",
              }}
              className={`glass rounded-xl p-8 border transition-all relative ${
                plan.popular 
                  ? "border-neon-mint/50 hover:border-neon-mint" 
                  : "border-white/10 hover:border-neon-mint/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-neon-mint text-black text-xs font-bold rounded-full">
                  POPULAR
                </div>
              )}
              <div className="text-center mb-6">
                <p className="text-tertiary text-sm mb-2 uppercase tracking-wider font-medium">
                  {plan.period}
                </p>
                <p className="text-5xl font-bold text-neon-mint mb-4">
                  {plan.price}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-neon-mint mt-1 flex-shrink-0">✓</span>
                    <span className="text-secondary text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-neon-mint/10 border border-neon-mint text-neon-mint rounded-lg hover:bg-neon-mint/20 transition-all font-medium"
              >
                Order Now
              </motion.button>
            </motion.div>
          ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


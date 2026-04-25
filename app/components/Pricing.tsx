"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    label: "per hour",
    price: "$25",
    popular: false,
    features: [
      "Design and document data pipeline architecture",
      "Consultation and project scoping sessions",
      "Code review and technical mentoring",
      "Support for 1 month",
    ],
  },
  {
    label: "per day",
    price: "$90",
    popular: true,
    features: [
      "Full pipeline build and deployment",
      "Ethical AI audit and fairness report",
      "RBAC and data governance setup",
      "Platform architecture design",
      "Extended support for 3 months",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="w-full">
      <p className="text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">Pricing</p>
      <h2 className="text-[28px] font-black text-[var(--text-primary)] mb-10">Amazing Pricing For Your Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[720px]">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-2xl flex flex-col ${
              plan.popular
                ? "bg-[var(--accent)] text-black"
                : "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)]"
            }`}
          >
            {plan.popular && (
              <span className="absolute top-5 right-5 px-3 py-1 bg-black/10 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                Most Popular
              </span>
            )}
            <p className={`text-[11px] font-black uppercase tracking-widest mb-2 ${plan.popular ? "text-black/60" : "text-[var(--text-secondary)] opacity-50"}`}>
              {plan.label}
            </p>
            <p className={`text-[56px] font-black leading-none mb-8 tracking-tight ${plan.popular ? "text-black" : "text-[var(--text-primary)]"}`}>
              {plan.price}
            </p>
            <div className="space-y-4 flex-1 mb-8">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-start gap-3">
                  <Check size={15} className={`mt-0.5 shrink-0 ${plan.popular ? "text-black" : "text-[var(--accent)]"}`} />
                  <span className={`text-[13px] leading-relaxed ${plan.popular ? "text-black/70" : "text-[var(--text-secondary)] opacity-60"}`}>{f}</span>
                </div>
              ))}
            </div>
            <button
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[12px] transition-all hover:opacity-90 ${
                plan.popular
                  ? "bg-black text-[var(--accent)]"
                  : "bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] hover:bg-[var(--accent)]/20"
              }`}
            >
              Order Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

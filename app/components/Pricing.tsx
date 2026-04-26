"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

const plans = (t: any) => [
  {
    label: t.hour_label,
    price: "$15",
    tagline: t.hour_tagline,
    popular: false,
    features: [
      "Pipeline architecture advice",
      "Code review with written notes",
      "Data quality assessment",
      "2 weeks follow-up support",
    ],
    button: "Start Here"
  },
  {
    label: t.day_label,
    price: "$60",
    tagline: t.day_tagline,
    popular: true,
    badge: "Full Build",
    features: [
      "End-to-end project delivery",
      "Bias detection audit with report",
      "Data governance and RBAC setup",
      "Architecture documentation",
      "1 month support & iterations",
    ],
    button: "Let's Build"
  },
];

export default function Pricing() {
  const { language } = useLanguage();
  const t = translations[language].pricing;

  return (
    <div className="w-full">
      <p className="text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">{t.label}</p>
      <h2 className="text-[28px] font-black text-[var(--text-primary)] mb-4">{t.title}</h2>
      <p className="text-[14px] text-[var(--text-secondary)] opacity-50 mb-10">{t.subheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[720px]">
        {plans(t).map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-2xl flex flex-col ${
              plan.popular
                ? "bg-[#00e87a] text-black"
                : "bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)]"
            }`}
          >
            {plan.popular && plan.badge && (
              <span className="absolute top-5 right-5 px-3 py-1 bg-black/10 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                {plan.badge}
              </span>
            )}
            <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${plan.popular ? "text-black/60" : "text-[var(--text-secondary)] opacity-50"}`}>
              {plan.label}
            </p>
            <p className={`text-[56px] font-black leading-none mb-2 tracking-tight ${plan.popular ? "text-black" : "text-[var(--text-primary)]"}`}>
              {plan.price}
            </p>
            <p className={`text-[12px] font-bold mb-8 ${plan.popular ? "text-black/60" : "text-[var(--text-secondary)] opacity-40"}`}>
              {plan.tagline}
            </p>
            <div className="space-y-4 flex-1 mb-8">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-start gap-3">
                  <Check size={15} className={`mt-0.5 shrink-0 ${plan.popular ? "text-black" : "text-[#00e87a]"}`} />
                  <span className={`text-[13px] font-medium leading-relaxed ${plan.popular ? "text-black/80" : "text-[var(--text-secondary)] opacity-70"}`}>{f}</span>
                </div>
              ))}
            </div>
            <button
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[12px] transition-all hover:opacity-90 ${
                plan.popular
                  ? "bg-black text-[#00e87a]"
                  : "bg-[#00e87a]/10 border border-[#00e87a]/30 text-[#00e87a] hover:bg-[#00e87a]/20"
              }`}
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


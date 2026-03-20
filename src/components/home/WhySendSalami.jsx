/**
 * @file WhySendSalami.jsx
 * @description A feature highlight section explaining the benefits of using digital Salami over traditional methods.
 */

"use client";

import { motion } from "framer-motion";
import {
  Zap,
  HeartHandshake,
  ShieldCheck,
  Clock,
  Smartphone,
  Gift,
} from "lucide-react";

// --- Configuration Data ---

const features = [
  {
    icon: Zap,
    title: "Instant Propagation",
    desc: "No physical envelopes or logistical delays. Your Salami reaches its destination in seconds, across any distance.",
  },
  {
    icon: HeartHandshake,
    title: "Emotional Resonance",
    desc: "Incorporate a personalized message that actually sounds like you—not a cold, generic template.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted Security",
    desc: "Every transaction is fortified with end-to-end encryption. Your blessings travel through a secure, private corridor.",
  },
  {
    icon: Clock,
    title: "Temporal Freedom",
    desc: "3 AM or 3 PM—Eid doesn't adhere to business hours, and neither should your generosity.",
  },
  {
    icon: Smartphone,
    title: "Cross-Device Utility",
    desc: "Responsive and accessible on any screen. No specialized apps required to receive your gift.",
  },
  {
    icon: Gift,
    title: "Premium Experience",
    desc: "Digital doesn't mean impersonal. When executed correctly, a digital gift carries significant weight.",
  },
];

// --- Animation Variants ---

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: i * 0.08, 
      ease: [0.22, 1, 0.36, 1] 
    },
  }),
};

export default function WhySendSalami() {
  return (
    <section className="w-full py-20 md:py-28 bg-page">
      <div className="max-w-[1280px] w-[91.666667%] mx-auto">
        
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-5 text-theme-primary">
            Evolved Traditions.
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto text-theme-muted font-medium leading-relaxed">
            The heart of the custom remains unchanged, while the delivery 
            mechanism reaches modern efficiency.
          </p>
        </motion.div>

        {/* --- Feature Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "circOut" } }}
                className="group relative rounded-[2rem] p-8 border border-theme bg-surface shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-default"
              >
                {/* Visual hover highlight */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Aesthetic Icon Wrapper */}
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-brand-subtle shadow-inner">
                  <Icon
                    size={22}
                    strokeWidth={2.5}
                    className="text-brand-theme group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Text Content Hierarchy */}
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-3 text-theme-primary tracking-tight group-hover:text-brand-theme transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-theme-muted font-medium opacity-90">
                    {f.desc}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

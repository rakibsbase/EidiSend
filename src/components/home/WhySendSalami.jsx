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

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    desc: "No envelope, no delays. Your Salami lands in seconds — whether they're next door or across the globe.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Touch",
    desc: "Add a heartfelt note that actually sounds like you. Not a template — a message they'll remember.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transfers",
    desc: "Every transaction is encrypted end-to-end. Your blessings travel safely, every single time.",
  },
  {
    icon: Clock,
    title: "Send Anytime",
    desc: "3AM or 3PM — Eid doesn't wait for business hours. Neither should your Salami.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    desc: "Phone, tablet, laptop — no app download needed. If they have a screen, they can receive it.",
  },
  {
    icon: Gift,
    title: "It Feels Like a Gift",
    desc: "Because it is. Digital doesn't mean impersonal — done right, it hits harder than cash in an envelope.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09, ease: "easeOut" },
  }),
};

export default function WhySendSalami() {
  return (
    <section className="w-full py-16 md:py-24 bg-page">
      <div className="max-w-[91.666667%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-theme-primary">
            Why send digital Salami?
          </h2>
          <p className="text-base max-w-md mx-auto text-theme-muted">
            The tradition stays. The hassle doesn't.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-6 border shadow-sm hover:shadow-md hover:shadow-emerald-100/60 dark:hover:shadow-emerald-900/20 transition-shadow duration-200 cursor-default bg-surface border-theme"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-transparent dark:from-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                {/* Icon */}
                <div className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5 bg-brand-subtle">
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className=" text-brand-theme"
                  />
                </div>

                {/* Text */}
                <h3 className="relative text-base font-bold mb-2 text-theme-primary">
                  {f.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-theme-muted">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

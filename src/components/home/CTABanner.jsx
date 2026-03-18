"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="w-full py-10 md:py-14 bg-page">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-[91.666667%] mx-auto overflow-hidden rounded-2xl px-8 py-14 md:py-16 text-center"
        style={{
          background:
            "linear-gradient(135deg, #0d4a2a 0%, #134e35 50%, #0a3d22 100%)",
        }}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Glow top center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-emerald-300/80 text-sm font-medium tracking-wide mb-3"
          >
            Don't let distance get in the way
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4"
          >
            Someone is waiting <br className="hidden sm:block" />
            for your Salami.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="text-emerald-100/60 text-base leading-relaxed mb-10"
          >
            It takes 30 seconds. The smile it brings lasts the whole Eid.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link
              href="/send"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-white hover:bg-emerald-50 active:scale-95 text-emerald-800 text-sm font-bold shadow-lg shadow-black/20 transition-all duration-150"
            >
              <DollarSign size={16} strokeWidth={2.5} />
              Send Salami Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

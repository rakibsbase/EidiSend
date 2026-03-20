/**
 * @file CTABanner.jsx
 * @description A high-impact Call-to-Action section used to drive traffic to the 'Send Salami' flow.
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="w-full py-12 md:py-20 bg-page relative overflow-hidden">
      
      {/* Container with premium visual styling */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[1280px] w-[91.666667%] mx-auto overflow-hidden rounded-[2.5rem] px-8 py-16 md:py-24 text-center shadow-2xl shadow-emerald-950/20 mt-1"
        style={{
          background: "linear-gradient(145deg, #064e3b 0%, #065f46 50%, #047857 100%)",
        }}
      >
        {/* Subtle geometric dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dynamic environmental glow lighting */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[4000ms]" />
        <div className="absolute -bottom-24 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Content Hierarchy */}
        <div className="relative z-10 max-w-2xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-8"
          >
            <p className="text-emerald-300 text-[11px] font-black uppercase tracking-[0.2em]">
              Bridging the Distance
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            Someone is waiting <br className="hidden sm:block" />
            for your Salami.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-emerald-50/70 text-base md:text-lg leading-relaxed mb-12 font-medium"
          >
            It takes exactly 30 seconds to send digital Eid blessings. 
            The smile it brings lasts for the entire year.
          </motion.p>

          {/* Action Trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <Link
              href="/send"
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-emerald-900 text-sm font-black shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Button interaction overlay */}
              <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <span className="relative z-10 flex items-center gap-2.5">
                <DollarSign size={18} strokeWidth={3} className="group-hover:translate-y-[-1px] transition-transform" />
                Initiate Salami Transfer
              </span>
            </Link>
          </motion.div>

          {/* Secondary micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white text-[10px] uppercase font-black tracking-widest mt-8 pointer-events-none"
          >
            Secure • Fast • Heartfelt
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

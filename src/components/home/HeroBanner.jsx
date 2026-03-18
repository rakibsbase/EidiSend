"use client";

import { useState } from "react";
import { DollarSign, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const PARTICLES = [
  { emoji: "🌙", size: 22, left: 2, delay: 0, duration: 10 },
  { emoji: "⭐", size: 14, left: 8, delay: 2.5, duration: 13 },
  { emoji: "✨", size: 16, left: 15, delay: 5, duration: 11 },
  { emoji: "🌙", size: 18, left: 22, delay: 1, duration: 14 },
  { emoji: "⭐", size: 12, left: 29, delay: 7, duration: 12 },
  { emoji: "✨", size: 20, left: 36, delay: 3.5, duration: 15 },
  { emoji: "🌙", size: 14, left: 43, delay: 6, duration: 10 },
  { emoji: "⭐", size: 18, left: 50, delay: 0.8, duration: 13 },
  { emoji: "✨", size: 12, left: 57, delay: 4, duration: 11 },
  { emoji: "🌙", size: 20, left: 64, delay: 8, duration: 14 },
  { emoji: "⭐", size: 16, left: 71, delay: 2, duration: 12 },
  { emoji: "✨", size: 14, left: 78, delay: 5.5, duration: 15 },
  { emoji: "🌙", size: 18, left: 84, delay: 1.5, duration: 10 },
  { emoji: "⭐", size: 20, left: 90, delay: 3, duration: 13 },
  { emoji: "✨", size: 16, left: 96, delay: 6.5, duration: 11 },
  { emoji: "🌙", size: 12, left: 5, delay: 9, duration: 14 },
  { emoji: "⭐", size: 18, left: 18, delay: 7.5, duration: 12 },
  { emoji: "✨", size: 22, left: 47, delay: 4.5, duration: 15 },
  { emoji: "🌙", size: 14, left: 73, delay: 10, duration: 10 },
  { emoji: "⭐", size: 16, left: 93, delay: 8.5, duration: 13 },
];

function FallingParticle({ emoji, size, delay, left, duration }) {
  return (
    <motion.span
      aria-hidden
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: "115vh",
        opacity: [0, 0.7, 0.7, 0],
        rotate: [0, 15, -10, 8, 0],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "linear",
        opacity: { times: [0, 0.08, 0.88, 1], duration },
        rotate: { times: [0, 0.25, 0.5, 0.75, 1], duration, repeat: Infinity },
      }}
      className="absolute pointer-events-none select-none"
      style={{ left: `${left}%`, top: 0, fontSize: size }}
    >
      {emoji}
    </motion.span>
  );
}

export default function HeroBanner() {
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    setSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Eid Salami",
          text: "Send digital Eid Salami to your loved ones this Eid!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
    } finally {
      setTimeout(() => setSharing(false), 1500);
    }
  };

  return (
    <section className="relative w-full overflow-hidden min-h-[520px] md:min-h-[620px] flex items-center">
      {/* ── Layer 1: Full background image ── */}
      <div className="absolute inset-0">
        <Image
          src="/eid_salami_bangladesh.webp"
          alt="Eid Salami Bangladesh"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* ── Layer 2: Overlay — left-heavy on desktop, uniform on mobile ── */}
      <div className="absolute inset-0 bg-[#f0faf4]/70 dark:bg-[#071210]/75 md:hidden" />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(240,250,244,0.92) 0%, rgba(240,250,244,0.85) 35%, rgba(240,250,244,0.45) 60%, rgba(240,250,244,0.08) 100%)",
        }}
      />
      {/* dark mode desktop overlay */}
      <div
        className="absolute inset-0 hidden dark:md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(7,18,16,0.92) 0%, rgba(7,18,16,0.85) 35%, rgba(7,18,16,0.45) 60%, rgba(7,18,16,0.08) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#f0faf4]/60 dark:from-[#071210]/60 via-transparent to-transparent" />

      {/* ── Layer 3: Falling particles ── */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <FallingParticle key={i} {...p} />
        ))}
      </div>

      {/* ── Layer 4: Content — sits on top of everything ── */}
      <div className="relative z-20 w-full max-w-[91.666667%] mx-auto py-20 md:py-28 lg:py-32">
        {/* Mobile: centered | Desktop: left-aligned, max half-width */}
        <div className="w-full md:max-w-[48%] text-center md:text-left mx-auto md:mx-0">
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-sm font-medium mb-4 tracking-wide text-brand-theme"
          >
            Because love travels faster than cash 💸
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.07] tracking-tight mb-5 text-theme-primary"
          >
            Eid Mubarak
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base md:text-lg leading-relaxed mb-8 text-theme-secondary"
          >
            Send a digital gift of joy to your loved ones this Eid. The fastest,
            most secure way to share your blessings.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col md:flex-row items-center md:items-start md:justify-start justify-center gap-2.5 w-full md:w-auto"
          >
            <Link
              href="/send"
              className="inline-flex items-center justify-center gap-2 min-w-[160px] px-7 py-2.5 md:py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all duration-150"
            >
              <DollarSign size={15} strokeWidth={2.5} />
              Send Salami
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 min-w-[160px] px-7 py-2.5 md:py-3.5 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 backdrop-blur-sm active:scale-95 text-sm font-semibold border border-white/60 dark:border-white/10 shadow-sm transition-all duration-150 text-slate-900 dark:text-slate-200 cursor-pointer"
            >
              <Share2 size={14} strokeWidth={2} />
              {sharing ? "Link Copied!" : "Share"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

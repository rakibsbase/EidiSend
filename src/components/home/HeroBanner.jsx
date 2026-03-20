/**
 * @file HeroBanner.jsx
 * @description The primary hero section of the EidiSend homepage. 
 * Features dynamic falling particles, a thematic background image, and main CTAs.
 */

"use client";

import { useState } from "react";
import { DollarSign, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useThemeMode } from "@/hooks/useThemeMode";

// --- Configuration ---

/**
 * Particle configuration for the festive falling effect.
 * Each object defines the visual properties and animation timing for an emoji.
 */
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

/**
 * FallingParticle Component
 * Renders a single emoji that falls from the top of the screen to the bottom.
 */
function FallingParticle({ emoji, size, delay, left, duration }) {
  return (
    <motion.span
      aria-hidden="true"
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
      className="absolute pointer-events-none select-none z-10"
      style={{ left: `${left}%`, top: 0, fontSize: size }}
    >
      {emoji}
    </motion.span>
  );
}

export default function HeroBanner() {
  const [sharing, setSharing] = useState(false);
  const { resolvedTheme } = useThemeMode();
  const isDark = resolvedTheme === "dark";

  /**
   * handleShare
   * Triggers the Web Share API or copies the link to the clipboard.
   */
  const handleShare = async () => {
    setSharing(true);
    const shareData = {
      title: "EidiSend - Send Digital Eid Salami",
      text: "Share the joy this Eid by sending digital Salami to your loved ones!",
      url: typeof window !== "undefined" ? window.location.origin : "",
    };

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch (err) {
      console.error("Sharing failed:", err);
    } finally {
      // Show "Copied" state briefly
      setTimeout(() => setSharing(false), 1500);
    }
  };

  return (
    <section className="relative w-full overflow-hidden min-h-[520px] md:min-h-[620px] flex items-center bg-surface">
      
      {/* --- Layer 1: Background Imagery --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/eid_salami_bangladesh.webp"
          alt="Traditional Eid celebrations in Bangladesh featuring families sharing Salami"
          fill
          priority
          className="object-cover object-center grayscale-[20%] opacity-90 transition-opacity duration-700"
        />
      </div>

      {/* --- Layer 2: Theme-aware Overlays --- */}
      {/* Mobile uniform tint */}
      <div className="absolute inset-0 bg-[#f0faf4]/80 dark:bg-[#071210]/82 md:hidden z-[1]" />

      {/* Desktop gradient mask */}
      <div
        className="absolute inset-0 hidden md:block z-[1]"
        style={{
          background: isDark
            ? "linear-gradient(to right, rgba(7,18,16,0.95) 0%, rgba(7,18,16,0.85) 30%, rgba(7,18,16,0.5) 50%, rgba(7,18,16,0.0) 100%)"
            : "linear-gradient(to right, rgba(240,250,244,0.85) 0%, rgba(240,250,244,0.7) 30%, rgba(240,250,244,0.3) 50%, rgba(240,250,244,0.0) 100%)",
        }}
      />

      {/* --- Layer 3: Particle Effects --- */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <FallingParticle key={i} {...p} />
        ))}
      </div>

      {/* --- Layer 4: Foreground Content --- */}
      <div className="relative z-20 w-full max-w-[91.666667%] mx-auto py-20 md:py-28 lg:py-32">
        <div className="w-full md:max-w-[50%] text-center md:text-left mx-auto md:mx-0">
          
          {/* Animated Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-sm text-emerald-600 dark:text-emerald-400 font-bold mb-4 tracking-widest uppercase"
          >
            Digital Tradition, Traditional Love 💸
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-theme-primary leading-[1.05] tracking-tight mb-6"
          >
            Eid Mubarak
          </motion.h1>

          {/* Descriptive Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base md:text-lg text-theme-secondary leading-relaxed mb-10 max-w-lg"
          >
            Make this Eid unforgettable for your friends and family. Send a digital gift of joy—the fastest, 
            most secure way to share your blessings across Bangladesh.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4"
          >
            <Link
              href="/send"
              className="inline-flex items-center justify-center gap-2 min-w-[180px] px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all duration-200 cursor-pointer"
            >
              <DollarSign size={16} strokeWidth={2.5} />
              Send Salami now
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 min-w-[180px] px-8 py-4 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 backdrop-blur-md active:scale-95 text-theme-primary text-sm font-bold border border-white/60 dark:border-white/10 shadow-sm transition-all duration-200 cursor-pointer"
            >
              <Share2 size={16} strokeWidth={2} />
              {sharing ? "Link Copied!" : "Spread the Joy"}
            </button>
          </motion.div>

        </div>
      </div>

    </section>
  );
}

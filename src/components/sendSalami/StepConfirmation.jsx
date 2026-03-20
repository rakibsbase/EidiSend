/**
 * @file StepConfirmation.jsx
 * @description Final success screen with celebratory animations and sharing options.
 */

"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Share2, Home, Heart } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

// --- Configuration ---
const THANKS_MESSAGES = [
  "You're a legend! Your Salami is on its way. 🌙",
  "That was smooth. The best Eid gift ever! 💸",
  "Respect +100. Someone is going to be very happy! 🙌",
  "Eid Mubark! Your generosity is unmatchable. ✨",
  "Dua incoming! You just made someone's Eid. 🤲",
];

export default function StepConfirmation({ data }) {
  // --- Animation Hook ---
  useEffect(() => {
    const colors = ["#10b981", "#f59e0b", "#34d399"];

    // Initial center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    // Secondary delayed side bursts for "wow" factor
    const t = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });

      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 400);

    return () => clearTimeout(t);
  }, []);

  /**
   * Memoized message selection to prevent hydration mismatches 
   * and ensure the message stays stable during client-side re-renders.
   */
  const message = useMemo(() => {
    return THANKS_MESSAGES[Math.floor(Math.random() * THANKS_MESSAGES.length)];
  }, []);

  /**
   * Invokes the native Web Share API or falls back to clipboard.
   */
  const handleShare = async () => {
    const shareText = `I just sent some Eid Salami to ${data.name || "a lucky one"}! Send yours now on EidiSend. 🌙💸`;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Eid Salami Sent!",
          text: shareText,
          url: window.location.origin,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.origin}`);
        alert("Link copied to clipboard! Share it with your friends.");
      }
    } catch (err) {
      console.error("Share interaction failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      
      {/* --- Success Badge --- */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 18,
          delay: 0.15,
        }}
        className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-500/20"
      >
        <span className="text-4xl text-white">🎉</span>
      </motion.div>

      {/* --- Success Message Content --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 mb-10 text-theme-primary"
      >
        <h2 className="text-2xl font-extrabold tracking-tight">
          Submission Successful!
        </h2>
        <p className="text-base text-theme-secondary italic max-w-xs mx-auto leading-relaxed">
          &quot;{message}&quot;
        </p>
        
        {/* Attribution Chip */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-theme-subtle bg-page px-4 py-2 rounded-full w-fit mx-auto border border-theme">
          <Heart size={12} className="text-pink-500 fill-pink-500" />
          Thank you, {data.name || "friend"}
        </div>
      </motion.div>

      {/* --- Call to Action Buttons --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-3 w-full"
      >
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-subtle hover:bg-brand-subtle/80 text-brand-theme border border-theme text-sm font-bold shadow-sm transition-all duration-150 cursor-pointer active:scale-95"
        >
          <Share2 size={16} />
          Share with friends
        </button>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-surface border border-theme text-theme-primary text-sm font-bold shadow-sm hover:bg-page transition-all duration-150 cursor-pointer active:scale-95"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </motion.div>

    </div>
  );
}

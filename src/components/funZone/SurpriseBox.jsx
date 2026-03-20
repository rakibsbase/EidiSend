/**
 * @file SurpriseBox.jsx
 * @description Interactive component that reveals a randomized humorous Eid message via a shaking box.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Configuration ---
const surprises = [
  {
    emoji: "🤲",
    text: "Send ৳500 to unlock a special blessing from the heart!",
    sub: "The receiver gets money. You get dua. Everyone wins.",
  },
  {
    emoji: "💸",
    text: "Hidden treasure unlocked: someone is waiting for your Salami.",
    sub: "It was inside you all along. Now send it.",
  },
  {
    emoji: "🌙",
    text: "The angels noted your hesitation. Still waiting.",
    sub: "Eid Salami pending since morning. Interesting choice.",
  },
  {
    emoji: "👴",
    text: "Your buddy's dua is loading... 47% complete.",
    sub: "Progress resumes after you send Salami.",
  },
  {
    emoji: "🎁",
    text: "You've been selected to make someone's Eid.",
    sub: "This offer expires at midnight. No pressure.",
  },
  {
    emoji: "📦",
    text: "You opened the box. Inside was responsibility.",
    sub: "Specifically, the responsibility to send Eid Salami.",
  },
  {
    emoji: "🔮",
    text: "Fortune says: the one who sends first, smiles first.",
    sub: "The universe has spoken. Your move.",
  },
  {
    emoji: "😇",
    text: "A blessing has been reserved in your name.",
    sub: "Terms & conditions: must send Salami to claim.",
  },
];

export default function SurpriseBox() {
  // --- Local State ---
  const [revealed, setRevealed] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [key, setKey] = useState(0);

  /**
   * Triggers the shaking animation and selects a new random message.
   */
  const reveal = () => {
    if (shaking) return;
    setShaking(true);

    // Artificial delay to let the shaking animation play out
    setTimeout(() => {
      let next;
      do {
        next = Math.floor(Math.random() * surprises.length);
      } while (next === revealed);

      setRevealed(next);
      setKey((k) => k + 1); // For AnimatePresence keying
      setShaking(false);
    }, 520);
  };

  const selectedSurprise = revealed !== null ? surprises[revealed] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45 }}
      className="w-full rounded-2xl border shadow-sm overflow-hidden bg-surface border-theme"
    >
      <div className="flex flex-col md:flex-row items-center gap-6 px-6 py-8 md:px-10 md:py-12">
        
        {/* --- Left Column: Interactive Box & Trigger --- */}
        <div className="flex flex-col items-center justify-center gap-4 w-full md:w-auto shrink-0">
          <motion.button
            onClick={reveal}
            animate={
              shaking
                ? { rotate: [-8, 8, -6, 6, -3, 3, 0], scale: [1, 1.1, 1] }
                : { rotate: 0 }
            }
            transition={{ duration: 0.52 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="text-7xl cursor-pointer select-none focus:outline-none leading-none border-none bg-transparent"
            aria-label="Shake surprise box"
          >
            {revealed !== null ? "📦" : "🎁"}
          </motion.button>

          <button
            onClick={reveal}
            disabled={shaking}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-all duration-150 shadow-sm shadow-emerald-600/20 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            {revealed === null ? "Open the box" : "Shake again"}
          </button>
        </div>

        {/* Adaptive Divider */}
        <div className="hidden md:block w-px self-stretch bg-brand-subtle" />
        <div className="block md:hidden w-full h-px bg-brand-subtle" />

        {/* --- Right Column: Content Display --- */}
        <div className="flex-1 flex flex-col items-center justify-center text-center w-full gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-theme text-center">
            Surprise Box
          </p>
          <h3 className="text-xl font-extrabold text-theme-primary text-center tracking-tight">
            What&apos;s inside? Click to find out.
          </h3>

          <div className="min-h-[72px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              {selectedSurprise ? (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <p className="text-base font-bold text-theme-secondary text-center leading-relaxed">
                    {selectedSurprise.emoji} &quot;{selectedSurprise.text}&quot;
                  </p>
                  <p className="text-sm italic text-theme-subtle text-center">
                    {selectedSurprise.sub}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm italic text-theme-subtle text-center"
                >
                  Your surprise is one tap away...
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

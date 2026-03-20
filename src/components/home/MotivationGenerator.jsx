/**
 * @file MotivationGenerator.jsx
 * @description A playful interactive tool that provides humorous reasons (motivation) to send Eid Salami.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";

// --- Configuration Data ---

const quotes = [
  { text: "Your uncle gets a car every Eid. The least you can do is send Salami.", emoji: "🚗" },
  { text: "Eid only comes twice a year. Your excuses come daily. Send it.", emoji: "📲" },
  { text: "The wifi password was shared. The Salami wasn't. Fix that.", emoji: "😮‍💨" },
  { text: "You remembered her birthday. You forgot Eid Salami. Bold move.", emoji: "💀" },
  { text: "Three missed calls from Nanu. One unopened app. You know what to do.", emoji: "📞" },
  { text: "It's not about the money. It's about the respect. But also the money.", emoji: "💸" },
  { text: "Your cousins already sent theirs. Just saying.", emoji: "👀" },
  { text: "Eid prayers: done. Semai: eaten. Salami: still pending. Bro.", emoji: "🍜" },
  { text: "The elders won't ask twice. But you'll feel it for a whole year.", emoji: "🤐" },
  { text: "Some bonds are kept with time. Others with a timely Salami.", emoji: "🤝" },
  { text: "She video-called from abroad just to say Eid Mubarak. What are you doing?", emoji: "🌍" },
  { text: "Even your phone reminds you of things. Let this be one of them.", emoji: "🔔" },
  { text: "Distance is a reason, not an excuse. Send it digitally.", emoji: "✈️" },
  { text: "Dua is free. Salami isn't. That's exactly why it matters.", emoji: "🤲" },
  { text: "The best time to send Salami was this morning. Second best? Right now.", emoji: "⏱️" },
];

export default function MotivationGenerator() {
  // --- Local State ---
  const [current, setCurrent] = useState(null);
  const [key, setKey] = useState(0);
  const [spinning, setSpinning] = useState(false);

  /**
   * Selects a random quote from the configuration, avoiding duplicates.
   */
  const handleShuffle = () => {
    if (spinning) return;
    setSpinning(true);
    
    // Artificial vibration/spinning effect duration
    setTimeout(() => {
      let next;
      // Ensure we don't pick the same quote repeatedly if possible
      do { 
        next = Math.floor(Math.random() * quotes.length); 
      } while (next === current && quotes.length > 1);
      
      setCurrent(next);
      setKey((k) => k + 1);
      setSpinning(false);
    }, 280);
  };

  const activeQuote = current !== null ? quotes[current] : null;

  return (
    <section className="w-full py-12 md:py-20 bg-page">
      
      {/* Dynamic Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="max-w-[1280px] w-[91.666667%] mx-auto rounded-3xl border border-theme shadow-xl shadow-black/5 px-8 sm:px-14 py-12 md:py-16 flex flex-col items-center text-center bg-surface relative overflow-hidden"
      >
        {/* Subtle background flair */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-theme/10 blur-3xl rounded-full" />

        {/* Branding/Category Indicator */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 text-2xl bg-brand-subtle shadow-inner">
          💡
        </div>

        {/* Messaging Section */}
        <h3 className="text-xl md:text-2xl font-black mb-3 text-theme-primary tracking-tight">
          Seeking a valid reason to send Salami?
        </h3>
        <p className="text-sm md:text-base mb-10 text-theme-subtle font-medium">
          We&apos;ve curated these insights to save you the mental energy.
        </p>

        {/* Dynamic Display Area */}
        <div className="w-full max-w-2xl min-h-[100px] flex items-center justify-center mb-12 px-2">
          <AnimatePresence mode="wait">
            {activeQuote ? (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
                className="text-lg sm:text-2xl md:text-3xl font-black leading-[1.3] italic text-theme-primary px-4"
              >
                &ldquo;{activeQuote.text}&rdquo; <span className="not-italic inline-block ml-1">{activeQuote.emoji}</span>
              </motion.p>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-bold text-theme-subtle uppercase tracking-widest animate-pulse"
              >
                Your divine motivation is pending...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Trigger */}
        <motion.button
          onClick={handleShuffle}
          disabled={spinning}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black shadow-lg shadow-emerald-600/30 transition-all duration-300 cursor-pointer overflow-hidden disabled:opacity-80"
        >
          {/* Active shine effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <motion.div
            animate={spinning ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="relative z-10"
          >
            <Shuffle size={16} strokeWidth={3} className="text-emerald-50" />
          </motion.div>
          
          <span className="relative z-10">
            {activeQuote ? "Manifest Another Insight" : "Acquire Divine Motivation"}
          </span>
        </motion.button>

        {/* Contextual meta-info */}
        <div className="mt-8 flex items-center gap-2 opacity-40">
           <div className="w-1 h-1 rounded-full bg-theme-muted" />
           <p className="text-[10px] font-black uppercase tracking-widest text-theme-muted">
             Randomized Wisdom Engine v1.0
           </p>
           <div className="w-1 h-1 rounded-full bg-theme-muted" />
        </div>

      </motion.div>
    </section>
  );
}
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const loadingLines = [
  "Counting Salami... please hold. 💸",
  "Bribing the server with Eid sweets...",
  "Almost there. Like Eid Salami from a distant uncle.",
  "Loading blessings, one byte at a time. 🤲",
  "The dev is also waiting. Send him Salami to speed this up.",
];

export default function Loading() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((i) => (i + 1) % loadingLines.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 bg-[#f0faf4] dark:bg-[#071210]">

      {/* Spinner */}
      <div className="relative w-12 h-12 mb-8">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="block w-12 h-12 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, transparent 70%, #10b981 100%)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))",
          }}
        />
      </div>

      {/* Heading */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-base font-bold text-slate-800 dark:text-white mb-3"
      >
        Just a moment...
      </motion.p>

      {/* Rotating funny line */}
      <div className="h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, y: 6, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
            transition={{ duration: 0.3 }}
            className="text-sm text-slate-400 dark:text-slate-500 italic text-center"
          >
            {loadingLines[lineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

    </div>
  );
}
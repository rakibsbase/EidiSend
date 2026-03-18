"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Home, DollarSign } from "lucide-react";

const funnyLines = [
  "The page crashed harder than my bank account before Eid.",
  "Even the error is broke. Typical developer life.",
  "This page disappeared like Eid Salami in a joint family.",
  "Something broke. The developer needs Salami to fix it.",
  "404 feelings. The dev forgot to eat sehri.",
];

export default function Error({ error, reset }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      reset();
    }, 600);
  };

  const nextLine = () => {
    setLineIndex((i) => (i + 1) % funnyLines.length);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-page">
      <div className="w-full max-w-md text-center">
        {/* Emoji with wobble */}
        <motion.div
          animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
          className="text-6xl mb-6 select-none"
        >
          😵‍💫
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-theme-primary"
        >
          Yikes. Something broke.
        </motion.h1>

        {/* Funny rotating line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mb-2"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{ duration: 0.25 }}
              className="text-sm italic leading-relaxed cursor-pointer text-theme-muted"
              onClick={nextLine}
              title="Click for another excuse"
            >
              "{funnyLines[lineIndex]}"
            </motion.p>
          </AnimatePresence>
          <p className="text-xs mt-1 text-theme-secondary">
            (tap the quote for more developer excuses)
          </p>
        </motion.div>

        {/* The actual plea section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="my-7 px-5 py-5 rounded-2xl border shadow-sm bg-surface border-theme"
        >
          <p className="text-sm leading-relaxed text-theme-secondary">
            The developer who built this is a broke student surviving on instant
            noodles. A small Salami might just motivate him to fix this bug
            faster. 🍜
          </p>
          <Link
            href="/send"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all duration-150"
          >
            <DollarSign size={13} strokeWidth={2.5} />
            Send the dev some Salami 😅
          </Link>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="flex items-center justify-center gap-3"
        >
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold transition-all duration-150 shadow-sm shadow-emerald-600/25"
          >
            <motion.span
              animate={spinning ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="inline-block"
            >
              <RefreshCw size={15} />
            </motion.span>
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold active:scale-95 transition-all duration-150 bg-surface text-theme-secondary border-theme hover:bg-brand-subtle"
          >
            <Home size={15} />
            Go home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

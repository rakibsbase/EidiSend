"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, DollarSign } from "lucide-react";

const funnyLines = [
  "This page is as missing as your Eid Salami from a rich uncle.",
  "404. The page left without saying Eid Mubarak.",
  "Gone. Like the last piece of semai at the family table.",
  "This URL doesn't exist. Neither does my sleep schedule during Eid.",
  "The page you want is out giving Salami to everyone except you.",
];

export default function NotFound() {
  const [lineIndex, setLineIndex] = useState(0);

  const nextLine = () => setLineIndex((i) => (i + 1) % funnyLines.length);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-[#f0faf4] dark:bg-[#071210]">
      <div className="w-full max-w-md text-center">

        {/* 404 big number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-4 select-none"
        >
          <span
            className="text-[7rem] sm:text-[9rem] font-black leading-none tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 40%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </span>
          {/* floating emoji */}
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 sm:right-4 text-4xl"
          >
            🫠
          </motion.span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3"
        >
          Nothing to see here.
        </motion.h1>

        {/* Rotating funny line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mb-2"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{ duration: 0.25 }}
              className="text-sm text-slate-500 dark:text-slate-400 italic leading-relaxed cursor-pointer"
              onClick={nextLine}
              title="Click for more"
            >
              "{funnyLines[lineIndex]}"
            </motion.p>
          </AnimatePresence>
          <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
            (tap for more tragic analogies)
          </p>
        </motion.div>

        {/* Plea card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26 }}
          className="my-7 px-5 py-5 rounded-2xl bg-white dark:bg-[#0d1f16] border border-emerald-100 dark:border-emerald-900/30 shadow-sm"
        >
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            While you're lost, the developer is also lost —
            somewhere between fixing bugs and waiting for Eid Salami.
            A little donation goes a long way. 🧑‍💻
          </p>
          <Link
            href="/send"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all duration-150"
          >
            <DollarSign size={13} strokeWidth={2.5} />
            Cheer up the dev with Salami 🫶
          </Link>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.34 }}
          className="flex items-center justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold transition-all duration-150 shadow-sm shadow-emerald-600/25"
          >
            <Home size={15} />
            Take me home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
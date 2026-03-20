/**
 * @file SalamiCalculator.jsx
 * @description A humorous tool to calculate total Salami debt based on recipient count.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Calculates a random humorous Salami result based on person count.
 * @param {number} n - Number of people
 * @returns {object} { amount, msg }
 */
const getResult = (n) => {
  const options = [
    { amount: n * 150, msg: `${n} people × ৳150 = bare minimum respect.` },
    { amount: n * 200, msg: `৳200 each. Less than a biryani. Send it.` },
    { amount: n * 100, msg: `৳100 per person. The budget option. Still counts.` },
    { amount: n * 500, msg: `৳500 per person. Absolute legend behaviour.` },
  ];
  return options[Math.floor(Math.random() * options.length)];
};

export default function SalamiCalculator() {
  // --- State ---
  const [count, setCount] = useState("");
  const [result, setResult] = useState(null);
  const [key, setKey] = useState(0);

  /**
   * Performs the "calculation" and updates the local result state.
   */
  const calculate = () => {
    const n = parseInt(count);
    if (!n || n < 1) return;
    
    // Cap at 999 for UI sanity
    setResult(getResult(Math.min(n, 999)));
    setKey((k) => k + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: 0.06 }}
      className="w-full h-full rounded-2xl border shadow-sm p-7 flex flex-col bg-surface border-theme"
    >
      {/* Icon & Meta Header */}
      <span className="text-3xl mb-4 block text-center">🧮</span>
      <p className="text-xs font-medium uppercase tracking-wider mb-1 text-center text-brand-theme">
        Calculator
      </p>
      <h3 className="text-base font-bold mb-1 text-center text-theme-primary leading-tight">
        Salami Debt Calculator
      </h3>
      <p className="text-xs mb-6 leading-relaxed text-center text-theme-subtle">
        How many people are you supposed to send Salami to this Eid?
      </p>

      {/* --- Main Interaction Box --- */}
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          min={1}
          max={999}
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
            setResult(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && calculate()}
          placeholder="e.g. 12"
          className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border text-sm font-semibold placeholder:text-theme-subtle focus:outline-none ring-offset-background focus:ring-2 focus:ring-emerald-500/20 text-theme-secondary border-theme bg-surface w-full transition-shadow"
        />
        <button
          onClick={calculate}
          disabled={!count || parseInt(count) < 1}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all duration-150 active:scale-95 shrink-0 cursor-pointer shadow-sm"
        >
          Calculate
        </button>
      </div>

      {/* --- Dynamic Result Area --- */}
      <div className="min-h-[72px] flex items-center w-full mt-auto">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="w-full px-4 py-4 rounded-xl border border-theme bg-brand-subtle"
            >
              <p className="text-2xl font-black mb-1 text-brand-theme text-center">
                ৳{result.amount.toLocaleString()}
              </p>
              <p className="text-xs italic text-theme-muted text-center leading-relaxed">
                {result.msg}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs italic text-theme-subtle w-full text-center"
            >
              Enter a number to see your Salami debt 👆
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

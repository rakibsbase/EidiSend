/**
 * @file EidPersonality.jsx
 * @description A cheeky interactive quiz to determine the user's "Eid Personality" based on Salami habits.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

// --- Configuration Data ---

const questions = [
  {
    q: "Holiday morning — what's the first move?",
    options: [
      { text: "Send Salami before Dawn ⚡", score: 4 },
      { text: "Check if mine arrived first 👀", score: 2 },
      { text: "Chat wishes, Salami later 😅", score: 1 },
      { text: "Still sleeping honestly 😴", score: 0 },
    ],
  },
  {
    q: "A relative calls on Eid. You...",
    options: [
      { text: "Already sent, answer with pride 😎", score: 4 },
      { text: "Answer and promise later 🤡", score: 1 },
      { text: "Send first, then call back 💰", score: 3 },
      { text: "Let it ring 👻", score: 0 },
    ],
  },
  {
    q: "Your Salami distribution strategy?",
    options: [
      { text: "More than last year, always 📈", score: 3 },
      { text: "Calculated by love, not math 🤲", score: 4 },
      { text: "Whatever feels right 🤷", score: 2 },
      { text: "Absolute minimum 😬", score: 0 },
    ],
  },
];

const results = [
  {
    range: [0, 3],
    title: "The Ghost 👻",
    desc: "Your Salami is a myth. People have started sending you reminder cards. It's time to break the curse!",
  },
  {
    range: [4, 6],
    title: "The Procrastinator 🐢",
    desc: "You'll send it eventually... after semai, a nap, and maybe by tomorrow morning. Your timing is artistic.",
  },
  {
    range: [7, 9],
    title: "The Reliable One 🤝",
    desc: "The family actually likes you. Salami sent, blessings received, reputation intact. A true professional.",
  },
  {
    range: [10, 12],
    title: "The Salami Legend 👑",
    desc: "You sent it before sunrise. The family group chat is divided between awe and suspicion of your speed.",
  },
];

export default function EidPersonality() {
  // --- Local State ---
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState(null);

  /**
   * Records the user's answer and progresses the quiz.
   */
  const handleAnswer = (score) => {
    if (picked !== null) return;
    setPicked(score);

    // Artificial delay for visual feedback before transition
    setTimeout(() => {
      const newTotal = total + score;
      if (step + 1 >= questions.length) {
        setTotal(newTotal);
        setDone(true);
      } else {
        setTotal(newTotal);
        setStep((s) => s + 1);
      }
      setPicked(null);
    }, 450);
  };

  /**
   * Resets the quiz to the initial state.
   */
  const handleReset = () => {
    setStep(0);
    setTotal(0);
    setDone(false);
    setPicked(null);
  };

  /**
   * Determines the final personality type based on the total score.
   */
  const personality = results.find(
    (r) => total >= r.range[0] && total <= r.range[1]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: 0.12 }}
      className="w-full h-full rounded-2xl border shadow-sm p-7 flex flex-col bg-surface border-theme"
    >
      {/* Branding Header */}
      <span className="text-3xl mb-4 block text-center">🧬</span>
      <p className="text-xs font-bold uppercase tracking-widest mb-1 text-center text-brand-theme">
        Personality Quiz
      </p>
      <h3 className="text-base font-extrabold mb-1 text-center text-theme-primary tracking-tight">
        Discover Your Eid DNA
      </h3>
      <p className="text-[11px] mb-6 text-center text-theme-subtle font-medium">
        3 Quick questions. Brutal honesty. No filters.
      </p>

      {/* --- Quiz State Transitions --- */}
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            {/* Semantic Progress Indicator */}
            <div className="flex gap-2 mb-6 w-full px-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
                    i <= step ? "bg-emerald-500 shadow-sm" : "bg-brand-subtle"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm font-bold mb-6 leading-relaxed text-center text-theme-secondary min-h-[40px] px-2">
              {questions[step].q}
            </p>

            <div className="flex flex-col gap-2.5">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  disabled={picked !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer disabled:cursor-default ${
                    picked === opt.score 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-[0.98]' 
                      : 'border-theme text-theme-secondary hover:border-brand-theme/40 hover:bg-brand-subtle'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-4 mt-auto"
          >
            {/* Final Outcome Card */}
            <div className="px-6 py-6 rounded-2xl border text-center border-theme bg-brand-subtle shadow-inner">
              <p className="text-xs uppercase font-black text-brand-theme mb-2 tracking-widest opacity-80">Final Verdict</p>
              <p className="text-2xl font-black mb-3 text-theme-primary text-center tracking-tight">
                {personality?.title}
              </p>
              <p className="text-xs italic leading-relaxed text-theme-muted text-center font-medium">
                {personality?.desc}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="self-center inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border text-[11px] font-black tracking-wider uppercase transition-all duration-200 text-theme-muted border-theme hover:bg-page hover:text-theme-primary active:scale-95 cursor-pointer shadow-sm"
            >
              <RotateCcw size={14} strokeWidth={2.5} />
              Re-evaluate DNA
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

const questions = [
  {
    q: "Eid morning — first thing you do?",
    options: [
      { text: "Send Salami before Fajr ⚡", score: 4 },
      { text: "Check if mine arrived first 👀", score: 2 },
      { text: "WhatsApp wishes, Salami later 😅", score: 1 },
      { text: "Still sleeping honestly 😴", score: 0 },
    ],
  },
  {
    q: "A relative calls on Eid. You...",
    options: [
      { text: "Already sent, pick up proudly 😎", score: 4 },
      { text: "Pick up and promise later 🤡", score: 1 },
      { text: "Send then call back 💰", score: 3 },
      { text: "Let it ring 👻", score: 0 },
    ],
  },
  {
    q: "Your Salami amount strategy?",
    options: [
      { text: "More than last year, always 📈", score: 3 },
      { text: "Calculated by love, not math 🤲", score: 4 },
      { text: "Whatever feels right 🤷", score: 2 },
      { text: "Minimum possible 😬", score: 0 },
    ],
  },
];

const results = [
  {
    range: [0, 3],
    title: "The Ghost 👻",
    desc: "Your Salami is a myth. People have started sending you reminder cards.",
  },
  {
    range: [4, 6],
    title: "The Procrastinator 🐢",
    desc: "You'll send it after semai. And a nap. Maybe by Asr.",
  },
  {
    range: [7, 9],
    title: "The Reliable One 🤝",
    desc: "Family actually likes you. Salami sent, dua received, rep intact.",
  },
  {
    range: [10, 12],
    title: "The Salami Legend 👑",
    desc: "Sent before Fajr. The family group chat has a thread about you.",
  },
];

export default function EidPersonality() {
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState(null);

  const answer = (score) => {
    if (picked !== null) return;
    setPicked(score);
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
    }, 380);
  };

  const reset = () => {
    setStep(0);
    setTotal(0);
    setDone(false);
    setPicked(null);
  };

  const personality = results.find(
    (r) => total >= r.range[0] && total <= r.range[1],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: 0.12 }}
      className="w-full h-full rounded-2xl border shadow-sm p-7 flex flex-col bg-surface border-theme"
    >
      <span className="text-3xl mb-4 block text-center">🧬</span>
      <p className="text-xs font-medium uppercase tracking-wider mb-1 text-center text-brand-theme">
        Quiz
      </p>
      <h3 className="text-base font-bold mb-1 text-center text-theme-primary">
        What&apos;s Your Eid Personality?
      </h3>
      <p className="text-xs mb-5 text-center text-theme-subtle">
        3 questions. Brutal honesty. No filter.
      </p>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
            className="flex flex-col flex-1"
          >
            {/* Progress dots */}
            <div className="flex gap-1.5 mb-4 w-full">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                    i <= step
                      ? "bg-emerald-500"
                      : "bg-brand-subtle"
                  }`}
                />
              ))}
            </div>

            <p className="text-sm font-semibold mb-4 leading-relaxed text-center text-theme-secondary">
              {questions[step].q}
            </p>

            <div className="flex flex-col gap-2">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answer(opt.score)}
                  disabled={picked !== null}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                    picked === opt.score 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-theme text-theme-secondary hover:border-theme-strong hover:bg-brand-subtle'
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 mt-auto"
          >
            <div className="px-5 py-5 rounded-xl border text-center border-theme bg-brand-subtle">
              <p className="text-xl font-extrabold mb-2 text-theme-primary text-center">
                {personality?.title}
              </p>
              <p className="text-xs italic leading-relaxed text-theme-muted text-center">
                {personality?.desc}
              </p>
            </div>
            <button
              onClick={reset}
              className="self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold transition-all duration-150 text-theme-muted border-theme hover:bg-brand-subtle"
            >
              <RotateCcw size={12} />
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

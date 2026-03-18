"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";

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
  const [current, setCurrent] = useState(null);
  const [key, setKey] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const handleNext = () => {
    if (spinning) return;
    setSpinning(true);
    setTimeout(() => {
      let next;
      do { next = Math.floor(Math.random() * quotes.length); }
      while (next === current);
      setCurrent(next);
      setKey((k) => k + 1);
      setSpinning(false);
    }, 180);
  };

  const q = current !== null ? quotes[current] : null;

  return (
    <section className="w-full py-10 md:py-14 bg-page">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-[91.666667%] mx-auto rounded-2xl border shadow-sm px-6 sm:px-10 py-10 md:py-12 flex flex-col items-center text-center bg-surface border-theme"
      >

        {/* Icon */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 text-xl bg-brand-subtle">
          💬
        </div>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-bold mb-1.5 text-theme-primary">
          Need a reason to send Salami?
        </h2>
        <p className="text-sm mb-8 text-theme-subtle">
          We wrote them so you don't have to think.
        </p>

        {/* Quote area */}
        <div className="w-full max-w-xl min-h-[72px] flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            {q ? (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="text-base sm:text-lg md:text-xl font-medium leading-relaxed italic text-theme-secondary"
              >
                "{q.text}" {q.emoji}
              </motion.p>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm text-theme-subtle"
              >
                Your motivation is one click away...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/25 transition-colors duration-150"
        >
          <motion.span
            animate={spinning ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="inline-block"
          >
            <Shuffle size={15} strokeWidth={2.5} />
          </motion.span>
          {q ? "Give me another one" : "Give me motivation"}
        </motion.button>

      </motion.div>
    </section>
  );
}
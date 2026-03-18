"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronDown } from "lucide-react";

const sections = [
  {
    q: "Do you sell my data?",
    a: "No. Hard no. Never. Your data is not a product. We're an Eid Salami app, not a surveillance company. The only thing we're selling is good vibes and timely blessings.",
  },
  {
    q: "What do you actually collect?",
    a: "Basic stuff — your name, phone number, and transaction info so we can make the app work. We also collect anonymous usage data (like which pages you visit) to make things better. That's it.",
  },
  {
    q: "Who sees my info?",
    a: "Just us, and the payment processors who handle the actual money movement. We don't share with advertisers, third-party marketers, or your nosy cousin who keeps asking why you didn't send Salami last year.",
  },
  {
    q: "How do you keep my money info safe?",
    a: "End-to-end encryption on all transactions. We follow industry-standard security practices. Your financial details are never stored beyond what's needed to complete your transfer.",
  },
  {
    q: "What about cookies? 🍪",
    a: "We use minimal cookies — just enough to keep you logged in and remember your preferences. No tracking cookies, no selling cookie data. You can clear them anytime from your browser.",
  },
  {
    q: "Can I delete my account?",
    a: "Yes, absolutely. Email us at rakibsbase@gmail.com and we'll handle it. No dark patterns, no 47-step deletion flow — just a clean exit if you want one.",
  },
];

function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      className="bg-surface border border-theme rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
      >
        <span className="text-sm font-semibold text-theme-primary group-hover:text-brand-theme transition-colors duration-150">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="shrink-0 text-theme-subtle"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-sm text-theme-muted leading-relaxed border-t border-theme pt-3">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PrivacyPolicyContent() {
  return (
    <main className="min-h-screen bg-page py-14 md:py-20">
      <div className="max-w-[91.666667%] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-subtle mb-5">
            <ShieldCheck size={22} className="text-brand-theme" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-theme-muted max-w-sm mx-auto leading-relaxed">
            The short version: we don't do sketchy things with your data. Here's
            the slightly longer version.
          </p>
          <p className="text-xs text-theme-subtle mt-3">
            Last updated: Eid season, 2026
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {sections.map((item, i) => (
            <AccordionItem key={i} item={item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center text-xs text-theme-subtle mt-10"
        >
          Questions?{" "}
          <a
            href="mailto:rakibsbase@gmail.com"
            className="text-brand-theme hover:underline font-medium"
          >
            rakibsbase@gmail.com
          </a>
        </motion.p>
      </div>
    </main>
  );
}

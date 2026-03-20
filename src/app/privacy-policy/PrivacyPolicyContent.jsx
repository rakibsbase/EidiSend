/**
 * @file PrivacyPolicyContent.jsx
 * @description The content for the Privacy Policy page, presented as an interactive FAQ-style accordion.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronDown } from "lucide-react";

// --- Configuration Data ---

const sections = [
  {
    q: "Do you sell my personal data?",
    a: "No. Hard no. Never. Your data is not a product. We're an Eid Salami app, not a surveillance company. The only thing we're selling is good vibes and timely blessings.",
  },
  {
    q: "What information do you actually collect?",
    a: "Basic stuff — your name, phone number, and transaction info so we can make the app work. We also collect anonymous usage data (like which pages you visit) to make things better. That's it.",
  },
  {
    q: "Who has access to my information?",
    a: "Just us, and the payment processors who handle the actual money movement. We don't share with advertisers, third-party marketers, or your nosy cousin who keeps asking why you didn't send Salami last year.",
  },
  {
    q: "How do you keep my payment info safe?",
    a: "End-to-end encryption on all transactions. We follow industry-standard security practices. Your financial details are never stored beyond what's needed to complete your transfer.",
  },
  {
    q: "What about browser cookies? 🍪",
    a: "We use minimal cookies — just enough to keep you logged in and remember your preferences. No tracking cookies, no selling cookie data. You can clear them anytime from your browser.",
  },
  {
    q: "Can I request account deletion?",
    a: "Yes, absolutely. Email us at rakibsbase@gmail.com and we'll handle it. No dark patterns, no 47-step deletion flow — just a clean exit if you want one.",
  },
];

/**
 * AccordionItem Component
 * Renders a single privacy section that can be expanded or collapsed.
 */
function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.38, delay: index * 0.05 }}
      className="bg-surface border border-theme rounded-2xl overflow-hidden hover:border-theme-strong transition-all duration-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-theme-primary group-hover:text-brand-theme transition-colors leading-tight">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="shrink-0 text-theme-subtle"
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="px-6 pb-6 pt-1 border-t border-theme">
               <p className="text-sm text-theme-muted leading-relaxed pt-4 font-medium">
                 {item.a}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PrivacyPolicyContent() {
  return (
    <main className="min-h-screen bg-page py-16 md:py-24">
      <div className="max-w-[1280px] w-[91.666667%] mx-auto">
        
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-subtle mb-6 shadow-sm">
            <ShieldCheck size={26} className="text-brand-theme" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-theme-primary tracking-tight mb-4">
            Security & Privacy
          </h1>
          <p className="text-base text-theme-muted max-w-md mx-auto leading-relaxed font-medium">
            The Executive Summary: We don&apos;t do sketchy things with your data. 
            Here&apos;s the slightly longer (but still human-readable) version.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold text-theme-subtle uppercase tracking-widest">
              Last Refined: April 2026
            </p>
          </div>
        </motion.div>

        {/* --- FAQ Accordion Content --- */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {sections.map((item, i) => (
            <AccordionItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* --- Support Call-to-Action --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-sm font-medium text-theme-muted mb-4">Still have a concern about your data?</p>
          <a
            href="mailto:rakibsbase@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme bg-surface text-xs font-black text-theme-secondary hover:text-brand-theme hover:border-brand-theme/40 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Consult Infrastructure Support
          </a>
        </motion.div>
      </div>
    </main>
  );
}

/**
 * @file TermsContent.jsx
 * @description The content for the Terms of Service page, presenting legal agreements in a readable accordion format.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, ChevronDown } from "lucide-react";

// --- Configuration Data ---

const sections = [
  {
    q: "Who is eligible to use EidiSend?",
    a: "Anyone with a phone and a loving heart. Minimum age: 13. Maximum drama about sending Salami: zero. By using our platform, you promise you're a real human and not a bot trying to disrupt anyone's festive joy.",
  },
  {
    q: "What exactly is EidiSend?",
    a: "A digital bridge for sending Eid Salami—the most critical financial transaction of the holiday season. We're not a bank. We're a utility aimed at ensuring no recipient is forgotten.",
  },
  {
    q: "What happens once I confirm a transfer?",
    a: "The recipient is notified, the Salami is delivered, and you receive the dua (blessing) you deserve. All transactions are final. If you send to the wrong identifier—that is between you and the recipient.",
  },
  {
    q: "Are there prohibited uses?",
    a: "Yes. EidiSend is for love and blessings only. Fraud, harassment, or any activity that would make your mother disappointed is strictly forbidden. Violations results in a permanent service ban.",
  },
  {
    q: "What if there is a service disruption on Eid?",
    a: "We work tirelessly to keep infrastructure stable, especially during peak holiday hours. If a disruption occurs, it is unintentional and we are likely already working on a fix with high urgency.",
  },
  {
    q: "How are these terms updated?",
    a: "Terms evolve with the platform. Significant changes will be communicated. Continued usage after changes implies agreement to the updated framework. We keep it transparent.",
  },
];

/**
 * AccordionItem Component
 * Renders a single terms section with smooth expansion/collapse logic.
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

export default function TermsContent() {
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
            <ScrollText size={26} className="text-brand-theme" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-theme-primary tracking-tight mb-4">
            Service Framework
          </h1>
          <p className="text-base text-theme-muted max-w-md mx-auto leading-relaxed font-medium">
            We value transparency. Our terms are designed to be human-readable, 
            fair, and focused on maintaining a safe holiday environment.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold text-theme-subtle uppercase tracking-widest">
              Revision: April 2026
            </p>
          </div>
        </motion.div>

        {/* --- Accordion Content --- */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {sections.map((item, i) => (
            <AccordionItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* --- Help Section --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-sm font-medium text-theme-muted mb-4">Unsure about a specific clause?</p>
          <a 
            href="mailto:rakibsbase@gmail.com" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme bg-surface text-xs font-black text-theme-secondary hover:text-brand-theme hover:border-brand-theme/40 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Contact Agreement Support
          </a>
        </motion.div>
      </div>
    </main>
  );
}
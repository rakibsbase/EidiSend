"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, ChevronDown } from "lucide-react";

const sections = [
  {
    q: "Who can use EidiSend?",
    a: "Anyone with a phone and a loving heart. Minimum age: 13. Maximum drama about sending Salami: zero. By signing up, you promise you're a real person and not a bot trying to scam someone's nanu.",
  },
  {
    q: "What even is EidiSend?",
    a: "A digital platform to send Eid Salami — the most important financial transaction of the year. We're not a bank. We're not a fintech startup with a ping-pong table. We're just here to help you not forget.",
  },
  {
    q: "What happens after I send?",
    a: "The receiver gets notified, the Salami lands, and you get the dua you deserve. All transactions are final. If you sent to the wrong person — that's between you and them. We believe in accountability.",
  },
  {
    q: "Can I use this for shady stuff?",
    a: "No. Absolutely not. EidiSend is for love and blessings only. Money laundering, scamming, or anything that would make your grandmother cry is strictly banned. Violations = instant ban.",
  },
  {
    q: "What if the app goes down on Eid morning?",
    a: "We'll be stressed too, don't worry. We try our hardest to keep things running — especially during Eid when stakes are highest. If something breaks, it's not intentional and we're probably crying about it.",
  },
  {
    q: "Will these terms change?",
    a: "Maybe. If something big changes, we'll tell you. If you keep using EidiSend after that, it means you're cool with it. Nothing sneaky — we're not that kind of app.",
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

export default function TermsContent() {
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
            <ScrollText size={22} className="text-brand-theme" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-theme-muted max-w-sm mx-auto leading-relaxed">
            We kept it short and honest. No lawyers were harmed in the making of this page.
          </p>
          <p className="text-xs text-theme-subtle mt-3">Last updated: Eid season, 2026</p>
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
          Still have questions?{" "}
          <a href="mailto:rakibsbase@gmail.com" className="text-brand-theme hover:underline font-medium">
            Email us
          </a>{" "}
          — we promise we're friendly.
        </motion.p>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "My Salami didn't arrive. Help!",
    a: "First, take a deep breath. Check if the phone number was correct. If everything looks right and it's still missing after a few minutes, email us at rakibsbase@gmail.com and we'll sort it out fast.",
  },
  {
    q: "Can I cancel a Salami after sending?",
    a: "Once it's sent, it's sent — just like real Salami. But if there was a genuine error on our end, reach out and we'll do our best to help.",
  },
  {
    q: "Is EidiSend free to use?",
    a: "For now, yes. The dev runs on instant noodles and motivation. A kind Salami his way wouldn't hurt though. 😅",
  },
];

function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
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
          transition={{ duration: 0.2 }}
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
            transition={{ duration: 0.22, ease: "easeInOut" }}
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

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rakibsbase@gmail.com",
    href: "mailto:rakibsbase@gmail.com",
    sub: "Usually replies within a few hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880776661141",
    href: "tel:+880776661141",
    sub: "Available during working hours (BD time)",
  },
];

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

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
            <MessageSquare size={22} className="text-brand-theme" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight mb-3">
            Contact Us
          </h1>
          <p className="text-sm text-theme-muted max-w-sm mx-auto leading-relaxed">
            Got a question? A bug? Just want to say Eid Mubarak?
            We're real humans. We actually read these.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Left — info + faq */}
          <div className="flex flex-col gap-4">

            {/* Contact cards */}
            {contactInfo.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={i}
                  href={c.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.06 + i * 0.06 }}
                  className="flex items-start gap-4 bg-surface border border-theme rounded-2xl px-5 py-4 hover:border-theme-strong transition-all duration-150 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-150">
                    <Icon size={16} className="text-brand-theme" />
                  </div>
                  <div>
                    <p className="text-xs text-theme-subtle font-medium mb-0.5">{c.label}</p>
                    <p className="text-sm font-bold text-theme-primary group-hover:text-brand-theme transition-colors duration-150">
                      {c.value}
                    </p>
                    <p className="text-xs text-theme-subtle mt-0.5">{c.sub}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Dev note */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.2 }}
              className="bg-surface border border-theme rounded-2xl px-5 py-4"
            >
              <p className="text-xs text-theme-subtle font-medium mb-1">A note from the dev 👋</p>
              <p className="text-sm text-theme-muted leading-relaxed">
                Hi, I'm Rakib. I built EidiSend because I kept forgetting to send
                Salami and my family had very strong opinions about that.
                If something's broken or you have an idea — tell me. I'll actually fix it.
              </p>
            </motion.div>

            {/* FAQ */}
            <div className="flex flex-col gap-3 mt-1">
              <p className="text-xs font-semibold text-theme-subtle uppercase tracking-wider text-center">Common questions</p>
              {faqs.map((item, i) => (
                <AccordionItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-surface border border-theme rounded-2xl px-6 py-7"
          >
            {!sent ? (
              <>
                <h2 className="text-base font-bold text-theme-primary mb-1">Send a message</h2>
                <p className="text-xs text-theme-subtle mb-6">
                  No ticket system. No bot. Just a message straight to a real inbox.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-theme-muted block mb-1.5">Your name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rakib"
                      className="w-full px-4 py-2.5 rounded-xl border border-theme bg-page text-sm text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:border-theme-strong transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-theme-muted block mb-1.5">Your email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-theme bg-page text-sm text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:border-theme-strong transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-theme-muted block mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="What's on your mind?"
                      className="w-full px-4 py-2.5 rounded-xl border border-theme bg-page text-sm text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:border-theme-strong transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email || !form.message}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all duration-150 active:scale-95"
                  >
                    {loading ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <><Send size={14} strokeWidth={2.5} /> Send message</>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-3"
              >
                <span className="text-4xl">🤲</span>
                <h3 className="text-base font-bold text-theme-primary">Message received!</h3>
                <p className="text-sm text-theme-muted leading-relaxed max-w-xs">
                  Rakib will get back to you soon. While you wait —
                  have you sent your Eid Salami yet?
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-xs text-brand-theme hover:underline font-medium"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
}
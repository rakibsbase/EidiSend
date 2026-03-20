/**
 * @file ContactContent.jsx
 * @description The main content for the Contact page. 
 * Features a messaging form, contact information cards, and an FAQ section.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MessageSquare, Send, ChevronDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

// --- Configuration Data ---

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

const contactInfo = [
  {
    icon: Mail,
    label: "Email Support",
    value: "rakibsbase@gmail.com",
    href: "mailto:rakibsbase@gmail.com",
    sub: "Usually replies within a few hours",
  },
  {
    icon: Phone,
    label: "Direct Line",
    value: "+880776661141",
    href: "tel:+880776661141",
    sub: "Available during working hours (BD time)",
  },
];

/**
 * AccordionItem Component
 * Renders a single FAQ item that can be expanded or collapsed.
 */
function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="bg-surface border border-theme rounded-2xl overflow-hidden hover:border-theme-strong transition-colors duration-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-theme-primary group-hover:text-brand-theme transition-colors">
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
               <p className="text-sm text-theme-muted leading-relaxed pt-4">
                 {item.a}
               </p>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactContent() {
  // --- Local State ---
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Universal input change handler.
   */
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /**
   * Handles local form submission logic.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields before sending.");
      return;
    }

    setLoading(true);
    // Simulate API broadcast
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Message sent! We'll get back to you soon 🤲", {
        position: "top-right",
        duration: 4000,
      });
    }, 1400);
  };

  return (
    <main className="bg-page py-12 md:py-20 min-h-screen">
      <Toaster />
      <div className="max-w-[1280px] w-[91.666667%] mx-auto">

        {/* --- Page Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-subtle mb-6 shadow-sm">
            <MessageSquare size={26} className="text-brand-theme" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-theme-primary tracking-tight mb-4">
            Let&apos;s talk Salami
          </h1>
          <p className="text-base text-theme-muted max-w-md mx-auto leading-relaxed font-medium">
            Got a question? A bug? or just want to send us some Eid blessings? 
            We&apos;re real humans, and we read every single message.
          </p>
        </motion.div>

        {/* --- Layout Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left Column: Information & FAQ */}
          <div className="flex flex-col gap-5">

            {/* Quick Contact Cards */}
            {contactInfo.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={i}
                  href={c.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="flex items-start gap-5 bg-surface border border-theme rounded-2xl px-6 py-5 hover:border-brand-theme/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-subtle flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={19} className="text-brand-theme" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-theme-subtle font-black mb-1 block">
                      {c.label}
                    </label>
                    <p className="text-base font-bold text-theme-primary group-hover:text-brand-theme transition-colors leading-tight">
                      {c.value}
                    </p>
                    <p className="text-xs text-theme-subtle mt-1 font-medium">{c.sub}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Narrative Context Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-surface border border-theme rounded-2xl px-6 py-5"
            >
              <p className="text-[10px] uppercase tracking-widest text-theme-subtle font-black mb-2">A note from the developer 👋</p>
              <p className="text-sm text-theme-muted leading-relaxed font-medium">
                Hi, I&apos;m Rakib. I built EidiSend because I kept forgetting to send
                Salami and my family had... let&apos;s just say, very strong opinions about that. 
                If something&apos;s broken or looks weird—tell me. I&apos;ll actually fix it.
              </p>
            </motion.div>

            {/* FAQ Sub-section */}
            <div className="flex flex-col gap-4 mt-4">
              <p className="text-[11px] font-black text-theme-subtle uppercase tracking-[0.2em] text-center mb-1">Common Inquiries</p>
              {faqs.map((item, i) => (
                <AccordionItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="bg-surface border border-theme rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5"
          >
            {!sent ? (
              <>
                <h2 className="text-xl font-bold text-theme-primary mb-2">Send a quick message</h2>
                <p className="text-sm text-theme-subtle mb-8 font-medium">
                  We hate ticket systems too. This goes straight to our personal inbox.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-theme-muted uppercase tracking-wider ml-1">Identity</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Rakib Aziz"
                      className="w-full px-5 py-3.5 rounded-2xl border border-theme bg-page text-sm font-bold text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-brand-theme transition-all"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-theme-muted uppercase tracking-wider ml-1">Return Path</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl border border-theme bg-page text-sm font-bold text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-brand-theme transition-all"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-theme-muted uppercase tracking-wider ml-1">Your message</label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="What's on your mind? Suggestions, bugs, or just generic love..."
                      className="w-full px-5 py-4 rounded-2xl border border-theme bg-page text-sm font-bold text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-brand-theme transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email || !form.message}
                    className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-black transition-all active:scale-[0.98] shadow-lg shadow-emerald-600/20 cursor-pointer mt-2"
                  >
                    {loading ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="block w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Send size={16} strokeWidth={3} /> 
                        Broadcast Message
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 gap-5"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-5xl mb-2">
                  🤲
                </div>
                <h3 className="text-2xl font-black text-theme-primary tracking-tight">Transmission Successful</h3>
                <p className="text-base text-theme-muted leading-relaxed font-medium max-w-xs space-y-4">
                  <span>Rakib will receive this shortly. Expect a response soon!</span>
                  <br />
                  <span className="text-brand-theme block pt-4">Meanwhile, have you shared your Eid joy today?</span>
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 px-8 py-3 rounded-xl border border-theme hover:bg-page transition-all text-xs font-black text-theme-secondary cursor-pointer"
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
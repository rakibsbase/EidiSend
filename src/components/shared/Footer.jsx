"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Heart, ExternalLink } from "lucide-react";

const footerLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Contact Us", href: "/contact" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: "easeOut" },
});

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer
      ref={ref}
      className="relative w-full bg-white dark:bg-[#0a1a12] border-t border-emerald-100 dark:border-emerald-900/30 overflow-hidden"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 dark:via-emerald-500/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-12">
        {/* ── Main row ── */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 py-6">
          {/* Logo */}
          <motion.a
            href="/"
            {...fadeUp(0)}
            className="flex items-center shrink-0"
          >
            <div className="relative w-32 sm:w-36 h-8">
              <Image
                src="/logo.png"
                alt="Eid Salami Logo"
                fill
                className="object-contain object-left"
              />
            </div>
          </motion.a>

          {/* Nav links — center */}
          <motion.nav
            {...fadeUp(0.08)}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {footerLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>

          {/* Copyright — right */}
          <motion.p
            {...fadeUp(0.14)}
            className="text-xs text-slate-400 dark:text-slate-500 text-center md:text-right whitespace-nowrap"
          >
            © 2026 Eid Salami Web. All rights reserved.
          </motion.p>
        </div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="h-px w-full bg-emerald-100 dark:bg-emerald-900/30 origin-left"
        />

        {/* ── Developer credit row ── */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex items-center justify-center gap-2 py-4 text-xs text-slate-400 dark:text-slate-500"
        >
          <span>Designed & Developed with by</span>
          <a
            href="#"
            className="font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150 inline-flex items-center gap-1 group"
          >
            Rakib Aziz
            <ExternalLink
              size={10}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            />
          </a>
          <span className="text-slate-300 dark:text-slate-600">·</span>
        </motion.div>
      </div>
    </footer>
  );
}

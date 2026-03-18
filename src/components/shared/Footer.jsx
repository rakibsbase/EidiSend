"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const footerLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/itzmerayhan1",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/itzmerayhan",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rakib-aziz-b33553147",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
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
      className="relative w-full border-t overflow-hidden bg-overlay border-theme"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 dark:via-emerald-500/30 to-transparent pointer-events-none" />

      <div className="max-w-11/12 mx-auto px-5 md:px-12">
        {/* ── Main row ── */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 py-6">
          {/* Logo */}
          <motion.div {...fadeUp(0)} className="flex items-center shrink-0">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 sm:w-36 h-8">
                <Image
                  src="/logo.png"
                  alt="Eid Salami Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </motion.div>

          {/* Nav links — center */}
          <motion.nav
            {...fadeUp(0.08)}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {footerLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-sm hover:text-brand-theme transition-colors duration-150 text-theme-muted"
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>

          {/* Copyright — right */}
          <motion.p
            {...fadeUp(0.14)}
            className="text-xs text-center md:text-right whitespace-nowrap text-theme-subtle"
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
          className="h-px w-full origin-left bg-brand-subtle"
        />

        {/* ── Developer credit row ── */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4"
        >
          {/* Credit text */}
          <p className="text-xs flex items-center gap-1.5 flex-wrap justify-center text-theme-subtle">
            <span>Designed & Developed with</span>
            <span className="text-rose-400">♥</span>
            <span>by</span>
            <a
              href="https://www.linkedin.com/in/rakib-aziz-b33553147"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-brand-theme transition-colors duration-150 inline-flex items-center gap-1 group text-theme-secondary"
            >
              Rakib Aziz
              <ExternalLink
                size={10}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              />
            </a>
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:text-brand-theme transition-all duration-150 text-theme-subtle hover:bg-brand-subtle"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
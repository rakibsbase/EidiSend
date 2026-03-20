/**
 * @file Footer.jsx
 * @description The site-wide footer displaying branding, navigation, and social links.
 */

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

// --- Configuration Data ---

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
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/itzmerayhan",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rakib-aziz-b33553147",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// --- Animation Utility ---
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay, ease: "easeOut" },
});

export default function Footer() {
  const ref = useRef(null);

  return (
    <footer
      ref={ref}
      className="relative w-full border-t border-theme overflow-hidden bg-overlay/50"
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/30 dark:via-emerald-500/20 to-transparent pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        
        {/* --- Primary Footer Content --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10 md:py-12">
          
          {/* Logo Branding */}
          <motion.div {...fadeUp(0)} className="flex items-center shrink-0">
            <Link href="/" className="flex items-center transition-transform active:scale-95 cursor-pointer">
              <div className="relative w-32 sm:w-40 h-10">
                <Image
                  src="/logo.png"
                  alt="EidiSend Home"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </motion.div>

          {/* Core Navigation Links */}
          <motion.nav
            {...fadeUp(0.08)}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {footerLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-sm font-medium text-theme-muted hover:text-brand-theme transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>

          {/* Copyright Information */}
          <motion.p
            {...fadeUp(0.14)}
            className="text-xs font-medium text-center md:text-right whitespace-nowrap text-theme-subtle"
          >
            © {new Date().getFullYear()} EidiSend. All rights reserved.
          </motion.p>
        </div>

        {/* Horizontal Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: "circOut" }}
          className="h-px w-full origin-left bg-brand-subtle"
        />

        {/* --- Attribution / Developer Section --- */}
        <motion.div
          {...fadeUp(0.22)}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 md:py-8"
        >
          {/* Credit with interaction */}
          <p className="text-xs flex items-center gap-2 flex-wrap justify-center text-theme-subtle">
            <span>Designed & Developed with</span>
            <span className="text-rose-500 animate-pulse">♥</span>
            <span>by</span>
            <a
              href="https://www.linkedin.com/in/rakib-aziz-b33553147"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-theme-secondary hover:text-brand-theme transition-all group inline-flex items-center gap-1.5 cursor-pointer"
            >
              Rakib Aziz
              <ExternalLink
                size={11}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </a>
          </p>

          {/* Social Presence Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-theme bg-surface hover:text-brand-theme hover:border-brand-theme/30 hover:scale-110 active:scale-95 transition-all duration-200 text-theme-subtle cursor-pointer shadow-sm shadow-black/5"
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
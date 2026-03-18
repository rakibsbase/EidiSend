"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, DollarSign, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeMode } from "@/hooks/useThemeMode";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Top Senders", href: "/top-senders" },
  { name: "Fun Zone", href: "/fun-zone" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, cycleTheme, hydrated } = useThemeMode();
  const pathname = usePathname();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) => pathname === href;

  return (
    <>
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-overlay/95 backdrop-blur-md ${ scrolled ? "border-b shadow-sm shadow-emerald-50 dark:shadow-black/20" : "border-b border-theme" } border-theme`}
    >
      <div className="flex items-center justify-between px-5 md:px-12 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative w-36 sm:w-44 md:w-52 h-9">
            <Image
              src="/logo.png"
              alt="Eid Salami Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Nav — centered */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={i}
                href={item.href}
                className={`relative pb-1 text-sm font-medium transition-colors duration-200 group ${ active ? "text-brand-theme" : "hover:text-theme-primary" } text-theme-secondary`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full group-hover:bg-slate-300 dark:group-hover:bg-slate-600"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Theme Toggle — desktop only, mobile has it inside drawer */}
          {hydrated && (
            <button
              onClick={cycleTheme}
              aria-label="Toggle theme"
              className="hidden md:block p-2.5 rounded-lg hover:text-brand-theme transition-all duration-150 text-theme-subtle hover:bg-brand-subtle"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          )}

          {/* Hamburger */}
          <button
            aria-label="Open menu"
            className="md:hidden p-2.5 rounded-lg hover:text-brand-theme transition-all duration-150 text-theme-muted hover:bg-brand-subtle"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>

          {/* Send Salami CTA — desktop only */}
          <Link
            href="/send"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold transition-all duration-150 shadow-sm shadow-emerald-600/25 ml-1"
          >
            <div className="bg-white/20 p-1 rounded-md">
              <DollarSign size={13} strokeWidth={2} className="text-white" />
            </div>
            Send Salami
          </Link>
        </div>
      </div>

    </header>

      {/* ── Mobile Drawer — outside <header> to avoid z-index conflicts ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[60]"
              onClick={() => setOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-[75%] max-w-[300px] z-[70] flex flex-col"
              style={{
                background: isDark
                  ? "linear-gradient(160deg, #0d2118 0%, #071510 100%)"
                  : "linear-gradient(160deg, #14532d 0%, #0d3d20 100%)",
                boxShadow: "-12px 0 48px rgba(0,0,0,0.3)",
              }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Drawer Header */}
              <div className="relative flex justify-between items-center px-5 pt-5 pb-5 border-b border-white/10">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="relative w-28 h-7 block"
                >
                  <Image
                    src="/logo.png"
                    alt="Eid Salami Logo"
                    fill
                    className="object-contain object-left brightness-0 invert"
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="relative flex flex-col px-3 pt-4 gap-0.5 flex-1 overflow-y-auto">
                {navItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.22 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                          active
                            ? "bg-white/15 text-white"
                            : "text-emerald-100/75 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-emerald-400" />
                        )}
                        <span>{item.name}</span>
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom CTAs */}
              <div className="relative px-4 pb-8 pt-4 flex flex-col gap-3 border-t border-white/10">
                <Link
                  href="/send"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-emerald-400 hover:bg-emerald-300 active:scale-95 py-3.5 text-emerald-950 text-sm font-bold transition-all duration-150 shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                >
                  <DollarSign size={16} strokeWidth={2} />
                  Send Salami
                </Link>

                {hydrated && (
                  <button
                    onClick={cycleTheme}
                    className="w-full rounded-xl border border-white/10 hover:bg-white/8 py-3 text-emerald-100/60 hover:text-white text-xs font-medium transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    {isDark ? <Sun size={13} /> : <Moon size={13} />}
                    {isDark ? "Switch to Light" : "Switch to Dark"}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
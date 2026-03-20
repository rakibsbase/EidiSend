/**
 * @file Navbar.jsx
 * @description The main navigation component for EidiSend. 
 * Handles desktop links, mobile drawer, theme toggling, and sticky behavior.
 */

"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeMode } from "@/hooks/useThemeMode";

// --- Navigation Items Configuration ---
const navItems = [
  { name: "Home", href: "/" },
  { name: "Top Senders", href: "/top-senders" },
  { name: "Fun Zone", href: "/fun-zone" },
];

export default function Navbar() {
  // --- Local State ---
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolledScrolled] = useState(false);
  const { resolvedTheme, cycleTheme, hydrated } = useThemeMode();
  const pathname = usePathname();
  const isDark = resolvedTheme === "dark";

  /**
   * Effect: Handle scroll behavior for sticky header styling.
   */
  useEffect(() => {
    const handleScroll = () => setScrolledScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Effect: Lock body scroll when mobile drawer is open.
   */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * isActive
   * Helper to determine if a route is currently active.
   */
  const isActive = (href) => pathname === href;

  return (
    <>
      {/* --- Main Navigation Header --- */}
      <header
        className={`sticky top-0 z-[60] w-full transition-all duration-300 bg-overlay/95 backdrop-blur-md border-b border-theme ${
          scrolled ? "shadow-sm shadow-emerald-100/10 dark:shadow-black/20" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-12 h-16 max-w-screen-2xl mx-auto">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center shrink-0 transition-transform active:scale-95 cursor-pointer">
            <div className="relative w-36 sm:w-44 md:w-52 h-9">
              <Image
                src="/logo.png"
                alt="EidiSend Home"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item, i) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={i}
                  href={item.href}
                  className={`relative pb-1 text-sm font-bold transition-colors duration-200 group cursor-pointer ${
                    active ? "text-brand-theme" : "text-theme-secondary hover:text-theme-primary"
                  }`}
                >
                  {item.name}
                  {/* Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] rounded-full bg-brand-theme transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full group-hover:opacity-50"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Area (Right Side) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle (Desktop Only) */}
            {hydrated && (
              <button
                onClick={cycleTheme}
                aria-label="Toggle theme"
                className="hidden md:flex p-2.5 rounded-xl hover:text-brand-theme transition-all duration-200 text-theme-subtle hover:bg-brand-subtle cursor-pointer items-center justify-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isDark ? "sun" : "moon"}
                    initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    className="block leading-none"
                  >
                    {isDark ? <Sun size={19} /> : <Moon size={19} />}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}

            {/* Mobile Menu Icon */}
            <button
              aria-label="Open navigation menu"
              aria-expanded={open}
              className="md:hidden p-2.5 rounded-xl hover:text-brand-theme transition-all duration-200 text-theme-muted hover:bg-brand-subtle cursor-pointer flex items-center justify-center"
              onClick={() => setOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* "Send Salami" Desktop Button */}
            <Link
              href="/send"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-emerald-600/20 ml-2 cursor-pointer"
            >
              <div className="bg-white/20 p-0.5 rounded-md">
                <DollarSign size={14} strokeWidth={3} className="text-white" />
              </div>
              Send Now
            </Link>
          </div>
        </div>
      </header>

      {/* --- Mobile Platform Navigation (Drawer) --- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Darkened Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] z-[110] flex flex-col shadow-2xl"
              style={{
                background: isDark
                  ? "linear-gradient(165deg, #0d2118 0%, #071510 100%)"
                  : "linear-gradient(165deg, #14532d 0%, #0d3d20 100%)",
              }}
            >
              {/* Thematic Dot Pattern Over Drawer */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Drawer Header Area */}
              <div className="relative flex justify-between items-center px-6 pt-7 pb-6 border-b border-white/10">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="relative w-32 h-8 block cursor-pointer transition-opacity active:opacity-80"
                >
                  <Image
                    src="/logo.png"
                    alt="EidiSend Logo"
                    fill
                    className="object-contain object-left brightness-0 invert"
                  />
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Drawer Navigation Links */}
              <nav className="relative flex flex-col px-4 pt-6 gap-1 flex-1 overflow-y-auto">
                {navItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                          active
                            ? "bg-white/10 text-emerald-400"
                            : "text-emerald-100/80 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.span 
                            layoutId="mobile-active-indicator"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-7 rounded-r-full bg-emerald-400" 
                          />
                        )}
                        <span>{item.name}</span>
                        {active && (
                          <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile Interaction Bar (Bottom) */}
              <div className="relative px-5 pb-10 pt-6 flex flex-col gap-4 border-t border-white/10">
                <Link
                  href="/send"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-2xl bg-emerald-400 hover:bg-emerald-300 active:scale-[0.98] py-4 text-emerald-950 text-sm font-black transition-all duration-200 shadow-xl shadow-black/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <DollarSign size={18} strokeWidth={3} />
                  Send Digital Eidi
                </Link>

                {hydrated && (
                  <button
                    onClick={cycleTheme}
                    className="w-full rounded-2xl border border-white/15 hover:bg-white/8 py-3.5 text-emerald-100/70 hover:text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                    {isDark ? "Enable Light Mode" : "Enable Dark Mode"}
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
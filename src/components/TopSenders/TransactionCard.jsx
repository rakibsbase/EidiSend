/**
 * @file TransactionCard.jsx
 * @description Individual transaction row for the leaderboard.
 */

"use client";

import { motion } from "framer-motion";
import { getAvatarColor, getInitial } from "./avatarUtils";

// --- Configuration ---
const FUNNY_BADGES = [
  "No excuses ✅",
  "Came through 💪",
  "A true one 🤝",
  "Better late 🐢",
  "Respect 🫡",
  "Legend behavior 🌙",
];

const METHOD_ICONS = {
  bkash: "💗",
  nagad: "🟠",
  upay: "💜",
};

/**
 * Standard card for displaying transaction details.
 */
export default function TransactionCard({
  sender,
  rank,
  delay,
  timeAgo,
  methodLabel,
  method,
}) {
  // Select a badge based on rank for deterministic variety
  const badge = FUNNY_BADGES[(rank - 1) % FUNNY_BADGES.length];
  const color = getAvatarColor(sender.name || "");
  const initial = getInitial(sender.name || "");
  const methodIcon = METHOD_ICONS[method] || "💳";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-4px" }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-3 bg-surface border border-theme rounded-xl px-4 py-3 hover:border-theme-strong transition-all duration-150 group cursor-default"
    >
      {/* --- Rank --- */}
      <span className="text-[10px] font-black text-theme-subtle w-4 text-center shrink-0">
        #{rank}
      </span>

      {/* --- Avatar --- */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 group-hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: color.bg, color: color.text }}
      >
        {initial}
      </div>

      {/* --- Identity & Metadata --- */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-bold text-theme-primary truncate">
            {sender.name}
          </p>
          <span className="text-[9px] text-theme-subtle bg-brand-subtle px-1.5 py-0.5 rounded-full border border-theme hidden sm:inline shrink-0">
            {badge}
          </span>
        </div>
        <p className="text-[10px] text-theme-subtle mt-0.5 italic">
          {timeAgo} · {methodIcon} {methodLabel}
        </p>
      </div>

      {/* --- Financial Status --- */}
      <div className="text-right shrink-0">
        <p className="text-sm font-extrabold text-brand-theme">
          ৳{sender.amount?.toLocaleString()}
        </p>
      </div>
      
    </motion.div>
  );
}

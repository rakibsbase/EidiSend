/**
 * @file LeaderboardPodium.jsx
 * @description Renders the top 3 senders in a stylistic podium layout.
 */

"use client";

import { motion } from "framer-motion";
import { getAvatarColor, getInitial } from "./avatarUtils";

// --- Configuration ---
const MEDALS = ["🥇", "🥈", "🥉"];
const RANK_LABELS = ["1st", "2nd", "3rd"];
const FUNNY_TITLES = ["The GOAT 🐐", "Close enough 🫡", "Still showed up 😅"];

// Visual layout order (2nd place left, 1st center, 3rd right)
const VISUAL_ORDER = [1, 0, 2];

/** 
 * Design tokens for each podium position: [2nd-col, 1st-col, 3rd-col] 
 */
const COL_CONFIGS = [
  {
    avatarSize: "w-11 h-11",
    fontSize: "text-xs",
    podiumH: "h-14",
    nameSize: "text-xs",
  },
  {
    avatarSize: "w-14 h-14",
    fontSize: "text-sm",
    podiumH: "h-20",
    nameSize: "text-sm",
  },
  {
    avatarSize: "w-10 h-10",
    fontSize: "text-xs",
    podiumH: "h-10",
    nameSize: "text-xs",
  },
];

/**
 * Renders the top part of the podium (avatar + name + stats)
 */
function PodiumAvatar({ sender, colIdx, dataIdx }) {
  const cfg = COL_CONFIGS[colIdx];
  const color = getAvatarColor(sender?.name || "");
  const initial = getInitial(sender?.name || "");
  const isFirst = dataIdx === 0;

  if (!sender) {
    return (
      <div className="flex flex-col items-center gap-1 mb-2">
        <div
          className={`${cfg.avatarSize} rounded-2xl bg-surface border-2 border-dashed border-theme flex items-center justify-center text-theme-subtle text-lg`}
        >
          ?
        </div>
        <p className="text-[10px] text-theme-subtle italic">Empty slot</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1 mb-2">
      {/* Crown indicator for the overall leader */}
      {isFirst && (
        <motion.span
          initial={{ y: -4, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="text-base leading-none mb-0.5"
        >
          👑
        </motion.span>
      )}

      {/* Stylized Avatar */}
      <div
        className={`${cfg.avatarSize} rounded-2xl flex items-center justify-center font-extrabold text-base shrink-0 border-2 transition-transform duration-300 hover:scale-110`}
        style={{
          backgroundColor: color.bg,
          color: color.text,
          borderColor: isFirst ? "#10b981" : "transparent",
          boxShadow: isFirst ? "0 4px 14px rgba(16,185,129,0.25)" : "none",
        }}
      >
        {initial}
      </div>

      <p className={`${cfg.nameSize} font-bold text-theme-primary text-center leading-tight max-w-[80px] truncate`}>
        {sender.name}
      </p>

      <p className="text-xs font-extrabold text-brand-theme leading-none">
        ৳{sender.amount?.toLocaleString()}
      </p>

      <p className="text-[9px] text-theme-subtle text-center leading-tight italic">
        {FUNNY_TITLES[dataIdx]}
      </p>
    </div>
  );
}

export default function LeaderboardPodium({ top3 }) {
  // Normalize slots to ensure we always have 3 spots to render
  const slots = [top3[0] ?? null, top3[1] ?? null, top3[2] ?? null];

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="text-[10px] font-semibold text-theme-subtle uppercase tracking-widest mb-6 text-center">
        Leaderboard Heroes 🏛️
      </p>

      <div className="flex items-end justify-center gap-2">
        {VISUAL_ORDER.map((dataIdx, colIdx) => {
          const sender = slots[dataIdx];
          const isFirst = dataIdx === 0;
          const cfg = COL_CONFIGS[colIdx];

          return (
            <motion.div
              key={`col-${dataIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: colIdx * 0.09 }}
              className="flex flex-col items-center flex-1"
            >
              <PodiumAvatar sender={sender} colIdx={colIdx} dataIdx={dataIdx} />

              {/* Podium Block Component */}
              <div
                className={`w-full ${cfg.podiumH} rounded-t-2xl relative overflow-hidden flex flex-col items-center justify-between pt-2 pb-1 ${!isFirst ? "bg-brand-subtle border border-theme" : ""}`}
                style={
                  isFirst
                    ? {
                        background: "linear-gradient(160deg, #059669 0%, #047857 100%)",
                        boxShadow: "0 -4px 16px rgba(16,185,129,0.2)",
                      }
                    : {}
                }
              >
                {isFirst && (
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                      backgroundSize: "10px 10px",
                    }}
                  />
                )}
                <span className="text-sm relative drop-shadow-sm">{MEDALS[dataIdx]}</span>
                <span
                  className={`text-[9px] font-bold relative tracking-tighter ${isFirst ? "text-white/70" : "text-theme-subtle"}`}
                >
                  {RANK_LABELS[dataIdx]}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

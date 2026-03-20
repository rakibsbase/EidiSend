/**
 * @file TopSendersContent.jsx
 * @description Main content for the Top Senders page. Handles fetching and displaying the leaderboard.
 */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import TransactionCard from "./TransactionCard";
import LeaderboardPodium from "./LeaderboardPodium";

// --- Configuration & Constants ---
const FUNNY_SUBTITLES = [
  "These people remembered. Unlike some of us.",
  "Hall of fame. You could be here. But you're not.",
  "Living proof that sending Salami is not that hard.",
  "The elders' dua leaderboard. Unverified but accurate.",
];

/**
 * Mapping of payment method IDs to human-readable labels.
 */
const METHOD_LABELS = { 
  bkash: "bKash", 
  nagad: "Nagad", 
  upay: "Upay" 
};

// --- Helper Functions ---

/**
 * Calculates a human-readable relative time string.
 * @param {string} dateStr 
 * @returns {string}
 */
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

// Randomly select a subtitle for variety on each visit
const SUBTITLE = FUNNY_SUBTITLES[Math.floor(Math.random() * FUNNY_SUBTITLES.length)];

export default function TopSendersContent() {
  // --- Local State ---
  const [senders, setSenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches the latest submissions from the internal API.
   */
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/send");
      const json = await res.json();
      if (json.success) {
        setSenders(json.data);
      } else {
        setError("Couldn't load the legends. Try again.");
      }
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
      setError("Server went for Eid break. Try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Partition the data for the podium and the list
  const top3 = senders.slice(0, 3);
  const rest = senders.slice(3);

  return (
    <main className="bg-page py-8 md:py-12 min-h-screen">
      <div className="max-w-[91.666667%] mx-auto">

        {/* --- Page Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-subtle mb-3 text-2xl border border-theme">
            🏆
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-theme-primary tracking-tight mb-2">
            Top Senders
          </h1>
          <p className="text-xs text-theme-muted max-w-xs mx-auto italic">{SUBTITLE}</p>
        </motion.div>

        {/* --- UI States (Loading / Error / Empty) --- */}
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-9 h-9 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, transparent 70%, var(--brand) 100%)",
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))",
              }}
            />
            <p className="text-xs text-theme-subtle italic">Loading the legends...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <span className="text-3xl">😮‍💨</span>
            <p className="text-sm text-theme-muted">{error}</p>
            <button 
              onClick={fetchData} 
              className="mt-2 text-xs text-brand-theme hover:underline font-bold cursor-pointer"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && senders.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-4xl mb-2">🌙</span>
            <h3 className="text-sm font-bold text-theme-primary">No one has sent yet.</h3>
            <p className="text-xs text-theme-muted max-w-xs">
              Be the first legend. Your name in lights. Your dua in the bank.
            </p>
            <Link 
              href="/send" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all mt-3 cursor-pointer shadow-sm"
            >
              <DollarSign size={13} /> Send first Salami
            </Link>
          </div>
        )}

        {/* --- Leaderboard Content --- */}
        {!loading && !error && senders.length > 0 && (
          <div className="flex flex-col gap-8 max-w-2xl mx-auto">

            {/* Podium for the Top 3 */}
            {top3.length > 0 && <LeaderboardPodium top3={top3} />}

            {/* List for the remaining legends */}
            {rest.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-semibold text-theme-subtle uppercase tracking-widest mb-4 text-center">
                  Also in the hall of fame
                </p>
                <div className="flex flex-col gap-2.5">
                  {rest.map((sender, i) => (
                    <TransactionCard
                      key={sender._id}
                      sender={sender}
                      rank={i + 4}
                      delay={i * 0.06}
                      timeAgo={timeAgo(sender.createdAt)}
                      method={sender.method}
                      methodLabel={METHOD_LABELS[sender.method] || sender.method}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Contextual CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="text-center pt-6 pb-4 border-t border-theme border-dashed mt-4"
            >
              <p className="text-xs text-theme-muted mb-4 italic">
                Your name isn&apos;t here yet. Fixing that takes only 2 minutes.
              </p>
              <Link
                href="/send"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold transition-all duration-150 shadow-md cursor-pointer"
              >
                <DollarSign size={14} />
                Get on the board
              </Link>
            </motion.div>

          </div>
        )}
      </div>
    </main>
  );
}
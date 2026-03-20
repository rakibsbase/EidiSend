/**
 * @file StepPayment.jsx
 * @description First step of the Salami flow. Handles payment method selection and amount entry.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PAYMENT_METHODS, PRESET_AMOUNTS } from "./paymentData";

export default function StepPayment({ onNext }) {
  // --- State ---
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  // Derive the active method metadata
  const method = PAYMENT_METHODS.find((m) => m.id === selected);

  /**
   * Copies the merchant number to the user's clipboard.
   */
  const copyNumber = () => {
    if (!method) return;
    navigator.clipboard.writeText(method.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Validation Logic:
   * Enforces a minimum transaction of ৳20 as per business requirements.
   */
  const numericAmount = Number(amount);
  const isAmountValid = amount !== "" && !isNaN(numericAmount) && numericAmount >= 20;
  const canContinue = !!selected && isAmountValid;

  /**
   * Advances to the next step in the parent flow.
   */
  const handleContinue = () => {
    if (!canContinue) return;
    onNext({ method: selected, amount: amount });
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- Payment Method Selection --- */}
      <div>
        <p className="text-xs font-semibold text-theme-subtle uppercase tracking-wider mb-3">
          Choose payment method
        </p>
        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_METHODS.map((m) => (
            <motion.button
              key={m.id}
              onClick={() => setSelected(m.id)}
              whileTap={{ scale: 0.97 }}
              className={`relative flex flex-col items-center gap-2 px-3 py-4 rounded-2xl border-2 transition-all duration-150 cursor-pointer ${
                selected === m.id
                  ? "border-theme-strong bg-brand-subtle"
                  : "border-theme bg-surface hover:border-theme-strong"
              }`}
            >
              <div className="w-10 h-10 relative rounded-xl overflow-hidden pointer-events-none">
                <Image
                  src={m.logo}
                  alt={m.name}
                  fill
                  sizes="40px"
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xs font-bold text-theme-primary">
                {m.name}
              </span>
              {selected === m.id && (
                <motion.span
                  layoutId="selected-dot"
                  className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-theme"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* --- Interactive Instruction Card --- */}
      <AnimatePresence mode="wait">
        {method && (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-surface border border-theme rounded-2xl p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-theme-subtle mb-1">
                  {method.name} Number
                </p>
                <p className="text-lg font-extrabold text-theme-primary tracking-wide">
                  {method.number}
                </p>
              </div>
              <motion.button
                onClick={copyNumber}
                whileTap={{ scale: 0.93 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-subtle hover:bg-brand-subtle text-brand-theme text-xs font-bold transition-all duration-150 border border-theme cursor-pointer"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>

            <p className="text-xs text-theme-muted leading-relaxed bg-page px-4 py-3 rounded-xl border border-theme">
              💡 {method.instruction}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Amount Input Section --- */}
      <div>
        <p className="text-xs font-semibold text-theme-subtle uppercase tracking-wider mb-3">
          Enter amount <span className="text-brand-theme">*</span>
        </p>

        {/* Quick-select Presets */}
        <div className="flex flex-wrap gap-2 mb-3">
          {PRESET_AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(String(a))}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-150 cursor-pointer ${
                amount === String(a)
                  ? "bg-brand-subtle border-theme-strong text-brand-theme"
                  : "bg-surface border-theme text-theme-muted hover:border-theme-strong hover:text-brand-theme"
              }`}
            >
              ৳{a}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-theme-muted">
            ৳
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Min ৳20"
            className={`w-full pl-8 pr-4 py-2.5 rounded-xl border bg-page text-sm text-theme-primary placeholder:text-theme-subtle focus:outline-none transition-colors ${
              amount !== "" && !isAmountValid ? "border-red-400" : "border-theme focus:border-theme-strong"
            }`}
          />
        </div>
        
        {/* Real-time Validation Feedback */}
        {amount !== "" && !isAmountValid && (
          <p className="mt-1.5 text-[10px] font-medium text-red-500">
            Minimum amount to send Salami is ৳20
          </p>
        )}
      </div>

      {/* --- Footer Interaction --- */}
      <motion.button
        onClick={handleContinue}
        disabled={!canContinue}
        whileTap={{ scale: canContinue ? 0.97 : 1 }}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all duration-150 shadow-sm cursor-pointer"
      >
        Continue
        <ChevronRight size={16} />
      </motion.button>

      {/* Contextual Hints */}
      {!selected ? (
        <p className="text-center text-xs text-theme-subtle -mt-3">
          ☝️ Please select a payment method to continue
        </p>
      ) : !isAmountValid && (
        <p className="text-center text-xs text-theme-subtle -mt-3">
          💰 Enter at least ৳20 to proceed
        </p>
      )}
    </div>
  );
}
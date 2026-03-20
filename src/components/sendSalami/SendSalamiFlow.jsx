/**
 * @file SendSalamiFlow.jsx
 * @description Master component for the multi-step Salami sending process.
 * Manages form state, navigation, and API integration.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StepPayment from "./StepPayment";
import StepDetails from "./StepDetails";
import StepConfirmation from "./StepConfirmation";

// --- Configuration ---
const STEPS = ["Payment", "Details", "Done"];

// Ensure environment variables are loaded correctly (Next.js client-side requirement)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ?? "";

export default function SendSalamiFlow() {
  // --- State Management ---
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Transitions from Payment to Details.
   */
  const handlePaymentNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(1);
  };

  /**
   * Finalizes the flow and submits data to the backend.
   */
  const handleDetailsNext = async (data) => {
    const merged = { ...formData, ...data };
    setFormData(merged);
    setLoading(true);
    setError(null);

    try {
      /**
       * Submits transaction data to the API. 
       * Privacy Note: Visual proof (screenshots) are handled locally and not transmitted.
       */
      const res = await fetch(`${BASE_URL}/api/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: merged.name || "",
          message: merged.message || "",
          method: merged.method || "",
          amount: Number(merged.amount) || 0,
        }),
      });

      const result = await res.json();

      // Ensure transaction was accepted before proceeding to confirmation
      if (!res.ok || result.success === false) {
        throw new Error(result.error || "Transaction could not be verified. Please try again.");
      }

      setStep(2);
    } catch (e) {
      setError(e.message || "A network error occurred. Please check your connection.");
      console.error("Submission pipeline error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-page py-10 md:py-16">
      <div className="max-w-[91.666667%] mx-auto">
        
        {/* --- Section Header --- */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight mb-1">
            Send Salami 💸
          </h1>
          <p className="text-sm text-theme-muted">
            takes 2 minutes. The dua lasts forever.
          </p>
        </div>

        {/* --- Progress Indicator --- */}
        {step < 2 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.slice(0, 2).map((label, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => i < step && setStep(i)}
                title={i < step ? `Back to ${label}` : ""}
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                    i === step
                      ? "bg-emerald-600 text-white"
                      : i < step
                        ? "bg-brand-subtle text-brand-theme border border-theme-strong"
                        : "bg-surface border border-theme text-theme-subtle"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    i === step ? "text-theme-primary" : "text-theme-subtle"
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.slice(0, 2).length - 1 && (
                  <div
                    className={`w-8 h-px mx-1 transition-colors duration-300 ${i < step ? "bg-brand-theme" : "border-theme"} border-t border-t-theme`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- Main Interaction Container --- */}
        <div className="max-w-lg mx-auto">
          <div
            className={`bg-surface border border-theme rounded-2xl p-6 sm:p-8 shadow-sm ${step === 2 ? "text-center" : ""}`}
          >
            {/* Inline Global Error Feedback */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-surface border border-theme text-theme-primary text-xs font-bold text-center">
                ⚠️ {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepPayment onNext={handlePaymentNext} />
                </motion.div>
              )}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepDetails
                    data={formData}
                    loading={loading}
                    onNext={handleDetailsNext}
                    onBack={() => setStep(0)}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepConfirmation data={formData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
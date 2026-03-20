/**
 * @file StepDetails.jsx
 * @description Second step of the Salami flow. Collects sender info and optional message/proof.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Upload, X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Loading from "@/app/loading";

export default function StepDetails({ data, loading, onNext, onBack }) {
  // --- State ---
  const [name, setName] = useState(data.name || "");
  const [message, setMessage] = useState(data.message || "");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  /**
   * Resource Cleanup:
   * Revokes blob URLs to prevent memory leaks when files are changed or component unmounts.
   */
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  /**
   * Handles local file selection for visual proof.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  /**
   * Clears the selected file and resets the input field.
   */
  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setScreenshot(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Validation ---
  const canContinue = name.trim().length > 0;

  /**
   * Submits the step data to the parent flow.
   */
  const handleContinue = () => {
    if (!canContinue || loading) return;
    onNext({ name, message });
  };

  // Dedicated loading state during API transport
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- Navigation --- */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-theme-subtle hover:text-theme-primary transition-colors mb-2 w-fit cursor-pointer"
      >
        <ChevronLeft size={14} />
        Back to payment
      </button>

      {/* --- Form Fields --- */}
      <div className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-theme-subtle uppercase tracking-wider">
            Your name <span className="text-brand-theme">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Abdullah Al Mamun"
            className="w-full px-4 py-2.5 rounded-xl border border-theme bg-page text-sm text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:border-theme-strong transition-colors"
          />
        </div>

        {/* Message Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-theme-subtle uppercase tracking-wider">
            Personal Message <span className="normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a sweet Eid note..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-theme bg-page text-sm text-theme-primary placeholder:text-theme-subtle focus:outline-none focus:border-theme-strong transition-colors resize-none"
          />
        </div>

        {/* --- Visual Proof Upload (Client-side Only) --- */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-theme-subtle uppercase tracking-wider">
            Display Proof Screenshot <span className="normal-case font-normal">(optional)</span>
          </label>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {!preview ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-theme-strong rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-brand-subtle transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-surface border border-theme flex items-center justify-center text-theme-secondary group-hover:scale-110 transition-transform">
                <Upload size={18} />
              </div>
              <p className="text-xs font-bold text-theme-primary">Tap to upload screenshot</p>
              <p className="text-[10px] text-theme-muted">PNG, JPG or WEBP (Max 5MB)</p>
            </button>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-theme bg-page aspect-[4/3] max-h-48 flex items-center justify-center text-theme-primary">
              <Image
                src={preview}
                alt="Proof preview"
                fill
                className="object-contain"
                unoptimized
              />
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-page border border-theme text-theme-primary shadow-lg hover:bg-brand-subtle transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          )}
          
          <p className="text-[10px] text-center text-theme-subtle mt-2">
            🔒 Your screenshot stays on your device — we don't store it.
          </p>
        </div>
      </div>

      {/* --- Footer Interaction --- */}
      <motion.button
        onClick={handleContinue}
        disabled={!canContinue || loading}
        whileTap={{ scale: (canContinue && !loading) ? 0.97 : 1 }}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all duration-150 shadow-sm cursor-pointer"
      >
        <CheckCircle2 size={16} />
        Confirm Submission
      </motion.button>
      
      {!canContinue && (
        <p className="text-center text-xs text-theme-subtle -mt-3 italic">
          Please enter your name to continue
        </p>
      )}
    </div>
  );
}

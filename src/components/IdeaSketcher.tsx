"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Send, Check, Loader2 } from "lucide-react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function IdeaSketcher() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [userEmail, setUserEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearProgressTimer = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isGenerating) {
      clearProgressTimer();
      return;
    }

    const startTime = Date.now();
    setProgress(0);
    setProgressLabel("Analyzing your idea...");

    progressInterval.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed < 12) {
        // Phase 1: LLM planning (0-35%)
        const p = Math.min(35, (elapsed / 12) * 35);
        setProgress(p);
        if (elapsed < 3) setProgressLabel("Analyzing your idea...");
        else if (elapsed < 8) setProgressLabel("Breaking idea into 6 screens...");
        else setProgressLabel("Defining UI elements for each screen...");
      } else if (elapsed < 18) {
        // Phase 2: Rate limit pause (35-45%)
        const p = 35 + ((elapsed - 12) / 6) * 10;
        setProgress(p);
        setProgressLabel("Preparing the wireframe engine...");
      } else if (elapsed < 40) {
        // Phase 3: FLUX generation (45-92%) — slows near the end
        const frac = (elapsed - 18) / 22;
        const eased = 1 - Math.pow(1 - frac, 2);
        const p = 45 + eased * 47;
        setProgress(Math.min(92, p));
        if (elapsed < 25) setProgressLabel("Drawing screen layouts...");
        else if (elapsed < 32) setProgressLabel("Sketching UI elements & labels...");
        else setProgressLabel("Adding annotations & final details...");
      } else {
        // Stall at 92% — only the API response pushes to 100%
        setProgress(92);
        setProgressLabel("Almost done, finalizing...");
      }
    }, 200);

    return clearProgressTimer;
  }, [isGenerating, clearProgressTimer]);

  /* ---------------------------------------------------------------- */
  /*  Handlers                                                         */
  /* ---------------------------------------------------------------- */

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-sketch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate sketch");
      }

      const data = await response.json();
      clearProgressTimer();
      setProgress(100);
      setProgressLabel("Done!");
      await new Promise((r) => setTimeout(r, 400));
      setGeneratedImageUrl(data.url);
    } catch (error) {
      console.error("Failed to generate sketch:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to generate sketch. Please try again."
      );
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleSendEmail = async () => {
    if (!userEmail.trim() || !generatedImageUrl) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/send-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          prompt,
          imageUrl: generatedImageUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send");
      }

      setSuccessMessage("Sketch sent! Burak will be in touch shortly.");
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to send. Please try again or email burakf@groupfnd.com directly."
      );
    } finally {
      setIsSending(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <section
      id="ideaSketcher"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-24 md:py-32"
    >
      {/* Top border glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Ambient blur orbs - brighter */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-violet-500/[0.08] blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/[0.06] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" strokeWidth={2} />
            <span className="text-sm font-medium uppercase tracking-widest text-violet-400">
              Free AI-Powered Wireframe
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            See Your App Before It&apos;s Built
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Describe your app idea in plain English. Our AI will sketch the key screens
            and layouts as a professional wireframe. If it resonates, let&apos;s build it together.
          </p>
        </motion.div>

        {/* ---- Interactive form ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-slate-700/60 bg-slate-800/80 p-6 shadow-2xl backdrop-blur-sm md:p-8"
        >
          {/* Step 1: Prompt input */}
          <div className="mb-6">
            <label
              htmlFor="ideaPrompt"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Step 1: Describe your app idea
            </label>
            <textarea
              id="ideaPrompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A Salesforce best practices app that helps developers choose between Flow, Apex, and custom solutions..."
              rows={5}
              disabled={isGenerating}
              className={cn(
                "w-full rounded-xl border border-slate-600/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500",
                "transition-all duration-300",
                "focus:border-violet-400/60 focus:outline-none focus:ring-2 focus:ring-violet-400/30",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>

          {/* Generate button */}
          <motion.button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            whileHover={{ scale: prompt.trim() && !isGenerating ? 1.02 : 1 }}
            whileTap={{ scale: prompt.trim() && !isGenerating ? 0.98 : 1 }}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-4 text-base font-bold transition-all duration-300",
              prompt.trim() && !isGenerating
                ? "border-violet-500/60 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-white shadow-lg shadow-violet-500/20 hover:from-violet-500/30 hover:to-cyan-500/30"
                : "cursor-not-allowed border-slate-700 bg-slate-800/40 text-slate-600"
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.5} />
                Sketching your app...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" strokeWidth={2} />
                Sketch My App
              </>
            )}
          </motion.button>

          {/* Loading overlay with progress bar */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-slate-950/90 backdrop-blur-md"
              >
                <div className="flex w-full max-w-sm flex-col items-center gap-6 px-6">
                  {/* Percentage display */}
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-slate-700/60 bg-slate-900/80">
                      <span className="text-2xl font-bold tabular-nums text-white">
                        {Math.round(progress)}
                        <span className="text-sm font-normal text-slate-400">%</span>
                      </span>
                    </div>
                    {/* Rotating ring around the percentage */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <svg viewBox="0 0 96 96" className="h-full w-full">
                        <circle
                          cx="48" cy="48" r="46"
                          fill="none"
                          stroke="rgb(139 92 246 / 0.5)"
                          strokeWidth="2"
                          strokeDasharray="40 250"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Status label */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-300">
                      {progressLabel}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      This takes about 30-45 seconds
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result view */}
          <AnimatePresence mode="wait">
            {generatedImageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                {/* Generated image */}
                <div className="group relative overflow-hidden rounded-xl border border-violet-500/20 bg-slate-950/80 p-3 shadow-2xl">
                  {/* Glow effect */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 via-transparent to-transparent" />
                  </div>

                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                    <Image
                      src={generatedImageUrl}
                      alt="Generated wireframe sketch of app screens"
                      fill
                      className="object-contain bg-white"
                    />
                  </div>

                  {/* Badge overlay */}
                  <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                      Generated
                    </span>
                  </div>
                </div>

                {/* Email capture CTA */}
                {!successMessage ? (
                  <div className="mt-6 space-y-4">
                    <div className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-5">
                      <p className="mb-4 text-center text-sm font-medium text-slate-300">
                        Like the wireframes? Let&apos;s turn these sketches into a real product.
                      </p>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="your.email@company.com"
                          disabled={isSending}
                          className={cn(
                            "flex-1 rounded-lg border border-slate-700/60 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 placeholder-slate-600",
                            "transition-all duration-300",
                            "focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                          )}
                        />

                        <motion.button
                          onClick={handleSendEmail}
                          disabled={!userEmail.trim() || isSending}
                          whileHover={{
                            scale:
                              userEmail.trim() && !isSending ? 1.02 : 1,
                          }}
                          whileTap={{
                            scale: userEmail.trim() && !isSending ? 0.98 : 1,
                          }}
                          className={cn(
                            "flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-6 py-3 text-sm font-semibold transition-all duration-300",
                            userEmail.trim() && !isSending
                              ? "border-violet-500/40 bg-violet-500/10 text-violet-300 shadow-lg shadow-violet-500/10 hover:bg-violet-500/15"
                              : "cursor-not-allowed border-slate-800 bg-slate-800/40 text-slate-600"
                          )}
                        >
                          {isSending ? (
                            <>
                              <Loader2
                                className="h-4 w-4 animate-spin"
                                strokeWidth={2.5}
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" strokeWidth={2} />
                              Let&apos;s Discuss &amp; Refine
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center"
                  >
                    <div className="mb-3 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                        <Check
                          className="h-6 w-6 text-emerald-400"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>
                    <p className="text-base font-semibold text-emerald-300">
                      {successMessage}
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      Check your inbox for your wireframe sketches and next steps.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center text-sm text-slate-500"
        >
          ✨ No commitment required. Get professional wireframe sketches of your app idea in seconds.
        </motion.p>
      </div>
    </section>
  );
}

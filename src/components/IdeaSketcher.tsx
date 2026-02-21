"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
      setGeneratedImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Failed to generate sketch:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to generate sketch. Please try again."
      );
    } finally {
      setIsGenerating(false);
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
              Free AI-Powered Visualization
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            See Your App Before It&apos;s Built
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Describe your app idea in plain English. Our AI will generate a stunning 
            3D visualization of your concept. If it resonates, let&apos;s turn it into reality.
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
                Generating sketch...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" strokeWidth={2} />
                Generate 3D Visualization
              </>
            )}
          </motion.button>

          {/* Loading overlay */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl bg-slate-950/90 backdrop-blur-md"
              >
                <div className="flex flex-col items-center gap-6">
                  {/* Large animated spinner */}
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-20 w-20 rounded-full border-4 border-slate-700 border-t-violet-500 md:h-24 md:w-24"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-violet-400 md:h-10 md:w-10" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Loading text */}
                  <div className="text-center">
                    <p className="text-lg font-semibold text-slate-200 md:text-xl">
                      Generating your sketch...
                    </p>
                    <p className="mt-2 text-sm text-slate-400">
                      This usually takes 15-30 seconds
                    </p>
                  </div>

                  {/* Animated dots */}
                  <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="h-2 w-2 rounded-full bg-violet-400"
                      />
                    ))}
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

                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src={generatedImageUrl}
                      alt="Generated architecture sketch"
                      fill
                      className="object-cover"
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
                        Like what you see? Let&apos;s turn this into reality.
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
                      Check your inbox (and spam folder) for your concept
                      visualization and next steps.
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
          ✨ No commitment required. Get a stunning 3D concept visualization in seconds.
        </motion.p>
      </div>
    </section>
  );
}

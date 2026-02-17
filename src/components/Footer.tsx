"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Linkedin, Github, Mail, Check, Copy } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Copy-to-clipboard email button                                     */
/* ------------------------------------------------------------------ */

function EmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "burakf@groupfnd.com";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* fallback: select the text */
    }
  }, [email]);

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex w-full items-center justify-between gap-4 rounded-xl border px-6 py-4 text-left transition-all duration-300",
        copied
          ? "border-emerald-500/40 bg-emerald-500/5"
          : "border-slate-700/50 bg-slate-800/40 hover:border-cyan-500/40 hover:bg-slate-800/70"
      )}
    >
      <div className="flex items-center gap-3">
        <Mail
          className={cn(
            "h-5 w-5 transition-colors",
            copied ? "text-emerald-400" : "text-slate-500 group-hover:text-cyan-400"
          )}
          strokeWidth={1.5}
        />
        <span
          className={cn(
            "font-[family-name:var(--font-geist-mono)] text-lg font-medium tracking-tight transition-colors md:text-xl",
            copied ? "text-emerald-400" : "text-slate-200"
          )}
        >
          {email}
        </span>
      </div>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all",
          copied
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-slate-700/40 text-slate-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-400"
        )}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Social link icons                                                  */
/* ------------------------------------------------------------------ */

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/burakfenercioglu/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/Burakfenerci5",
    icon: Github,
  },
];

/* ------------------------------------------------------------------ */
/*  Stagger container                                                  */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ------------------------------------------------------------------ */
/*  Footer component                                                   */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#020617] px-4 pt-24 md:pt-32"
    >
      {/* Top border glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="mx-auto max-w-6xl">
        {/* ---- Split layout ---- */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* LEFT — Identity typography */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col justify-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-5xl font-bold tracking-tight text-slate-100 md:text-6xl lg:text-7xl"
            >
              FND Group.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-xl text-slate-400 md:text-2xl"
            >
              The Venture Lab of{" "}
              <span className="font-semibold text-slate-100">
                Burak Fenercioglu
              </span>
              .
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-2 font-[family-name:var(--font-geist-mono)] text-sm tracking-widest text-slate-600"
            >
              Est. 2026
            </motion.p>

            {/* Decorative accent line */}
            <motion.div
              variants={fadeUp}
              className="mt-8 h-px w-24 bg-gradient-to-r from-cyan-500/40 to-transparent"
            />
          </motion.div>

          {/* RIGHT — Pitch & Contact */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeUp}>
              <span className="mb-2 inline-block rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-violet-400">
                Taking On New Projects
              </span>
            </motion.div>

            <motion.h3
              variants={fadeUp}
              className="mt-4 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl"
            >
              Ready to build your AI-first app?
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="mt-3 max-w-md text-base leading-relaxed text-slate-400"
            >
              We partner with ambitious entrepreneurs to turn app ideas into
              revenue-generating products. Enterprise architecture meets startup
              velocity.
            </motion.p>

            {/* Email CTA */}
            <motion.div
              variants={fadeUp}
              className="mt-8 max-w-md"
            >
              <EmailButton />
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex items-center gap-2"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    "border border-slate-800 bg-transparent",
                    "text-slate-500 transition-all duration-300",
                    "hover:border-slate-600 hover:bg-slate-800/50 hover:text-white"
                  )}
                >
                  <social.icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="mt-20 border-t border-slate-800/60 py-8 md:mt-28">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-600">
              &copy; 2026 FND Group. Built with Next.js &amp; Agentforce Principles.
            </p>

            <div className="flex items-center gap-1.5 text-sm text-slate-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-slate-500">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

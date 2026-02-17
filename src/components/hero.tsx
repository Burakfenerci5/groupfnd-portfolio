"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Profile avatar with glow ring + floating badge                     */
/* ------------------------------------------------------------------ */

function ProfileAvatar() {
  return (
    <motion.div
      variants={scaleIn}
      className="relative flex items-center justify-center"
    >
      {/* Outer animated glow ring */}
      <div className="absolute h-[280px] w-[280px] rounded-full md:h-[340px] md:w-[340px] lg:h-[380px] lg:w-[380px]">
        <div className="absolute inset-0 animate-spin rounded-full [animation-duration:8s]">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#38bdf8,#818cf8,#38bdf8,transparent,#38bdf8)] opacity-30 blur-md" />
        </div>
      </div>

      {/* Static glow aura */}
      <div className="absolute h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-2xl md:h-[340px] md:w-[340px] lg:h-[380px] lg:w-[380px]" />

      {/* Avatar container */}
      <div className="relative h-[260px] w-[260px] md:h-[320px] md:w-[320px] lg:h-[360px] lg:w-[360px]">
        {/* Border ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/20" />

        {/* Inner ring for depth */}
        <div className="absolute inset-[3px] rounded-full border border-slate-700/50" />

        {/* Image */}
        <div className="absolute inset-[4px] overflow-hidden rounded-full bg-slate-800">
          <Image
            src="/images/burak-profile.png"
            alt="Burak Fenercioglu — Founder of FND Group AI Product Studio"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 260px, (max-width: 1024px) 320px, 360px"
          />
        </div>

        {/* Floating glassmorphism badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -bottom-3 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 shadow-xl shadow-black/20 backdrop-blur-xl">
            <span className="text-base">⚡</span>
            <span className="whitespace-nowrap text-xs font-semibold text-slate-200">
              AI Product Studio
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero section                                                       */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden px-4 py-20">
      {/* Spotlights */}
      <Spotlight
        className="-top-20 md:-top-32"
        fill="rgba(56, 189, 248, 1)"
      />
      <Spotlight
        className="-top-10 translate-x-[15vw] md:-top-20"
        fill="rgba(139, 92, 246, 0.8)"
      />

      {/* Ambient grid lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ---- Split layout container ---- */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
        {/* LEFT — Text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center md:items-start md:text-left"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-700/60 bg-slate-800/50 px-5 py-2 text-sm backdrop-blur-sm">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
                Enterprise Rigor
              </span>
              <span className="h-3.5 w-px bg-slate-600" />
              <span className="flex items-center gap-1.5 text-violet-400">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Startup Speed
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              Turn your dream app
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              into a revenue-generating reality.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-lg text-base leading-relaxed text-slate-400 md:text-lg"
          >
            FND Group is a boutique AI Product Studio. We bridge the gap between{" "}
            <span className="font-semibold text-slate-200">
              Enterprise Architecture
            </span>{" "}
            and{" "}
            <span className="font-semibold text-slate-200">
              Rapid GenAI Prototyping
            </span>{" "}
            to launch scalable products in weeks, not months.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <motion.a
              href="mailto:burakf@groupfnd.com?subject=Start%20My%20Project&body=Hi%20Burak,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20FND%20Group."
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-glow group relative inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-cyan-300 shadow-lg shadow-cyan-500/10 sm:text-base"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              Start Your Project
            </motion.a>

            <motion.a
              href="#ecosystem"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-ghost inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-slate-300 sm:text-base"
            >
              View Our Portfolio
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-y-0.5"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-2 md:items-start"
          >
            <span className="text-xs uppercase tracking-wider text-slate-600">
              Trusted by leaders at
            </span>
            <div className="flex items-center gap-3 text-sm font-semibold">
              <span className="text-slate-400">Salesforce</span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-slate-400">GE</span>
              <span className="h-4 w-px bg-slate-700" />
              <span className="text-slate-400">Honeywell</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — Profile Image */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex justify-center md:justify-end"
        >
          <ProfileAvatar />
        </motion.div>
      </div>

      {/* Scroll indicator — centered below both columns */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

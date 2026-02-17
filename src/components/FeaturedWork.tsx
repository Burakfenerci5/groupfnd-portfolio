"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Check } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const chatMessages = [
  { role: "agent" as const, text: "Hi! I'm AgentForce. How can I assist with Hallmark Care today?" },
  { role: "user" as const, text: "I need a care plan for Mrs. Johnson." },
  { role: "agent" as const, text: "Found 3 matching plans based on her profile & preferences." },
  { role: "user" as const, text: "Show me the recommended option." },
  { role: "agent" as const, text: "Opening 'Premium Home Care' — 4.9★ rating, 12-week program..." },
];

const techStack = [
  { name: "SF Agentforce", abbr: "AF", color: "#00A1E0" },
  { name: "Data Cloud", abbr: "DC", color: "#1B96FF" },
  { name: "Next.js 14", abbr: "N", color: "#ffffff" },
  { name: "Supabase", abbr: "SB", color: "#3ecf8e" },
  { name: "OpenAI", abbr: "AI", color: "#10a37f" },
  { name: "Python", abbr: "Py", color: "#3776ab" },
  { name: "TypeScript", abbr: "TS", color: "#3178c6" },
];

const services = [
  "MVP Development",
  "Agentforce Deployment",
  "AI Strategy Roadmaps",
];

/* ------------------------------------------------------------------ */
/*  Shared card wrapper                                                */
/* ------------------------------------------------------------------ */

function WorkCard({
  className,
  children,
  href,
  glowColor = "rgba(56,189,248,0.06)",
}: {
  className?: string;
  children: ReactNode;
  href: string;
  glowColor?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-slate-800 bg-[#0f172a]",
        "transition-all duration-500",
        "hover:border-slate-600 hover:shadow-xl",
        className
      )}
    >
      {children}

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Mouse-follow glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 60%)`,
        }}
      />
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Badge                                                              */
/* ------------------------------------------------------------------ */

function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Card A — Chat Mockup                                               */
/* ------------------------------------------------------------------ */

function ChatMockup() {
  return (
    <div className="mx-auto mt-auto w-full max-w-[280px] rounded-xl border border-slate-700/40 bg-slate-950/80 p-3 font-[family-name:var(--font-geist-mono)] text-[11px] shadow-2xl">
      {/* Header */}
      <div className="mb-2.5 flex items-center gap-2 border-b border-slate-700/30 pb-2">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-cyan-400"
          >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          </svg>
        </div>
        <span className="font-semibold text-slate-300">AgentForce</span>
        <span className="ml-auto flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[9px] text-slate-500">Online</span>
        </span>
      </div>

      {/* Messages */}
      <div className="space-y-1.5">
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-2.5 py-1.5 leading-relaxed",
                msg.role === "agent"
                  ? "bg-cyan-500/10 text-cyan-200/80"
                  : "bg-slate-700/50 text-slate-300/80"
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-slate-700/30 bg-slate-800/50 px-2.5 py-1.5">
        <span className="text-[10px] text-slate-500">Ask AgentForce...</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="ml-auto text-cyan-500/50"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card E — Horizontal tech marquee                                   */
/* ------------------------------------------------------------------ */

function HorizontalMarquee() {
  const tripled = [...techStack, ...techStack, ...techStack];

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Left / right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0f172a] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0f172a] to-transparent sm:w-16" />

      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          x: {
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="flex items-center gap-4 px-4"
      >
        {tripled.map((tech, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2.5 rounded-lg border border-slate-800/60 bg-slate-900/60 px-4 py-3"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[10px] font-extrabold"
              style={{
                backgroundColor: tech.color + "15",
                color: tech.color,
              }}
            >
              {tech.abbr}
            </div>
            <span className="whitespace-nowrap text-sm font-medium text-slate-400">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blueprint decorative visual                                        */
/* ------------------------------------------------------------------ */

function BlueprintVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.07] to-violet-500/[0.07]" />

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -right-8 -top-8 h-32 w-32 rounded-2xl border border-sky-500/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-4 right-12 h-20 w-20 rounded-xl border border-violet-500/10"
      />
      <div className="absolute bottom-6 left-6 flex gap-1.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full bg-gradient-to-r from-sky-500/20 to-violet-500/20"
            style={{ width: `${20 + i * 12}px` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Enable mouse-follow glow on grid container                         */
/* ------------------------------------------------------------------ */

function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
  const cards = e.currentTarget.querySelectorAll<HTMLElement>("[data-glow]");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  });
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function FeaturedWork() {
  return (
    <section className="relative bg-[#020617] px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-cyan-400/80">
            Portfolio
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Featured Work
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-500">
            Enterprise architecture meets rapid AI prototyping. Each project
            shipped at the intersection.
          </p>
        </motion.div>

        {/* ---- Bento Grid ---- */}
        <div
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[260px]"
        >
          {/* ======================================================= */}
          {/*  Card A — Hallmark Agentforce  (2 col × 2 row)          */}
          {/* ======================================================= */}
          <WorkCard
            href="https://care.hallmark.com/s/"
            glowColor="rgba(0,161,224,0.08)"
            className="min-h-[480px] p-6 md:col-span-2 md:row-span-2 md:min-h-0"
          >
            <div data-glow className="absolute inset-0" />

            <Badge className="mb-3 self-start border border-blue-400/20 bg-blue-500/10 text-blue-400">
              Salesforce Architect
            </Badge>

            <h3 className="text-2xl font-bold tracking-tight text-slate-100">
              Enterprise Agentforce
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              Orchestrating AI at scale. Designed Hallmark&apos;s Service Agent
              &amp; BetFanatics Bot.
            </p>

            <ChatMockup />

            {/* Expertise tags */}
            <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
              {["Agentforce", "Data Cloud", "RAG Architecture"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-blue-500/15 bg-blue-500/5 px-2.5 py-1 text-[10px] font-medium text-blue-300/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Salesforce Certified Architect cloud icon */}
            <div className="absolute right-5 top-5 flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-md border border-blue-500/15 bg-blue-500/5 px-2 py-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-400"
                >
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-blue-400/70">
                  CTA
                </span>
              </div>
              <div className="text-slate-600 transition-colors group-hover:text-slate-400">
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
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
            </div>
          </WorkCard>

          {/* ======================================================= */}
          {/*  Card B — Blueprint  (2 col × 1 row)                    */}
          {/* ======================================================= */}
          <WorkCard
            href="https://blueprint.groupfnd.com"
            glowColor="rgba(139,92,246,0.08)"
            className="min-h-[240px] p-6 md:col-span-2 md:min-h-0"
          >
            <div data-glow className="absolute inset-0" />
            <BlueprintVisual />

            <div className="relative z-10 flex h-full flex-col">
              <Badge className="mb-3 self-start border border-violet-400/20 bg-violet-500/10 text-violet-400">
                Full Stack + GenAI
              </Badge>

              <h3 className="text-xl font-bold tracking-tight text-slate-100">
                Blueprint
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                AI-Powered Strategic Planning SaaS. Turns business goals into
                actionable roadmaps with generative intelligence.
              </p>

              {/* Bottom decorative bar */}
              <div className="mt-auto flex items-center gap-2 pt-4">
                <div className="h-px flex-1 bg-gradient-to-r from-sky-500/20 via-violet-500/20 to-transparent" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-600">
                  SaaS
                </span>
              </div>
            </div>

            <div className="absolute right-5 top-5 text-slate-600 transition-colors group-hover:text-slate-400">
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
          </WorkCard>

          {/* ======================================================= */}
          {/*  Card C — Veeva LSC Planner  (1 col × 1 row)            */}
          {/* ======================================================= */}
          <WorkCard
            href="https://veeva-lsc-planner.vercel.app"
            glowColor="rgba(16,185,129,0.08)"
            className="min-h-[240px] p-6 md:min-h-0"
          >
            <div data-glow className="absolute inset-0" />

            <Badge className="mb-3 self-start border border-emerald-400/20 bg-emerald-500/10 text-emerald-400">
              Optimization
            </Badge>

            <h3 className="text-lg font-bold tracking-tight text-slate-100">
              Veeva LSC Planner
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              Resource optimization &amp; analytics for life sciences
              commercial teams.
            </p>

            {/* Mini chart decoration */}
            <div className="mt-auto flex items-end gap-1 pt-6">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="w-full max-w-[12px] rounded-sm bg-gradient-to-t from-emerald-500/20 to-emerald-400/5"
                  style={{ maxHeight: `${h}%`, minHeight: 4 }}
                />
              ))}
            </div>

            <div className="absolute right-5 top-5 text-slate-600 transition-colors group-hover:text-slate-400">
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
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
          </WorkCard>

          {/* ======================================================= */}
          {/*  Card D — Services (NEW) (1 col × 1 row)                */}
          {/* ======================================================= */}
          <WorkCard
            href="#contact"
            glowColor="rgba(139,92,246,0.08)"
            className="min-h-[240px] p-6 md:min-h-0"
          >
            <div data-glow className="absolute inset-0" />

            <Badge className="mb-3 self-start border border-violet-400/20 bg-violet-500/10 text-violet-400">
              How We Help
            </Badge>

            <h3 className="text-lg font-bold tracking-tight text-slate-100">
              Our Services
            </h3>

            {/* Services checklist */}
            <div className="mt-4 space-y-2.5">
              {services.map((service) => (
                <div key={service} className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-violet-500/10">
                    <Check className="h-3.5 w-3.5 text-violet-400" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm leading-relaxed text-slate-300">
                    {service}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4">
              <div className="group/cta inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 transition-colors hover:text-violet-300">
                <span>Let&apos;s talk</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform group-hover/cta:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </WorkCard>

          {/* ======================================================= */}
          {/*  Card E — The Toolbelt  (4 col × 1 row, horizontal)     */}
          {/* ======================================================= */}
          <WorkCard
            href="#toolbelt"
            glowColor="rgba(56,189,248,0.06)"
            className="min-h-[100px] md:col-span-4 md:min-h-0"
          >
            <div data-glow className="absolute inset-0" />

            <div className="flex h-full items-center gap-4 px-6 py-5">
              <div className="flex shrink-0 items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-500"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-slate-500">
                  The Toolbelt
                </span>
              </div>

              <div className="h-8 w-px bg-slate-800" />

              <HorizontalMarquee />
            </div>
          </WorkCard>
        </div>
      </div>
    </section>
  );
}

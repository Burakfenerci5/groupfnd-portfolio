"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Map, Bot, GraduationCap, ArrowRight, type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Node data                                                          */
/* ------------------------------------------------------------------ */

interface NodeData {
  icon: LucideIcon;
  label: string;
  role: string;
  description: string;
  color: {
    bg: string;
    border: string;
    text: string;
    glow: string;
  };
}

const nodes: NodeData[] = [
  {
    icon: Map,
    label: "Blueprint",
    role: "Strategy & Roadmapping",
    description: "We don't guess; we use AI to architect your entire business model before writing a line of code.",
    color: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      glow: "shadow-cyan-500/20",
    },
  },
  {
    icon: Bot,
    label: "Hats",
    role: "The AI Workforce",
    description: "We build custom agents that automate your operations from Day 1.",
    color: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "shadow-amber-500/20",
    },
  },
  {
    icon: GraduationCap,
    label: "Vantage",
    role: "Knowledge Transfer",
    description: "We ensure your team (and agents) are trained to scale the platform.",
    color: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      text: "text-violet-400",
      glow: "shadow-violet-500/20",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Animated arrow                                                     */
/* ------------------------------------------------------------------ */

function AnimatedArrow({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="flex items-center gap-1"
        animate={{ x: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8" style={{ color }} strokeWidth={2} />
      </motion.div>
      <div className="hidden h-0.5 w-12 sm:block" style={{ backgroundColor: color, opacity: 0.3 }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single node                                                        */
/* ------------------------------------------------------------------ */

function FlywheelNode({ node, index }: { node: NodeData; index: number }) {
  const Icon = node.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Icon container */}
      <div className="relative">
        <div
          className={cn(
            "absolute -inset-2 rounded-2xl opacity-20",
            node.color.border,
            "border"
          )}
        />
        <div
          className={cn(
            "relative flex h-16 w-16 items-center justify-center rounded-xl border sm:h-20 sm:w-20 md:h-24 md:w-24 md:rounded-2xl",
            node.color.bg,
            node.color.border,
            "shadow-lg",
            node.color.glow,
            "bg-slate-900"
          )}
        >
          <Icon
            className={cn(
              "h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11",
              node.color.text
            )}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-base font-bold text-slate-200 sm:text-lg">
          {node.label}
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-wider sm:text-[11px]",
            node.color.text
          )}
        >
          {node.role}
        </span>
        <span className="mt-1 max-w-[180px] text-center text-[11px] leading-tight text-slate-500 sm:text-xs">
          {node.description}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function Flywheel() {
  return (
    <section className="relative overflow-hidden bg-slate-900 px-4 py-24 md:py-32">
      {/* Ambient blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-500/[0.03] blur-3xl" />
        <div className="absolute bottom-1/3 left-1/2 h-48 w-48 rounded-full bg-amber-500/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-cyan-400/80">
            Our Methodology
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            Our Proprietary Launch Engine
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500 md:text-base">
            The 3-step framework that turns your vision into a scalable, revenue-generating product.
          </p>
        </motion.div>

        {/* ---- Flow Diagram ---- */}
        <div className="mb-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-4 md:mb-20 md:gap-6">
          {/* Blueprint */}
          <FlywheelNode node={nodes[0]} index={0} />

          {/* Arrow 1 */}
          <div className="flex flex-col items-center gap-2">
            <AnimatedArrow color="rgba(56,189,248,0.6)" delay={0} />
            <span className="text-[9px] font-medium uppercase tracking-wider text-slate-600 sm:text-[10px]">
              Deploy Agents
            </span>
          </div>

          {/* Hats */}
          <FlywheelNode node={nodes[1]} index={1} />

          {/* Arrow 2 */}
          <div className="flex flex-col items-center gap-2">
            <AnimatedArrow color="rgba(245,158,11,0.6)" delay={0.5} />
            <span className="text-[9px] font-medium uppercase tracking-wider text-slate-600 sm:text-[10px]">
              Train Team
            </span>
          </div>

          {/* Vantage */}
          <FlywheelNode node={nodes[2]} index={2} />
        </div>

        {/* Return arrow back to Blueprint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16 flex items-center justify-center gap-3 md:mb-20"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet-500/30 sm:w-24" />
          <motion.div
            animate={{ x: [0, -8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <ArrowRight
              className="h-6 w-6 rotate-180 sm:h-8 sm:w-8"
              style={{ color: "rgba(139,92,246,0.6)" }}
              strokeWidth={2}
            />
          </motion.div>
          <span className="text-[9px] font-medium uppercase tracking-wider text-slate-600 sm:text-[10px]">
            Iterate & Improve
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet-500/30 sm:w-24" />
        </motion.div>

        {/* ---- Narrative Text ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h3 className="mb-5 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
            Why It Matters
          </h3>
          <p className="text-base leading-relaxed text-slate-400 md:text-lg">
            Most agencies just write code. We deliver a{" "}
            <span className="font-semibold text-slate-200">
              closed-loop ecosystem
            </span>
            . By leveraging our internal suite of tools, we reduce development
            time by 40% and ensure your product is enterprise-ready from the
            first commit.
          </p>

          {/* Decorative divider */}
          <div className="mx-auto mt-10 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-700" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-700" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

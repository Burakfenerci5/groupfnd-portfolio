"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Map, BarChart3, Users } from "lucide-react";
import { type LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Node data                                                          */
/* ------------------------------------------------------------------ */

interface EcoNode {
  icon: LucideIcon;
  label: string;
  sublabel: string;
  color: {
    bg: string;
    border: string;
    text: string;
    glow: string;
    beam: string;
  };
  status: "live" | "future";
}

const nodes: EcoNode[] = [
  {
    icon: Map,
    label: "Blueprint",
    sublabel: "Strategy & Planning",
    color: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
      text: "text-cyan-400",
      glow: "shadow-cyan-500/20",
      beam: "rgba(56, 189, 248, 0.6)",
    },
    status: "live",
  },
  {
    icon: BarChart3,
    label: "Vantage",
    sublabel: "Analytics & Execution",
    color: {
      bg: "bg-violet-500/10",
      border: "border-violet-500/30",
      text: "text-violet-400",
      glow: "shadow-violet-500/20",
      beam: "rgba(139, 92, 246, 0.6)",
    },
    status: "live",
  },
  {
    icon: Users,
    label: "Hats",
    sublabel: "Unified Identity",
    color: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "shadow-amber-500/20",
      beam: "rgba(245, 158, 11, 0.6)",
    },
    status: "future",
  },
];

/* ------------------------------------------------------------------ */
/*  Glowing beam connector                                             */
/* ------------------------------------------------------------------ */

function BeamConnector({
  delay = 0,
  beamColor = "rgba(56, 189, 248, 0.6)",
}: {
  delay?: number;
  beamColor?: string;
}) {
  return (
    <div className="relative mx-1 h-[2px] flex-1 overflow-hidden rounded-full sm:mx-3">
      {/* Static dim track */}
      <div className="absolute inset-0 rounded-full bg-slate-800" />

      {/* Subtle static glow along the track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />

      {/* Animated traveling beam */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, transparent 0%, transparent 30%, ${beamColor} 50%, transparent 70%, transparent 100%)`,
          filter: "blur(0.5px)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "linear",
          delay,
          repeatDelay: 0.6,
        }}
      />

      {/* Second dimmer beam for depth */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `linear-gradient(90deg, transparent 0%, transparent 40%, ${beamColor} 50%, transparent 60%, transparent 100%)`,
          filter: "blur(2px)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "linear",
          delay: delay + 0.1,
          repeatDelay: 0.6,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single node                                                        */
/* ------------------------------------------------------------------ */

function EcosystemNode({ node, index }: { node: EcoNode; index: number }) {
  const Icon = node.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex shrink-0 flex-col items-center gap-3"
    >
      {/* Node circle */}
      <div className="relative">
        {/* Outer pulse ring — only on live nodes */}
        {node.status === "live" && (
          <div
            className={cn(
              "absolute -inset-2.5 rounded-[22px] border opacity-0 transition-opacity duration-500 md:-inset-3 md:rounded-[26px]",
              node.color.border,
              "animate-pulse-slow"
            )}
            style={{ opacity: 0.15 }}
          />
        )}

        <div
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-xl border sm:h-16 sm:w-16 sm:rounded-2xl md:h-20 md:w-20",
            node.color.bg,
            node.color.border,
            "shadow-lg",
            node.color.glow,
            "transition-all duration-300",
            node.status === "future" && "border-dashed"
          )}
        >
          <Icon
            className={cn("h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8", node.color.text)}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Labels */}
      <div className="flex flex-col items-center gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-200 sm:text-sm md:text-base">
            {node.label}
          </span>
          {node.status === "future" && (
            <span className="rounded-full bg-amber-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-amber-400/80 sm:text-[9px]">
              2026
            </span>
          )}
        </div>
        <span className="text-[10px] text-slate-500 sm:text-[11px] md:text-xs">
          {node.sublabel}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export function EcosystemVision() {
  return (
    <section className="relative overflow-hidden bg-slate-900 px-4 py-24 md:py-32">
      {/* Ambient background blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.03] blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-violet-500/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-amber-500/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:mb-20"
        >
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-cyan-400/80">
            Roadmap
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            The 2026 Ecosystem
          </h2>
        </motion.div>

        {/* ---- Connected Node Diagram ---- */}
        <div className="mb-20 flex items-center px-2 sm:px-6 md:mb-24 md:px-8">
          <EcosystemNode node={nodes[0]} index={0} />

          <BeamConnector delay={0.5} beamColor={nodes[0].color.beam} />

          <EcosystemNode node={nodes[1]} index={1} />

          <BeamConnector delay={1.8} beamColor={nodes[1].color.beam} />

          <EcosystemNode node={nodes[2]} index={2} />
        </div>

        {/* ---- SVG connector arrowheads (desktop only) ---- */}
        {/* Rendered behind the flex layout via absolute positioning */}

        {/* ---- Narrative Text ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h3 className="mb-5 text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
            The Solopreneur&apos;s OS
          </h3>
          <p className="text-base leading-relaxed text-slate-400 md:text-lg">
            My 2026 resolution is to build a connected suite of tools, proving
            that{" "}
            <span className="font-medium text-slate-200">
              one person with AI can execute at enterprise scale
            </span>
            . From strategy{" "}
            <span className="font-medium text-cyan-400/90">(Blueprint)</span> to
            execution{" "}
            <span className="font-medium text-violet-400/90">(Vantage)</span>,
            FND Group is the lab where I build the future.
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

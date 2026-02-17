"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  icon,
  header,
  colSpan = 1,
}: {
  className?: string;
  title?: string | ReactNode;
  description?: string | ReactNode;
  icon?: ReactNode;
  header?: ReactNode;
  colSpan?: 1 | 2 | 3;
}) {
  const colSpanClass: Record<number, string> = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.015 }}
      className={cn(
        "group relative col-span-1 overflow-hidden rounded-2xl",
        "border border-slate-700/50",
        "bg-gradient-to-br from-slate-800/80 to-slate-900/90",
        "p-6 shadow-lg",
        "transition-all duration-300",
        /* Glow effect on hover */
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl",
        "before:opacity-0 before:transition-opacity before:duration-500",
        "before:bg-[radial-gradient(600px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(56,189,248,0.12),transparent_40%)]",
        "hover:before:opacity-100",
        "hover:border-cyan-500/40 hover:shadow-cyan-500/10 hover:shadow-2xl",
        colSpanClass[colSpan],
        className
      )}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--mouse-x",
          `${e.clientX - rect.left}px`
        );
        e.currentTarget.style.setProperty(
          "--mouse-y",
          `${e.clientY - rect.top}px`
        );
      }}
    >
      {/* Animated border glow */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
          "group-hover:opacity-100",
          "bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(56,189,248,0.08),transparent_40%)]"
        )}
      />

      {header && (
        <div className="mb-4 overflow-hidden rounded-xl">{header}</div>
      )}

      <div className="relative z-10">
        {icon && (
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
            {icon}
          </div>
        )}

        {title && (
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h3>
        )}

        {description && (
          <p className="text-sm leading-relaxed text-slate-400">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

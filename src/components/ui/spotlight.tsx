"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={cn(
        "pointer-events-none absolute -top-40 left-1/2 z-0 -translate-x-1/2",
        className
      )}
    >
      <svg
        width="1200"
        height="800"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[80vw] max-w-[1200px]"
      >
        <defs>
          {/* Primary beam — wide and soft */}
          <radialGradient
            id="spotlight-outer"
            cx="50%"
            cy="0%"
            r="70%"
            fx="50%"
            fy="0%"
          >
            <stop offset="0%" stopColor={fill} stopOpacity="0.12" />
            <stop offset="40%" stopColor={fill} stopOpacity="0.04" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>

          {/* Inner hot-spot — tighter, brighter */}
          <radialGradient
            id="spotlight-inner"
            cx="50%"
            cy="0%"
            r="35%"
            fx="50%"
            fy="0%"
          >
            <stop offset="0%" stopColor={fill} stopOpacity="0.18" />
            <stop offset="50%" stopColor={fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="600" cy="0" rx="600" ry="500" fill="url(#spotlight-outer)" />
        <ellipse cx="600" cy="0" rx="350" ry="400" fill="url(#spotlight-inner)" />
      </svg>
    </motion.div>
  );
}

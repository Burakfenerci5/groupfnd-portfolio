"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Flywheel } from "@/components/Flywheel";
import { Footer } from "@/components/Footer";

function SkeletonHeader({ gradient }: { gradient: string }) {
  return (
    <div
      className={`flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-br ${gradient} opacity-80`}
    >
      <div className="h-6 w-6 animate-pulse-slow rounded-full bg-white/20" />
    </div>
  );
}

function IconBrain() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

const items = [
  {
    title: "AI-Powered Inference",
    description:
      "Deploy and scale machine learning models with sub-100ms latency. Built for real-time applications that demand speed.",
    icon: <IconBrain />,
    header: <SkeletonHeader gradient="from-cyan-500/20 to-blue-600/20" />,
    colSpan: 2 as const,
  },
  {
    title: "Edge Functions",
    description:
      "Run serverless functions at the edge, closer to your users. Zero cold starts.",
    icon: <IconZap />,
    header: <SkeletonHeader gradient="from-violet-500/20 to-purple-600/20" />,
    colSpan: 1 as const,
  },
  {
    title: "Vector Search",
    description:
      "Semantic search over millions of embeddings with pgvector integration.",
    icon: <IconSparkles />,
    header: <SkeletonHeader gradient="from-emerald-500/20 to-teal-600/20" />,
    colSpan: 1 as const,
  },
  {
    title: "Full-Stack TypeScript",
    description:
      "End-to-end type safety from database to UI. Next.js App Router, tRPC, Drizzle ORM — the modern stack.",
    icon: <IconCode />,
    header: <SkeletonHeader gradient="from-orange-500/20 to-amber-600/20" />,
    colSpan: 2 as const,
  },
  {
    title: "Multi-Modal Pipeline",
    description:
      "Orchestrate complex AI workflows that chain vision, language, and code generation models. Built-in retry logic, streaming responses, and observability.",
    icon: <IconLayers />,
    header: <SkeletonHeader gradient="from-rose-500/20 to-pink-600/20" />,
    colSpan: 3 as const,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-900 font-[family-name:var(--font-geist-sans)]">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Featured Work Section */}
      <FeaturedWork />

      {/* Flywheel Section */}
      <Flywheel />

      {/* Bento Grid Section */}
      <section id="ecosystem" className="relative z-10 px-4 pb-24">
        <BentoGrid className="mx-auto max-w-5xl">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
              header={item.header}
              colSpan={item.colSpan}
            />
          ))}
        </BentoGrid>
      </section>

      {/* Footer & Bio */}
      <Footer />
    </main>
  );
}

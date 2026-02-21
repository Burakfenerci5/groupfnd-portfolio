"use client";

import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Flywheel } from "@/components/Flywheel";
import { IdeaSketcher } from "@/components/IdeaSketcher";
import { Footer } from "@/components/Footer";

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

      {/* Idea Sketcher Lead Gen */}
      <IdeaSketcher />

      {/* Footer & Bio */}
      <Footer />
    </main>
  );
}

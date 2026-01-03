"use client";
import { motion } from "motion/react";
import RoomBtns from "@/components/common/room-btns/RoomBtns";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Premium Spotlight Effects */}
      <div className="spotlight-intense" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge with line decorations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <div className="h-px w-12 bg-linear-to-r from-transparent to-border" />
            <div className="diamond flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-muted-foreground">
                Simplify your workflow
              </span>
            </div>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-border" />
          </motion.div>

          {/* Main Heading - Elegant serif-inspired look */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-8 leading-[0.95]"
          >
            <span className="text-foreground">1v1 Coding Battles.</span>
            <br />
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Solve Faster. Win Smarter.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          >
            CodeClash lets two developers compete in real-time on the same
            coding problem. Create a room, invite an opponent, and race against
            the clock.
          </motion.p>

          <RoomBtns />
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "motion/react";
import RoomBtns from "@/components/common/room-btns/RoomBtns";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Spotlight Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-primary/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-border" />
            <div className="diamond flex items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium text-muted-foreground">
                Ready to compete?
              </span>
            </div>
            <div className="h-px w-12 bg-linear-to-l from-transparent to-border" />
          </div>

          <h2 className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight mb-6">
            Ready to Clash?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            Jump into a coding battle in seconds. No sign-up required.
          </p>

          {/* CTA */}
          <RoomBtns />
        </motion.div>
      </div>
    </section>
  );
}

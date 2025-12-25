"use client";
import { AnimatePresence, motion } from "motion/react";
import { useWaitingRoomStore } from "@/store/useWaitingRoomStore";
import { Swords } from "lucide-react";

export default function Countdown() {
  const { countdown } = useWaitingRoomStore();
  return (
    <AnimatePresence>
      {countdown !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center"
        >
          <motion.div
            key={countdown}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-center"
          >
            {countdown && countdown > 0 ? (
              <span className="text-9xl font-bold bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {countdown}
              </span>
            ) : (
              <div className="flex items-center gap-4">
                <Swords className="w-16 h-16 text-accent" />
                <span className="text-6xl font-bold text-foreground">
                  CLASH!
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

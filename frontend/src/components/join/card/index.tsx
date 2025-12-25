"use client";
import { motion } from "framer-motion";
import JoinForm from "./form";
import { Users } from "lucide-react";

export default function JoinCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50" />

        <div className="relative glass-strong rounded-2xl p-8 border border-border/50">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center mx-auto mb-6"
          >
            <Users className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-2">
            Join a Room
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Enter the room code shared by your opponent
          </p>

          {/* Form */}
          <JoinForm />
        </div>
      </div>
    </motion.div>
  );
}

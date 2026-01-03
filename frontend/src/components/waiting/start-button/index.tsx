"use client";
import { AnimatePresence, motion } from "motion/react";
import { useWaitingRoomStore } from "@/store/useWaitingRoomStore";
import { roomAccessor } from "@/utils/accessors";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function StartButton({ roomId }: { roomId: string }) {
  const { canStart, isCreator, activeUsers } = useWaitingRoomStore();
  const { startMatch } = roomAccessor;

  const handleStartMatch = () => {
    startMatch(roomId);
  };

  const status = canStart();
  const active = activeUsers();

  return (
    <AnimatePresence mode="wait">
      {status && isCreator ? (
        <motion.div
          key="start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Button
            onClick={handleStartMatch}
            className="h-14 px-12 bg-linear-to-r from-primary to-accent hover:opacity-90 text-primary-foreground rounded-xl font-medium text-lg shadow-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Match
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="waiting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Zap className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="text-muted-foreground">
            {active.length < 2
              ? "Waiting for opponent to join..."
              : "Waiting for creator to start..."}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

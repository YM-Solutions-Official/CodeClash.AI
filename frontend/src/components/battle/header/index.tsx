"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";
import { roomAccessor } from "@/utils/accessors";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Clock, User } from "lucide-react";

export default function RoomHeader() {
  const { timeRemaining, roomInfo, opponentStatus, opponentSubmitted } =
    useBattleArenaStore();
  const { getTimerColor, formatTime } = roomAccessor;

  const isLastMinute = timeRemaining! <= 60;

  return (
    <header className="h-14 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <Image
          src="/images/icon-2.png"
          height={50}
          width={50}
          alt="logo-image"
        />
        <div className="h-6 w-px bg-border/50" />
        <span className="text-sm text-muted-foreground font-mono">
          Room: {roomInfo?.roomCode ?? "-"}
        </span>
      </div>

      {/* Timer */}
      <motion.div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 ${getTimerColor(
          timeRemaining!
        )}`}
        animate={isLastMinute ? { scale: [1, 1.02, 1] } : {}}
        transition={{
          duration: 0.5,
          repeat: isLastMinute ? Infinity : 0,
        }}
      >
        <Clock className="w-4 h-4" />
        <span className="font-mono font-semibold text-lg">
          {timeRemaining ? (
            formatTime(timeRemaining)
          ) : (
            <Skeleton className="h-5 w-12 bg-muted-foreground" />
          )}
        </span>
      </motion.div>

      {/* Opponent status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/30">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Opponent</span>

          <div className="flex items-center gap-1.5">
            {opponentSubmitted ? (
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            ) : opponentStatus === "typing" ? (
              <motion.div
                className="flex gap-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-accent"
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

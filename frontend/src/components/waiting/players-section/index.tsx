"use client";
import { motion } from "motion/react";
import { useWaitingRoomStore } from "@/store/useWaitingRoomStore";
import { Swords, Users } from "lucide-react";

export default function PlayersSection() {
  const { activeUsers, isCreator } = useWaitingRoomStore();

  const active = activeUsers();
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Users className="w-5 h-5 text-muted-foreground" />
        <span className="text-muted-foreground">
          Players ({active.length}/2)
        </span>
      </div>

      <div className="flex items-center justify-center gap-8">
        {/* Player 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
            <span className="text-2xl font-semibold text-primary">
              {active[0]?.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium">{active[0]}</span>
          {isCreator && <span className="text-xs text-primary">Creator</span>}
        </motion.div>

        {/* VS */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            animate={{
              scale: activeUsers?.length! >= 2 ? [1, 1.1, 1] : 1,
              opacity: activeUsers?.length! >= 2 ? 1 : 0.3,
            }}
            transition={{
              duration: 0.5,
              repeat: activeUsers?.length! >= 2 ? Infinity : 0,
              repeatDelay: 1,
            }}
            className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center"
          >
            <Swords className="w-5 h-5 text-accent" />
          </motion.div>
          <span className="text-xs text-muted-foreground font-medium">VS</span>
        </div>

        {/* Player 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: active.length >= 2 ? 1 : 0.3,
            x: 0,
          }}
          className="flex flex-col items-center gap-3"
        >
          <div
            className={`w-20 h-20 rounded-2xl border flex items-center justify-center ${
              active.length >= 2
                ? "bg-linear-to-br from-accent/20 to-accent/5 border-accent/30"
                : "bg-secondary/20 border-border/30 border-dashed"
            }`}
          >
            {active.length >= 2 ? (
              <span className="text-2xl font-semibold text-accent">
                {active[1].charAt(0)}
              </span>
            ) : (
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {active.length >= 2 ? active[1] : "Waiting..."}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Medal,
  Clock,
  Code,
  Zap,
  ArrowRight,
  Home,
  RotateCcw,
  CheckCircle2,
  Star,
  TrendingUp,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";

interface MatchResultData {
  winner: "you" | "opponent" | "draw";
  yourStats: {
    name: string;
    testsPassed: number;
    totalTests: number;
    runtime: string;
    memory: string;
    timeTaken: string;
  };
  opponentStats: {
    name: string;
    testsPassed: number;
    totalTests: number;
    runtime: string;
    memory: string;
    timeTaken: string;
  };
  problem: {
    title: string;
    difficulty: string;
  };
}

const mockResult: MatchResultData = {
  winner: "you",
  yourStats: {
    name: "You",
    testsPassed: 50,
    totalTests: 50,
    runtime: "52ms",
    memory: "42.1 MB",
    timeTaken: "8:34",
  },
  opponentStats: {
    name: "Opponent",
    testsPassed: 45,
    totalTests: 50,
    runtime: "78ms",
    memory: "45.2 MB",
    timeTaken: "12:15",
  },
  problem: {
    title: "Two Sum",
    difficulty: "Easy",
  },
};

export default function MatchResult() {
  const { roomId } = useParams<{ roomId: string }>();
  const router = useRouter();
  const { resetStore } = useBattleArenaStore();

  // In real app, get result from location state or fetch from server
  const result = mockResult as MatchResultData;

  const isWinner = result.winner === "you";
  const isDraw = result.winner === "draw";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Hard":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />
        {isWinner && (
          <>
            <motion.div
              className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full"
              animate={{
                y: [0, -100, 0],
                x: [0, 50, 0],
                opacity: [1, 0.5, 1],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-40 right-32 w-3 h-3 bg-primary rounded-full"
              animate={{
                y: [0, -80, 0],
                x: [0, -30, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-40 left-1/4 w-2 h-2 bg-accent rounded-full"
              animate={{
                y: [0, -60, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
          </>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 py-16"
      >
        {/* Result header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          {/* Trophy / Medal */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
            className="inline-flex mb-6"
          >
            <div
              className={`relative p-6 rounded-full ${
                isWinner
                  ? "bg-linear-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-500/30"
                  : isDraw
                  ? "bg-linear-to-br from-blue-400/20 to-purple-500/20 border border-blue-500/30"
                  : "bg-linear-to-br from-gray-400/20 to-gray-500/20 border border-gray-500/30"
              }`}
            >
              {isWinner ? (
                <Trophy className="w-16 h-16 text-yellow-400" />
              ) : isDraw ? (
                <Medal className="w-16 h-16 text-blue-400" />
              ) : (
                <Medal className="w-16 h-16 text-gray-400" />
              )}

              {isWinner && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(234, 179, 8, 0.3)",
                      "0 0 40px rgba(234, 179, 8, 0.5)",
                      "0 0 20px rgba(234, 179, 8, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>

          {/* Result text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-4xl md:text-5xl font-bold mb-3 ${
              isWinner
                ? "bg-linear-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent"
                : isDraw
                ? "bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                : "text-muted-foreground"
            }`}
          >
            {isWinner ? "Victory!" : isDraw ? "It's a Draw!" : "Defeat"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground"
          >
            {isWinner
              ? "Congratulations! You solved it faster with better performance."
              : isDraw
              ? "Both players performed equally well!"
              : "Good effort! Practice makes perfect."}
          </motion.p>
        </motion.div>

        {/* Problem info */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <span className="text-sm text-muted-foreground">Problem</span>
          <div className="flex items-center justify-center gap-3 mt-1">
            <span className="text-lg font-medium">{result.problem.title}</span>
            <span
              className={`text-sm font-medium ${getDifficultyColor(
                result.problem.difficulty
              )}`}
            >
              {result.problem.difficulty}
            </span>
          </div>
        </motion.div>

        {/* Stats comparison */}
        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {/* Your stats */}
          <div
            className={`relative rounded-2xl border p-6 ${
              isWinner
                ? "bg-linear-to-br from-primary/5 to-accent/5 border-primary/30"
                : "bg-card/50 border-border/50"
            }`}
          >
            {isWinner && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium">
                  <Star className="w-3 h-3" />
                  Winner
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">Y</span>
              </div>
              <div>
                <h3 className="font-semibold">{result.yourStats.name}</h3>
                <span className="text-xs text-muted-foreground">
                  Your performance
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Tests Passed</span>
                </div>
                <span className="font-mono font-medium">
                  {result.yourStats.testsPassed}/{result.yourStats.totalTests}
                  {result.yourStats.testsPassed ===
                    result.yourStats.totalTests && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Runtime</span>
                </div>
                <span className="font-mono font-medium">
                  {result.yourStats.runtime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code className="w-4 h-4" />
                  <span className="text-sm">Memory</span>
                </div>
                <span className="font-mono font-medium">
                  {result.yourStats.memory}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Time Taken</span>
                </div>
                <span className="font-mono font-medium">
                  {result.yourStats.timeTaken}
                </span>
              </div>
            </div>
          </div>

          {/* Opponent stats */}
          <div
            className={`relative rounded-2xl border p-6 ${
              result.winner === "opponent"
                ? "bg-linear-to-br from-primary/5 to-accent/5 border-primary/30"
                : "bg-card/50 border-border/50"
            }`}
          >
            {result.winner === "opponent" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium">
                  <Star className="w-3 h-3" />
                  Winner
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                <span className="text-muted-foreground font-semibold">O</span>
              </div>
              <div>
                <h3 className="font-semibold">{result.opponentStats.name}</h3>
                <span className="text-xs text-muted-foreground">
                  Opponent's performance
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Tests Passed</span>
                </div>
                <span className="font-mono font-medium">
                  {result.opponentStats.testsPassed}/
                  {result.opponentStats.totalTests}
                  {result.opponentStats.testsPassed ===
                    result.opponentStats.totalTests && (
                    <span className="ml-2 text-green-500">✓</span>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Runtime</span>
                </div>
                <span className="font-mono font-medium">
                  {result.opponentStats.runtime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code className="w-4 h-4" />
                  <span className="text-sm">Memory</span>
                </div>
                <span className="font-mono font-medium">
                  {result.opponentStats.memory}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Time Taken</span>
                </div>
                <span className="font-mono font-medium">
                  {result.opponentStats.timeTaken}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance summary */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-border/50 bg-card/30 p-6 mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Performance Summary</h3>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-secondary/30">
              <div className="text-2xl font-bold text-primary mb-1">89%</div>
              <div className="text-xs text-muted-foreground">
                Faster than others
              </div>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/30">
              <div className="text-2xl font-bold text-accent mb-1">67%</div>
              <div className="text-xs text-muted-foreground">Better memory</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-secondary/30">
              <div className="text-2xl font-bold text-foreground mb-1">+25</div>
              <div className="text-xs text-muted-foreground">Rating gained</div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              router.push("/");
              resetStore();
            }}
            className="w-full sm:w-auto border-border/50"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Button
            variant="pill"
            size="lg"
            onClick={() => {
              resetStore();
              router.push("/join");
            }}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

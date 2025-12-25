"use client";
import { AnimatePresence, motion } from "motion/react";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";
import { ChevronRight, FileCode, Terminal, Zap } from "lucide-react";

export default function ProblemPanel() {
  const { setActiveTab, activeTab, roomInfo, isRunning, output } =
    useBattleArenaStore();
  return (
    <div className="w-[45%] border-r border-border/50 flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="h-12 border-b border-border/50 flex items-center px-4 gap-2 shrink-0">
        <button
          onClick={() => setActiveTab("problem")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "problem"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4" />
            Problem
          </div>
        </button>
        <button
          onClick={() => setActiveTab("output")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "output"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Output
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "problem" ? (
            <motion.div
              key="problem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 space-y-6"
            >
              {/* Title */}
              <div>
                <h1 className="text-xl font-semibold">
                  {roomInfo?.problem.title}
                </h1>
              </div>

              {/* Description */}
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {roomInfo?.problem.description}
                </p>
              </div>

              {/* Examples */}
              <div className="space-y-4">
                {roomInfo?.problem.examples.map((example: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-lg bg-secondary/30 border border-border/30 overflow-hidden"
                  >
                    <div className="px-4 py-2 bg-secondary/50 border-b border-border/30">
                      <span className="text-sm font-medium">
                        Example {idx + 1}
                      </span>
                    </div>
                    <div className="p-4 space-y-3 font-mono text-sm">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span className="text-foreground">{example.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Output: </span>
                        <span className="text-accent">{example.output}</span>
                      </div>
                      {example.explanation && (
                        <div className="pt-2 border-t border-border/30">
                          <span className="text-muted-foreground text-xs">
                            {example.explanation}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <h3 className="text-sm font-medium mb-3">Constraints</h3>
                <ul className="space-y-1">
                  {roomInfo?.problem.constraints.map(
                    (constraint: any, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 text-primary/50" />
                        <span className="font-mono">{constraint}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <div className="h-full p-4 font-mono text-sm">
                {isRunning ? (
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Zap className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="text-muted-foreground">Running...</span>
                  </div>
                ) : output ? (
                  <pre className="whitespace-pre-wrap text-muted-foreground">
                    {output}
                  </pre>
                ) : (
                  <p className="text-muted-foreground/50">
                    Run your code to see output here
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

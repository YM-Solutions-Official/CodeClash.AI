"use client";
import { Button } from "@/components/ui/button";
import { useCodeExecution } from "@/hooks/useCodeExecution";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";
import { FileCode, Play, Send } from "lucide-react";
import { useParams } from "next/navigation";

export default function LanguageSelector() {
  const { roomId } = useParams<{ roomId: string }>();
  const { isRunning, mySubmitted } = useBattleArenaStore();
  const { handleRunCode, handleSubmitCode } = useCodeExecution(roomId);

  return (
    <div className="h-12 border-b border-border/50 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/30">
        <FileCode className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-medium">JavaScript</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleRunCode}
          disabled={isRunning}
          className="border-border/50"
        >
          <Play className="w-4 h-4 mr-1" />
          Run
        </Button>
        <Button
          size="sm"
          onClick={handleSubmitCode}
          disabled={isRunning || mySubmitted}
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="w-4 h-4 mr-1" />
          Submit
        </Button>
      </div>
    </div>
  );
}

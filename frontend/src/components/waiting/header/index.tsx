"use client";
import { useRouter } from "next/navigation";
import { useWaitingRoomStore } from "@/store/useWaitingRoomStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";

export default function WaitingHeader() {
  const { roomInfo } = useWaitingRoomStore();
  const router = useRouter();
  return (
    <header className="p-6 flex items-center justify-between">
      <Button
        variant="link"
        onClick={() => router.push("/")}
        className="text-muted-foreground cursor-pointer hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Leave
      </Button>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {roomInfo?.duration! / 60} min match
        </span>
      </div>
    </header>
  );
}

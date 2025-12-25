"use client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useWaitingRoomStore } from "@/store/useWaitingRoomStore";
import { Check, Copy } from "lucide-react";

export default function RoomCodeCard() {
  const { roomInfo, copied, setCopied, isCreator } = useWaitingRoomStore();

  const copyRoomCode = async () => {
    if (roomInfo?.roomCode) {
      await navigator.clipboard.writeText(roomInfo.roomCode);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative mb-12">
      <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-50" />

      <div className="relative glass-strong rounded-2xl p-8 border border-border/50">
        <p className="text-sm text-muted-foreground mb-3">Room Code</p>

        <div className="flex items-center justify-center gap-4">
          <span className="text-4xl font-mono font-bold tracking-[0.3em] text-foreground">
            {roomInfo?.roomCode}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={copyRoomCode}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </Button>
        </div>

        {isCreator && (
          <p className="text-sm text-muted-foreground mt-4">
            Share this code with your opponent
          </p>
        )}
      </div>
    </div>
  );
}

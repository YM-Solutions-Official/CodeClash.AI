"use client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJoinRoomStore } from "@/store/useJoinRoomStore";
import { RoomAccessor } from "@/utils/accessors";
import { Zap } from "lucide-react";

export default function JoinForm() {
  const { isJoining, roomCode, setIsJoining, setRoomCode } = useJoinRoomStore();
  const roomAccessor = new RoomAccessor();
  const { joinRoom } = roomAccessor;
  const router = useRouter();

  const handleJoinRoom = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (!roomCode.trim()) return;

      setIsJoining(true);
      const response = await joinRoom(roomCode);
      router.push("/waiting/" + response.roomId);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleJoinRoom} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Room Code
        </label>
        <Input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          placeholder="Enter 6-digit code"
          className="h-14 text-center mt-2 text-2xl font-mono tracking-[0.5em] bg-background/50 border-2 border-border/50 focus:border-primary transition-all uppercase"
          maxLength={6}
        />
      </div>

      <Button
        type="submit"
        disabled={roomCode.length < 4 || isJoining}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium"
      >
        {isJoining ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Zap className="w-5 h-5" />
          </motion.div>
        ) : (
          "Join Room"
        )}
      </Button>
    </form>
  );
}

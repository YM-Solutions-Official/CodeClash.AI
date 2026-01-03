"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { roomAccessor } from "@/utils/accessors";
import { Button } from "@/components/ui/button";
import { ArrowRight, GamepadDirectional } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RoomBtns() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {user}= useAuthStore();

  const { createRoom } = roomAccessor;

  async function handleCreateRoom() {
    try {
      setLoading(true);
      const response = await createRoom(user?.id!);

      if (response.error) {
        toast.error("Failed to create room");
        return;
      }

      setLoading(false);

      router.push("/waiting/" + response.roomId);
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  function handleJoinRoom() {
    router.push("/join");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
    >
      <Button
        onClick={handleCreateRoom}
        disabled={loading}
        variant="hero"
        size="lg"
        className="group min-w-45"
      >
        Create Room
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </Button>
      <Button
        onClick={handleJoinRoom}
        variant="glow"
        size="lg"
        className="group min-w-45"
      >
        Join Room
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <GamepadDirectional className="h-4 w-4" />
        </motion.span>
      </Button>
    </motion.div>
  );
}

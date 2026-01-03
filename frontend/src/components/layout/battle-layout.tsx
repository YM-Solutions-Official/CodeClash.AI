"use client";
import { getSocket } from "@/lib/socket";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";
import { roomAccessor } from "@/utils/accessors";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

export default function BattleLayout({
  children,
  roomId,
}: Readonly<{
  children: ReactNode;
  roomId: string;
}>) {
  const {
    roomInfo,
    setRoomInfo,
    setOpponentStatus,
    setTimeRemaining,
    setMySubmitted,
    setOpponentSubmitted,
  } = useBattleArenaStore();
  const router = useRouter();
  const { getRoomInfo } = roomAccessor;

  useEffect(() => {
    async function getRoomData() {
      const response = await getRoomInfo(roomId);

      if (response.error) {
        toast.error(response.error);
        router.push("/join");
        return;
      }

      setRoomInfo(response);
    }

    getRoomData();
  }, [roomId]);

  useEffect(() => {
    if (!roomInfo?.startTime || !roomInfo?.duration) return;

    const isCreator = roomInfo.role === "creator";

    const mySubmitted = isCreator
      ? roomInfo.submissions?.creator?.submitted
      : roomInfo.submissions?.joiner?.submitted;

    const opponentSubmitted = isCreator
      ? roomInfo.submissions?.joiner?.submitted
      : roomInfo.submissions?.creator?.submitted;

    setMySubmitted(!!mySubmitted);
    setOpponentSubmitted(!!opponentSubmitted);

    const interval = setInterval(() => {
      const time = Math.floor((Date.now() - roomInfo.startTime!) / 1000);
      const remaining = Math.max(0, roomInfo.duration! - time);
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        toast.error("Time's up!");
        router.push(`/results/${roomId}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [roomInfo]);

  useEffect(() => {
    const socket = getSocket();

    socket.emit("rejoin_room", { roomId }, (res: any) => {
      if (res?.error) {
        toast.error(res.error);
        router.push("/");
      }
    });

    return () => {
      socket.emit("leave_room", { roomId });
    };
  }, [roomId]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("opponent_submitted", () => {
      setOpponentStatus("submitted");
      setOpponentSubmitted(true);
      toast.error("Opponent has submitted!");
    });

    return () => {
      socket.off("opponent_submitted");
    };
  }, []);

  return <>{children}</>;
}

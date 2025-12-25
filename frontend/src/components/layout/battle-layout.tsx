"use client";
import { getSocket } from "@/lib/socket";
import { useBattleArenaStore } from "@/store/useBattleArenaStore";
import { RoomAccessor } from "@/utils/accessors";
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
  const { roomInfo, setRoomInfo, setOpponentStatus, setTimeRemaining } =
    useBattleArenaStore();
  const router = useRouter();
  const roomAccessor = new RoomAccessor();
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

    const interval = setInterval(() => {
      const time = Math.floor((Date.now() - roomInfo.startTime!) / 1000);
      const remaining = Math.max(0, roomInfo.duration! - time);
      setTimeRemaining(remaining);

      if (remaining === 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [roomInfo]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("opponent_submitted", () => {
      setOpponentStatus("submitted");
    });

    return () => {
      socket.off("opponent_submitted");
    };
  }, []);

  return <>{children}</>;
}

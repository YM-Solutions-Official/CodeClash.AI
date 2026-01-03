"use client";
import { getSocket } from "@/lib/socket";
import { useWaitingRoomStore } from "@/store/useWaitingRoomStore";
import { roomAccessor } from "@/utils/accessors";
import { MatchStartedRes } from "@/utils/types/room";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";

export default function WaitingLayout({
  roomId,
  children,
}: Readonly<{
  children: ReactNode;
  roomId: string;
}>) {
  const { setRoomInfo, addUser, setIsCreator, setCountdown } =
    useWaitingRoomStore();
  const { getRoomInfo } = roomAccessor;
  const router = useRouter();

  useEffect(() => {
    async function getRoomData() {
      const response = await getRoomInfo(roomId);

      if (response.error) {
        toast.error(response.error);
        return;
      }
      setRoomInfo(response);

      const creatorId = localStorage.getItem("room_creator");
      if (creatorId === response.creatorId) setIsCreator(true);
    }

    getRoomData();
  }, [roomId]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("user_joined", (userId: string) => {
      addUser(userId);
    });

    socket.on("match_started", (data: MatchStartedRes) => {
      const { startTime } = data;
      const interval = setInterval(() => {
        const remaining = Math.ceil((startTime - Date.now()) / 1000);

        if (remaining <= 0) {
          clearInterval(interval);
          router.push("/battle/" + roomId);
        } else {
          setCountdown(remaining);
        }
      }, 200);
    });

    return () => {
      socket.off("user_joined");
      socket.off("match_started");
    };
  }, []);

  return <>{children}</>;
}

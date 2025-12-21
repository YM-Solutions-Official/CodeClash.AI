"use client";

import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Room() {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createRoom = () => {
    const socket = getSocket();

    socket.emit(
      "create_room",
      {},
      (response: { roomId?: string; creatorId?: string; error?: string }) => {
        setLoading(false);

        if (response.error) {
          alert(response.error);
          return;
        }

        if (response.roomId && response.creatorId) {
          localStorage.setItem("room_creator", response.creatorId);
          router.push(`/room/${response.roomId}`);
        }
      }
    );
  };

  const joinRoom = () => {
    if (!roomCode.trim()) {
      alert("Please enter a room code");
      return;
    }
    router.push(`/room/${roomCode}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 className="text-4xl font-bold mb-5">CodeClash.AI</h1>

      <button onClick={createRoom} disabled={loading} className="border px-2 rounded-md mb-5 cursor-pointer">
        {loading ? "Creating..." : "Create Room"}
      </button>

      <hr className="mb-2" />

      <input
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className="border mx-2 px-1"
      />
      <button onClick={joinRoom} className="cursor-pointer">Join Room</button>
    </div>
  );
}

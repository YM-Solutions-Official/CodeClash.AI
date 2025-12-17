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
      <h1>CodeClash</h1>

      <button onClick={createRoom} disabled={loading}>
        {loading ? "Creating..." : "Create Room"}
      </button>

      <hr />

      <input
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
}

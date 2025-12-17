"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSocket } from "@/lib/socket";

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [users, setUsers] = useState<string[]>([]);
  const [status, setStatus] = useState("waiting");
  const [isCreator, setIsCreator] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = getSocket();
    const roomCreator = localStorage.getItem("room_creator");

    // Check if this user is the creator
    if (roomCreator === socket.id) {
      setIsCreator(true);
      
      socket.emit(
        "get_room_info",
        { roomId },
        (response: {
          users?: string[];
          status?: string;
          creatorId?: string;
          error?: string;
        }) => {
          setLoading(false);

          if (response.error) {
            setError(response.error);
            return;
          }

          if (response.users && response.status) {
            setUsers(response.users);
            setStatus(response.status);
          }
        }
      );
    } else {
      socket.emit(
        "join_room",
        { roomId },
        (response: {
          users?: string[];
          status?: string;
          creatorId?: string;
          error?: string;
        }) => {
          setLoading(false);

          if (response.error) {
            setError(response.error);
            return;
          }

          if (response.users && response.status && response.creatorId) {
            setUsers(response.users);
            setStatus(response.status);
            setIsCreator(false);
          }
        }
      );
    }

    // Listen for new users
    socket.on("user_joined", (userId: string) => {
      setUsers((prev) => {
        if (prev.includes(userId)) return prev;
        return [...prev, userId];
      });
    });

    // Listen for match start
    socket.on("match_started", () => {
      setStatus("active");
    });

    return () => {
      socket.off("user_joined");
      socket.off("match_started");
    };
  }, [roomId]);

  const startMatch = () => {
    const socket = getSocket();
    socket.emit(
      "start_match",
      { roomId },
      (response: { error?: string; success?: boolean }) => {
        if (response.error) {
          alert(response.error);
        }
      }
    );
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  if (error) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Error</h2>
        <p>{error}</p>
        <a href="/">Go back</a>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Room: {roomId}</h2>
      <p>Status: {status}</p>

      <h4>Users ({users.length}/2)</h4>
      <ul>
        {users?.map((u) => (
          <li key={u}>
            {u} {isCreator && u === users[0] ? "(You - Creator)" : ""}
          </li>
        ))}
      </ul>

      {isCreator && status === "waiting" && users.length === 2 && (
        <button onClick={startMatch}>Start Match</button>
      )}

      {isCreator && status === "waiting" && users.length < 2 && (
        <p>Waiting for opponent...</p>
      )}

      {!isCreator && status === "waiting" && (
        <p>Waiting for creator to start match...</p>
      )}

      {status === "active" && <p>Match is active! 🎮</p>}
    </div>
  );
}

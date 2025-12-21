"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getSocket } from "@/lib/socket";
import Editor from "@monaco-editor/react";

interface Problem {
  title: string;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
}

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [users, setUsers] = useState<string[]>([]);
  const [status, setStatus] = useState("waiting");
  const [isCreator, setIsCreator] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState<Problem | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [code, setCode] = useState<string>("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number>(0);

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
          problem?: Problem;
          startTime?: number;
          duration?: number;
          timeRemaining?: number;
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

            if (
              response.status === "active" &&
              response.problem &&
              response.startTime
            ) {
              setProblem(response.problem);
              setDuration(response.duration || 900);
              endTimeRef.current =
                response.startTime + (response.duration || 900) * 1000;
              startTimer();
            }
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
          problem?: Problem;
          startTime?: number;
          duration?: number;
          timeRemaining?: number;
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

            if (
              response.status === "active" &&
              response.problem &&
              response.startTime
            ) {
              setProblem(response.problem);
              setDuration(response.duration || 900);
              endTimeRef.current =
                response.startTime + (response.duration || 900) * 1000;
              startTimer();
            }
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
    socket.on(
      "match_started",
      (data: {
        problem: Problem;
        startTime: number;
        duration: number;
        endTime: number;
      }) => {
        setStatus("active");
        setProblem(data.problem);
        setDuration(data.duration);
        endTimeRef.current = data.endTime;
        startTimer();
      }
    );

    return () => {
      socket.off("user_joined");
      socket.off("match_started");

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [roomId]);

  const startTimer = () => {
    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.floor((endTimeRef.current - Date.now()) / 1000)
      );
      setTimeRemaining(remaining);

      if (remaining === 0 && timerRef.current) {
        clearInterval(timerRef.current);
      }
    };

    updateTimer();
    timerRef.current = setInterval(updateTimer, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

  // Waiting state
  if (status === "waiting") {
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

        {isCreator && users.length === 2 && (
          <button onClick={startMatch}>Start Match</button>
        )}

        {isCreator && users.length < 2 && <p>Waiting for opponent...</p>}

        {!isCreator && <p>Waiting for creator to start match...</p>}
      </div>
    );
  }

  // Active match state
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header with Timer */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "20px" }}>Room: {roomId}</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          <span style={{ color: timeRemaining < 60 ? "#ef4444" : "#10b981" }}>
            {formatTime(timeRemaining)}
          </span>
          <span
            style={{ fontSize: "14px", color: "#6b7280", fontWeight: "normal" }}
          >
            / {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Problem Panel */}
        <div
          style={{
            width: "50%",
            borderRight: "1px solid #e5e7eb",
            overflowY: "auto",
            padding: "24px",
          }}
        >
          {problem && (
            <div style={{ maxWidth: "800px" }}>
              <h1 style={{ fontSize: "28px", marginBottom: "16px" }}>
                {problem.title}
              </h1>

              <p
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.6",
                  marginBottom: "24px",
                  color: "#374151",
                }}
              >
                {problem.description}
              </p>

              {problem.examples?.map((example, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#f3f4f6",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <p style={{ fontWeight: "600", marginBottom: "8px" }}>
                    Example {idx + 1}:
                  </p>
                  <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
                    <p style={{ color: "#6b7280", margin: "4px 0" }}>
                      Input: {example.input}
                    </p>
                    <p style={{ color: "#6b7280", margin: "4px 0" }}>
                      Output: {example.output}
                    </p>
                    {example.explanation && (
                      <p style={{ color: "#9ca3af", marginTop: "8px" }}>
                        {example.explanation}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {problem.constraints && (
                <div style={{ marginTop: "24px" }}>
                  <p style={{ fontWeight: "600", marginBottom: "8px" }}>
                    Constraints:
                  </p>
                  <ul
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      paddingLeft: "24px",
                    }}
                  >
                    {problem.constraints.map((constraint, idx) => (
                      <li key={idx} style={{ marginBottom: "4px" }}>
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Code Editor Panel */}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              borderBottom: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            JavaScript
          </div>

          <div style={{ flex: 1 }}>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb",
            }}
          >
            <button
              disabled
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#d1d5db",
                color: "#6b7280",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "not-allowed",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

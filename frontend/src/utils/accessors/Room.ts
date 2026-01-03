import { getSocket } from "@/lib/socket";
import {
  CreateRoomRes,
  GetRoomInfoRes,
  JoinRoomRes,
  RunCodeRes,
  StartMatchRes,
  SubmitCodeRes,
} from "../types/room";

class RoomAccessor {
  public createRoom(userId: string): Promise<CreateRoomRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("create_room", { userId }, (response: CreateRoomRes) => {
          if (response.creatorId) {
            localStorage.setItem("room_creator", response.creatorId);
          }

          res(response);
        });
      } catch (error) {
        console.log("CREATE ROOM ERROR:", error);
        rej(error);
      }
    });
  }

  public getRoomInfo(roomId: string): Promise<GetRoomInfoRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("get_room_info", { roomId }, (response: GetRoomInfoRes) => {
          res(response);
        });
      } catch (error) {
        console.log("GET ROOM INFO ERROR:", error);
        rej(error);
      }
    });
  }

  public async joinRoom(roomCode: string): Promise<JoinRoomRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("join_room", { roomCode }, (response: JoinRoomRes) => {
          res(response);
        });
      } catch (error) {
        console.log("JOIN ROOM ERROR:", error);
        rej(error);
      }
    });
  }

  public async startMatch(roomId: string): Promise<StartMatchRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit("start_match", { roomId }, (response: StartMatchRes) => {
          res(response);
        });
      } catch (error) {
        console.log("START MATCH ERROR:", error);
        rej(error);
      }
    });
  }

  public runCode(
    roomId: string,
    code: string,
    language: string = "javascript"
  ): Promise<RunCodeRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit(
          "run_code",
          { roomId, code, language },
          (response: RunCodeRes) => {
            if (response.error) {
              rej(response.error);
              return;
            }
            res(response);
          }
        );

        // Timeout after 10 seconds
        setTimeout(() => {
          rej("Execution timeout");
        }, 10000);
      } catch (error) {
        console.log("RUN CODE ERROR:", error);
        rej(error);
      }
    });
  }

  public submitCode(roomId: string, code: string): Promise<SubmitCodeRes> {
    return new Promise((res, rej) => {
      try {
        const socket = getSocket();

        socket.emit(
          "submit_code",
          { roomId, code },
          (response: SubmitCodeRes) => {
            if (response.error) {
              rej(response.error);
              return;
            }
            res(response);
          }
        );

        setTimeout(() => {
          rej("Submission timeout");
        }, 10000);
      } catch (error) {
        console.log("SUBMIT CODE ERROR:", error);
        rej(error);
      }
    });
  }

  public getTimerColor = (timeRemaining: number) => {
    if (timeRemaining && timeRemaining <= 60) return "text-red-500";
    if (timeRemaining && timeRemaining <= 180) return "text-yellow-500";
    return "text-foreground";
  };

  public formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
}

export const roomAccessor = new RoomAccessor();

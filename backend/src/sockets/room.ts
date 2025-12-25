import { Server, Socket } from "socket.io";
import RoomModel from "../models/room";
import { HARDCODED_PROBLEM, ROOM_STATUS } from "../lib/constants";
import { checkMatchEnd, executeCode } from "./helper";
import { generateRoomId } from "../lib/nanoid";

export function setupRoomSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected", socket.id);

    // Create Room
    socket.on("create_room", async (_, callback: any) => {
      try {
        const room = new RoomModel({
          creatorId: socket.id,
          status: ROOM_STATUS.WAITING,
        });

        const roomCode = generateRoomId();

        room.roomCode = roomCode;
        await room.save();

        socket.join(roomCode);

        console.log(`Room created ${room._id} by ${socket.id}`);
        callback({
          roomId: room._id,
          creatorId: socket.id,
        });
      } catch (error) {
        console.error("Create room error:", error);
        callback({ error: "Failed to create room" });
      }
    });

    // Get room info
    socket.on("get_room_info", async ({ roomId }, callback: any) => {
      try {
        const room = await RoomModel.findById(roomId);

        if (!room) {
          return callback({ error: "Room not found" });
        }

        const users = room.joinedUser
          ? [room.creatorId, room.joinedUser]
          : [room.creatorId];

        let timeRemaining: number | null = null;
        if (room.status === ROOM_STATUS.ACTIVE && room.startTime) {
          const time = Math.floor((Date.now() - room.startTime) / 1000);
          timeRemaining = Math.max(0, room.duration - time);
        }

        const isCreator = socket.id === room.creatorId;
        const role = socket.id === room.creatorId ? "creator" : "joiner";
        const hasSubmitted = isCreator
          ? room.submissions?.creator?.submitted
          : room.submissions?.joiner?.submitted;

        callback({
          users,
          roomCode: room.roomCode,
          status: room.status,
          creatorId: room.creatorId,
          role,
          problem: room.status === ROOM_STATUS.ACTIVE ? room.problem : null,
          startTime: room.startTime,
          duration: room.duration,
          timeRemaining,
          hasSubmitted,
          winner: room.winner,
          submissions:
            room.status === ROOM_STATUS.FINISHED ? room.submissions : null,
          endTime: room.endTime,
        });
      } catch (error) {
        console.error("Get room info error:", error);
        callback({ error: "Failed to get room info" });
      }
    });

    // Join Room
    socket.on("join_room", async ({ roomCode }, callback: any) => {
      try {
        const room = await RoomModel.findOne({ roomCode });

        if (!room) return callback({ error: "Room not found" });

        if (room.joinedUser) return callback({ error: "Room full" });

        room.joinedUser = socket.id;
        await room.save();

        socket.join(roomCode);

        socket.to(roomCode).emit("user_joined", socket.id);

        let timeRemaining: number | null = null;
        if (room.status === ROOM_STATUS.ACTIVE && room.startTime) {
          const time = Math.floor((Date.now() - room.startTime) / 1000);
          timeRemaining = Math.max(0, room.duration - time);
        }

        callback({
          roomId: room._id,
          users: [room.creatorId, room.joinedUser],
          status: room.status,
          creatorId: room.creatorId,
          problem: room.status === ROOM_STATUS.ACTIVE ? room.problem : null,
          startTime: room.startTime,
          duration: room.duration,
          timeRemaining,
          hasSubmitted: false,
          winner: room.winner,
          submissions:
            room.status === ROOM_STATUS.FINISHED ? room.submissions : null,
          endTime: room.endTime,
        });

        console.log(`User ${socket.id} joined room ${roomCode}`);
      } catch (error) {
        console.error("Join room error:", error);
        callback({ error: "Failed to join room" });
      }
    });

    socket.on("rejoin_room", async ({ roomId }, callback: any) => {
      const room = await RoomModel.findById(roomId);
      if (!room) return callback({ error: "Room not found" });

      socket.join(room.roomCode!);
      callback({ success: true });
    });

    socket.on("leave_room", async ({ roomId }) => {
      const room = await RoomModel.findById(roomId);
      if (!room) return;

      socket.leave(room.roomCode!);
    });

    // Start Match
    socket.on("start_match", async ({ roomId }, callback: any) => {
      try {
        const room = await RoomModel.findById(roomId);

        if (!room) return callback({ error: "Room not found" });

        if (room.creatorId !== socket.id)
          return callback({ error: "Only creator can start match" });

        if (!room.joinedUser)
          return callback({ error: "Waiting for opponent" });

        if (room.status !== ROOM_STATUS.WAITING)
          return callback({ error: "Match already started" });

        room.status = ROOM_STATUS.ACTIVE;
        room.problem = HARDCODED_PROBLEM;
        room.startTime = Date.now() + 3000; // 3 sec for countdown
        await room.save();

        const matchData = {
          problem: HARDCODED_PROBLEM,
          startTime: room.startTime,
          duration: room.duration,
          endTime: room.startTime + room.duration * 1000,
        };

        io.to(room.roomCode!).emit("match_started", matchData);
        callback({ success: true });
        console.log(`Match started in room ${roomId}`);

        setTimeout(() => {
          checkMatchEnd(io, roomId);
        }, room.duration * 1000);
      } catch (error) {
        console.error("Start match error:", error);
        callback({ error: "Failed to start match" });
      }
    });

    socket.on("run_code", async ({ roomId, code, language }, callback: any) => {
      try {
        const room = await RoomModel.findById(roomId);
        if (!room) return callback({ error: "Room not found" });

        if (room.status !== ROOM_STATUS.ACTIVE) {
          return callback({ error: "Match is not active" });
        }

        // Execute code against test cases
        const testResults = await executeCode(
          code,
          room.problem!.examples,
          language
        );

        callback({
          success: true,
          results: testResults,
        });
      } catch (error) {
        console.error("Run code error:", error);
        callback({ error: "Failed to run code" });
      }
    });

    // Submit Code
    socket.on("submit_code", async ({ roomId, code }, callback: any) => {
      try {
        const room = await RoomModel.findById(roomId);

        if (!room) return callback({ error: "Room not found" });

        if (room.status !== ROOM_STATUS.ACTIVE) {
          return callback({ error: "Match is not active" });
        }

        const isCreator = socket.id === room.creatorId;
        const isJoiner = socket.id === room.joinedUser;

        if (!isCreator && !isJoiner) {
          return callback({ error: "You are not in this room" });
        }

        // Check if already submitted
        const alreadySubmitted = isCreator
          ? room.submissions?.creator?.submitted
          : room.submissions?.joiner?.submitted;

        if (alreadySubmitted) {
          return callback({ error: "You have already submitted" });
        }

        // Record submission
        const submissionTime = Date.now();

        if (!room.submissions) {
          room.submissions = {
            creator: { submitted: false },
            joiner: { submitted: false },
          };
        }

        if (isCreator) {
          room.submissions.creator = {
            submitted: true,
            submissionTime,
            code,
          };
        } else {
          room.submissions.joiner = {
            submitted: true,
            submissionTime,
            code,
          };
        }

        await room.save();

        socket.to(room.roomCode!).emit("opponent_submitted", {
          userId: socket.id,
        });

        callback({
          success: true,
          submissionTime,
        });

        console.log(`User ${socket.id} submitted in room ${roomId}`);

        // Check if match should end
        await checkMatchEnd(io, roomId);
      } catch (error) {
        console.error("Submit code error:", error);
        callback({ error: "Failed to submit code" });
      }
    });

    socket.on("disconnect", async () => {
      console.log("Client Disconnected", socket.id);
    });
  });
}

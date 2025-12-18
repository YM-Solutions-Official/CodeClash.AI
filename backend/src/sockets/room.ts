import { Server, Socket } from "socket.io";
import RoomModel from "../models/room";
import { HARDCODED_PROBLEM, ROOM_STATUS } from "../lib/constants";

export function setupRoomSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected", socket.id);

    // Create Room
    socket.on("create_room", async (_, callback) => {
      try {
        const room = await RoomModel.create({
          creatorId: socket.id,
          status: ROOM_STATUS.WAITING,
        });

        socket.join(room._id.toString());

        console.log(`Room created ${room._id} by ${socket.id}`);
        callback({
          roomId: room._id.toString(),
          creatorId: socket.id,
        });
      } catch (error) {
        console.error("Create room error:", error);
        callback({ error: "Failed to create room" });
      }
    });

    // Get room info
    socket.on("get_room_info", async ({ roomId }, callback) => {
      try {
        const room = await RoomModel.findById(roomId);

        if (!room) {
          return callback({ error: "Room not found" });
        }

        const users = room.joinedUser
          ? [room.creatorId, room.joinedUser]
          : [room.creatorId];

        let timeRemaining = null;
        if (room.status === ROOM_STATUS.ACTIVE && room.startTime) {
          const time = Math.floor((Date.now() - room.startTime) / 1000);
          timeRemaining = Math.max(0, room.duration - time);
        }

        callback({
          users,
          status: room.status,
          creatorId: room.creatorId,
          problem: room.status === ROOM_STATUS.ACTIVE ? room.problem : null,
          startTime: room.startTime,
          duration: room.duration,
          timeRemaining,
        });
      } catch (error) {
        console.error("Get room info error:", error);
        callback({ error: "Failed to get room info" });
      }
    });

    // Join Room
    socket.on("join_room", async ({ roomId }, callback) => {
      try {
        const room = await RoomModel.findById(roomId);

        if (!room) return callback({ error: "Room not found" });

        if (room.joinedUser) return callback({ error: "Room full" });

        room.joinedUser = socket.id;
        await room.save();

        socket.join(roomId);

        socket.to(roomId).emit("user_joined", socket.id);

        let timeRemaining = null;
        if (room.status === ROOM_STATUS.ACTIVE && room.startTime) {
          const time = Math.floor((Date.now() - room.startTime) / 1000);
          timeRemaining = Math.max(0, room.duration - time);
        }

        callback({
          users: [room.creatorId, room.joinedUser],
          status: room.status,
          creatorId: room.creatorId,
          problem: room.status === ROOM_STATUS.ACTIVE ? room.problem : null,
          startTime: room.startTime,
          duration: room.duration,
          timeRemaining,
        });

        console.log(`User ${socket.id} joined room ${roomId}`);
      } catch (error) {
        console.error("Join room error:", error);
        callback({ error: "Failed to join room" });
      }
    });

    // Start Match
    socket.on("start_match", async ({ roomId }, callback) => {
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
        room.startTime = Date.now();
        await room.save();

        const matchData = {
          problem: HARDCODED_PROBLEM,
          startTime: room.startTime,
          duration: room.duration,
          endTime: room.startTime + room.duration * 1000,
        };

        io.to(roomId).emit("match_started", matchData);
        callback({ success: true });
        console.log(`Match started in room ${roomId}`);
      } catch (error) {
        console.error("Start match error:", error);
        callback({ error: "Failed to start match" });
      }
    });

    socket.on("disconnect", async () => {
      console.log("Client Disconnected", socket.id);
    });
  });
}

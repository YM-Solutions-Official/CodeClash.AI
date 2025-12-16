import { Request, Response } from "express";
import RoomModel from "../models/room";

export async function createRoom(req: Request, res: Response) {
  const { roomId, creatorId, joinedUser, status } = req.body;

  try {
    const room = await RoomModel.create({
      roomId,
      creatorId,
      joinedUser,
      status,
    });
    return res.status(201).json({
      status: "sucess",
      message: "Room created successfully",
      room: { _id: room._id, roomId, creatorId, joinedUser, status },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: "error", message: "Internal Server Error" });
  }
}

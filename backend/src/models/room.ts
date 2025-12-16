import { model, Schema, Types } from "mongoose";
import type { IRoom } from "../types";
import { ROOM_MODEL, ROOM_STATUS } from "../lib/constants";

const RoomSchema = new Schema<IRoom>(
  {
    roomId: {
      type: Types.ObjectId,
      required: true,
    },
    creatorId: {
      type: Types.ObjectId,
      required: true,
    },
    joinedUser: {
      type: Types.ObjectId,
      required: true,
    },
    status: {
      enum: ROOM_STATUS,
      required: true,
      default: ROOM_STATUS.WAITING,
    },
  },
  { timestamps: true }
);

const RoomModel = model(ROOM_MODEL, RoomSchema);

export default RoomModel;

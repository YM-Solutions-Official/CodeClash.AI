import type { ObjectId } from "mongoose";
import type { ROOM_STATUS } from "../lib/constants/enum";

export interface IRoom {
  roomId: ObjectId;
  creatorId: ObjectId;
  joinedUser: ObjectId;
  status: ROOM_STATUS;
}

import { model, Schema, Types } from "mongoose";
import type { IRoom } from "../types";
import { ROOM_MODEL, ROOM_STATUS } from "../lib/constants";

const RoomSchema = new Schema<IRoom>(
  {
    roomId: {
      type: String,
    },
    creatorId: {
      type: String,
      required: true,
    },
    joinedUser: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ROOM_STATUS),
      default: ROOM_STATUS.WAITING,
    },
    problem: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      inputFormat: {
        type: String,
      },
      outputFormat: {
        type: String,
      },
      constraints: [
        {
          type: String,
        },
      ],
      examples: [
        {
          input: String,
          output: String,
          explanation: String,
        },
      ],
    },
    duration: {
      type: Number,
      default: 900,
    },
    startTime: {
      type: Number,
    },
    submissions:{
      creator: {
        submitted: {
          type: Boolean,
          default: false,
        },
        submissionTime: {
          type: Number,
        },
        code: {
          type: String,
        },
      },
      joiner: {
        submitted: {
          type: Boolean,
          default: false,
        },
        submissionTime: {
          type: Number,
        },
        code: {
          type: String,
        },
      },
    },
    winner: {
      type: String,
    },
    endTime: {
      type: Number,
    },
  },
  { timestamps: true }
);

const RoomModel = model(ROOM_MODEL, RoomSchema);

export default RoomModel;

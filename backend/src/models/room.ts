import { model, Schema, Types } from "mongoose";
import type { IRoom } from "../types";
import { ROOM_MODEL, ROOM_STATUS, USER_MODEL } from "../lib/constants";

const RoomSchema = new Schema<IRoom>(
  {
    roomCode: {
      type: String,
      required: false,
      minLength: 6,
      maxLength: 6,
      trim: true,
    },
    creatorId: {
      type: String,
      required: true,
      trim: true,
    },
    creatorUser: {
      type: Types.ObjectId,
      required: true,
      ref: USER_MODEL,
    },
    joinerId: {
      type: String,
      required: false,
      trim: true,
    },
    joinerUser: {
      type: Types.ObjectId,
      required: false,
      ref: USER_MODEL,
    },
    status: {
      type: String,
      required: false,
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
    submissions: {
      type: {
        creator: {
          submitted: { type: Boolean, default: false },
          submissionTime: Number,
          code: String,
        },
        joiner: {
          submitted: { type: Boolean, default: false },
          submissionTime: Number,
          code: String,
        },
      },
      default: () => ({
        creator: { submitted: false },
        joiner: { submitted: false },
      }),
    },
    duration: {
      type: Number,
      required: false,
      default: 900,
    },
    startTime: {
      type: Number,
      required: false,
    },
    endTime: {
      type: Number,
      required: false,
    },
    winner: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const RoomModel = model(ROOM_MODEL, RoomSchema);

export default RoomModel;

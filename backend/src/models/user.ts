import { model, Schema } from "mongoose";
import { IUser } from "../types";
import { USER_MODEL } from "../lib/constants";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      minLength: 8,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    guestId: {
      type: String,
      required: false,
      trim: true,
    },
    stats: {
      wins: {
        type: Number,
        default: 0,
      },
      losses: {
        type: Number,
        default: 0,
      },
      draws: {
        type: Number,
        default: 0,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 * 7, partialFilterExpression: { isGuest: true } }
);

UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ guestId: 1 }, { unique: true, sparse: true });

const UserModel = model(USER_MODEL, UserSchema);

export default UserModel;

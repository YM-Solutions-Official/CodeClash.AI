import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: false,
      sparse: true,
    },
    mobile: {
      type: String,
      unique: false,
      sparse: true,
    },
    type: {
      type: String,
      enum: ["mobile", "email"],
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiringTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "verified"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const OTPModel = mongoose.model("Otp", OtpSchema);

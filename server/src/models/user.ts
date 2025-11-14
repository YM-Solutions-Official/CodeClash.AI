import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    memberSince: {
      type: Date,
      default: Date.now()
    },
    totalBattles: {
      type: Number,
      default: 0

    },
    wins: {
      type: Number,
      default: 0
    },
    looses: {
      type: Number,
      default: 0
    },
    winRate: {
      type: Number,
      default: 0
    },
    currentRank: {
      type: Number,
      default: 0
    },
    winStreak: {
      type: Number,
      default: 0
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    languageMastered: {
      type: [String],
      default: []
    },
    favoriteLanguages: {
      type: [String],
      default: []
    },
    socialLinks: {
      type: {
        github: String,
        linkedin: String,
        twitter: String,
        website: String
      },
      default: {}
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);

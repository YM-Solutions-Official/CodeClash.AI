const mongoose = require("mongoose");

// creating user schema
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
    dob: {
      type: Date,
    },
    age: {
      type: Number,
      min: 0,
    },
    profilePicture: {
      type: String,
      default: "default-profile.png",
    },
    bio: {
      type: String,
      default: "Hey, I am using DevConnect!",
    },
    designation: {
      type: String,
      default: "User",
    },

    mobile: {
      countryCode: { type: String, default: "+91" },
      number: { type: String, default: "" },
    },

    location: {
      country: { type: String, default: "" },
      state: { type: String, default: "" },
      city: { type: String, default: "" },
      address: { type: String, default: "" },
    },

    skills: {
      type: [String],
      default: [],
    },

    // security
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },

    // platform control
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// creating user model
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
